# Handling Datafeed Events

The Symphony Datafeed is the foundation for all conversational bot workflows.  By creating and reading the datafeed via the REST API, symphony bots gain access to all events and messages within its scope.

## Datafeed Event Service

Symphony SDKs provide an out-of-the-box datafeed event service that makes it easy to manage datafeeds, handle events, and introduce your bot's custom business logic. Bot's built on-top of our designated SDKs do not have to worry about creating, managing or reading datafeeds as all of that logic is built for you.  

The datafeed event service provided by our SDKs is outlined as such:

#### 1.  Create the Datafeed

Upon startup, the bots built on-top of our SDKs load in your configuration file, [authenticate](../authentication/) to the main components and proceed to [create a datafeed](https://developers.symphony.com/restapi/reference#create-messagesevents-stream-v4).  If successful, the API returns a unique datafeed ID.

#### 2.  Read the Datafeed

After the unique datafeed ID is returned, the bot  then [reads the datafeed](https://developers.symphony.com/restapi/reference#read-messagesevents-stream-v4), passing in the datafeed ID as a parameter.  If an event is present, the datafeed delivers a JSON object to the bot to be handled.  

#### 3.  Handle Events

The datafeed event service parses each incoming event and check for its event type.  Each event type has a unique handler function that is to be called everytime an event of its type is delivered to the bot.  The datafeed event service calls the corresponding event handler function, and passes the event JSON payload along as a parameter.  

The following sequence illustrates the event handling workflow provided:

1. Bot recieves message in 1-1 IM chat.
2. Datafeed event service reads datafeed, delivering the JSON payload corresponding to that message
3. Datafeed event service parses JSON payload and checks for its event type
4. Datafeed event service calls corresponding event handler function, passing the JSON payload as a parameter:

#### 4.  Event Listeners

The SDKs contain event listener interfaces that consist of the abstract handler functions shown above.  The Listener interfaces contain methods categorized by the type of event handled.  For example, the IM Interface contains two abstract methods corresponding to events that deal with IMs.     

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

When building a bot, you will implement these listener interfaces, adding the bulk of your business logic to the appropriate handler function implementations.  For example, we are adding custom business logic to the `onIMMessage()`function in order to reply with a message of our choosing:

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

When an event is captured by the datafeed, the SDK calls the appropriate handler function, which executes the implementation of that function.  As you can see, the SDKs make it easy to handle different types of events and allow developers to introduce custom business logic.  Inside these listener functions you can leverage Symphony's REST API, call external services, access your database, and much more. 

For more information on our SDKs:

{% page-ref page="../../developer-tools/developer-tools/sdks/" %}

