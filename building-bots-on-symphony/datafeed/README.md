# Datafeed

In order to create conversational or interactive bots on Symphony, bots must leverage the Symphony Datafeed. The Symphony Datafeed is a real-time message and event stream that can be created using the REST API. The datafeed provides messages and events from all conversations that the bot is in.

## 1.  Create a Datafeed

In order to 'listen' to events happening within your bot's scope, your bot must first create a datafeed via the [REST API endpoint](https://developers.symphony.com/restapi/reference#create-messagesevents-stream-v4).

If successful, the API returns a unique ID for the datafeed just created. This ID will be used to listen for all subsequent events on this datafeed.

{% hint style="info" %}
Note: It is considered best practice that each bot only creates and listens to one datafeed.
{% endhint %}

## 2. Read the Datafeed

Once the datafeed is created, bots can begin listening to events within their scope by passing the unique datafeed ID as a parameter to the Read Messages/Events Stream [REST API endpoint](https://developers.symphony.com/restapi/reference#read-messagesevents-stream-v4).

Calling this API endpoint reads messages from a given datafeed and provides messages and events from all conversations your bot is in.

If events occur within your bot's scope, calling this endpoint will return an array of JSON objects representing different messages/events. A full list of the different types of events and the returned JSON can be found [here](https://developers.symphony.com/restapi/docs/real-time-events).

{% hint style="info" %}
## Note:

* If no messages or events are available, this method will be blocked for 30 seconds and return an HTTP 204 response \(No Content\) after. 
* If many messages are sent to your bot in a short period of time, the array return may have more than 1 event to handle in the array returned by the API.
* A datafeed will expire if its unread capacity is reached. For a standard datafeed, this will be 250 queued messages, and for firehose 500 messages.
* A datafeed can only be consumed by one client thread at a time. For example, polling the datafeed by two threads may lead to messages being delivered out of order.
{% endhint %}

## Examples:

For example, imagine a user sends a 1-1 IM message to your bot. Assuming your bot is continuously reading it's datafeed, the following event will be returned:

```text
{
    "id": "9rc1dr",
    "messageId": "Fd4Pc8xO5Vg6hVfzabFe2X___oyM1eXobQ",
    "timestamp": 1595365005847,
    "type": "MESSAGESENT",
    "initiator": {
        "user": {
            "userId": 344147139494862,
            "firstName": "Reed",
            "lastName": "Feldman",
            "displayName": "Reed Feldman (SUP)",
            "email": "reed.feldman@symphony.com",
            "username": "reedUAT"
        }
    },
    "payload": {
        "messageSent": {
            "message": {
                "messageId": "Fd4Pc8xO5Vg6hVfzabFe2X___oyM1eXobQ",
                "timestamp": 1595365005847,
                "message": "<div data-format=\"PresentationML\" data-version=\"2.0\" class=\"wysiwyg\"><p>hi</p></div>",
                "data": "{}",
                "user": {
                    "userId": 344147139494862,
                    "firstName": "Reed",
                    "lastName": "Feldman",
                    "displayName": "Reed Feldman (SUP)",
                    "email": "reed.feldman@symphony.com",
                    "username": "reedUAT"
                },
                "stream": {
                    "streamId": "IEj12WoWsfTkiqOBkATdUn___pFXhN9OdA",
                    "streamType": "IM"
                },
                "externalRecipients": false,
                "userAgent": "DESKTOP-43.0.0-10902-MacOSX-10.14.6-Chrome-83.0.4103.61",
                "originalFormat": "com.symphony.messageml.v2",
                "sid": "98202eac-dcf4-4b1e-a120-596db38319dc"
            }
        }
    }
}
```

Notice how each event returned by the datafeed has important metadata and attributes such as messageId, timestamp, \(event\) type, initiator, as well as the contents of the message itself inside of the payload object. Here you can find the corresponding streamID as well as information regarding externalRecipients.

## Conversational Workflow

As you can see, the datafeed acts as the backbone of your Bot. In many cases your Bot will be waiting for events to come in through the datafeed, which it constantly 'reads'. When an event or message comes through the datafeed, your bot will 'listen' for the event, extract the relevant data from the JSON payload and kick off its intented workflow.

While you can write all of this datafeed logic yourself, our dedicated SDKs provide out-of-the-box datafeed support and event handling logic making it easy to bootstrap your bot.

To learn more about handling datafeed events, continue onto our next guide:

{% page-ref page="handling-datafeed-events.md" %}

