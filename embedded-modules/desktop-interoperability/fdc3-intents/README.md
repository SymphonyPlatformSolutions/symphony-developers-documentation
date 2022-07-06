---
description: >-
  Intents are standardized verbs that an app raises to another app to instruct
  it to do an action. Symphony both listens to some intents coming from third
  party apps, as well as raises intents.
---

# FDC3 intents

## Inbound intents

### Start chat

Symphony will listen to StartChat intents, that allow an app to initiate a chat on Symphony, with an optional message, and an optional list of contacts.&#x20;

When a StartChat intent is received by Symphony, a modal will open where the user will be able to review the list of recipients, as well as to review the content of the message, and then send the message.

It is possible to attach a message context to the intent. The message may contain images, cashtags, mentions, as well as action buttons (more info [below](./#fdc3-action-buttons)), which on click will trigger a local intent with a context data. The **format of the message** is presented [here](https://app.gitbook.com/o/-MB5vuhMZDPnMHgoaIX-/s/-MB51RkjSmfA\_ejydg4M-3415978100/\~/changes/BeNT7JQ1eO6nLDxYh3su/embedded-modules/desktop-interoperability/fdc3-intents/message-format).

It is possible to preset the list of contacts, identified through their email adresses. When there are several contacts listed, the message is sent to a group chat with the list of contacts.

![When receiving a StartChat intent, Symphony will display a modal dialog with the message content.](<../../../.gitbook/assets/image (4).png>)

#### Examples

Simple example with a predefined recipient and message.

```
fdc3.raiseIntent('StartChat', {
    intent: "StartChat",
    type: "fdc3.chat.initSettings",
    initMessage: "This is my message",
    members: [{
        id: {
            email: "jane.doe@mail.com"
        }
    }]
});
```

#### FDC3 Action buttons

Messages sent through the StartChat intent can contain FDC3 action buttons with predefined intents and context data. The FDC3 Action buttons will be displayed as inline buttons in the message. When such a button is clicked, Symphony will raise the predefined intent along with its context data. See how to add such buttons in your messages [here](https://app.gitbook.com/o/-MB5vuhMZDPnMHgoaIX-/s/-MB51RkjSmfA\_ejydg4M-3415978100/\~/changes/BeNT7JQ1eO6nLDxYh3su/embedded-modules/desktop-interoperability/fdc3-intents/message-format).

## **Outbound intents**

### **View Instrument (cashtag hovercard)**&#x20;

When hovering on cashtags, an fdc3 action "ViewInstrument" will be displayed. On click, Symphony will raise the ViewInstrument intent, with the ticker as context data (fdc3.instrument).

![When hovering on a cashtag ($GBPUSD), an hover card will be displayed. Clicking on 'View Instrument' will raise an intent.](https://3306294353-files.gitbook.io/\~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FjdueX6WkTUFwlOWFEXjw%2Fuploads%2FeJ4XIKR1ODYCaQk8V4rq%2FScreenshot%202022-05-06%20170043.png?alt=media\&token=f2d680e1-88ce-405b-8dfc-f3836c184847)

### **Custom intents**

Symphony can trigger custom intents from in-chat fdc3 action buttons. To learn more about how to add fdc3 action buttons in your chats, please have a look [here](./#view-instrument-cashtag-hovercard).

When such a button is clicked, Symphony will raise the predefined intent with its context data to local apps.
