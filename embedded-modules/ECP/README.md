# Embedded Collaboration Platform

## Description

The Symphony Embedded Collaboration Platform allows you to embed stand-alone Symphony chat modules inside other applications.

The chat module can be embedded into websites or any tool that supports webview.

The ECP SDK allows extensive customization, as well as APIs to create rooms and register for notifications.

{% hint style="info" %}
_**The Embedded Collaboration Platform (ECP) replaces the previous**_[ _**Embedded Chat Module**_](ECM.md)_**, which is now deprecated.**_
{% endhint %}

{% hint style="warning" %}
ECP is not yet deployed to all pods, and will be deployed on-demand for organisations using ECM. To know if your pod has been upgraded to ECP, open `https://{podUrl}/embed/version.json` and check the `builtOn` date is in 2022
{% endhint %}

## Supported browser versions

> * Edge 85+
> * Chrome 85+

## Setup

There are three options to implement the Symphony Embedded Chat Module:

* [Explicit rendering](./#explicit-rendering)
* [Automatic rendering](./#automatic-rendering)
* [Direct iFrame rendering](./#direct-iframe-rendering)

_**Unless you have specific constraints, you should use SDK Explicit rendering.**_

## Explicit Rendering

In explicit mode, the SDK will expose an API to the embedding application, giving you fine-grained control over ECP.

To run the SDK in explicit mode, you need to pass the `render="explicit"` parameter to the SDK’s script tag.

The SDK will expose all the functions in the `window.symphony` object.

To ensure that the symphony object is well defined, you can use the script `onload` property:

```html
<script id="symphony-ecm-sdk" data-onload="onSdkLoaded" render="explicit" src="https://yourpodhere.symphony.com/embed/sdk.js"></script>
```

```javascript
window.onSdkLoaded = () => {
 // window.symphony is available
}
```

### Render

The first function you need to call once the SDK is loaded to start ECP is `render`.&#x20;

The `render` function creates and adds the ECP iframe to the container with the class given as first parameter.

#### Parameters

| Parameter          | Type                                            | Description                                             | Default Value                                                                            |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| containerClassName | string                                          | Class of the container  into which ECP will be injected | <p>symphony-ecm<br></p><p><em>(name kept for backwards compatibility with ECM)</em> </p> |
| configuration      | Record\<string, string \| boolean \| undefined> | [Configuration](./#configuration-parameters)            | {}                                                                                       |

#### Returns

A Promise that resolves when the chat is ready. See the promise definition [below](./#chat-action-return-type)

#### Example

```html
<div class="ecp-chat">
/!-- ECP iframe will go here --/
</div> 
```

```javascript
// script
window.symphony.render('ecp-chat', {mode: 'dark', condensed: true})
```

### Open chat with StreamID

The function `openStream` lets you open the conversation with the given stream ID.

If the second parameter is not provided, it will open the chat in the `main` iframe chat (the one that was created with the `render` function).

If a selector is provided, the SDK will either create a new iframe and add the chat in it, or update the chat if the container already had a chat.

#### Parameters

| Parameter         | Type                | Description                                              |
| ----------------- | ------------------- | -------------------------------------------------------- |
| streamID          | string              | Stream Id of the conversation                            |
| containerSelector | string \| undefined | Selector of the container to add the new ECP iframe into |

#### Returns

A Promise that resolves when the chat is ready. See the promise definition [below](./#chat-action-return-type)

#### Example

Open a different chat in the main iframe:

```javascript
window.symphony.openStream('someStreamId')
```

Open a chat in a specific container:

```html
<div id="ecp-chat"></div>
```

```javascript
// You can also refer to a div by ID, with #
window.symphony.openStream('someStreamId', '#ecp-chat');
```

### Open chat with users

The `startRoom` function will let you start a direct message or group chat with specific users.

Similarly to the `openStream` function, you can pass a `containerSelector` parameter to open the chat in a specific container.

If a direct message or group chat with the user(s) already exists, it will open it. If it does not exist, it will create and open one.

#### Parameters

| Parameter         | Type                | Description                                                                |
| ----------------- | ------------------- | -------------------------------------------------------------------------- |
| Users             | Array\<string>      | Array of users. Users can be represented by their userId or email address. |
| containerSelector | string \| undefined | Selector of the container in which to add the new ECP iframe               |

#### Returns

A Promise that resolves when the chat is ready. See the promise definition [below](./#chat-action-return-type)

#### Example

Open a direct message in the main iframe:

```javascript
window.symphony.openStream(['someUserId'])
```

Open a group chat in a specific container:

```html
<div id="ecp-chat"></div>
```

```javascript
window.symphony.startRoom(['someUserId', 'another.user@youremailhere.com'], '#ecp-chat');
```

### Chat Action Return Type

All the functions defined above will return a promise that will resolve once the chat is open / updated. The Promise value has the following interface:

#### Success

| Parameter | Type                   | Description           |
| --------- | ---------------------- | --------------------- |
| streamId  | string                 | Stream ID of the chat |
| _name_    | _string \| undefined_  | _Title of the chat_   |
| userIds   | string\[] \| undefined | List of user IDs      |

_\*Items in italics are only returned when **allowApiContent** is enabled on the pod's Client Configuration - this will allow the ECP API to return sensitive information (such as user names, room names, message content)._

#### Error

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| error     | string | Description of the error |

### Update settings

The `updateSettings` function lets you update the ECP [configuration parameters](./#configuration-parameters):

#### Parameters

| Parameter | Type                  | Description                                                             |
| --------- | --------------------- | ----------------------------------------------------------------------- |
| settings  | Partial\<EcpSettings> | Object containing the [settings](./#configuration-parameters) to update |

#### Example

Open a direct message in the main iframe:

```javascript
window.symphony.updateSettings({
  mode: 'dark',
  condensed: true,
  symphonyLogo: false,
  ...anyOtherSettingsObject 
});
```

### Notifications

On ECP, it is possible to listen to some notifications through the `listen` method exposed by the SDK. It takes a `SubscriptionPayload` object as parameter:

```typescript
interface SubscriptionPayload<SubscriptionParameters, NotificationObject>{
  type: string; // Notification type
  params: SubscriptionParameters; // params associated to the subscription
  callback: (cbArgs: NotificationObject) => any; // callback to be applied on new notifications
}
```

#### Unread count notifications

(when the conversation is opened by the user, the unread count will revert to 0)

`SubscriptionParameters`

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| streamId  | string | Id of the stream to register to |

`NotificationObject`

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| streamId  | string | Id of the stream                        |
| count     | number | Number of unread messages in the stream |

```typescript
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

#### Message notifications

`SubscriptionParameters`

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| streamId  | string | Id of the stream to register to |

`NotificationObject`

| Parameter        | Type     | Description                                        |
| ---------------- | -------- | -------------------------------------------------- |
| streamId         | string   | Id of the stream                                   |
| fromWhomId       | number   | UserId of the sender                               |
| isMention        | boolean  | true if the user has been mentioned in the message |
| _fromWhomName\*_ | _string_ | _Name of the sender_                               |
| _streamName\*_   | _string_ | _Title of the chat_                                |
| _message\*_      | _string_ | _Content of the message_                           |

_\*Items in italics are only returned when **allowApiContent** is enabled on the pod's Client Configuration - this will allow the ECP API to return sensitive information (such as user names, room names, message content)._

```javascript
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

### Extension Application Whitelist

By default, ECP will not load any extension applications (as there is no extension app view). However it can be useful to load extensions that perform custom entity rendering and/or add buttons to the chat header. This is possible using the **allowedApps** [parameter](./#configuration-parameters), passing a comma separated list of App IDs. If the app is already installed and activated for the user in question, adding it to the whitelist in this manner will allow it to load in ECP.

## Automatic rendering

In automatic mode, the SDK will create the iframe for you, so you just need to add the ECP script tag and create a div with the `symphony-ecm` class, so that the script can find it and add the iframe in it.

In this case, the [parameters](./#configuration-parameters) should be added as `data-*` attributes to the div that will contain the iframe.

```html
<script id="symphony-ecm-sdk" src="https://yourpodhere.symphony.com/embed/sdk.js"></script>code
```

```html
<div class="symphony-ecm" 
  data-stream-id="{streamId}"
  data-mode="dark"
  data-condensed="true">
</div>
```

_**This integration method is not recommended, and is kept only for backwards compatibility with ECM.**_

## Direct iFrame rendering

You can also use the direct iFrame rendering mode, which accepts basic [configuration parameters](./#configuration-parameters), but it does not allow any of the advanced features offered through the SDK.

_**This integration method is very limited, and should only be used for situations where using the SDK is impossible (e.g. if you only have an "iframe widget" in a third-party application)**_

```html
<iframe src="https://yourpodhere.symphony.com/embed/index.html?streamId={STREAM_ID}&mode=dark&condensed=true"></iframe>
```

## Example Integrations

[This repository](https://github.com/SymphonyPlatformSolutions/ecp-examples) contains some basic examples that will serve as a good starting point for your integrations.

## Configuration parameters

These are client-side parameters, which will not override the configuration of the pod. For example, if the pod does not allow attachments, setting `showAttach` to true will not do anything.&#x20;

```typescript
export interface EcpSettings {
  condensed: boolean | undefined; // condensed mode. default true
  ecpLoginPopup: boolean; // perform login within a popup, for SSO systems that refuse iframe integration. default false
  mode: 'light' | 'dark' | undefined; // ui colour scheme. default light
  showAttach: boolean; // enable attachments. default true
  showChatSearch: boolean; // enable search feature. default true
  showCompose: boolean; // enable compose mode editor. default true
  showDisableInput: boolean; // enable user to disable editor. default true
  showEditor: boolean; // enable editor. default true
  showInfo: boolean; // show room information in the header. default true
  showMembers: boolean; // show list of members. default true
  canAddPeople: boolean; // allow add members to rooms if owner. default false
  showProfilePopover: boolean; // show popover profile cards. default true
  showSuppressMessage: boolean; // allow user to suppress messages. default true
  showBookmarkMessage: boolean; // allow user to bookmark message. default true
  showSystemMessages: boolean; // show system/maestro messages (e.g. a user joined room). default false
  showTitle: boolean; // show room title in the header. default true
  showEmoji: boolean; // enable emojis in the editor. default true
  symphonyLogo: boolean; // Display the 'Powered by SYMPHONY logo' below ECP chats. default true
  allowedApps: string; // Comma separated list of App IDs to whitelist
}
```

## Backwards compatibility with ECM

ECP is designed to be backwards compatible with the [previous ECM solution](ECM.md).&#x20;

Features that are not currently supported in ECP:

| ECM Feature Name    | Support in ECP                                                                                                                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browser Support     | Chrome/Edge 85+ (more recent than ECM, but these are evergreen browsers, so impact should be minimal)                                                                                                                                                             |
| CSS Style Overrides | Not supported today in ECP. Future releases will support custom palette definition.                                                                                                                                                                               |
| Font option         | Not supported today in ECP. Will be considered for future releases.                                                                                                                                                                                               |
| Contrast option     | Not supported in ECP                                                                                                                                                                                                                                              |
| Theme option        | Not supported in ECP                                                                                                                                                                                                                                              |
| showXPod option     | <p>Crosspod highlighting is now directly read from the pod status, just like in Client 2.0: </p><p>On a normal pod, external rooms will be highlighted.</p><p>On a Customer Connect (CEP) pod, external rooms will not be highlighted (as they are the norm).</p> |
| urlIntercept        | No longer required in ECP. Like in Client 2.0, the user will automatically be directed to the SSO system configured for the pod.                                                                                                                                  |
