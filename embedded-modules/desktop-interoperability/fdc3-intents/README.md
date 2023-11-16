---
description: >-
  Intents are standardized verbs that an app raises to another app to instruct
  it to do an action. Symphony both listens to some intents coming from third
  party apps, as well as raises intents.
---

# FDC3 intents

## Inbound intents

### Start chat

Symphony listens to _StartChat_ intents, that allow an app to initiate a chat on Symphony with an optional message, and an optional list of contacts.

When a _StartChat_ intent is received by Symphony, a modal opens where the user can review the list of recipients and the content of the message, and then send the message.

**Message**

It is possible to attach a message context to the intent. The message may contain images, $cashtags, @mentions, as well as action buttons (more info [below](./#fdc3-action-buttons)), which on click will trigger a local intent with context data. The **format of the message** is presented [here](message-format.md).

**Recipients**

It is possible to preset the list of recipients, identified through their email addresses.&#x20;

When several contacts are listed, the message is sent to a group chat with all the contacts in the list. This behavior can be changed with the `groupRecipients` parameter.

If `groupRecipients` parameter is true, all recipients will receive the message in a single group chat. If a chat with the same list of participants exists, it will be reused. Otherwise a new group chat will be created.

If the `groupRecipients` parameter is false, each recipient will receive a separate message. Please note that in this case the user will also be able to **add existing chat rooms** to the list of recipients in the Send chat modal.

![Testing the StartChat intent, using the FDC3 Workbench. The message sample used here comes from the Message format page.](../../../.gitbook/assets/Animation.gif)

#### Example: Simple examples with predefined recipients and message:

{% tabs %}
{% tab title="StartChat with group chat" %}
```javascript
fdc3.raiseIntent('StartChat', {
  "type": "fdc3.chat.initSettings",
  "message": {
    "type": "fdc3.message",
    "text": {
      "text/markdown": "Hello there you both!"
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
      },
      {
        "type": "fdc3.contact",
        "id": {
          "email": "dimiter.georgiev@symphony.com"
        }
      }
    ]
  },
  "options": {
    "groupRecipients": true
  }
});
```
{% endtab %}

{% tab title="Result in Symphony" %}
<figure><img src="../../../.gitbook/assets/image (44).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="StartChat with blast" %}
```javascript
{
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "An individual message will be sent to each recipient"
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
      },
      {
        "type": "fdc3.contact",
        "id": {
          "email": "dimiter.georgiev@symphony.com"
        }
      }
    ]
  },
  "options": {
    "groupRecipients": false
  }
}
```
{% endtab %}

{% tab title="Result in Symphony" %}
<figure><img src="../../../.gitbook/assets/image (42).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

#### FDC3 action buttons

Messages sent through the _StartChat_ intent can contain FDC3 action buttons with predefined intents and context data.

The FDC3 action buttons will be displayed as inline buttons in the message. When such a button is clicked, Symphony raises the predefined intent along with its context data.&#x20;

Read [here ](message-format.md)how to add FDC3 action buttons to your messages.

{% hint style="info" %}
**Note**: Chat bots can also send action buttons, learn more [here](../../../bots/messages/overview-of-messageml/entities/standard-entities.md#fdc3-action-buttons).
{% endhint %}

#### Intent return values

As part of the support of FDC3 version 2.0, the _StartChat_ intent now returns to the calling app the IDs of the chat conversations where the message has been sent. It is then possible to directly target these rooms in a further call, using the _Send Chat Message_ intent described below.

### Send chat message

Similar to _StartChat_, the _SendChatMessage_ intent allows to send a chat message directly in a specific chat in Symphony, by specifying the identifier of a chat room.

This works particularly well in combination with the _StartChat_ intent, which now returns the identifier of the chat conversations where the message has been sent.

#### **Example: Combining **_**Start chat**_** and **_**Send chat message**_

<pre class="language-javascript"><code class="lang-javascript">// Start a chat and retrieve a reference to the chat room created
const intentResolution = await fdc3.raiseIntent("StartChat", {
  "type": "fdc3.chat.initSettings",
  "message": {
    "type": "fdc3.message",
    "text": {
      "text/markdown": "Hello there!"
     }
   }
 });  
const chatRoom = await intentResolution.getResult();
<strong>// chatRoom should look like this:
</strong><strong>// "chatRoom": {
</strong><strong>//    "type": "fdc3.chat.room",
</strong>//    "providerName": "Symphony",
//    "id": {
//      "streamIds": [
//        "r2z0c14BJnF9bfsUbZRPN3///oP8vpocdA=="
//      ]
//    }
//  }
//

//Some time later
let chatMessage: ChatMessage = {
  "type": "fdc3.chat.message",
  chatRoom,
  "message": {
    "type": "fdc3.message",
    "text": {
      "text/markdown": "Hello there again!"
    }
  }
}
await fdc3.raiseIntent("SendChatMessage", chatMessage, intentResolution.source);
</code></pre>

{% hint style="info" %}
**Note:** `intentResolution.getResult()`was introduced with FDC3 **2.0**. If you are using an earlier version of the standard, getting the result of the resolution of an intent is not possible.
{% endhint %}

#### **Example: Send chat message with a streamId**

```javascript
const chatMessage = {
 "type": "fdc3.chat.message",
 "chatRoom": {
   "type": "fdc3.chat.room",
   "providerName": "Symphony",
   "id": {
     "streamIds": [
       'H/MT81ZSKBVDGRJ/JkVAtH///nkkpOgsdA=='
     ]
   }
 },
 "message": {
   "text": {
     "text/markdown": "Hello there again!"
   }
 }
}


await fdc3.raiseIntent("SendChatMessage", chatMessage);
```

### View messages

Symphony listens to _ViewMessages_ intents, that allow FDC3 apps to display in Symphony the list of chat messages that contain a specified **$cashtag** or **#hashtag**.

When a _ViewMessages_ intent is received, Symphony displays a modal with the Signal View, showing all matching messages.

**Note**: Currently, Symphony only supports a single context. If several contexts are provided, Symphony will only take the first one into account. Several hashtags can however be specified as a single string (each hashtag separated by a space). In that situation, messages that match _at least_ one of the hashtags will be displayed.

#### **Example 1:** Display all received messages matching the $cashtag _$EURUSD_

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
     ]
});
```
{% endtab %}

{% tab title="Result in Symphony" %}
<figure><img src="../../../.gitbook/assets/image (64).png" alt=""><figcaption><p>View all messages received that contained the specified cashtag.</p></figcaption></figure>
{% endtab %}
{% endtabs %}

#### Example 2: Display all received messages containing the #hashtag _#SUP-15478_

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
<figure><img src="../../../.gitbook/assets/image (48).png" alt=""><figcaption><p>View all messages received that contained the specified hashtag.</p></figcaption></figure>
{% endtab %}
{% endtabs %}

### **View chat**

Symphony listens to _ViewChat_ intents, that allow FDC3 apps to display an existing chat in Symphony based on its streamId, or based on a list of contacts.

If you are using FDC3 over ECP Focus mode, you can also use ViewChat to remove a conversation from being displayed. To do that use the ViewChat intent with a empty context.

#### Example 1: Display a chat based on its streamId

```javascript
fdc3.raiseIntent('ViewChat',{
    type: 'fdc3.chat.room',
    providerName: "Symphony",
    id: {
        streamIds: ["pumfjaAN3WztjdHko6kzdX///n0RSaBUdA=="]
    }
})
```

#### Example 2: Display a 1-to-1 chat with a single contact

```javascript
fdc3.raiseIntent('ViewChat', {
    type: 'fdc3.contact',
    id: {
        email: 'john.doe@symphony.com'
    }
});
```

#### Example 3: Display a group chat with a list of contacts

```javascript
fdc3.raiseIntent('ViewChat', {
    type: 'fdc3.contactList',
    contacts: [
        {
            type: 'fdc3.contact',
            id: {
                email: 'john.doe@symphony.com'
            }
        },
        {
            type: 'fdc3.contact',
            id: {
                email: 'jane.doe@symphony.com'
            }
        },
    ]
});
```

{% hint style="info" %}
**Note**: When using ViewChat with a list of contacts, a group chat with these contacts is created and displayed, if it doesnt already exist.
{% endhint %}



## **Outbound intents**

### **View instrument (cashtag hovercard)**&#x20;

When hovering over $cashtags, an FDC3 _ViewInstrument_ action will be displayed.&#x20;

On click, Symphony will raise the _ViewInstrument_ intent, with the ticker as context data (fdc3.instrument).

<figure><img src="../../../.gitbook/assets/image (60).png" alt=""><figcaption><p>When hovering on the tag (e.g. AAPL US), clicking View Instrument will raise the intent.</p></figcaption></figure>

Example of context data received:

```javascript
{
     "type": "fdc3.instrument",
     "name": "Symphony cashtag",
     "id": {
          "ticker": "AAPL"
     }
}
```

{% hint style="info" %}
As Symphony transitions from the legacy free-text cashtags to the new enhanced tags, the context data received will be also updated to provide more information (e.g. full ticker, ISIN, MIC, etc)
{% endhint %}

### **View contact (user & profile hovercard)**

When hovering on a user mention or name in a Symphony chat, a profile hovercard is displayed, which now contains a new FDC3 **View contact** button.

On click, Symphony will raise the _ViewContact_ intent, with the user as context data (fdc3.contact).

<figure><img src="../../../.gitbook/assets/profile hovercard.png" alt=""><figcaption></figcaption></figure>

The new action is also available from the profile pages.

<figure><img src="../../../.gitbook/assets/user prof hovercard.png" alt=""><figcaption></figcaption></figure>

Example of context data received:

```javascript
{
   "type": "fdc3.contact",
   "name": "Robert Friend",
   "id": {
       "email": "robert.friend@symphony.com"
   }
}
```

{% hint style="info" %}
For external users and depending on how profile visibility has been configured, the email may not be present in the context data. By default, the email address of external users who are not yet connected will be hidden, and will be visible once the user is connected to you.
{% endhint %}

### **Create interaction (Export message)**

When hovering on a message, you can now export that message to local apps in markdown format by clicking on the Share message button in the message context menu.

The intent raised is CreateInteraction with a fdc3.interaction context type. The interaction context contains both the message as well as the list of participants.

{% hint style="info" %}
* Exporting a message is disabled in copy-disabled chats.
* The list of chat members is only included for rooms with 20 members or less. When there more than 20 members, only the initiator of the message is listed.
{% endhint %}

{% tabs %}
{% tab title="Share message action" %}
<figure><img src="../../../.gitbook/assets/image (12).png" alt=""><figcaption><p><em>To display the Share message action, you need to hover on the message and then click the three dots menu.</em></p></figcaption></figure>
{% endtab %}

{% tab title="Result" %}
```json
{
    "type": "fdc3.interaction",
    "description": "Median CPI also holding steady according to the Cleveland Federal Reserve Bank: https://www.clevelandfed.org/en/our-research/indicators-and-data/median-cpi.aspx",
    "origin": "Symphony",
    "interactionType": "Instant Message",
    "participants": {
        "type": "fdc3.contactList",
        "contacts": [
            {
                "type": "fdc3.contact",
                "name": "Robert Friend",
                "id": {
                    "email": "robert.friend@symphony.com"
                }
            },
            {
                "type": "fdc3.contact",
                "name": "Dimiter Georgiev",
                "id": {
                    "email": "dimiter.georgiev@symphony.com"
                }
            },
            {
                "type": "fdc3.contact",
                "name": "Pierre Neu",
                "id": {
                    "email": "pierre.neu@symphony.com"
                }
            }
        ]
    },
    "initiator": {
        "type": "fdc3.contact",
        "name": "Pierre Neu",
        "id": {
            "email": "pierre.neu@symphony.com"
        }
    },
    "timeRange": {
        "type": "fdc3.timeRange",
        "startTime": "2022-11-03T08:41:37.506Z"
    }
}
```
{% endtab %}
{% endtabs %}

### **Custom intents**

Symphony can trigger custom intents from in-chat FDC3 action buttons.&#x20;

When clicking such a button, Symphony raises the predefined intent with the attached context data to local apps.

Read [here ](message-format.md)how to add FDC3 action buttons in your chats.
