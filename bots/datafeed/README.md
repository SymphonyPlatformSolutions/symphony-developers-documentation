---
description: Overview of Symphony Datafeed
---

# Datafeed

{% hint style="danger" %}
**Deprecation Notice v4/datafeed** **(known as Datafeed v1)**\
\
The legacy Datafeed v1 service will no longer be supported on **April 30, 2023**. Please read [below](./#datafeed-v1-deprecation-notice) for more information on this transition.  Please reach out to your Technical Account Manager or to the Developer Relations team for more information.
{% endhint %}

## Overview of Datafeed

The Symphony datafeed provides a stream of real-time messages and events for all conversations that a bot is a member of. Any event that occurs within a bot's scope will be captured and delivered to the bot by the datafeed. The datafeed forms the basis of all interactive and conversational bot workflows as it allows bots to directly respond to Symphony messages and events.

## Datafeed Architecture

Symphony provides a Datafeed API that allows bots to easily [create](https://developers.symphony.com/restapi/main/datafeed/create-datafeed-v5) and [read](https://developers.symphony.com/restapi/main/datafeed/read-datafeed-v5) datafeeds.

Once a bot has created a datafeed, it has access to all of the [events](https://docs.developers.symphony.com/building-bots-on-symphony/datafeed/real-time-events) within its scope, acting as a secure channel between a bot and all activity happening in the Symphony Pod. Additionally, all messages and events within a bot's scope are encrypted by the Agent before reaching your bot. That way the bot is the only one who can access the contents of these events and messages being delivered.

The following illustrates the relationship between your bot, datafeed, and Symphony's components:

![](<../../.gitbook/assets/Datafeeed Architecture@3x.svg>)

1. **Bot creates datafeed via Symphony’s REST API**
2. **Agent creates secure upstream connection with the Symphony Pod**
3. **End user sends a message to a bot in a chatroom**
4. **Pod delivers ‘MESSAGESENT’ event to Agent**
5. **Bot reads datafeed via REST API**
6. **Agent delivers ‘MESSAGESENT’ event payload to the Bot**

## Real-Time Events

Events are delivered to your bot via the datafeed as JSON objects. Each type of Symphony event corresponds to a different JSON payload.

For example, if a user sends your bot a message, an event of type `'MESSAGESENT'` will be delivered to your bot through the datafeed:

```javascript
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

Notice how each event returned by the datafeed has important metadata and attributes such as `messageId`, `timestamp`, (event) `type`, `initiator`, as well as the contents of the message itself inside of the payload object. Additionally, you can find the `streamID` corresponding to the message and also information regarding `externalRecipients`.

For a full list of the  JSON payloads corresponding to each event type, continue here:

{% content-ref url="real-time-events.md" %}
[real-time-events.md](real-time-events.md)
{% endcontent-ref %}

## Handling Events using BDK

The BDK (Bot Developer Kit) comes bootstrapped with a `DatafeedEventService` class that handles all of the logic for creating/reading datafeeds via the API, has best practices for maintaining datafeeds, and also provides event handling architecture that makes it easy to orchestrate complex workflows and introduce custom business logic to your bot.

As a bot developer, all you have to do is to implement generic `EventHandler` classes, passing in a given event type as the type parameter for that class.

After the `DatafeedEventService` creates/reads from the datafeed API, it categorizes each event based on its event type seen [above](./#here-is-the-full-list-of-different-real-time-datafeed-events), and dispatches the event downstream to a generic event handler class. For example, If a user sends a message to bot inside a **chatroom**, the event will be read by the datafeed, and dispatched downstream to the `EventHandler` class that that takes `MessageEvent` in as a type parameter. Further the `handle()` method belonging to your `EventHandler` class will be called each type that event type is read by the datafeed.

The following diagram shows the event handling workflow:

![](<../../.gitbook/assets/BDK Datafeed Architecture@3x.svg>)

1. **Bot creates datafeed via Symphony’s REST API**
2. **Agent creates secure upstream connection with the Symphony Pod**
3. **End user sends a message to a bot in a chatroom**
4. **Pod delivers ‘MESSAGESENT’ event to Agent**
5. **Bot reads datafeed via REST API**
6. **Agent delivers ‘MESSAGESENT’ event payload to the Bot**
7. **Bot routes event to appropriate event listener/handler**

Inside of `onMessageSent()` is where you implement your own business logic such as accessing a database, connecting to an external API, or reply back to your user by leveraging the Symphony API/BDK methods:

{% tabs %}
{% tab title="Java" %}
```java
public class Example {

    public static void main(String[] args) { 
        // create bdk entry point
        final SymphonyBdk bdk = new SymphonyBdk(loadFromClasspath("/config.yaml"));
        
        // create listener to be subscribed
        final RealTimeEventListener listener = new RealTimeEventListener() {
            @Override
            public void onMessageSent(V4Initiator initiator, V4MessageSent event) {
                log.info("Message sent");
            }
        };

        // subscribe a listener
        bdk.datafeed().subscribe(listener);
       
        // start reading the datafeed 
        bdk.datafeed().start(); 
    }
}
```
{% endtab %}

{% tab title="Python" %}
```python
from symphony.bdk.core.config.loader import BdkConfigLoader
from symphony.bdk.core.symphony_bdk import SymphonyBdk
from symphony.bdk.core.service.datafeed.real_time_event_listener import RealTimeEventListener

class RealTimeEventListenerImpl(RealTimeEventListener):

    async def on_message_sent(self, initiator, event):
        # message received, interact with it
        pass

async def run():
    async with SymphonyBdk(BdkConfigLoader.load_from_symphony_dir("config.yaml")) as bdk:
        datafeed_loop = bdk.datafeed()
        # subscribe your listener
        datafeed_loop.subscribe(RealTimeEventListenerImpl())
        # start reading the datafeed
        await datafeed_loop.start()
```
{% endtab %}
{% endtabs %}

## Conversational Workflow

As you can see, the datafeed acts as the backbone of your Bot. In many cases your Bot will be waiting for events to come in through the datafeed, which it constantly 'reads'. When an event or message comes through the datafeed, your bot will 'listen' for the event, extract the relevant data from the JSON payload and kick off its intended workflow.

While you can write all of this datafeed logic yourself, our dedicated BDK toolkits provide out-of-the-box datafeed support and event handling logic making it easy to bootstrap your bot and add custom business logic.

## Deprecation notice of Legacy Datafeed API

The legacy agent/v4/datafeed API is out of support since **April 30, 2023**.

This has an impact on you if some of your automations or bots are still using this API. Please upgrade to the new[ ](https://developers.symphony.com/restapi/main/datafeed)[/agent/v5/datafeeds](https://rest-api.symphony.com/main/datafeed/create-datafeed-v5) APIs.

To facilitate this transition, a new feature called the **datafeed** **bridge** has been introduced in the Agent service so consumers of the deprecated APIs keep a functioning service.

* This bridge is available starting with Agent 22.6 (June 2022) and can be enabled through the following configuration flag `agent.df1ToDf2Bridge.enabled`.&#x20;
* Since Agent release 23.6 (June 2023), this bridge is enabled by default, but could still be disabled through configuration.&#x20;
* Then, starting with Agent release 23.9 (September 2023), the bridge is always enabled.

We encourage you to migrate your bots to use the new [/agent/v5/datafeeds](https://rest-api.symphony.com/main/datafeed/create-datafeed-v5). The bridge is a **temporary solution**, which objective is to facilitate the migration. If you use the BDK in [Java](https://symphony-bdk-java.finos.org/) or [Python](https://symphony-bdk-python.finos.org/), the migration between v4 and v5 is automatic. We advise you to take this opportunity to migrate your bots to the **BDK** if you haven’t done so.

#### Changes required to upgrade to v5 endpoints

The v5 endpoints are different from the v4 ones, so migrating requires changes in your code.\
If you are using our Java BDK, migrating to v5 is a simple configuration change.

Otherwise, the mapping between the API endpoints is the following:

* Path /agent/v4/datafeed (deprecated)
  * Via a POST on the endpoint /agent/v4/datafeed/create, the datafeed is created and then the ID is persisted in a file, which is by default datafeed.id on the bot side
  * The bot subscribes to this ID to retrieve datafeed events; if it cannot be retrieved by using this ID, a new datafeed is created
  * Via a GET on the endpoint /agent/v4/datafeed/{id}/read, the list of events within the specific datafeed identified with {id} is returned
  * Deleting a datafeed is not supported
* Path /agent/v5/datafeeds
  * Via a GET on the endpoint [/agent/v5/datafeeds](broken-reference), is returned the list of already created IDs for a service account
  * Via a POST on the endpoint [/agent/v5/datafeeds](broken-reference), the datafeed is created and the ID is not persisted on the bot side _→ Even if the bot is stale, a GET on the same endpoint will retrieve the ID to which the service account is subscribed_
  * Via a POST on the endpoint [/agent/v5/datafeeds/{id}/read](broken-reference) with a parameter ackId (empty string at the first query), the endpoint returns: the list of events, a new ackId string _→ This ackId permits acknowledgement of the last query and retrieve all events since the last one. All events received between the last payload and the new request are queued and therefore retrieved._
  * Via a DELETE on [/agent/v5/datafeeds/{id}](broken-reference), the datafeed specified with the {id} is deleted.
