---
description: Building a Chatbot using the Symphony Generator + SDK
---

# Build a Chatbot using the SDKs

## Prerequisites

#### Complete the Bot Configuration guide

We will be using the **Request/Reply** example from the Bot Generator.

{% page-ref page="../../configuration/configure-your-bot-for-sdks.md" %}

## Install Dependencies

{% tabs %}
{% tab title="Java" %}
```
mvn dependency:resolve
```
{% endtab %}

{% tab title="Python" %}
```bash
python3 -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
```
{% endtab %}

{% tab title="Node.JS" %}
```
npm install
```
{% endtab %}

{% tab title=".NET" %}
```
dotnet restore
```
{% endtab %}
{% endtabs %}

## Dive into the code

Let's take a look at the logic inside the main file.

Running this file accomplishes four things:

* Configures your bot
* Authenticates your bot
* Starts up the bot's datafeed event service
* Adds custom event listeners to the bot's datafeed event service

{% tabs %}
{% tab title="Java" %}
{% code title="src/main/java/RequestReplyBot.java" %}
```java
try {
    SymBotClient botClient = SymBotClient.initBotRsa("config.json");

    botClient.getDatafeedEventsService().addListeners(
        new IMListenerImpl(botClient),
        new RoomListenerImpl(botClient)
    );
} catch (Exception e) {
    log.error("Error", e);
}
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code title="python/main.py" %}
```python
def main():
    configure_logging()

    configure = SymConfig('../resources/config.json')
    configure.load_config()

    if ('authType' not in configure.data or configure.data['authType'] == 'rsa'):
        print('Python Client runs using RSA authentication')
        auth = SymBotRSAAuth(configure)
    else:
        print('Python Client runs using certificate authentication')
        auth = Auth(configure)
    auth.authenticate()

    bot_client = SymBotClient(auth, configure)
    datafeed_event_service = bot_client.get_async_datafeed_event_service()

    datafeed_event_service.add_im_listener(IMListenerImpl(bot_client))
    datafeed_event_service.add_room_listener(RoomListenerImpl(bot_client))

    print('Starting datafeed')
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(datafeed_event_service.start_datafeed())
    except (KeyboardInterrupt, SystemExit):
        None
    except:
        raise
```
{% endcode %}
{% endtab %}

{% tab title="Node.JS" %}
{% code title="index.js" %}
```javascript
Symphony.initBot(__dirname + '/config.json')
  .then((symAuth) => {
    Symphony.getDatafeedEventsService(botHearsSomething)
  })
