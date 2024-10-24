# Notifications

## Get notified of the chat activity

The Embedded Mode SDK allows you to be notified of various aspects of the chat activity. This allows you to better integrate the chat within your parent page.

Here is the list of possible notifications:

* [Keep track of unread messages](notifications.md#keep-track-of-unread-messages): Be notified of the number of unread messages in each chat conversation.
* [New messages](notifications.md#new-messages): Be notified when a new message is received.
* [Activity of the user](notifications.md#activity-notifications): Be notified if the user is interacting with the chat or is inactive.
* [Connection notifications](notifications.md#connection-notifications): Be notified when the user receives a new connection request or when a request has been accepted or deleted.
* [Symphony link notifications](notifications.md#symphony-link-notifications): Be notified when a Symphony link is clicked.

To listen to some notifications, use the `listen` method exposed by the SDK. It takes a `SubscriptionPayload` object as parameter:

```typescript
interface SubscriptionPayload<SubscriptionParameters, NotificationObject>{
  type: string; // Notification type
  params: SubscriptionParameters; // params associated to the subscription
  callback: (cbArgs: NotificationObject) => any; // callback to be applied on new notifications
}
```

Specific examples of how the `listen` method can be used are listed below.

### Keep track of unread messages

#### Unread count notifications

(When the conversation is opened by the user, the unread count will revert to 0.)

`SubscriptionParameters`

<table><thead><tr><th width="172">Parameter</th><th width="99">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>streamId</td><td>string</td><td>ID of the chat conversation to register to</td></tr></tbody></table>

`NotificationObject`

<table><thead><tr><th width="176">Parameter</th><th width="99">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>count</td><td>number</td><td>Number of unread messages in the chat conversation</td></tr></tbody></table>

```typescript
// Example
symphony.listen({
  type: 'UnreadCountNotifications',
  params: {
    streamId: 'someStreamId',
  },
  callback: (notification) => {
    console.log('Stream id: ' + notification.streamId);
    console.log('Notification count: ' + notification.count);
  },
});
```

#### Global unread count notifications

Same as above, but covering all conversations of the user.

`GlobalUnreadCountNotificationsCallbackData`

<table><thead><tr><th width="184">Parameter</th><th width="179">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>notifications</td><td>Array&#x3C;NotificationObject></td><td>A notification object per chat conversation that has unread messages</td></tr><tr><td>totalCount</td><td>number</td><td>Total number of unread messages in all conversations</td></tr></tbody></table>

<pre class="language-typescript"><code class="lang-typescript"><strong>// Example
</strong><strong>symphony.listen({
</strong>  type: 'GlobalUnreadCountNotifications',
  callback: (
    notifications: GlobalUnreadCountNotificationsCallbackData,
  ) => {
    console.log('Global Notifications', notifications);
  },
});
</code></pre>

### New messages

You can receive notifications when there is a new incoming message.

`SubscriptionParameters`

<table><thead><tr><th width="222">Parameter</th><th width="170">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>streamId</td><td>string | undefined</td><td>ID of the chat conversation to register to, if not provided; will register to all conversations the user is in</td></tr><tr><td>withMaestroMessages</td><td>boolean</td><td>If true, system messages are also returned (room deactivation, room member addition/removal, pin/unpinned message)</td></tr></tbody></table>

`NotificationObject`

Depending on the type of messages returned the notification object can take various forms as follows:

#### Social message

<table><thead><tr><th width="230">Parameter</th><th width="187">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals SOCIALMESSAGE for standard messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>fromWhomId</td><td>number</td><td>User ID of the sender</td></tr><tr><td>isMention</td><td>boolean</td><td>true if the user was mentioned in the message</td></tr></tbody></table>

#### Room deactivation

<table><thead><tr><th width="231">Parameter</th><th width="189">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals “MAESTRO” for system messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>event</td><td>string</td><td>=”DEACTIVATE_ROOM”</td></tr></tbody></table>

#### Room join

<table><thead><tr><th width="233">Parameter</th><th width="186">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals “MAESTRO” for system messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>event</td><td>string</td><td>=”JOIN_ROOM”</td></tr><tr><td>userId</td><td>string</td><td>ID of the user joining the room</td></tr></tbody></table>

#### Room leave

<table><thead><tr><th width="234">Parameter</th><th width="189">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals “MAESTRO” for system messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>event</td><td>string</td><td>=”JOIN_ROOM”</td></tr><tr><td>userId</td><td>string</td><td>ID of the user leaving the room</td></tr></tbody></table>

#### Room update with pinned message

<table><thead><tr><th width="240">Parameter</th><th width="189">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals “MAESTRO” for system messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>event</td><td>string</td><td>=”UPDATE_ROOM”</td></tr><tr><td>roomUpdate.updateType</td><td>string</td><td>Type of room update. Equals “PIN_MESSAGE”</td></tr><tr><td>roomUpdate.pinnedMessageId</td><td>string</td><td>ID of the message being pinned</td></tr></tbody></table>

#### Room update with unpinned message

<table><thead><tr><th width="239">Parameter</th><th width="189">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of message. Equals “MAESTRO” for system messages</td></tr><tr><td>streamId</td><td>string</td><td>ID of the chat conversation</td></tr><tr><td>event</td><td>string</td><td>=”UPDATE_ROOM”</td></tr><tr><td>roomUpdate.updateType</td><td>string</td><td>Type of room update. Equals “UNPIN_MESSAGE”</td></tr></tbody></table>

```typescript
// Example
symphony.listen({
  type: 'MessageNotifications',
  params: {
    streamId: 'someStreamId',
  },
  callback: (notification) => {
    console.log('Stream id: ' + notification.streamId);
    console.log('Sender id: ' + notification.fromWhomId);
    console.log('Mentioned me: ' + notification.isMention);
  },
});
```

```typescript
// Example
symphony.listen({
  type: 'MessageNotifications', 
  params: { withMaestroMessages: true },
  callback: (data) => {
    console.log("MESSAGE RECEIVED:", data);
  },
});
```

### Activity of the user <a href="#activity-notifications" id="activity-notifications"></a>

You can be notified of the user's activity.\
As any user activity within Embedded Mode happens within an iFrame, the parent page can't know if the user is still active or not. This can be a problem, for example, when implementing an automatic inactivity logout on the parent page. To solve this, you can subscribe to "activity notifications" from Embedded Mode, and plug this into your general activity status.

There are no `SubscriptionParameters` or `NotificationObject` for this notification feed.

```typescript
// Example
symphony.listen({
  type: 'ActivityNotifications',
  callback: () => {
    console.log('last active time: ' + Date.now());
  },
});
```

### Connection notifications

When the user needs to communicate with users from external organizations, they require an accepted connection request. Subscribing to connection notifications will allow you to act on connection requests that have been accepted or new incoming requests from other users.

`SubscriptionParameters`

<table><thead><tr><th width="142">Parameter</th><th width="212">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>status</td><td>Array&#x3C;string> | undefined</td><td>If specified, it filters the notifications to only those statuses provided. Valid statuses are: <code>pending_incoming</code>, <code>accepted</code> or <code>deleted</code></td></tr></tbody></table>

`NotificationObject`

<table><thead><tr><th width="161">Parameter</th><th width="139">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>status</td><td>string</td><td><code>pending_incoming</code>, <code>accepted</code> or <code>deleted</code></td></tr><tr><td>userId</td><td>number</td><td>User ID of the external user</td></tr></tbody></table>

```typescript
// Example
symphony.listen({
  type: 'ConnectionNotifications',
  status: [ 'accepted', 'pending_incoming' ],
  callback: ({ userId, status }) => {
    console.log(`connection to ${userId} is ${status}`);
  },
});
```

### Symphony link notifications

Internal links are specific URIs, processed by Symphony, in order to trigger specific actions (opening a room, a user profile or a message, etc.).

In full collaboration mode, the interactions through internal links are supported. In focus mode, these interactions can’t be processed (i.e. opening a room through a chat link).&#x20;

Subscribing to "internal link notifications" allows executing a callback when a Symphony link is clicked.&#x20;

This notification is only available in focus mode when `canClickInternalLinks` is enabled.

`NotificationObject`

<table><thead><tr><th width="161">Parameter</th><th width="139">Type</th><th width="344">Description</th></tr></thead><tbody><tr><td>url</td><td>string</td><td>Full URL of the internal link clicked</td></tr><tr><td>selector</td><td>string</td><td>ECEmbedded Mode frame selector in which the link has been clicked (<code>undefined</code> for main Embedded Mode frame)</td></tr></tbody></table>

```typescript
// Example
symphony.listen({
  type: 'InternalLinkNotifications',
  callback: ({ url, selector }) => {
    console.log(`Internal link clicked in ${selector || 'main frame'}: ${url}`);
    
    // example of Embedded Mode frames redirection on internal link clicked
    const streamId = new URL(url).searchParams.get('streamId');
    if (streamId) {
      window.symphony.setStream(streamId, selector);
    }
  },
});
```

## Get notified of interop actions

Similarly to what is available through the extension API and the desktop interoperability API, it is possible for the parent page to register extensibility buttons in Embedded Mode chats.

The parent page will be notified each time a button is clicked, and the notification will contain the same context data as what is documented for the [desktop interoperability API](../desktop-interoperability/fdc3-intents/).

Extensibility buttons can be added in the following locations:

* On a user contact profile or profile hovercard (View Contact button). If a user clicks on the button, the parent page will be notified of the clicked user profile, including the name and email. Intent will be 'ViewContact' and the context data will be a fdc3.contact structure.
* On an enhanced tag hovercard (View Instrument button). Clicking on the button will share the financial instrument with the parent page, including the ticker and all other available identifiers. Intent will be 'ViewInstrument' and the context data will be a fdc3.instrument structure.
* On a message action menu (Share Message button). Clicking on the button will share the content of the message and the users present in the conversation. Intent will be 'CreateInteraction' and the context data will be a fdc3.interaction structure.
* On custom action buttons that you can embed in chat messages sent with the [Send a message API](send-a-message.md). The message format that you need to follow is available in [#fdc3-action-buttons](../desktop-interoperability/fdc3-intents/message-format.md#fdc3-action-buttons "mention").

More information on the format of the context data is available in our desktop interoperability documentation, available [here](../desktop-interoperability/fdc3-intents/#outbound-intents).&#x20;

To register interop actions, use the `registerinterop` method, as demonstrated below:

```javascript
registerInterop( callback: (intent: string, context: Context) => void ): Promise<void>;
```

Your page will be notified through the callback method each time an extensibility button will be clicked.

At this time, it is not possible to register for only one type of extensibility button.

{% hint style="info" %}
**Note**: You will need a specific Embedded Mode plan in order to use the `registerInterop` API. Please reach out to us if you are interested.&#x20;
{% endhint %}

