# BDK 2.0 for Python

### Summary

* [Description](bdk-2.0-for-python.md#description)
* [Installation](bdk-2.0-for-python.md#installation)
* [Configuration](bdk-2.0-for-python.md#configuration)
* [Authentication](bdk-2.0-for-python.md#authentication)
* [Datafeed Management](bdk-2.0-for-python.md#datafeed-management)
* [Orchestrating Workflows](bdk-2.0-for-python.md#orchestrating-workflows-with-bdk-2.0-for-python)
* [Managing Multiple Bots](bdk-2.0-for-python.md#managing-multiple-bots)
* [Activities API](bdk-2.0-for-python.md#activities-api)
* [User, Message, & Room Management](bdk-2.0-for-python.md#user-message-and-room-management)
* [Message Templating](bdk-2.0-for-python.md#message-templating)

### Description

The BDK 2.0 for Python is our latest version of the Symphony Bot Developer Kit for Python Developers.  It's a library of tools and intelligent API bindings that provides an ultra simplified configuration and authentication setup, intuitive message and room management, customizable message templating, and a new activities API that makes it easy to facilitate bot workflows. Continue here to learn how BDK 2.0 for Python can help power your Symphony bots and integrations today!

* The BDK 2.0 for Python Github repo can be found here: [https://github.com/finos/symphony-bdk-python](https://github.com/finos/symphony-bdk-python)
* The BDK 2.0 for Python Certification course can be found here: [https://learn.symphony.com/bundles/python-bot-developer](https://learn.symphony.com/bundles/python-bot-developer)

### Installation

The easiest way to access BDK 2.0 for Python and build bots on top of the BDK is through the Symphony Bot Generator.

1. **Install the Symphony Bot Generator:**

```
$ npm i -g @finos/generator-symphony
```

{% hint style="info" %}
Note: If you already have the Symphony Bot Generator installed, upgrade it by running the following: `npm update -g` @finos/generator-symphony
{% endhint %}

1. **Create a new directory and navigate inside:**

```
$ mkdir bdk-bot && cd bdk-bot
```

&#x20;   2\.  **Run the generator:**

```
$ yo @finos/symphony
```

**You should see the following:**

![](<../../.gitbook/assets/Screenshot 2022-07-25 at 11.41.31 am.png>)

### Configuration

Once installed, the next step is to configure your new Symphony bot using the Symphony Bot Generator. In the command line, enter the information for your Symphony environment and bot metadata. For example:

![](<../../.gitbook/assets/Screenshot 2022-07-25 at 11.42.38 am.png>)

After pressing enter, the Symphony Bot Generator will generate a RSA public/private key pair and generate your bot project scaffold. Open your generated project in your Python IDE of choice and navigate to the generated `config.yaml` file:

{% hint style="info" %}
Note: In the generated `config.yaml` file, the BDK assumes that your Symphony Pod, Agent, and Key Manager components are all accessible via the same host, port, and scheme.
{% endhint %}

{% tabs %}
{% tab title="bdk-bot/resources/config.yaml" %}
```yaml
host: develop2.symphony.com

ssl:
  trustStore:
    path: resources/all_symphony_certs.pem

bot:
  username: bdk-bot
  privateKey:
    path: rsa/privatekey.pem
```
{% endtab %}
{% endtabs %}

By default this configuration file is generated, however you can customize this file to meet the specifications of your symphony environment. The following configuration properties can be added to this `config.yaml` file:

#### Basic Configuration Structure

| Property | Description                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| `host`   | component URL                                                                                                     |
| `port`   | component port available                                                                                          |
| `scheme` | https or http                                                                                                     |
| `pod`    | contains pod metadata including `host`, `port`, `scheme`, `context`, and `proxy` attributes                       |
| `bot`    | contains bot metadata including `username`, `privateKeyPath`, `certificatePath`, and`certificatePassword`         |
| `app`    | contains extension app metadata including `appId`, `privateKeyPath`, `certificatePath`, and `certificatePassword` |
| `ssl`    | contains `trustStore` and `trustStore` password for SSL communication                                             |

#### Datafeed Configuration Structure

| Property     | Description                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `version`    | version of the datafeed service to be used.  By default, the bot will use the datafeed v2 service.                                                           |
| `idFilePath` | the path to the file which will be used to persist a created datafeed id in case the datafeed service v1 is used                                             |
| `retry`      | the specific retry configuration can be used to override the global retry configuration.  If no retry configuration is defined, the global one will be used. |

#### Retry Configuration Structure

| Property                | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxAttempts`           | maximum number of retry attempts that a bot is able to make                                                                                                                                                   |
| `multiplier`            | after each attempt, the interval between two attempts will be multiplied by this factor                                                                                                                       |
| `initialIntervalMillis` | the initial interval between two attempts                                                                                                                                                                     |
| `maxIntervalMillis`     | the limit of interval between two attempts.  For example, if the current interval is 1000 ms, multiplier is 2.0 and the `maxIntervalMillis` is 1500 ms, then the interval for the next retry will be 1500 ms. |

An example customized configuration file is seen below:

{% tabs %}
{% tab title="config.yaml" %}
```yaml
scheme: https
host: localhost.symphony.com
port: 8443

pod:
  host: dev.symphony.com
  port: 443

agent:
  host: dev-agent.symphony.com
  port: 5678
   
keyManager:
  host: dev-key.symphony.com
  port: 8444

sessionAuth:
  host: dev-session.symphony.com
  port: 8444

bot:
  username: bot-name
  privateKey:
    path: rsa/privatekey.pem
  certificate:
    path: /path/to/certificate.pem

ssl:
  trustStore:
    path: /path/to/truststore.pem

app:
  appId: app-id
  privateKey:
    path: /path/to/private-key.pem
  certificate:
    path: path/to/app-certificate.pem

datafeed:
  version: v1
  retry:
    maxAttempts: 6
    initialIntervalMillis: 2000
    multiplier: 1.5
    maxIntervalMillis: 10000

retry:
  maxAttempts: 6
  initialIntervalMillis: 2000
  multiplier: 1.5
  maxIntervalMillis: 10000
```
{% endtab %}
{% endtabs %}

### Authentication

Authenticating your bot is made simple when using the BDK 2.0 for Python. Once you have your bot and Symphony environment properly configured, the generated code provides an out of the box implementation for authenticating your bot:

{% tabs %}
{% tab title="__main.py__" %}
```python
config = BdkConfigLoader.load_from_file(Path.joinpath(current_dir, 'resources', 'config.yaml'))
```
{% endtab %}
{% endtabs %}

By instantiating a new `SymphonyBdk` instance with your `config.yaml` file, the BDK loads in your config and authenticates your bot. Once authenticated, your bot is ready to leverage the REST APIs in order to create rich automations and workflows on Symphony.

{% hint style="info" %}
Note: You must have a corresponding service or bot account setup on your Symphony instance before authenticating. For more information navigate to the [Creating a Bot User](../../building-bots-on-symphony/configuration/creating-a-bot-user.md) guide.
{% endhint %}

#### OBO Authentication

BDK 2.0 for Python also supports OBO (On-Behalf-Of) pattern of authentication, allowing an authenticated bot + extension application to perform operations on behalf of a given user. The BDK's implementation makes it easy to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs and MIMs with other users
* Send messages and attachments
* Set the context user's own presence

{% hint style="info" %}
Please follow our '**Getting Started with OBO**' guide using the link [here](https://docs.developers.symphony.com/building-extension-applications-on-symphony/app-authentication/obo-authentication#getting-started).

The guide will cover all of the prerequisites needed for OBO and how to enable & upload the OBO extension application, the required permissions and how to ensure the OBO authentication process will work successfully.
{% endhint %}

To leverage an OBO based workflow, simply instantiate an OBO Session in your bot project. The BDK allows you to instantiate your OBO session from a username or user ID. Once authenticated bots can perform any of the OBO workflows listed above:

```python
# setup SymphonyBdk facade object
config = BdkConfigLoader.load_from_file(Path.joinpath(current_dir, 'resources', 'config.yaml'))

# authenticate on - behalf - of a given user using username or user_id
obo_auth_session = bdk.obo(username = "username")
obo_auth_session = bdk.obo(user_id = "123456789L")

# list streams OBO user "user.name"
bdk.obo_services(obo_auth_session).streams().list_all_streams(stream_filter)
```

### Managing Multiple Bots

BDK 2.0 for Python makes it easy to manage multiple bot instances within a single project. As long as you have unique configuration files that correspond to different service accounts, you can manage multiple bot instances from a centralized source. To do so, simply instantiate multiple bot instances of the `SymphonyBDK` class within your bot project:

```python
# Bot #1
config_a = BdkConfigLoader.load_from_symphony_dir("config_a.yaml")

# Bot #2
config_b = BdkConfigLoader.load_from_symphony_dir("config_b.yaml")

# use your two service accounts
async with SymphonyBdk(config_a) as bdk_a, SymphonyBdk(config_b) as bdk_b:        
```

### Datafeed Management

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
{% tab title="__main.py__" %}
```python
 # subscribe to real-time event listener
 datafeed_loop = bdk.datafeed()
 datafeed_loop.subscribe(RealTimeEventListenerImpl())
 
class RealTimeEventListenerImpl(RealTimeEventListener):

    # on a message sent, the bot replies with "Hello, {User Display Name}!"
    async def on_message_sent(self, initiator: V4Initiator, event: V4MessageSent):
       name = initiator.user.display_name
       stream_id = event.message.stream.stream_id
       response = f"<messageML>Hello, {name}</messageML>"
       await bdk.messages().send_message(stream_id, response)
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

{% content-ref url="../../building-bots-on-symphony/datafeed/" %}
[datafeed](../../building-bots-on-symphony/datafeed/)
{% endcontent-ref %}

### Orchestrating Workflows with BDK 2.0 for Python

A Symphony workflow can be thought of as a sequence of operations or a repeatable pattern of activities that are organized together in order to transform data, provide a service, or process information. Each of these operations or activities may be completed by a single user, shared between a bot and a user, or shared between multiple actors including bots, users, and even third party systems.

By providing an intuitive Activities API, the BDK 2.0 for Python makes it simple to define a set of discrete operations or activities for different actors in your system to execute. Ultimately, these activities constitute the building blocks for a powerful Symphony workflow automation.

Once you have defined a discrete set of activities for different actors in your system to execute, the next step is to organize them together in an intelligent way.

### Activities API

BDK 2.0 for Python provides an Activities API, an interface that makes it easy to manage user-to-bot interactions or activities. Specifically, the Activities API provides easy access to message and room context, initiator metadata, and an intuitive way to interact with the datafeed, making it easy for bots to listen and reply to different Symphony events. The methods and logic provided by the Activities API allows for granular control over the entire user-to-bot interaction. This encapsulated logic is easily reused, forming the discrete building blocks of a Symphony workflow automation.

#### Registering Activities

In order to register activities for your bot instance, you must leverage the `ActivityRegistry` class:

```python
async def run():
  async with SymphonyBdk(BdkConfigLoader.load_from_symphony_dir("config.yaml")) as bdk:
    # Access to the registry for activities
    activity_registry = bdk.activities()
```

There are two different types of activities supported by the BDK:

* **Command Activity**: an activity triggered when a message is sent in an IM, MIM, or Chatroom.
* **Form Activity**: an activity triggered when a user replies to an Elements form message. &#x20;

#### Command Activities

A command-based activity is triggered when a message is sent in an IM, MIM, or Chatroom. Using the Activities API allows developers to register commands in the following formats:

1. `@bdk-bot /buy` (Slash command with a bot @mention)

{% tabs %}
{% tab title="@bdk-bot /buy" %}
```python
async def run():
    config = BdkConfigLoader.load_from_symphony_dir("config.yaml")

    async with SymphonyBdk(config) as bdk:
        activities = bdk.activities()

        @activities.slash("/buy",                       # (1)
                          True,                         # (2)
                          "Command Description")        # (3)
        async def callback(context: CommandContext):
            logging.debug("Hello slash command triggered by user %s", context.initiator.user.display_name)
```
{% endtab %}
{% endtabs %}

1. `/buy 1000 goog` (Slash command without a bot @mention)

{% tabs %}
{% tab title="/buy" %}
```python
async def run():
    config = BdkConfigLoader.load_from_symphony_dir("config.yaml")

    async with SymphonyBdk(config) as bdk:
        activities = bdk.activities()

        @activities.slash("/buy {quantity} {$ticker}",  # (1)
                          False,                        # (2)
                          "Command Description")        # (3)
         async def on_echo_mention(context: CommandContext):
            # can also be retrieved with context.arguments.get("ticker").value
            ticker = context.arguments.get_cashtag("ticker").value 
            quantity = context.arguments.get_string("quantity")
            message = f"Buy ticker {ticker} with quantity {quantity}"
            # send confirmation back to user
            await messages.send_message(context.stream_id, f"<messageML>{message}</messageML>")
```
{% endtab %}
{% endtabs %}

1. Listen for the word `'hello'` (Not a Slash command  - Listen for a specific word)

{% tabs %}
{% tab title="'hello'" %}
```python
async def run():
  async with SymphonyBdk(BdkConfigLoader.load_from_symphony_dir("config.yaml")) as bdk:
    bdk.activities().register(HelloCommandActivity(bdk.messages()))
    await bdk.datafeed().start()

class HelloCommandActivity(CommandActivity):

  def __init__(self, messages: MessageService):
    self._messages = messages
    super().__init__()

  # The matches() method allows the activity logic to be triggered when a message contains hello
  def matches(self, context: CommandContext) -> bool:
     match_string = "hello"
     return context.text_content.contains(match_string) # (1)
  
  async def on_activity(self, context: CommandContext):
      # The activity logic. Here, we send a message: “Hello, There”
      await self._messages.send_message(context.stream_id, "<messageML>Hello, There!</messageML>") # (2)
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note: If you choose to create your own `CommandActivity` class, you must implement the `matcher()` and `on_activity()` methods provided by the `AbstractActivity` class. For more information on the implementation of the `CommandActivity` class, continue [here](https://github.com/finos/symphony-bdk-python/blob/main/symphony/bdk/core/activity/command.py).
{% endhint %}

#### Form Activities

The Activities API also makes it easy for Bots to listen for elements form submissions. Assume the following elements form has been posted into a room with the following attributes:

* form `id` = "hello-form"
* `<text-field>` name = "name"
* form contains an action button

```markup
<messageML>
    <h2>Hello Form</h2>
    <form id="hello-form"> <!-- (1) -->

        <text-field name="name" placeholder="Enter a name here..."/> <!-- (2) -->

        <button name="submit" type="action">Submit</button> <!-- (3) -->
        <button type="reset">Reset Data</button>

    </form>
</messageML>
```

In order to register a form activity or listen for an incoming elements form submission, bots must register a class that extends the `FormReplyActivity` class:

```python
async def run():
    async with SymphonyBdk(BdkConfigLoader.load_from_symphony_dir("config.yaml")) as bdk:
        # register ReplyFormReplyActivity Activity within the registry
        bdk.activities().register(ReplyFormReplyActivity(bdk.messages()))
        # finally, start the datafeed loop
        await bdk.datafeed().start()


class ReplyFormReplyActivity(FormReplyActivity):
    def __init__(self, messages: MessageService):
        self.messages = messages

    def matches(self, context: FormReplyContext) -> bool:
        return context.form_id == "hello-form" \ 
               and context.get_form_value("action") == "submit" # (1)

    async def on_activity(self, context: FormReplyContext):
        message = "Hello, " + context.getFormValue("name") + "!" # (2)
        await self.messages.send_message(context.source_event.stream.stream_id,
                                         "<messageML>" + message + "</messageML>") # (3)

        
logging.config.fileConfig(Path("../logging.conf"), disable_existing_loggers=False)

try:
    logging.info("Running activity example...")
    asyncio.run(run())
except KeyboardInterrupt:
    logging.info("Ending activity example")
```

{% hint style="info" %}
Note: If you wish to create your own `FormReplyActivity` class, you must implement the methods `matcher() and on_activity()` methods provided by the `AbstractActivity` class.  For more information on the implementation for the `FormReplyActivity` class, continue [here](https://github.com/finos/symphony-bdk-python/blob/main/symphony/bdk/core/activity/form.py).
{% endhint %}

As shown above, the Activities API makes it simple to manage incoming commands, elements form submissions, and access message context making it easy to manage bot-user interactions and create custom workflows.

### User, Message, & Room Management

As shown above, the BDK 2.0 for Python makes it easy to create a datafeed and listen for events through the `RealTimeEventListener` class. In addition, this class makes it easy to access user, message, and room data in context. Each eventType method is implemented with instances of `V4Initiator` and `V4MessageSent` objects:

```python
async def on_message_sent(self, initiator: V4Initiator, event: V4MessageSent)
```

Use the `V4Initiator` class methods to access the the user data in context:

| Method                        | User Attribute |
| ----------------------------- | -------------- |
| `initiator.user.user_id`      | User ID        |
| `initiator.user.first_name`   | First Name     |
| `initiator.user.last_name`    | Last Name      |
| `initiator.user.display_name` | Display Name   |
| `initiator.user.email`        | Email          |
| `initiator.user.user_name`    | Username       |

Use the `V4MessageSent` class methods to access message data in context:

| Method                         | Attribute           |
| ------------------------------ | ------------------- |
| `event.message.message_id`     | Message ID          |
| `event.message.timestamp`      | Message Timestamp   |
| `event.message.message`        | Message Text        |
| `event.message.shared_message` | Shared Message      |
| `event.message.data`           | Message Data        |
| `event.message.attachments`    | Message Attachments |

Use the `V4MessageSent` class methods to access stream data in context:

| Method                             | Attribute    |
| ---------------------------------- | ------------ |
| `event.message.stream.stream_id`   | Stream ID    |
| `event.message.stream.stream_type` | Stream Type  |
| `event.message.stream.room_name`   | Room Name    |
| `event.message.stream.members`     | Room Members |
| `event.message.stream.external`    | External     |
| `event.message.stream.cross_pod`   | Cross Pod    |

#### Managing Context through Activities API

The Activities API also makes it easy to access relevant user, message, and stream data in context. `CommandActivity` classes have access to to this data through the `CommandContext` class. This class is instantiated with instances of `V4Initiator` and `V4MessageSent` objects. Bots are able access to the user, message, and stream data in context through the same methods shown above. Leverage these methods within the `on_activity()` method shown below:

```python
async def on_activity(self, context: CommandContext):
    name = context.initiator.user.display_name
    await self._messages.send_message(context.stream_id, f"<messageML>Hello command triggered by user {name}</messageML>")
```

FormActivity classes have access to relevant user, form, and stream data through the `FormReplyContext` class. This class is instantiated with instances of the `V4Initiator` and `V4SymphonyElementsAction` class. The `V4SymphonyElementsAction` class provides the following methods to access form data in context:

| Method                                  | Attribute            |
| --------------------------------------- | -------------------- |
| `context.source_event.stream.stream_id` | Elements Stream ID   |
| `context.source_event.form_message_id`  | Elements Message ID  |
| `context.source_event.form_id`          | Elements Form ID     |
| `context.source_event.form_values`      | Elements Form Values |

```python
async def on_activity(self, context: FormReplyContext):
    message = "Hello, " + context.get_form_value("ticker") + "!"  # (2)
    await self.messages.send_message(context.source_event.stream.stream_id, f"<messageML> {message} </messageML>") 
```

### Message Templating

The BDK 2.0 for Python also supports [Jinja](https://github.com/pallets/jinja) message templating. In order to use message templating, you must leverage the Jinja template engine. Below is an example:

```python
from jinja2 import Template                                   #(1) Import Jinja

template = Template(open('resources/hello.jinja2').read(), autoescape=True) #(2) Load your template
message = template.render(name=user.display_name)             #(3) Construct meesage using template + data

await bdk.messages().send_message(stream_id, message)         #(4) Send templated message
```

The corresponding Jinja template is shown below:

{% tabs %}
{% tab title="hello.jinja2" %}
```markup
Hello <b>{{ name }}</b>!
```
{% endtab %}
{% endtabs %}

Using templating you can also create Element Forms.  Below is an example of a price enquiry form template:

```markup
<form id="price">
    <text-field name="ticker" placeholder="Ticker" /><br />
    <button type="action" name="price">Get Price</button>
</form>
```

###

###
