# Bot Developer Kit for Python

## Overview

The BDK for Python is Symphony's preferred tooling for Python developers to build bots. It is a library of tools and API bindings that provides simplified configuration and authentication, intuitive message and room management, customizable message templating and an activities API that makes it easy to build bot workflows.

* The BDK for Python Github repo can be found here: [@finos/symphony-bdk-python](https://github.com/finos/symphony-bdk-python)
* The BDK for Python Certification course can be found here: [learn.symphony.com/bundles/python-bot-developer](https://learn.symphony.com/bundles/python-bot-developer)

## Getting Started

{% content-ref url="../bots/getting-started/bdk.md" %}
[bdk.md](../bots/getting-started/bdk.md)
{% endcontent-ref %}

## Authentication

Authenticating your bot is made simple when using the BDK for Python. Once you have your bot and Symphony environment properly configured, the generated code provides an out of the box implementation for authenticating your bot:

{% tabs %}
{% tab title="__main.py__" %}
```python
config = BdkConfigLoader.load_from_file(Path.joinpath(current_dir, 'resources', 'config.yaml'))
```
{% endtab %}
{% endtabs %}

By instantiating a new `SymphonyBdk` instance with your `config.yaml` file, the BDK loads in your config and authenticates your bot. Once authenticated, your bot is ready to leverage the REST APIs in order to create rich automations and workflows on Symphony.

{% hint style="info" %}
Note: You must have a corresponding service or bot account setup on your Symphony instance before authenticating. For more information navigate to the [Creating a Bot User](../bots/getting-started/creating-a-bot-user.md) guide.
{% endhint %}

### OBO Authentication

BDK for Python also supports OBO (On-Behalf-Of) pattern of authentication, allowing an authenticated bot + extension application to perform operations on behalf of a given user. The BDK's implementation makes it easy to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs with other users
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

## Managing Multiple Bots

BDK for Python makes it easy to manage multiple bot instances within a single project. As long as you have unique configuration files that correspond to different service accounts, you can manage multiple bot instances from a centralized source. To do so, simply instantiate multiple bot instances of the `SymphonyBDK` class within your bot project:

```python
# Bot #1
config_a = BdkConfigLoader.load_from_symphony_dir("config_a.yaml")

# Bot #2
config_b = BdkConfigLoader.load_from_symphony_dir("config_b.yaml")

# use your two service accounts
async with SymphonyBdk(config_a) as bdk_a, SymphonyBdk(config_b) as bdk_b:        
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
       response = f"Hello, {name}"
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

{% content-ref url="../bots/datafeed/" %}
[datafeed](../bots/datafeed/)
{% endcontent-ref %}

## Orchestrating Workflows with BDK for Python

A Symphony workflow can be thought of as a sequence of operations or a repeatable pattern of activities that are organized together in order to transform data, provide a service, or process information. Each of these operations or activities may be completed by a single user, shared between a bot and a user, or shared between multiple actors including bots, users, and even third party systems.

By providing an intuitive Activities API, the BDK for Python makes it simple to define a set of discrete operations or activities for different actors in your system to execute. Ultimately, these activities constitute the building blocks for a powerful Symphony workflow automation.

Once you have defined a discrete set of activities for different actors in your system to execute, the next step is to organize them together in an intelligent way.

## Activities API

BDK for Python provides an Activities API, an interface that makes it easy to manage user-to-bot interactions or activities. Specifically, the Activities API provides easy access to message and room context, initiator metadata, and an intuitive way to interact with the datafeed, making it easy for bots to listen and reply to different Symphony events. The methods and logic provided by the Activities API allows for granular control over the entire user-to-bot interaction. This encapsulated logic is easily reused, forming the discrete building blocks of a Symphony workflow automation.

### Registering Activities

In order to register activities for your bot instance, you must leverage the `ActivityRegistry` class:

```python
async def run():
  async with SymphonyBdk(BdkConfigLoader.load_from_symphony_dir("config.yaml")) as bdk:
    # Access to the registry for activities
    activity_registry = bdk.activities()
```

There are two different types of activities supported by the BDK:

* **Command Activity**: an activity triggered when a message is sent in an IM or Chatroom.
* **Form Activity**: an activity triggered when a user replies to an Elements form message. &#x20;

### Command Activities

A command-based activity is triggered when a message is sent in an IM or Chatroom. Using the Activities API allows developers to register commands in the following formats:

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
            await messages.send_message(context.stream_id, f"{message}")
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
     return context.text_content.contains(match_string)
  
  async def on_activity(self, context: CommandContext):
      # The activity logic. Here, we send a message: “Hello, There”
      await self._messages.send_message(context.stream_id, "Hello, There!)
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note: If you choose to create your own `CommandActivity` class, you must implement the `matcher()` and `on_activity()` methods provided by the `AbstractActivity` class. For more information on the implementation of the `CommandActivity` class, continue [here](https://github.com/finos/symphony-bdk-python/blob/main/symphony/bdk/core/activity/command.py).
{% endhint %}

### Form Activities

The Activities API also makes it easy for Bots to listen for elements form submissions. Assume the following elements form has been posted into a room with the following attributes:

* form `id` = "hello-form"
* `<text-field>` name = "name"
* form contains an action button

```markup
<h2>Hello Form</h2>
<form id="hello-form">
  <text-field name="name" placeholder="Enter a name here..."/>
  <button name="submit" type="action">Submit</button>
</form>
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
               and context.get_form_value("action") == "submit"

    async def on_activity(self, context: FormReplyContext):
        message = "Hello, " + context.getFormValue("name")
        await self.messages.send_message(context.source_event.stream.stream_id, message)

        
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

## User, Message & Room Management

As shown above, the BDK for Python makes it easy to create a datafeed and listen for events through the `RealTimeEventListener` class. In addition, this class makes it easy to access user, message, and room data in context. Each eventType method is implemented with instances of `V4Initiator` and `V4MessageSent` objects:

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

### Managing Context through Activities API

The Activities API also makes it easy to access relevant user, message, and stream data in context. `CommandActivity` classes have access to to this data through the `CommandContext` class. This class is instantiated with instances of `V4Initiator` and `V4MessageSent` objects. Bots are able access to the user, message, and stream data in context through the same methods shown above. Leverage these methods within the `on_activity()` method shown below:

```python
async def on_activity(self, context: CommandContext):
    name = context.initiator.user.display_name
    await self._messages.send_message(context.stream_id, f"Hello command triggered by user {name}")
```

FormActivity classes have access to relevant user, form, and stream data through the `FormReplyContext` class. This class is instantiated with instances of the `V4Initiator` and `V4SymphonyElementsAction` class. The `V4SymphonyElementsAction` class provides the following methods to access form data in context:

<table data-header-hidden><thead><tr><th width="188">Method</th><th>Attribute</th></tr></thead><tbody><tr><td>Method</td><td>Attribute</td></tr><tr><td><code>context.source_event.stream.stream_id</code></td><td>Elements Stream ID</td></tr><tr><td><code>context.source_event.form_message_id</code></td><td>Elements Message ID</td></tr><tr><td><code>context.source_event.form_id</code></td><td>Elements Form ID</td></tr><tr><td><code>context.source_event.form_values</code></td><td>Elements Form Values</td></tr></tbody></table>

```python
async def on_activity(self, context: FormReplyContext):
    message = "Hello, " + context.get_form_value("ticker")
    await self.messages.send_message(context.source_event.stream.stream_id, message) 
```

## Message Templating

The BDK for Python also supports [Jinja](https://github.com/pallets/jinja) message templating. In order to use message templating, you must leverage the Jinja template engine. Below is an example:

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
