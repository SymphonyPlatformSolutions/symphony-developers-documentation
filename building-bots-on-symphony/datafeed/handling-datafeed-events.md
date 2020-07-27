# Handling Datafeed Events

The Symphony Datafeed is the foundation for all conversational bot workflows. By creating and reading the datafeed via the REST API, symphony bots gain access to all events and messages within its scope.

## Datafeed Event Service

Symphony SDKs provide an out-of-the-box datafeed event service that makes it easy to manage datafeeds, handle events, and introduce your bot's custom business logic. Bot's built on-top of our designated SDKs do not have to worry about creating, managing or reading datafeeds as all of that logic is built for you.

The datafeed event service provided by our SDKs is outlined as such:

### 1.  Create the Datafeed

Upon startup, the bots built on-top of our SDKs load in your configuration file, [authenticate](../authentication/) to the main components and proceed to [create a datafeed](https://developers.symphony.com/restapi/reference#create-messagesevents-stream-v4). If successful, the API returns a unique datafeed ID.

### 2.  Read the Datafeed

After the unique datafeed ID is returned, the bot then [reads the datafeed](https://developers.symphony.com/restapi/reference#read-messagesevents-stream-v4), passing in the datafeed ID as a parameter. If an event is present, the datafeed delivers a JSON object to the bot to be handled.

### 3.  Handle Events

The datafeed event service parses each incoming event and check for its event type. Each event type has a unique handler function that is to be called everytime an event of its type is delivered to the bot. The datafeed event service calls the corresponding event type function, and passes the event JSON payload along as a parameter.

The following sequence illustrates the event handling workflow provided:

1. Bot recieves message in 1-1 IM chat.
2. Datafeed event service reads datafeed, delivering the JSON payload corresponding to that message
3. Datafeed event service parses JSON payload and checks for its event type
4. Datafeed event service calls corresponding event handler function, passing the JSON payload as a parameter:

{% tabs %}
{% tab title="Java" %}
{% code title="AbstractDatafeedEventsService.java" %}
```java
switch (event.getType()) {
    case "MESSAGESENT":
        MessageSent messageSent = event.getPayload().getMessageSent();
        messageSent.setInitiator(initiator);

        if (messageSent.getMessage().getStream().getStreamType().equals("ROOM")) {
            for (RoomListener listener : roomListeners) {
                listener.onRoomMessage(messageSent.getMessage());
            }
        } else {
            for (IMListener listener : imListeners) {
                listener.onIMMessage(messageSent.getMessage());
            }
        }
        break;
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code title="datafeed\_event\_service.py" %}
```python
 self.routing_dict = {
    'MESSAGESENT' : self.msg_sent_handler
    }

route = self.routing_dict[event_type]

route(payload)

def msg_sent_handler(self, payload):
    """This handler is used for both room messages and IMs. Which listener is invoked
    depends on the streamType"""
    log.debug('msg_sent_handler function started')
    stream_type = payload['payload']['messageSent']['message']['stream']['streamType']
    message_sent_data = payload['payload']['messageSent']['message']
    if str(stream_type) == 'ROOM':
        for listener in self.room_listeners:
            listener.on_room_msg(message_sent_data)
    elif str(stream_type) == 'POST':
        for listener in self.wall_post_listeners:
            listener.on_wall_post_msg(message_sent_data)
    else:
        for listener in self.im_listeners:
            listener.on_im_message(message_sent_data)
```
{% endcode %}
{% endtab %}

{% tab title="Node.js" %}
{% code title="DatafeedEventService/index.js" %}
```javascript
Object.entries(eventsByType).forEach(([type, events]) => {
            if (type === 'messagesent') {
              const messages = SymMessageParser.parse(events)
              this.emit('messagesent', messages)
              
 
```
{% endcode %}
{% endtab %}

{% tab title=".NET" %}
{% code title="DatafeedEventsService.cs" %}
```java
switch (eventv4.type)
{
    case "MESSAGESENT":

        MessageSent messageSent = eventv4.payload.messageSent;
        if (messageSent.message.stream.streamType.Equals("ROOM"))
        {
            foreach (IRoomListener listener in roomListeners)
            {
                listener.onRoomMessage(messageSent.message);
            }
        }
        else
        {
            foreach (IIMListener listener in IMListeners)
            {
                listener.onIMMessage(messageSent.message);
            }
        }
        break;
```
{% endcode %}
{% endtab %}
{% endtabs %}

As you can see, the above message handler function further parses the incoming JSON payload, checking for its stream\_type. The datafeed event service will then further pass along this JSON payload to the corresponding listener, depending on what type of stream the message was sent in.

### 4.  Event Listeners

As shown above, events are futher sent along to their corresponding listener. Inside of these listeners is where the bulk of your bot's business logic will live.

Event Listeners are interfaces containing abstract methods for your bot to implement. These interfaces contiain abstract event handler methods that correspond to event types as shown above.


{% tabs %}
{% tab title="Java" %}
```java
public interface IMListener extends DatafeedListener {
    void onIMMessage(InboundMessage message);
    void onIMCreated(Stream stream);
}
```
{% endtab %}

{% tab title="Python" %}
```python
class IMListener(ABC):

    @abstractmethod
    def on_im_message(self, message):
        """
        Do Something
        """

    @abstractmethod
    def on_im_created(self, stream):
        """
        Do Something
        """
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
const botHearsSomething = (event, messages) => {
  messages.forEach((message, index) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}
```
{% endtab %}

{% tab title=".NET" %}
```java
public interface IIMListener
    {
        void onIMMessage(Message message);
        void onIMCreated(Stream stream);
    }
```
{% endtab %}
{% endtabs %}

Implement the Listener Interface:

{% tabs %}
{% tab title="Java" %}
```java
public class IMListenerImpl implements IMListener {
    public void onIMMessage(InboundMessage message) {
        SymBotClient bot = MyBot.getBotClient();
        String streamId = message.getStream().getStreamId();
        String messageOut = String.format("Hello %s!", message.getUser().getDisplayName());
        bot.getMessagesClient().sendMessage(streamId, new OutboundMessage(messageOut));
    }

    public void onIMCreated(Stream stream) {}
}
```
{% endtab %}

{% tab title="Python" %}
```python
class IMListenerTestImp(IMListener):
    """Example implementation of IMListener
        sym_bot_client: contains clients which respond to incoming events
    """

    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client

    def on_im_message(self, im_message):
        logging.debug('message received in IM', im_message)
        # do something with im_message payload

    def on_im_created(self, im_created):
        logging.debug('IM created!', im_created)
        # do something with im_created payload
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
const botHearsSomething = (event, messages) => {
  messages.forEach((message, index) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}
```
{% endtab %}

{% tab title=".NET" %}
```java
public class MyIMListener : IMListener
    {
        private SymConfig symConfig;


        public void init(SymConfig symConfig)
        {
            this.symConfig = symConfig;
        }

        override public void onIMMessage(Message message)
        {
            string FirstCommand = "";
            string SearchTerm = null;
            string SearchStatus = null;

            if (message.message.Contains("/form"))
            {
                    string fresponse = "";
                    fresponse += "<form id=\"form_id\">";
                    fresponse += "<text-field name=\"Question_Subject\" required=\"true\" placeholder=\"Ask a Question\" />";
                    fresponse += "<textarea name=\"comment\" placeholder=\"Add details (optional)\" required=\"false\"></textarea>";
                    fresponse += "<button type=\"reset\">Reset</button>";
                    fresponse += "<button name=\"submit_button\" type=\"action\">Submit</button>";
                    fresponse += "</form>";
                    sendMessage(message.stream.streamId, fresponse);
            }
        }

        private void sendMessage(String streamId, String messageText)
        {
            Console.WriteLine("streamId:" + streamId);
            OutboundMessage message = new OutboundMessage();
            message.message = "<messageML>"+messageText+"</messageML>";                
            RestRequestHandler restRequestHandler = new RestRequestHandler();
            string url = "https://" + this.symConfig.agentHost + "/agent/v4/stream/" + streamId + "/message/create";
            HttpWebResponse resp = restRequestHandler.executeRequest(message, url, false, WebRequestMethods.Http.Post, symConfig, true);

        }
    }
```
{% endtab %}
{% endtabs %}

Inside your implementation of this listener is where you write your custom business logic. Inside these functions you can easily leverage Symphony's REST API, make requests to external services, connect to a database etc.

As you can see, the SDKs make it easy to handle different types of events and introduce custom business logic.


For more information on our SDKs:

{% page-ref page="../../developer-tools/developer-tools/sdks/" %}

