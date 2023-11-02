# Circle of Trust Authentication

Application authentication establishes bidirectional trust between an application and the Symphony client.

This process must be used by enterprise or partner app developers who wants to:

* Create a secure connection between an app and Symphony
* Access user identity information from the app

{% hint style="info" %}
### Partner apps

Partner applications need to implement a clear process to inform and ensure that their customers have approved that users' identities will be communicated by Symphony to the partner application. Please contact the Symphony Partner team for more details.
{% endhint %}

Because apps run as iframes within the Symphony client and interact with the client via JavaScript, creating a secure connection requires interaction between an app's backend and Symphony's backend.

Backend trust is established using a JWT signed by a RSA key, as you can see in the [RSA Authentication endpoint](https://developers.symphony.com/restapi/reference/application-rsa-authentication).

{% hint style="info" %}
In the past, apps could use Client Certificates to authenticate. This is not the case anymore, and only RSA is supported.
{% endhint %}

## Application Authentication Sequence

This section outlines the full app authentication sequence, covering operations that take place on the app side and the Symphony side. &#x20;

{% hint style="info" %}
Although the sequence below looks intimidating, many of the steps are completed on the Symphony side and are included for informational purposes only.
{% endhint %}

The following diagram shows the trust relationships developed through the application authentication flow.

The flow utilizes two tokens, Ta and Ts, which are generated by the app and Symphony backends after the servers mutually authenticate each other using certificates. A circle of trust is established by passing the tokens in opposite directions so that each backend server receives matching tokens via two separate paths.

![Figure 1: Circle of Trust](https://files.readme.io/066ea41-b4092ce-Circle\_of\_trust.png)

The diagram below shows the interaction between the actors in the Application Authentication flow (the app frontend and backend, the Symphony frontend and backend). This flow starts after the user has logged into the Symphony client (establishing the identity of the user and trust between the Symphony client and backend). The flow begins after the user loads the partner application.

![Figure 2: Trust Sequence](<../../.gitbook/assets/image (11).png>)

| Step | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | App frontend requests Symphony frontend for pod ID via the Extension API `SYMPHONY.remote.hello()` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2    | Symphony frontend returns the pod ID to the app frontend.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 3    | App frontend sends request to its backend to initiate app backend to Symphony backend authentication, passing the pod ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 4    | App backend looks up the pod URL for backend authentication based on the pod ID. This step is only required for partners whose apps will be used by multiple customers. Enterprise developers will already know their pod URL.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 5    | App backend generates an app token (Ta).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 6    | App backend requests Symphony backend authentication using a public RSA key for the app, supplying Ta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 7    | Symphony backend generates a Symphony token (Ts).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 8    | <p>Symphony backend stores the (Ta, Ts) token pair for future validation.</p><p><strong>At this point, trust has been established between the Symphony and app backends.</strong></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 9    | Symphony backend returns Ts to app backend.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 10   | App backend stores the (Ta, Ts) token pair for future validation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 11   | <p>App backend provides Ta to app frontend.</p><p>Ta is beginning the counter-clockwise journey around the the circle of trust.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 12   | <p>App frontend registers app with Symphony frontend, passing appId and Ta.</p><p>Ta continues its journey.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 13   | Symphony frontend passes Ta to Symphony backend.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 14   | <p>Symphony backend validates Ta, verifying it matches the Ta of a stored token pair.</p><p>At this point, Ta has come full circle -- the Symphony backend initially received it securely from the app backend and has now received it from the app backend again, via the app and Symphony frontends.</p>                                                                                                                                                                                                                                                                                                                                                                        |
| 15   | <p>Symphony backend passes Ts back to the Symphony frontend, along with the signed user identity JWT, which will be asked for later.</p><p>For more details on the JWT, see the section on <a href="./#5-obtain-user-identity">Obtaining User Identity</a>.</p><p>At this point, the Symphony frontend trusts that the app is valid (i.e. the app server can be trusted). Because Symphony trusts the app, Symphony will be able to return protected content, like user identity information. However, the app must now trust Symphony itself in order to trust the information that is returned.</p><p>Ts is beginning the clockwise journey around the the circle of trust.</p> |
| 16   | <p>As a response to app registration (Step 12), Symphony frontend will return Ts.</p><p>Ts continues its journey.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 17   | App frontend should pass Ts to app backend for validation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 18   | <p>App backend should validate Ts against the previously stored token pair.</p><p>For more details on this, see the section on <a href="./#4-validate-tokens-returned-by-symphony-frontend">Validating Tokens</a>.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 19   | <p>App backend should return a confirmation (or denial) to the app frontend.</p><p>At this point, the app frontend trusts that Symphony is valid and can trust the information returned by Symphony. The app can now request user identity information from Symphony and trust the response.</p>                                                                                                                                                                                                                                                                                                                                                                                  |
| 20   | App frontend can request the user identity information by calling the `getJWT()` method on the `extended-user-info` service.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 21   | <p>Symphony frontend returns the JWT which includes user identity information.</p><p>For more details on the JWT, see the section on <a href="./#5-obtain-user-identity">Obtaining User Identity</a>.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 22   | <p>App frontend passes the JWT to app backend for verification.</p><p>The JWT is signed by the Symphony backend to ensure that it is not tampered with. The signature can be verified using publicly available certificate on the Symphony pod.</p>                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 23   | App backend requests the public app certificate used to sign the JWT from the Symphony backend.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 24   | Symphony backend returns the certificate in PEM format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 25   | App backend verifies the JWT using the obtained certificate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 26   | App backend can authenticate the user using the JWT contents. The implementation details of this are up to the developer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 27   | <p>App backend returns confirmation to app frontend.</p><p>At this point, the app fully trusts the Symphony user.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## App Developer Prerequisites

### Prerequisites for Authentication

You will need an RSA key pair. The public/private key pair for signing authentication requests requires the following:

• An RSA512 algorithm with a key length of 4096 bits.\
• An X.509 format for public keys and PKCS#1 or PKCS#8 for private keys.\
• PEM-encoded keys.

Generate a valid key pair by running the following `generate_rsa_keys.sh` script:Shell

```bash
#!/usr/bin/env bash
if [ $# -eq 0 ]
  then
    echo "Please inform a prefix for the keys. Optionally, inform as your second parameter the bit length to be used by your key generator"
    exit 1
fi
cert_prefix=$1
if [ $# -eq 2 ] 
  then
    bitlength=$2
else
    bitlength=4096
fi

mkdir $cert_prefix
cd $cert_prefix

openssl genrsa -out "${cert_prefix}_privatekey.pem" $bitlength
openssl req -newkey rsa:$bitlength -x509 -key "${cert_prefix}_privatekey.pem" -out "${cert_prefix}_publickey.cer"
openssl pkcs8 -topk8 -nocrypt -in "${cert_prefix}_privatekey.pem" -out "${cert_prefix}_privatekey.pkcs8"
openssl x509 -pubkey -noout -in "${cert_prefix}_publickey.cer"  > "${cert_prefix}_publickey.pem"

echo "Keys created in the folder: $(pwd)"
```

**Note**: The script requires the `openssl` package.

Generate the PKCS#1 keys manually using the following commands:Shell

```bash
openssl genrsa -out mykey.pem 4096
openssl rsa -in mykey.pem -pubout -out pubkey.pem
```

Generate the PKCS#8 keys manually using the following commands. Provide your username as the Common Name (CN).Shell

```
openssl genrsa -out privatekey.pem 4096
openssl req -newkey rsa:4096 -x509 -key privatekey.pem -out publickey.cer
openssl pkcs8 -topk8 -nocrypt -in privatekey.pem -out privatekey.pkcs8
openssl x509 -pubkey -noout -in publickey.cer > publickey.pem
```

The file publickey.pem is the public key. Import this into the pod.

Sign the authentication request using either privatekey.pkcs8 or privatekey.pem, depending on the support available in the JWT library.

### JSON Web Tokens

You should familiarize yourself with [JSON Web Tokens](https://jwt.io/) (JWT) which are the format used for passing user identity information from Symphony to your app.

Your app will need to implement verification of the JWT shared by Symphony.

## App Developer Implementation

Partner and enterprise app developers will need to implement the following sequence within their app on the frontend and backend:

Upon completion of this process, your app will know it is interacting with a valid Symphony client and can trust any user identity information it obtains from Symphony.

## 1. Identify the Symphony Pod

You will identify the Symphony pod against which to authenticate from the existing Extension API [SYMPHONY.remote.hello()](../overview-of-extension-api/initialization.md#symphony-remote-hello) method.JavaScript

```
SYMPHONY.remote.hello().then(function(data){
    var pod = data.pod;
});
```

The pod ID will be useful to partner developers in building a mapping of customers to auth URL. As described in the Prerequisites section above, partners can receive the customer's auth URL through the callback.

If you are an enterprise developer building an internal custom app, you will not need to use the pod ID, since you will always use your own auth URL.

## 2. Initiate Backend Authentication

Once you have identified the pod where your app is being run on, you will initiate the app authentication flow. You will use the auth URL previously obtained and a JWT signed by your app RSA key. The endpoint to be used is as follows

{% swagger method="post" path=" " baseUrl="https://<host>:<port>/login/v1/pubkey/app/authenticate/extensionApp" summary="RSA App Authenticate" %}
{% swagger-description %}
Authenticate your Extension App with an App Token
{% endswagger-description %}

{% swagger-parameter in="body" name="appToken" required="true" %}
Token generated by the application.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="authToken" required="true" %}
A JWT containing the caller's username and an expiration date, signed by the caller's private key.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```
{
  "appId": "appId",
  "appToken": "Ta",
  "symphonyToken": "Ts",
  "expireAt": "<Unix Timestamp in milliseconds of Symphony token expiration>"
}
```
{% endswagger-response %}
{% endswagger %}

In addition to specifying the JWT during this call, your app backend must generate an app token (Ta) to pass in the POST body parameters of the request. The app token must be a unique string for each authentication request. The token is opaque to Symphony.

In the response, Symphony will return back the appId, the previously presented app token, as well as a Symphony-generated token (Ts). The Symphony token is short-lived and will expire within five minutes.

```javascript
{
  "appId": "appId",
  "appToken": "Ta",
  "symphonyToken": "Ts",
  "expireAt": "<Unix Timestamp in milliseconds of Symphony token expiration>"
}
```

Your app backend should store this token pair as they will be used for subsequent validation steps in the authentication process.

## 3. Register your App

You should now register your app using not just your `appId`, but an object containing both your `appId` and `tokenA`.

The [SYMPHONY.application.register](../overview-of-extension-api/register-and-connect.md#symphony-application-register) method will now accept either an `appId` string or `appData` object.JavaScript

```
// appData is an object: {appId: appId, tokenA: data}

SYMPHONY.application.register(
  appData,
  ["modules", "applications-nav", "ui", "extended-user-info"],
  ["authexample:controller"]
)
  .then(validate)
  .then(function(response) {
  //...
}));
```

`SYMPHONY.application.register` will now return a promise that will be fulfilled with an object containing the members `appId` (your appId) and `tokenS` (the Symphony token).

## Validate Tokens returned by Symphony Frontend

Once your app has registered, your app will need to validate the Symphony token that was passed to you through the frontend against the Symphony token you previously obtained through the Symphony backend.

The validation implementation is up to you. The implementation in the sample application provided by Symphony assumes a stateless app backend. The app frontend sends both the app and Symphony tokens back and verifies that the pair exists in the token cache. (If the partner app and server maintained a sticky session, you could pass back only the Symphony token since the app token would already have been saved in the session.)

Once the token pair match has been found, your application knows that it is interacting with a valid Symphony client.

## Obtaining User Identity

User identity information can be obtained through the `getJwt()` method on the `extended-user-info` service.

## getJwt()

Returns identity information for the user in context in the form of a [JSON web token](https://jwt.io/) (JWT). The JWT has been signed by the private key of the pod and can be verified using the pod's public key.

Note that this method will only return user identity information if Steps 1-15 of the application authentication sequence have been completed (i.e. Symphony frontend trusts app frontend). If not completed, then the JWT will only contain userReferenceId, an anonymous identifier for the user.

{% hint style="info" %}
Currently, calling getJwt() without having completed the application authentication sequence will return Undefined. We will be addressing this in an upcoming release so that userReferenceId will correctly be returned if application authentication has not been completed. In the interim, userReferenceId can still be obtained from the [Register and Connect](../overview-of-extension-api/register-and-connect.md) methods.
{% endhint %}

```javascript
function getJwt()
```

The JWT will be returned as a base-64 encoded string, with the following format when it is decoded:

```javascript
{
    "aud" : "<id of app>",
    "iss" : "Symphony Communication Services LLC.",
    "sub" : "<Symphony user ID>",
    "exp" : "<expiration date in millis>",
    "user" : {
        "id" : "<Symphony user ID>",
        "emailAddress" : "<email address>",
        "username" : "<email address>",
        "firstName" : "<first name>",
        "lastName" : "<last name>",
        "displayName" : "<display name>",
        "title" : "<title>",
        "company" : "<company>",
        "companyId" : "<company (pod) ID>",
        "location" : "<location>",
        "avatarUrl" : "<URL for user's avatar>",
        "avatarSmallUrl" : "<URL for user's small avatar>"
    }
}
```

## Verifying, Decoding and Using the JWT

Your app backend can validate the authenticity of the JWT returned by Symphony's frontend using the public certificate that was used to sign the JWT. The following endpoint can be used to obtain the certificate:

{% tabs %}
{% tab title="GET" %}
```
https://<host>/pod/v1/podcert
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="200 - Response OK" %}
```javascript
{
    "certificate": "<public certificate in PEM format>" // String
}
```
{% endtab %}
{% endtabs %}

Using this certificate, you can verify that the JWT has not been tampered with. The signing algorithm is RS512. You should check that the algorithm specified in the header reflects this to protect against some known exploits of JWTs. The JWT can be decoded on the backend to obtain the user's identity. The decoded JWT will have the following format:

{% tabs %}
{% tab title="JWT" %}
```javascript
{
    "aud" : "<id of app>",
    "iss" : "Symphony Communication Services LLC.",
    "sub" : "<Symphony user ID>",
    "exp" : "<expiration date in millis>",
    "user" : {
        "id" : "<Symphony user ID>",
        "emailAddress" : "<email address>",
        "username" : "<email address>",
        "firstName" : "<first name>",
        "lastName" : "<last name>",
        "displayName" : "<display name>",
        "title" : "<title>",
        "company" : "<company>",
        "companyId" : "<company (pod) ID>",
        "location" : "<location>",
        "avatarUrl" : "<URL for user's avatar>",
        "avatarSmallUrl" : "<URL for user's small avatar>"
    }
}
```
{% endtab %}
{% endtabs %}

This information can then be used by to authenticate the user on the app backend.

#### To learn more about authenticating on behalf of a user, continue here:

{% content-ref url="obo-authentication.md" %}
[obo-authentication.md](obo-authentication.md)
{% endcontent-ref %}

## FAQs

### Do I need to implement application authentication?

It depends.

If you are a partner developing a premium app for Symphony and want to know user identity information, you will need to implement application authentication. For example, you may need user identity information in your app if you have entitlements or access control maintained outside of Symphony that that is tied to a user's email address.

However, if you are simply looking for a unique identifier that will allow you to map user preferences, you can do this without app authentication - by using the anonymous userReferenceId provided by Symphony.

### Why isn't Symphony using OAuth or SAML?

The architecture of apps built using Symphony's Extension API poses a unique challenge. These apps run as iframes within the Symphony client and interact with the client via JavaScript. Before Symphony can share any user identity information with the app, Symphony must be certain that the app is a verified partner application. The partner application also must be certain that the user identity information is coming from Symphony, which isn't obvious with the insecure iframe model. Mechanisms like OAuth and SAML do not establish this bidirectional trust in a way that would make this possible. While getting user identity via oAuth or SAML provides a way to securely identify the user, this does not address the lack of trust between the app and Symphony frontends.

### I am a partner developer building and testing my app using developer mode in the browser. Can I test this flow?

Yes, you can test app authentication using developer mode, so long as there is a certificate that has been imported and trusted on your pod that matches the appId in your bundle file.