# Integrating a Bot with an Identity Provider

## Overview

By default, Symphony provides secure authentication and authorization for all users. However, if you already have an identity provider that authenticates and authorizes users for resources and you want those resources served by a bot, you will need to implement this integration yourself. This tutorial seeks to demonstrate one such implementation using an OAuth-like flow.

## Components and Flow

1. Chat Bot: Listens to commands from the user and contacts the other components
2. Authorization Server: A server that integrates with the Identity Provider. This server is trusted with privileged access to Symphony REST APIs.
3. Resource Server: A server where requested resources are served from. This server does not trust the bot to make arbitrary calls for user-owned data.

This sequence diagram describes the flow of requests between the various components.

![](../../../.gitbook/assets/sso-workflow-7-%20%281%29.svg)

## Create Authorization Server <a id="create-authorization-server"></a>

We will be using the BDK 2.0 for this example, so generate a scaffold project using the Bot Generator by following these instructions. We will also be using the Spring Boot integration so ensure that is selected at the framework question in the generator.

{% page-ref page="../../configuration/configure-your-bot-for-bdk-2.0.md" %}

Once you have your project, we will first add web capability by changing `spring-boot-starter` to `spring-boot-starter-web`, then adding `com.auth0:java-jwt` for minting tokens.

{% code title="pom.xml" %}
```markup
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.symphony.platformsolutions</groupId>
        <artifactId>symphony-bdk-core-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.auth0</groupId>
        <artifactId>java-jwt</artifactId>
        <version>3.12.0</version>
    </dependency>
</dependencies>
```
{% endcode %}

### Configure Authorization Server

If you haven't already configured your bot in `application.yaml`, do that now. Then, generate a new RSA key pair used to sign and verify tokens.

```bash
openssl genrsa -out sign-private.pem 2048
openssl rsa -in sign-private.pem -outform PEM -pubout -out sign-public.pem
```

Add the keys to your project and list their paths in your `application.yaml` file. We will also disable the BDK 2.0's datafeed since this server will initiate calls from HTTP endpoints rather than Symphony events.

{% code title="application.yaml" %}
```yaml
bdk:
  host: develop2.symphony.com
  bot:
    username: bot-username
    privateKey:
      path: auth-server/rsa/auth-bot-private.pem
  datafeed:
    enabled: false

auth-server:
  privateKey: auth-server/rsa/sign-private.pem
  publicKey: auth-server/rsa/sign-public.pem
```
{% endcode %}

## Create Message Identity Request Object

We will use this object to request for tokens from the Authorization Server, where we want to validate if a message ID is valid and the initiator's user ID matches what was requested.

{% code title="MessageIdentityRequest.java" %}
```java
public class MessageIdentityRequest {
  private String messageId;
  private String username;
  
  // Constructors, Getters, Setters
}
```
{% endcode %}

## Create Message Identity Service

This service will be our main logic class, serving HTTP requests and processing validation. We will inject in the location of our keys and use the BDK 2.0's message service and user service.

{% code title="MessageeIdentityService.java" %}
```java
@RestController
public class MessageIdentityService {
  @Value("${auth-server.privateKey}")
  private String privateKeyPath;

  @Value("${auth-server.publicKey}")
  private String publicKeyPath;
  
  private final MessageService messageService;
  private final UserService userService;

  public MessageIdentityService(MessageService messageService, UserService userService) {
    this.messageService = messageService;
    this.userService = userService;
  }
}
```
{% endcode %}

We'll then add some utilities for loading our keys from disk.

```java
private Key readKey(String filePath, boolean isPrivate) throws Exception {
  String keyString = Files.readString(Paths.get(filePath))
    .replaceAll("-----(BEGIN|END) (PUBLIC|PRIVATE) KEY-----", "")
    .replaceAll(System.lineSeparator(), "");

  byte[] keyBytes = Base64.decodeBase64(keyString);
  KeyFactory keyFactory = KeyFactory.getInstance("RSA");

  if (isPrivate) {
    return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(keyBytes));
  }
  return keyFactory.generatePublic(new X509EncodedKeySpec(keyBytes));
}

public RSAPrivateKey readPrivateKey(String filePath) throws Exception {
  return (RSAPrivateKey) readKey(filePath, true);
}

public RSAPublicKey readPublicKey(String filePath) throws Exception {
  return (RSAPublicKey) readKey(filePath, false);
}
```

Then we'll add a method to mint a JWT token. The contents of the token are arbitrary, but the recipient needs to understand the structure. We will be setting the user's email as the audience and the grant \(or permission scope\) to the subject.

```java
private String generateJwt(String username, String subject) throws Exception {
  RSAPrivateKey privateKey = readPrivateKey(privateKeyPath);
  RSAPublicKey publicKey = readPublicKey(publicKeyPath);
  Instant now = Instant.now();
  
  return JWT.create()
    .withIssuedAt(Date.from(now))
    .withExpiresAt(Date.from(now.plus(5L, ChronoUnit.MINUTES)))
    .withAudience(username)
    .withSubject(subject)
    .sign(Algorithm.RSA512(publicKey, privateKey));
}
```

