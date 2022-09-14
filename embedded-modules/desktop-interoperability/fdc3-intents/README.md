---
description: >-
  Intents are standardized verbs that an app raises to another app to instruct
  it to do an action. Symphony both listens to some intents coming from third
  party apps, as well as raises intents.
---

# FDC3 intents

## Inbound intents

### Start chat

Symphony will listen to _StartChat_ intents, that allow an app to initiate a chat on Symphony, with an optional message, and an optional list of contacts.&#x20;

When a _StartChat_ intent is received by Symphony, a modal opens where the user can review the list of recipients, as well as the content of the message, and then send the message.

It is possible to attach a message context to the intent. The message may contain images, cashtags, mentions, as well as action buttons (more info [below](./#fdc3-action-buttons)), which on click will trigger a local intent with context data. The **format of the message** is presented [here](message-format.md).

It is possible to preset the list of contacts, identified through their email addresses. When several contacts are listed, the message is sent to a group chat with the list of contacts.

![Testing the StartChat intent, using the FDC3 Workbench. The message sample used here comes from the Message format page.](../../../.gitbook/assets/Animation.gif)

#### Example

Simple example with a predefined recipient and message:

{% tabs %}
{% tab title="Simple message" %}
```javascript
fdc3.raiseIntent('StartChat', {
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "Hello there!"
    }
  },
  "members": {
    "type": "fdc3.contactList",
    "contacts": [
      {
        "type": "fdc3.contact",
        "id": {
          "email": "pierre.neu@symphony.com"
        }
      }
    ]
  }
});
```
{% endtab %}

{% tab title="Result in Symphony" %}
![](<../../../.gitbook/assets/image (4) (1).png>)
{% endtab %}
{% endtabs %}

#### FDC3 Action buttons

Messages sent through the StartChat intent can contain FDC3 action buttons with predefined intents and context data.

The FDC3 action buttons will be displayed as inline buttons in the message. When such a button is clicked, Symphony raises the predefined intent along with its context data.&#x20;

Read [here ](message-format.md)how to add FDC3 action buttons to your messages.

#### Intent return values

As part of the support of FDC3 version 2.0, the StartChat intent now returns to the calling app the ids of the chat conversations where the message has been sent. It is then possible to directly target these rooms in a further call, using the Send Chat Message intent below.

### Send chat message

Similar to StartChat, the _SendChatMessage_ intent allows to send a chat message directly in a specific chat conversation in Symphony, by specifying the identifier of a chat room.

This is working particularly well in combination with the StartChat intent, which now returns the identifier of the chat conversations where the message has been sent.

**Example of combining Start chat and Send chat message**

```javascript
// Start a chat and retrieve a reference to the chat room created
const intentResolution = await fdc3.raiseIntent("StartChat", {
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "Hello there!"
    }
  });  
const chatRoom = intentResolution.getResult();


//Some time later
let chatMessage: ChatMessage = {
    "type": "fdc3.chat.message",
    chatRoom,
    "message": "Another message to send in the room"
}
await fdc3.raiseIntent("SendChatMessage", chatMessage, intentResolution.source);
```

### View messages

Symphony now listens to ViewMessages intents, that allows FDC3 apps to display in Symphony the list of chat messages that contain a specified **cashtag** or **hashtag**.

When a ViewMessages intent is received, Symphony will display a modal with the Signal View, showing all matching messages.

**Examples**

Display all received messages matching the cashtag $EURUSD.

{% tabs %}
{% tab title="Cashtag example" %}
```javascript
fdc3.raiseIntent('ViewMessages', {
    "type": "fdc3.searchCriteria",
    "contexts":[
	{
		"type": "fdc3.instrument",
		"id": {
			"ticker":"EURUSD"
		}
	}
});
```
{% endtab %}

{% tab title="Result in Symphony" %}
<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption><p>View all messages received that contained the specified cashtag.</p></figcaption></figure>
{% endtab %}
{% endtabs %}

Display all received messages containing the hashtag #SUP-15478.

{% tabs %}
{% tab title="Hashtag example" %}
```javascript
fdc3.raiseIntent('ViewMessages', {
  "type": "fdc3.searchCriteria",
  "contexts": [
    "#SUP-15478"
  ]
});
```
{% endtab %}

{% tab title="Result in Symphony" %}
<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption><p>View all messages received that contained the specified hashtag.</p></figcaption></figure>
{% endtab %}
{% endtabs %}

## **Outbound intents**

### **View instrument (cashtag hovercard)**&#x20;

When hovering on cashtags, an FDC3 _ViewInstrument_ action will be displayed.&#x20;

On click, Symphony will raise the _ViewInstrument_ intent, with the ticker as context data (fdc3.instrument).

![When hovering on a cashtag ($GBPUSD), an hover card will be displayed. Clicking on 'View Instrument' will raise an intent.](https://3306294353-files.gitbook.io/\~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FjdueX6WkTUFwlOWFEXjw%2Fuploads%2FeJ4XIKR1ODYCaQk8V4rq%2FScreenshot%202022-05-06%20170043.png?alt=media\&token=f2d680e1-88ce-405b-8dfc-f3836c184847)

### **Custom intents**

Symphony can trigger custom intents from in-chat FDC3 action buttons.&#x20;

When such a button is clicked, Symphony raises the predefined intent with the attached context data to local apps.

Read [here ](message-format.md)how to add FDC3 action buttons in your chats.
