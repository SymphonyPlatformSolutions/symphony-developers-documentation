# Bot Developer Kit for Java

{% hint style="info" %}
[BDK 3.0](https://symphony-bdk-java.finos.org/) has been released! The BDK 2.0 will stop being supported in **August 2024**. Please consider migrating to keep up with the latest features!&#x20;
{% endhint %}

## Overview

The BDK for Java is Symphony's preferred tooling for Java developers to build bots. It is a library of tools and API bindings that provides simplified configuration and authentication, intuitive message and room management, customizable message templating and an activities API that makes it easy to build bot workflows.

* The BDK for Java Github repo can be found here: [@finos/symphony-bdk-java](https://github.com/finos/symphony-bdk-java)
* The BDK for Java Certification course can be found here: [learn.symphony.com/bundles/java-bot-developer](https://learn.symphony.com/bundles/java-bot-developer)

## Getting Started

{% content-ref url="../../bots/getting-started/bdk.md" %}
[bdk.md](../../bots/getting-started/bdk.md)
{% endcontent-ref %}

## Authentication

Once you have your bot and Symphony environment properly configured, the generated code provides an out-of-the-box implementation for authenticating your bot:

{% tabs %}
{% tab title="BotApplication.java" %}
<pre class="language-java"><code class="lang-java"><strong>SymphonyBdk bdk = new SymphonyBdk(loadFromClasspath("/config.yaml"));
</strong></code></pre>
{% endtab %}
{% endtabs %}

By instantiating a new `SymphonyBdk` instance with your `config.yaml` file, the BDK loads in your config and authenticates your bot. Once authenticated, your bot is ready to leverage the REST APIs in order to create rich automations and workflows on Symphony.

{% hint style="info" %}
Note: You must have a corresponding service or bot account setup on your Symphony instance before authenticating. For more information navigate to the [Creating a Bot User](../../bots/getting-started/creating-a-bot-user.md) guide.
{% endhint %}

### OBO Authentication

BDK for Java also supports the OBO (On-Behalf-Of) pattern of authentication, allowing an authenticated bot + extension application to perform operations on behalf of a given user. The BDK's implementation makes it easy to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs with other users
* Send messages and attachments
* Set the context user's own presence

{% hint style="info" %}
Please follow our '**Getting Started with OBO**' guide using the link [here](https://docs.developers.symphony.com/building-extension-applications-on-symphony/app-authentication/obo-authentication#getting-started).\
\
The guide will cover all of the prerequisites needed for OBO and how to enable & upload the OBO extension application, the required permissions and how to ensure the OBO authentication process will work successfully.
{% endhint %}

To leverage an OBO based workflow, simply instantiate an OBO Session in your bot project. The BDK allows you to instantiate your OBO session from a username or user ID. Once authenticated bots can perform any of the OBO workflows listed above:

```java
 // setup SymphonyBdk facade object
 final SymphonyBdk bdk = new SymphonyBdk(loadFromSymphonyDir("config.yaml"));

 //authenticate on-behalf-of a given user
 final AuthSession oboSessionUsername = bdk.obo("user.name");
 final AuthSession oboSessionUserId = bdk.obo(123456789L);

 // list streams OBO user "user.name"
 bdk.streams().listStreams(oboSessionUsername, new StreamFilter());
```

## Managing Multiple Bots

BDK for Java makes it easy to manage multiple bot instances within a single project. As long as you have unique configuration files that correspond to different service accounts, you can manage multiple bot instances from a centralized source. To do so, simply instantiate multiple bot instances of the `SymphonyBDK` class within your bot project:

```java
// Bot #1
final SymphonyBdk bot1 = new SymphonyBdk(loadFromClasspath("/config_1.yaml"));

//Bot #2
final SymphonyBdk bot2 = new SymphonyBdk(loadFromClasspath("/config_2.yaml"));
```

## Datafeed Management

The BDK also provides a `DatafeedService` interface that makes it easier than ever for bots to manage real-time messages and events. The `DatafeedService` interface provides the following methods for your bot to use:

| Method                               | Descriptions                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `start()`                            | Start the bot's datafeed                                                                                   |
| `stop()`                             | Stop the bot's datafeed                                                                                    |
| `subscribe(RealTimeEventListener)`   | Subscribe a custom event listener class.  Inside this class is where the bulk of your business logic goes. |
| `unsubscribe(RealTimeEventListener)` | Unsubscribe from a custom event listener class.                                                            |

For bots to listen to incoming events and messages, bots must subscribe to a custom `RealTimeEventListener`. This `RealTimeEventListener` class must implement eventType methods (e.g. `onMessageSent()`) along with custom business logic inside.

When a user sends a bot a message, the bot will pick up the event from the datafeed and check to see if an implemented eventType method matches the eventType (`MESSAGESENT`) of the inbound event. If there is a corresponding eventType method registered, the bot will execute the business logic inside of this eventType method. Otherwise the bot will not perform an action and will continue to listen for inbound events from the datafeed.  An example implementation is provided out of the box by the BDK:

{% tabs %}
{% tab title="BotApplication.java" %}
```java
 // subscribe to "onMessageSent" real-time event
    bdk.datafeed().subscribe(new RealTimeEventListener() {

      @Override
      public void onMessageSent(V4Initiator initiator, V4MessageSent event) {
        // on a message sent, the bot replies with "Hello, {User Display Name}!"
        bdk.messages().send(event.getMessage().getStream(), "<messageML>Hello, " + initiator.getUser().getDisplayName() + "!</messageML>");
      }
    });
```
{% endtab %}
{% endtabs %}

Below is a full list of methods provided by the `RealTimeEventListener` class and their corresponding eventTypes. Implement the following methods in order to listen for a given Symphony event:

| Method                           | Event Type                 |
| -------------------------------- | -------------------------- |
| `onMessageSent()`                | MESSAGESENT                |
| `onInstantMessageCreated()`      | INSTANTMESSAGECREATED      |
| `onMessageSuppressed()`          | MESSAGESUPPRESSED          |
| `onRoomCreated()`                | ROOMCREATED                |
| `onRoomUpdated()`                | ROOMUPDATED                |
| `onRoomDeactivated()`            | ROOMDEACTIVATED            |
| `onRoomReactivated()`            | ROOMACTIVATED              |
| `onUserRequestedToJoinRoom()`    | USERREQUESTEDTOJOINROOM    |
| `onUserJoinedRoom()`             | USERJOINEDROOM             |
| `onUserLeftRoom()`               | USERLEFTROOM               |
| `onRoomMemberPromotedToOwner()`  | ROOMMEMBERPROMOTEDTOOWNER  |
| `onRoomMemberDemotedFromOwner()` | ROOMMEMBERDEMOTEDFROMOWNER |
| `onConnectionRequested()`        | CONNECTIONREQUESTED        |
| `onConnectionAccepted()`         | CONNECTIONACCEPTED         |
| `onSymphonyElementsAction()`     | SYMPHONYELEMENTSACTION     |
| `onSharedPost()`                 | SHAREDPOST                 |

For more information on the Symphony datafeed continue here:

{% content-ref url="../../bots/datafeed/" %}
[datafeed](../../bots/datafeed/)
{% endcontent-ref %}

## Orchestrating Workflows with BDK for Java

A Symphony workflow can be thought of as a sequence of operations or a repeatable pattern of activities that are organized together in order to transform data, provide a service, or process information. Each of these operations or activities may be completed by a single user, shared between a bot and a user, or shared between multiple actors including bots, users, and even third party systems.

By providing an intuitive Activities API, the BDK makes it simple to define a set of discrete operations or activities for different actors in your system to execute. Ultimately, these activities constitute the building blocks for a powerful Symphony workflow automation.

Once you have defined a discrete set of activities for different actors in your system to execute, the next step is to organize them together in an intelligent way.  The BDK provides a powerful Workflow API (coming soon) that makes it easy to organize a sequence of activities together, and subsequently orchestrate a Symphony workflow.

## Activities API

BDK for Java provides an Activities API, an interface that makes it easy to manage user-to-bot interactions or activities. Specifically, the Activities API provides easy access to message and room context, initiator metadata, and an intuitive way to interact with the datafeed, making it easy for bots to listen and reply to different Symphony events. The methods and logic provided by the Activities API allows for granular control over the entire user-to-bot interaction. This encapsulated logic is easily reused, forming the discrete building blocks of a Symphony workflow automation.

### Registering Activities

In order to register activities for your bot instance, you must leverage the `ActivityRegistry` class:

```java
public static void main(String[] args) throws Exception {
    // Create BDK entry point
    final SymphonyBdk bdk = new SymphonyBdk(loadFromSymphonyDir("config.yaml"));
    // Access to the registry for activities
    final ActivityRegistry registry = bdk.activities();
  }
```

There are two different types of activities supported by the BDK:

* **Command Activity**: an activity triggered when a message is sent in an IM or Chatroom.
* **Form Activity**: an activity triggered when a user replies to an Elements form message. &#x20;

### Command Activities

A command-based activity is triggered when a message is sent in an IM or Chatroom. Using the Activities API allows developers to register commands in the following formats:

* `@bot/buy` (Slash command _with_ a bot @mention)

{% tabs %}
{% tab title="@bot /hello" %}
```java
bdk.activities().register(slash("/hello", true, context -> {
  String message = "Hello " + context.getInitiator().getUser().getDisplayName();
  bdk.messages().send(context.getStreamId(), message);
}));
```
{% endtab %}
{% endtabs %}

* `/buy 1000 $goog` (Slash command _without_ a bot @mention)

{% tabs %}
{% tab title="/buy 1000 $goog" %}
```java
bdk.activities().register(slash("/buy {quantity} {$ticker}", false, context -> {
  Arguments arguments = context.getArguments();
  String quantity = arguments.getString("quantity");
  String ticker = arguments.getAsString("ticker").substring(1);
  String message = "Buy " + quantity + " of <cash tag=\"" + ticker + "\" />";
  bdk.messages().send(context.getStreamId(), message);
}));
```
{% endtab %}
{% endtabs %}

* Listen for the word `hello` (Not a Slash command  - just listen for messages containing a specific word)

{% tabs %}
{% tab title="'hello'" %}
```java
bdk.activities().register(new CommandActivity<>() {
  protected ActivityMatcher<CommandContext> matcher() throws EventException {
    return c -> c.getTextContent().contains("hello");
  }
  
  protected void onActivity(CommandContext context) throws EventException {
    bdk.messages().send(context.getStreamId(), "Hello!");
  }
  
  protected ActivityInfo info() {
    return new ActivityInfo().name("Hello Command");
  }
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note: If you choose to create your own `CommandActivity` class, you must implement the `matcher()` and `onActivity()` methods provided by the `AbstractActivity` class. For more information on the implementation of the `CommandActivity` class, continue [here](https://symphony-bdk-java.finos.org/activity-api.html#how-to-create-a-command-activity).
{% endhint %}

### Form Activities

The Activities API also makes it easy for Bots to listen for elements form submissions. Assume the following elements form has been posted into a room with the following attributes:

* form `id` = "hello-form"
* `<text-field>` name = "name"
* form contains an action button

```markup
<h2>Hello Form</h2>
<form id="hello-form">
  <text-field name="name" placeholder="Enter a name here..." />
  <button name="submit" type="action">Submit</button>
</form>
```

In order to register a form activity or listen for an incoming elements form submission, bots must register a class that extends the `FormReplyActivity` class:

```java
bdk.activities().register(new FormReplyActivity<>() {
  protected ActivityMatcher<FormReplyContext> matcher() throws EventException {
    return c -> c.getFormId().equals("hello-form");
  }

  protected void onActivity(FormReplyContext context) throws EventException {
    final String message = "Hello, " + context.getFormValue("name");
    bdk.messages().send(context.getStreamId(), message);
  }

  protected ActivityInfo info() {
    return new ActivityInfo().name("Hello Form");
  }
});
```

{% hint style="info" %}
Note: If you wish to create your own `FormReplyActivity` class, you must implement the methods `matcher()`, `onActivity()` and `info()` methods provided by the `AbstractActivity` class.  For more information on the implementation for the `FormReplyActivity` class, continue [here](https://symphony-bdk-java.finos.org/activity-api.html#how-to-create-a-form-activity).
{% endhint %}

As shown above, the Activities API makes it simple to manage incoming commands, elements form submissions, and access message context making it easy to manage bot-user interactions and create custom workflows.

## User, Message & Room Management

As shown above, the BDK makes it easy to create a datafeed and listen for events through the `RealTimeEventListener` class. In addition, this class makes it easy to access user, message, and room data in context. Each eventType method is implemented with instances of `V4Initiator` and `V4MessageSent` objects:

```java
public void onMessageSent(V4Initiator initiator, V4MessageSent event)
```

Use the `V4Initiator` class methods to access the the user data in context:

| Method                                 | User Attribute |
| -------------------------------------- | -------------- |
| `initiator.getUser().getUserId()`      | User ID        |
| `initiator.getUser().getFirstName()`   | First Name     |
| `initiator.getUser().getLastName()`    | Last Name      |
| `initiator.getUser().getDisplayName()` | Display Name   |
| `initiator.getUser().getEmail()`       | Email          |
| `initiator.getUser().getUsername()`    | Username       |

Use the `V4MessageSent` class methods to access message data in context:

| Method                                  | Attribute           |
| --------------------------------------- | ------------------- |
| `event.getMessage().getMessageId()`     | Message ID          |
| `event.getMessage().getTimestamp()`     | Message Timestamp   |
| `event.getMessage().getMessage()`       | Message Text        |
| `event.getMessage().getSharedMessage()` | Shared Message      |
| `event.getMessage().getData()`          | Message Data        |
| `event.getMessage().getAttachments()`   | Message Attachments |

Use the `V4MessageSent` class methods to access stream data in context:

| Method                                           | Attribute    |
| ------------------------------------------------ | ------------ |
| `event.getMessage().getStream().getStreamId()`   | Stream ID    |
| `event.getMessage().getStream().getStreamType()` | Stream Type  |
| `event.getMessage().getStream().getRoomName()`   | Room Name    |
| `event.getMessage().getStream().getMembers()`    | Room Members |
| `event.getMessage().getStream().getExternal()`   | External     |
| `event.getMessage().getStream().getCrossPod()`   | Cross Pod    |

### Managing Context through Activities API

The Activities API also makes it easy to access relevant user, message, and stream data in context. `CommandActivity` classes have access to to this data through the `CommandContext` class. This class is instantiated with instances of `V4Initiator` and `V4MessageSent` objects. Bots are able access to the user, message, and stream data in context through the same methods shown above. Leverage these methods within the `onActivity()` method shown below:

```java
@Override
protected void onActivity(CommandContext context) {
  log.info("Hello command triggered by user {}", context.getInitiator().getUser().getDisplayName()); // (2)
}
```

FormActivity classes have access to relevant user, form, and stream data through the `FormReplyContext` class. This class is instantiated with instances of the `V4Initiator` and `V4SymphonyElementsAction` class. The `V4SymphonyElementsAction` class provides the following methods to access form data in context:

<table data-header-hidden><thead><tr><th width="188">Method</th><th>Attribute</th></tr></thead><tbody><tr><td>Method</td><td>Attribute</td></tr><tr><td><code>context.getSourceEvent().getStream()</code></td><td>Elements Stream ID</td></tr><tr><td><code>context.getSourceEvent().getFormMessageId()</code></td><td>Elements Message ID</td></tr><tr><td><code>context.getSourceEvent().getFormId()</code></td><td>Elements Form ID</td></tr><tr><td><code>context.getSourceEvent().getFormValues()</code></td><td>Elements Form Values</td></tr></tbody></table>

```java
@Override
  protected void onActivity(FormReplyContext context) {
    final String message = "You entered " + context.SourceEvnent().getFormValues() + ".";
    this.messageService.send(context.getSourceEvent().getStream(), "<messageML>" + message + "</messageML>");
  }
```

## Message Templating

The BDK for Java also supports custom and built in message templating. The BDK is agnostic to what templating library developers choose, with built-in support for FreeMarker and Handlebars. In order to use message templating, you must leverage the `TemplateEngine` class provided by the BDK.

```java
String message = bdk.messages().templates()
    .newTemplateFromString("Hello ${value}")
    .process(Map.of("value", "World"));
bdk.messages().send(context.getStreamId(), message);
```

If you wish to build your own custom message template, you must implement one of the `newTemplate()` methods provided by the `TemplateEngine` class:

* `newTemplateFromFile()`
* `newTemplateFromClasspath()`
* `newTemplateFromString()`

The following shows an implementation of the `newTemplateFromClasspath()` method:

```java
String message = bdk.messages().templates()
    .newTemplateFromClasspath("hello.ftl")
    .process(Map.of("value", "World"));
bdk.messages().send(context.getStreamId(), message);
```

The corresponding FreeMarker template should be stored in the classpath root i.e. `src/main/resources/hello.ftl`

{% tabs %}
{% tab title="hello.ftl" %}
```markup
Hello ${value}
```
{% endtab %}
{% endtabs %}

## Spring Boot Integration

The BDK for Java's Spring Boot integration provides native annotations, making it easy to configure your bot's datafeed listeners and register command activities. Start with a standard Spring Boot main class.

```java
@SpringBootApplication
public class BotApplication {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### @Component

Now you can create a component for bot applications by annotating classes with the `@Component` annotation:

```java
@Component
public class HelloCommand {
  @Autowired
  private MessageService messages;

  @EventListener
  public void onMessageSent(RealTimeEvent<? extends V4MessageSent> event) {
    messages.send(event.getSource().getMessage().getStream(), "Hello!");
  }
}
```

### @EventListener

The Core Starter uses [Spring Events](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/ApplicationEventPublisher.html) to deliver Real Time Events.

You can subscribe to any Real Time Event from anywhere in your application by creating a handler method with two conditions:

* Be annotated with [@EventListener](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/event/EventListener.html)
* Have a `com.symphony.bdk.spring.events.RealTimeEvent<? extends T>` parameter

```java
@Slf4j
@Component
public class RealTimeEventsDemo {
  @EventListener
  public void onMessageSent(RealTimeEvent<? extends V4MessageSent> event) {
    log.info(event.toString());
  }

  @EventListener
  public void onUserJoined(RealTimeEvent<? extends V4UserJoinedRoom> event) {
    log.info(event.toString());
  }

  @EventListener
  public void onUserLeft(RealTimeEvent<? extends V4UserLeftRoom> event) {
    log.info(event.toString());
  }
}
```

### @Slash

You can easily register a slash command using the `@Slash` annotation. Note that the `CommandContext` is mandatory to successfully register your command. If not defined, a `warn` message will appear in your application log:

```java
@Component
public class SlashHello {

  @Slash("/hello")
  public void onHello(CommandContext commandContext) {
    log.info("On /hello command");
  }

  @Slash(value="/hello", mentionBot=false)
  public void onHelloNoMention(CommandContext commandContext) {
    log.info("On /hello command (bot has not been mentioned)");
  }
}
```

### Activities

Any service or component class that extends `FormReplyActivity` or `CommandActivity` will be automatically registered within the `ActivityRegistry`

```java
@Slf4j
@Component
public class GifFormActivity extends FormReplyActivity<FormReplyContext> {
  @Autowired
  private MessageService messageService;

  @Slash("/gif")
  public void displayGifForm(CommandContext context) throws TemplateException {
    this.messageService.send(context.getStreamId(), "/templates/gif.ftl", emptyMap());
  }
  
  public ActivityMatcher<FormReplyContext> matcher() {
    return context -> "gif-category-form".equals(context.getFormId())
        && "submit".equals(context.getFormValue("action"))
        && StringUtils.isNotEmpty(context.getFormValue("category"));
  }
  
  public void onActivity(FormReplyContext context) {
    log.info("Gif category is \"{}\"", context.getFormValue("category"));
  }

  protected ActivityInfo info() {
    return new ActivityInfo().type(ActivityType.FORM)
        .name("Gif Display category form command")
        .description("Form handler for the Gif Category form");
  }
}
```