Next, we'll add an endpoint to serve the public key. This will be used for resource servers to validate any tokens they receive.

```java
@GetMapping("/public-key")
public String getPublicKey() throws Exception {
  log.info("Public key retrieved");
  return Files.readString(Paths.get(publicKeyPath));
}
```

Finally, the core logic goes into the token request process. This method obtains the original message payload from Symphony and validates that the actual sender matches the request. It then goes ahead to extract the intent of the message - assuming that this is for command-based flows where the first non-@mention word is the intent. That word will be used as the grant. The user's email address and grant are then used to mint a JWT token and it is returned.

```java
@PostMapping("/token")
public String getToken(@RequestBody MessageIdentityRequest request) throws Exception {
  V4Message message = messageService.getMessage(request.getMessageId());
  List<UserV2> users = userService.listUsersByEmails(List.of(request.getUsername()));

  if (!message.getUser().getUserId().equals(users.get(0).getId())) {
    throw new ResponseStatusException(BAD_REQUEST, "Message did not originate from user");
  }

  String msgText = message.getMessage()
    .replaceAll("<[^>]*>", "");
  Pattern pattern = Pattern.compile("(?<=((^|\\s)/?))(?:(?!@)[^\\s])+(?=($|\\s))");
  Matcher matcher = pattern.matcher(msgText);

  if (!matcher.find()) {
    throw new ResponseStatusException(BAD_REQUEST, "Unable to determine subject");
  }

  String username = users.get(0).getEmailAddress();
  String subject = matcher.group(0);
  return generateJwt(username, subject);
}
```

## Create Resource Server <a id="create-resource-server"></a>

The resource server will be a standard Spring Boot web server, enabled with Spring Security and will have no knowledge of Symphony. Create an empty maven project and add these dependencies:

{% code title="pom.xml" %}
```markup
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.1</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>com.auth0</groupId>
        <artifactId>java-jwt</artifactId>
        <version>3.12.0</version>
    </dependency>
</dependencies>
```
{% endcode %}

## Configure Resource Server

Add an `application.yaml` to your resources root and add in the URI to obtain the public key on the Authorization Server we added earlier. We will also change the port to `8081` so that it can run concurrently with the Authorization Server that was left defaulted to `8080`.

{% code title="application.yaml" %}
```yaml
server:
  port: 8081

resource-server:
  publicKeyUri: http://localhost:8080/public-key
```
{% endcode %}

This project will use a standard Spring Boot main class as follows.

{% code title="ResourceServer.java" %}
```java
@SpringBootApplication
public class ResourceServer {
  public static void main(String[] args) {
    SpringApplication.run(ResourceServer.class, args);
  }
}
```
{% endcode %}

## Configure Spring Security

Next, add a Spring Security filter to pre-process incoming requests on the Resource Server. This filter first extracts the JWT token from the `Authorization` header, verifies the signature using the Authorization Server's public key, then adds the the user and grant to the security context's `Authentication` for use in controllers.

{% code title="JWTAuthorizationFilter.java" %}
```java
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
  private final Logger log = LoggerFactory.getLogger(this.getClass());
  public static final String HEADER_STRING = "Authorization";
  public static final String TOKEN_PREFIX = "Bearer ";
  public final RSAPublicKey publicKey;

  public JWTAuthorizationFilter(AuthenticationManager authManager, RSAPublicKey publicKey) {
    super(authManager);
    this.publicKey = publicKey;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
    log.info("Authorising");
    String token = req.getHeader(HEADER_STRING);

    try {
      if (token != null && token.startsWith(TOKEN_PREFIX)) {
        DecodedJWT jwt = JWT.require(Algorithm.RSA512(publicKey, null))
          .build()
          .verify(token.replace(TOKEN_PREFIX, ""));

        String subject = jwt.getSubject();
        String audience = jwt.getAudience().get(0);
        
        // In reality: check that this user exists

        log.info("Authorised: [{}] {}", audience, subject);

        SecurityContextHolder.getContext().setAuthentication(
          new UsernamePasswordAuthenticationToken(audience, subject, List.of()));
      }
      chain.doFilter(req, res);
    } catch (Exception e) {
      log.error("Authorisation failed");
    }
  }
}
```
{% endcode %}

This filter then needs to be added to the Spring Security configuration. Before that happens, the public key is fetched from the Authorization Server and loaded.

{% code title="SecurityConfig.java" %}
```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Value("${resource-server.publicKeyUri}")
  private String publicKeyUri;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Fetch public key from Authorization Server
    HttpRequest request = HttpRequest.newBuilder()
      .uri(new URI(publicKeyUri)).build();

    String response = HttpClient.newBuilder()
      .build().send(request, HttpResponse.BodyHandlers.ofString()).body();
    
    // Load public key
    String keyString = response
      .replaceAll("-----(BEGIN|END) PUBLIC KEY-----", "")
      .replaceAll(System.lineSeparator(), "");

    byte[] keyBytes = Base64.decodeBase64(keyString);
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    RSAPublicKey publicKey = (RSAPublicKey) keyFactory.generatePublic(new X509EncodedKeySpec(keyBytes));
    
    // Configure all endpoints to be authenticated
    // and use this auth filter in the chain
    http.authorizeRequests()
      .anyRequest().authenticated()
      .and()
      .addFilter(new JWTAuthorizationFilter(authenticationManager(), publicKey));
  }
}
```
{% endcode %}

