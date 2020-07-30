---
description: Overview of Symphony Datafeed
---

# Datafeed

## Overview of Datafeed

The Symphony datafeed is a real-time messages and events stream that provides messages and events from all conversations that a bot is in.  Any event that occurs within a bot's scope will be captured and delivered to the bot by the datafeed.  The datafeed forms the basis of all interactive and conversational bot workflows as it allows bots to directly respond to Symphony messages and events.  

## Datafeed Architecture

Symphony provides a Datafeed API that allows bots to easily [create](https://developers.symphony.com/restapi/reference#create-messagesevents-stream-v4) and [read](https://developers.symphony.com/restapi/reference#read-messagesevents-stream-v4) datafeeds.    

Once a bot has created a datafeed, it has access all of the [events](https://developers.symphony.com/restapi/docs/real-time-events) within its scope, acting as an interface between a Bot and all activity happening in the Symphony Pod.  Additionally, all messages and events within a Bot's scope are encrypted by the Agent before reaching your bot.  That way only the Bot is the only one who can access the contents of these events and messages being delivered to your bot.     

The following illustrates the relationship between your bot, datafeed, and Symphony's components:

![](../../.gitbook/assets/copy-of-on-prem-bot-auth_workflow%20%281%29.png)

## Real Time Events

Events are delivered to your Bot via the datafeed as JSON objects.  Each type of Symphony event corresponds to a different JSON payload.   

For example, if a user sends your Bot a message, an event of type 'MESSAGESENT' will be delivered to your bot through the datafeed.

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

Notice how each event returned by the datafeed has important metadata and attributes such as messageId, timestamp, \(event\) type, initiator, as well as the contents of the message itself inside of the payload object. Additionally, you can find the streamID corresponding to the message and also information regarding externalRecipients.

### Here is the full list of different real-time datafeed events:

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>Event Type</b>
      </th>
      <th style="text-align:left"><b>Description</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>Message Sent</b>
      </td>
      <td style="text-align:left">Generated when a message is sent in an IM, MIM, or chatroom of which the
        user in context is a member, including messages sent by the user themselves.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Messages Suppressed</b>
      </td>
      <td style="text-align:left">Generated when messages are suppressed.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Symphony Elements Action</b>
      </td>
      <td style="text-align:left">Generated when a user replies to a bot message that contains an interactive
        form with UX components such as text fields, radio buttons, checkboxes,
        person selectors and more.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Shared Wall Post</b>
      </td>
      <td style="text-align:left">
        <p>&lt;b&gt;&lt;/b&gt;</p>
        <p>Generated when either:</p>
        <ul>
          <li>The user in context shares a wall post written by another user.</li>
          <li>Another user shares a wall post written by the user in context.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>IM/MIM Created</b>
      </td>
      <td style="text-align:left">Generated when an IM or MIM is created with the user in context as a member,
        initiated either by the user in context or another user.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Created</b>
      </td>
      <td style="text-align:left">Generated when a room is created by the user in context.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Updated Message</b>
      </td>
      <td style="text-align:left">Generated when a room of which the user in context is a member is updated,
        including rooms updated by the user himself.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Deactivated Message</b>
      </td>
      <td style="text-align:left">Generated when a room of which the user in context is a member is deactivated,
        including rooms deactivated by the user himself.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Reactivated Message</b>
      </td>
      <td style="text-align:left">Generated when a room of which the user in context is a member is reactivated,
        including rooms reactivated by the user himself.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>User Requested to Join Room</b>
      </td>
      <td style="text-align:left">Generated when a user requests to join a room. Only the user who requested
        to join the room and the owners of that room will receive this event on
        their datafeeds.
        <br />The <code>affectedUsers</code> attribute represents the owners of the room.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>User Joined Room</b>
      </td>
      <td style="text-align:left">Generated when a new user joins or is added to a room of which the user
        in context is a member, including when the user himself joins or is added
        to a room.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>User Left Room</b>
      </td>
      <td style="text-align:left">Generated when a user leaves or is removed from a room of which the user
        in context is a member, including when the user himself leaves or is removed
        from a room.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Member Promoted To Owner</b>
      </td>
      <td style="text-align:left">Generated when a user is promoted from a participant to an owner of a
        room of which the user in context is a member, including when the user
        himself is promoted to an owner or promotes another user.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Room Member Demoted From Owner</b>
      </td>
      <td style="text-align:left">Generated when a user is demoted from an owner to a participant of a room
        of which the user in context is a member, including when the user himself
        is demoted to a participant or demotes another user.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Connection Requested</b>
      </td>
      <td style="text-align:left">
        <p>&lt;b&gt;&lt;/b&gt;</p>
        <p>Generated when a connection request is sent, either:</p>
        <ul>
          <li>Sent by the user in context to another user.</li>
          <li>Sent to the user in context by another user.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Connection Accepted</b>
      </td>
      <td style="text-align:left">
        <p>&lt;b&gt;&lt;/b&gt;</p>
        <p>Generated when a connection request is accepted, either:</p>
        <ul>
          <li>Sent by the user in context and accepted by another user.</li>
          <li>Sent by another user and accepted by the user in context.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Navigate [here](https://developers.symphony.com/restapi/docs/real-time-events) for the expanded JSON payload corresponding to each event type:

## Handling Datafeed Events

Now that your bot has created a datafeed and has access to a real-time message and event stream, the bot must handle events and introduce its own business logic.  

To do so, bots can implement event event listener/handler classes provided by Symphony SDKs and BDKs.  Symphony SDKs and BDK provide an out-of-the-box event handling architecture, making it easy to introduce your custom business logic and orchestrate complex workflows:

![](../../.gitbook/assets/copy-of-on-prem-bot-auth_workflow-copy.png)

## Handling Events using the SDK

## Handling Events using the BDK

## Conversational Workflow

As you can see, the datafeed acts as the backbone of your Bot. In many cases your Bot will be waiting for events to come in through the datafeed, which it constantly 'reads'. When an event or message comes through the datafeed, your bot will 'listen' for the event, extract the relevant data from the JSON payload and kick off its intented workflow.

While you can write all of this datafeed logic yourself, our dedicated SDKs provide out-of-the-box datafeed support and event handling logic making it easy to bootstrap your bot.

To learn more about how to handle datafeed events, continue here:

{% page-ref page="handling-datafeed-events.md" %}