```
{% endcode %}
{% endtab %}

{% tab title=".NET" %}
{% code title="Program.cs" %}
```csharp
static void Main(string[] args)
{
    string filePath = Path.GetFullPath("config.json");
    SymBotClient symBotClient = new SymBotClient();
    DatafeedEventsService datafeedEventsService = new DatafeedEventsService();
    SymConfig symConfig = symBotClient.initBot(filePath);
    RoomListener botLogic = new BotLogic();
    DatafeedClient datafeedClient = datafeedEventsService.init(symConfig);
    Datafeed datafeed = datafeedEventsService.createDatafeed(symConfig, datafeedClient);
    datafeedEventsService.addRoomListener(botLogic);
    datafeedEventsService.getEventsFromDatafeed(symConfig, datafeed, datafeedClient);
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

Any events that happen within IMs or rooms containing the bot are captured in real-time when the bot reads its datafeed. Each event is represented by an [event payload](https://developers.symphony.com/restapi/docs/real-time-events) that the SDKs abstract into listener functions for event handling. For example, to implement an event handler for when a bot receives messages in a room, you would implement the respective Room Listener class with the `onRoomMessage` function. The generated Request/Reply project has an example implementation as follows:

{% tabs %}
{% tab title="Java" %}
{% code title="src/main/java/RoomListenerImpl.java" %}
```java
public class RoomListenerImpl implements RoomListener {
    private SymBotClient botClient;

    public RoomListenerImpl(SymBotClient botClient) {
        this.botClient = botClient;
    }

    public void onRoomMessage(InboundMessage msg) {
        OutboundMessage msgOut = new OutboundMessage("Hi " + msg.getUser().getFirstName() + "!");
        botClient.getMessagesClient().sendMessage(msg.getStream().getStreamId(), msgOut);
    }

    public void onUserJoinedRoom(UserJoinedRoom userJoinedRoom) {
        OutboundMessage msgOut = new OutboundMessage("Welcome " + userJoinedRoom.getAffectedUser().getFirstName() + "!");
        botClient.getMessagesClient().sendMessage(userJoinedRoom.getStream().getStreamId(), msgOut);
    }
    
    // ...
}
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code title="python/listeners/room\_listener\_impl.py" %}
```python
class RoomListenerImpl(RoomListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()

    async def on_room_msg(self, room_message):
        logging.debug('Room Message Received')

        msg_text = self.message_parser.get_text(room_message)
        first_name = self.message_parser.get_im_first_name(room_message)
        stream_id = self.message_parser.get_stream_id(room_message)

        message = f'<messageML>Hello {first_name}, hope you are doing well!</messageML>'
        self.bot_client.get_message_client().send_msg(stream_id, dict(message=message))
    
    # ...
```
{% endcode %}
{% endtab %}

{% tab title="Node.JS" %}
{% code title="index.js" %}
```javascript
const botHearsSomething = (event, messages) => {
  messages.forEach((message, index) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}
```
{% endcode %}
{% endtab %}

{% tab title=".NET" %}
{% code title="Program.cs" %}
```csharp
public class BotLogic : RoomListener
{
    public void onRoomMessage(Message inboundMessage)
    {
        string filePath = Path.GetFullPath("config.json");
        SymBotClient symBotClient = new SymBotClient();
        SymConfig symConfig = symBotClient.initBot(filePath);
        Message message2 = new Message();
        message2.message = "<messageML> Hi "+inboundMessage.user.firstName+"!</messageML>";
        MessageClient messageClient = new apiClientDotNet.MessageClient();
        messageClient.sendMessage(symConfig, message2, inboundMessage.stream);

    }
    // ...
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

In this generated example, when an message is sent in a room containing your Bot, it will capture the event, and reply to the user by calling the following function which corresponds to the 'Create Message' endpoint on the Symphony REST API: [https://developers.symphony.com/restapi/reference\#create-message-v4](https://developers.symphony.com/restapi/reference#create-message-v4)

{% tabs %}
{% tab title="Java" %}
```java
OutboundMessage msg = new OutboundMessage("Hello")
botClient.getMessagesClient().sendMessage("streamId", msg);
```
{% endtab %}

{% tab title="Python" %}
```python
self.bot_client.get_message_client().send_msg('streamId', dict(message='Hello'))
```
{% endtab %}

{% tab title="Node.JS" %}
```javascript
Symphony.sendMessage('streamId', 'Hello', null, Symphony.MESSAGEML_FORMAT)
```
{% endtab %}

{% tab title=".NET" %}
```csharp
Message msg = new Message();
msg.message = "<messageML>Hello</messageML>";
new apiClientDotNet.MessageClient().sendMessage(symConfig, msg, stream);
```
{% endtab %}
{% endtabs %}

## Run your Bot

Now that you understand the datafeed event handling process implemented by the bot using the Symphony SDKs, let's launch our bot to see it in action:

{% tabs %}
{% tab title="Java" %}
```
mvn compile exec:java -Dexec.mainClass=RequestReplyBot
```
{% endtab %}

{% tab title="Python" %}
```bash
python3 main.py
```
{% endtab %}

{% tab title="Node.JS" %}
```
npm start
```
{% endtab %}

{% tab title=".NET" %}
```
dotnet build
dotnet run
```
{% endtab %}
{% endtabs %}

Navigate to Symphony, create a room and add your bot into that room. Then try sending a message into the room.

![](../../../.gitbook/assets/screen-shot-2020-07-10-at-1.01.53-pm%20%281%29.png)

As you can see, your bot replied with the message shown in the Room Listener implementation.

## Implementing your own Functionality

Let's start by creating a help menu, following the best practice shown in [Step 1 of the Chatbot workflow](./#1-kick-off-your-workflow).

Modify the example room listener code to respond only to messages containing an @mention of your bot and send a help menu when the @mention is proceeded by the `/help` text.

{% tabs %}
{% tab title="Java" %}
{% code title="src/main/java/RoomListenerImpl.java" %}
```java
public class RoomListenerImpl implements RoomListener {
    private SymBotClient botClient;
    private String defaultMessage = "Sorry, I didn't quite catch that.";
    private String selfMention = "<mention uid=\"%d\" />";
    private String helpMessage =
        "<h4>Hi! I accept these commands:</h4>"
        + "<ul>"
        + "    <li>@mention /help</li>"
        + "    <li>@mention /onboard</li>"
        + "    <li>@mention /documentation</li>"
        + "    <li>@mention /clear</li>"
        + "    <li>@mention /finish</li>"
        + "</ul>";
    private int prefix;

    public RoomListenerImpl(SymBotClient botClient) {
        this.botClient = botClient;
        this.selfMention = String.format(selfMention, botClient.getBotUserId());
        this.helpMessage = helpMessage.replaceAll("@mention", selfMention);
        this.prefix = botClient.getBotUserInfo().getDisplayName().length() + 1;
    }

    public void onRoomMessage(InboundMessage msg) {
        List<Long> mentions = msg.getMentions();
        if (!mentions.isEmpty() && mentions.get(0) == botClient.getBotUserId()) {
            String command = msg.getMessageText().substring(prefix).trim();
            
            String message = defaultMessage;
            if (command.equalsIgnoreCase("/help")) {
                message = helpMessage;
            }

            String streamId = msg.getStream().getStreamId();
            OutboundMessage msgOut = new OutboundMessage(message);
            botClient.getMessagesClient().sendMessage(streamId, msgOut);
        }
    }
    
    // ...
}
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code title="python/listeners/room\_listener\_impl.py" %}
```python
import logging
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from sym_api_client_python.listeners.room_listener import RoomListener
from sym_api_client_python.processors.sym_message_parser import SymMessageParser


class RoomListenerImpl(RoomListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()
        self.bot_id = self.bot_client.bot_user_info["id"]
        self.bot_name = self.bot_client.bot_user_info['displayName']
        self.prefix = len(self.bot_name.split(' '))
    
        self_mention = f'<mention uid="{self.bot_id}" />'
        self.default_message = "Sorry, I didn't quite catch that."
        self.help_message = f"""
            <h4>Hi! I accept these commands:</h4>
            <ul>
                <li>{self_mention} /help</li>
                <li>{self_mention} /onboard</li>
                <li>{self_mention} /documentation</li>
                <li>{self_mention} /clear</li>
                <li>{self_mention} /finish</li>
            </ul>
        """

async def on_room_msg(self, room_message):
    msg_text = self.message_parser.get_text(room_message)
    mentions = self.message_parser.get_mention_ids(room_message)
    
    if mentions and int(mentions[0]) == self.bot_id:
        message = default_message
        if msg_text[self.prefix] == "/help":
            message = help_message

        stream_id = room_message['stream']['streamId']
        response = dict(message = f"<messageML>{message}</messageML>")
        await self.bot_client.get_message_client().send_msg_async(stream_id, response)

# ...
```
{% endcode %}
{% endtab %}

{% tab title="Node.JS" %}
{% code title="index.js" %}
```javascript
const Symphony = require('symphony-api-client-node')
Symphony.setDebugMode(true)

const defaultMsg = "Sorry, I didn't quite catch that."
const selfMention = () => `<mention uid="${Symphony.getBotUser().id}" />`
const helpMsg = () => `
  <h4>Hi! I accept these commands:</h4>
  <ul>
    <li>${selfMention()} /help</li>
    <li>${selfMention()} /onboard</li>
    <li>${selfMention()} /documentation</li>
    <li>${selfMention()} /clear</li>
    <li>${selfMention()} /finish</li>
  </ul>
`;

const botHearsSomething = (event, messages) => {
  const botId = Symphony.getBotUser().id;
  const botName = Symphony.getBotUser().displayName;

  messages.forEach((message) => {
    const mentions = Symphony.getMentions(message);
    if (mentions.length > 0 && parseInt(mentions[0]) === botId) {
      const prefix = message.messageText.indexOf(`@${botName}`) + botName.length + 1
      const command = message.messageText.substr(prefix).trim()
      
      let msg = defaultMsg
      if (command === '/help') {
        msg = helpMsg();
      }
      
      const streamId = message.stream.streamId
      Symphony.sendMessage(streamId, msg, null, Symphony.MESSAGEML_FORMAT)
    }
  })
}

// ...
```
{% endcode %}
{% endtab %}

{% tab title=".NET" %}
{% code title="Program.cs" %}
```csharp

```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Check out our [Overview of MessageML](../../messages/overview-of-messageml.md) guide for more information on message formatting and styling.
{% endhint %}

Next, [launch your bot](sdk.md#run-your-bot) again and test the new behaviour:

![](../../../.gitbook/assets/screen-shot-2020-07-10-at-2.16.34-pm.png)

**For an in depth video tutorial visit our "Developing Bots & Apps" course as apart of our Developer Certification program:**