## Add Resource Endpoint

Finally, the actual resource is served on a standard controller. This controller does a further check against the grant to ensure it aligns with the resource being requested.

{% code title="BalanceController.java" %}
```java
@RestController
public class BalanceController {
  @GetMapping("/api/balance")
  public long getBalance(UsernamePasswordAuthenticationToken token) {
    String grant = token.getCredentials().toString();
    if (grant.equals("/balance")) {
      // in reality: fetch the user's actual balance
      return (long) (Math.random() * 777);
    }
    else {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Incorrect grant");
    }
  }
}
```
{% endcode %}

## Create Bot

We are now ready to build the bot itself. This project is similar to the Authorization Server in that it uses BDK 2.0 with the Spring Boot integration, so repeat that process once more. We will add the `openfeign` project for calling our HTTP endpoints.

```markup
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.symphony.platformsolutions</groupId>
        <artifactId>symphony-bdk-core-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
        <version>3.0.0</version>
    </dependency>
</dependencies>
```

We will need to enable feign on the main class by adding the `@EnableFeignClients` annotation.

{% code title="Bot.java" %}
```java
@SpringBootApplication
@EnableFeignClients
public class Bot {
  public static void main(String[] args) {
    SpringApplication.run(Bot.class, args);
  }
}
```
{% endcode %}

### Configure Bot

Add the bot configuration itself and then the location of our Authorization and Resource servers.

{% code title="application.yaml" %}
```yaml
bdk:
  host: develop2.symphony.com
  bot:
    username: bot-username
    privateKey:
      path: bot/rsa/user-bot-private.pem

bot:
  auth-server-uri: http://localhost:8080
  resource-server-uri: http://localhost:8081

```
{% endcode %}

### Add HTTP Clients

Copy the [MessageIdentityRequest](integrating-a-bot-with-an-identity-provider.md#create-message-identity-request-object) class from the Authorization Server project into this project. Then, create 2 feign clients to communicate with the Authorization and Resource Server endpoints.

{% code title="MessageIdentityClient.java" %}
```java
@FeignClient(name = "MessageIdentityClient", url = "${bot.auth-server-uri}")
public interface MessageIdentityClient {
  @PostMapping("/token")
  String getToken(MessageIdentityRequest request);
}
```
{% endcode %}

{% code title="BalanceClient.java" %}
```java
@FeignClient(name = "BalanceClient", url = "${bot.resource-server-uri}")
public interface BalanceClient {
  @GetMapping("/api/balance")
  String getBalance(@RequestHeader("Authorization") String token);
}
```
{% endcode %}

### Add Command Handler

Finally, we'll add a command handler to receive a `/balance` command from the user. This will first request for a token from the Authorization Server, then use that token to request for the user's bank balance before returning that value in a message to the user.

{% code title="BalanceCommandHandler.java" %}
```java
@Component
public class BalanceCommandHandler {
  private final Logger log = LoggerFactory.getLogger(this.getClass());
  private final MessageService messageService;
  private final MessageIdentityClient messageIdentityClient;
  private final BalanceClient balanceClient;

  public BalanceCommandHandler(
    MessageService messageService,
    MessageIdentityClient messageIdentityClient,
    BalanceClient balanceClient
  ) {
    this.messageService = messageService;
    this.messageIdentityClient = messageIdentityClient;
    this.balanceClient = balanceClient;
  }

  @Slash(value = "/balance", mentionBot = false)
  public void showBalance(CommandContext context) {
    log.info("Balance requested");
    String messageId = context.getMessageId();
    String username = context.getInitiator().getUser().getEmail();

    try {
      // Get token from auth server
      MessageIdentityRequest request = new MessageIdentityRequest(messageId, username);
      String token = messageIdentityClient.getToken(request);

      // Fetch data from resource server
      String authToken = "Bearer " + token;
      String balance = balanceClient.getBalance(authToken);
      response = "Your balance is: $" + balance;
    } catch (Exception e) {
      response = "You are unauthorised to use this feature";
    }

    // Respond to user
    messageService.send(context.getStreamId(), response);
  }
}
```
{% endcode %}

## Result

Launch your project now and go to your Symphony pod, search for your bot and issue a `/balance` command. If your current user account is authorized by both the Authorization and Resource Servers, you will see an account balance message appear like on the left pane below. If not, you will observe the message on the right pane instead.

![](../../../.gitbook/assets/success%20%281%29.png)

### Source Code

The complete project source code for this tutorial can be found at the following repository.  
[https://github.com/SymphonyPlatformSolutions/symphony-sso-example](https://github.com/SymphonyPlatformSolutions/symphony-sso-example)

