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
4. Datafeed event service calls corresponding event handler function, passing the JSON payload as a parameter .  In this case the SDK would all the msg\_sent\_handler\(\) function:

{% tabs %}
{% tab title="datafeed\_event\_service.py" %}
```python
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
{% endtab %}
{% endtabs %}

As you can see, the above message handler function further parses the incoming JSON payload, checking for its stream\_type. The datafeed event service will then further pass along this JSON payload to the corresponding listener, depending on what type of stream the message was sent in.

### 4.  Event Listeners

As shown above, events are futher sent along to their corresponding listener. Inside of these listeners is where the bulk of your bot's business logic will live.

Event Listeners are interfaces containing abstract methods for your bot to implement. These interfaces contiain abstract event handler methods that correspond to event types as shown above.

For example, the only IM related events are:

* [MESSAGESENT \(Inside an IM\)](https://developers.symphony.com/restapi/docs/real-time-events#message-sent)
* [INSTANTMESSAGECREATED](https://developers.symphony.com/restapi/docs/real-time-events#immim-created)

As a result the IM Listener interface contains two abstract functions that map to the event handlers introduced inside the datafeed event service:

{% tabs %}
{% tab title="im\_listener.py" %}
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
{% endtabs %}

Implement this interface:

{% tabs %}
{% tab title="im\_listener\_implementation.py" %}
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
{% endtabs %}

Inside your implementation of this listener is where you write your custom business logic. Inside these functions you can easily leverage Symphony's REST API, make requests to external services, connect to a database etc.

As you can see, the SDKs make it easy to handle different types of events and introduce custom business logic.

