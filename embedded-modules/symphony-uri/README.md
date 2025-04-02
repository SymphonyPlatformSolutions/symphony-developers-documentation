# Symphony Messaging URI

#### URIs allow you to launch Symphony Messaging with a predefined context, from a simple link.

This works both on desktop and mobile, as well as on the web version of Symphony Messaging.

## Universal URIs

Symphony Messaging now supports universal URIs (https links starting with `open.symphony.com`), but still supports the previous `symphony://` URIs. See the section [Compatibility with symphony:// URIs](./#compatibility-with-symphony-uris) below for more info.

When a user clicks on a universal URI, a webpage opens and proposes several options relevant to the user, such as opening the link in the desktop or the mobile app, depending on the current context, but also opening in the browser (web version).

**Note**: On the desktop app, clicking on a URI will either replace an existing module, if one is unpinned, or otherwise open a new module in the grid.

<figure><img src="../../.gitbook/assets/image (54).png" alt=""><figcaption><p><em>Universal URI landing page</em></p></figcaption></figure>

## Launch the desktop app

```
https://open.symphony.com/?
```

* If the desktop app is not running, it starts up and gets focus.
* If the desktop app is already running, it focuses on the app. If the app is minimized, it brings the app to the foreground.
* If the desktop app is already running and in focus, it has no effect (the app remains in focus).

## Open a chat

### Open a chat with a single user

Opens the 1-1 chat with the user specified by its `userId`.

```url
https://open.symphony.com/?startChat={userId}
```

### Open a chat with several users

Opens the group chat with the users identified by their userIds.

```
https://open.symphony.com/?startChat={userId1},{userId2},{userId3}
```

### Open a chat identified by its streamId

Displays the chat conversation identified by its `streamId` and `streamType`.

The `streamType` is set to `chatroom` for chat rooms or `im` for 1-1 chats.

```
https://open.symphony.com/?streamId={streamId}&streamType={streamType}
```

{% hint style="info" %}
* If the app is not running, it starts up first then opens the chat.
* If the app is minimized, it is brought to the foreground first.
* If all provided user IDs are invalid, Symphony will open but no chat will be displayed.
* If a chat room where the user is not a participant is specified, the user will be prompted to request access to the room.
{% endhint %}

## Create a chat room

The room creator's `userID` or `userEmail` must be included in the list of users alongside the other room members. If the current user is not included, the user will receive an error message: _'Please ensure your own email address is included in room creation URL'_

The room name is mandatory. If it is not provided, nothing will happen.

It is possible to either directly create the room, or show a room creation modal where the user will be able to configure and confirm the room creation, see example below.

Note: The room name can contain spaces only if the link is opened in Google Chrome.

{% hint style="warning" %}
You can't create a chat room with **external participants**. To do this, please set the flag silent=false to spawn the room creation panel where the user can confirm the room creation, as described in the section below [Create a chat room with room creation dialog](./#create-a-chat-room-with-room-creation-dialog).
{% endhint %}

### Create a chat room with user IDs

```
https://open.symphony.com/?startRoom=RoomName={roomName}&userIds={userId1},{userId2},{userId3}
```

### Create a chat room with user emails

```
Protocol example with userEmails
https://open.symphony.com/?startRoom=RoomName={roomName}&userEmails={email1},{email2}
```

### Create a chat room with room creation dialog

By default, the create room URI silently creates the room. It is possible instead to show a room creation dialog, where the user will be able to configure settings, add members if needed, and initiate connection requests if some of the prepopulated members where not connected.

To do that, set the `silent` flag to false (default:`true`).

```
https://open.symphony.com/?startRoom=RoomName={roomName}&silent=false&userEmails={email1},{email2}
```

## Federation

Users entitled to the SMS & Voice channel of our Federation product are able to directly start a chat over SMS and place a phone call, using the URI schemes described below.

### Start a SMS chat with a contact using SMS & Voice

```
// Start SMS chat with contact +441234567890
https://open.symphony.com/#phoneNumber=+441234567890&triggerAction=SMS  
```

### Call a contact using SMS & Voice

```
// Start phone call with contact +19291234567
https://open.symphony.com/#phoneNumber=+19291234567&triggerAction=PHONE_CALL  
```

{% hint style="info" %}
**Error management**: for both SMS and PHONE\_CALL, if the targeted phone number has no country indicator, or does not seem valid, the phone left rail will open with the requested phone number, in order for the user to complete the intended action.
{% endhint %}

### Start a chat with a contact or onboard a contact

{% hint style="info" %}
Available starting with C2 25.5 (May 2025)
{% endhint %}

Depending on the contact, this URI will:

* Open the existing chat if the chat with this contact already exists
* Create and open the chat, if the contact is already onboarded but no chat exists
* Open the contact onboarding modal, if the contact doesn't exist yet.

```
https://open.symphony.com/#triggerAction=CHAT&channel=WHATSAPP&phoneNumber=+33612345678&firstName=John&lastName=Doe&email=john.doe@symphony.com&company=Symphony
```

<table><thead><tr><th width="226">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>triggerAction</code></td><td>Enum: <code>CHAT</code><br>Mandatory</td></tr><tr><td><code>channel</code></td><td>Enum: <code>WHATSAPP</code>, <code>SMS-DIRECT</code>, <code>WECHAT</code>, <code>LINE</code>, <code>SMS</code><br>Mandatory.</td></tr><tr><td><code>phoneNumber</code></td><td>Phone number of the contact. <br>Mandatory.</td></tr><tr><td><code>firstName</code></td><td>Contact first name.<br>Optional.</td></tr><tr><td><code>lastName</code></td><td>Contact last name.<br>Optional.</td></tr><tr><td><code>email</code></td><td>Contact email.<br>Optional.</td></tr><tr><td><code>company</code></td><td>Contact company.<br>Optional.</td></tr></tbody></table>

## Display the profile of a user

Display the profile of the user identified by its `userId`.

```
https://open.symphony.com/?userId={userId}
```

{% hint style="info" %}
If an external `userId` of a user who is not entitled to external communications is specified, a blank user profile is opened.
{% endhint %}

## Open an extension app

Open an extension app, identified by its publisher, app id, app name, and optionally a module title.&#x20;

The module title corresponds to the title of the navigation item registered by the app in the left navigation menu. It is useful when an app has registered several entries and you want to select one.

```
https://open.symphony.com/?app/{publisher}/{appId}/{appName}/{moduletitle}
```

The `appId`, `appName` & `publisher` information can be found in the **Admin Portal**, under the App Management section.&#x20;

Alternatively, you can simply open the app module you want to get a link to, click on the hamburger menu in the top right corner, and select Copy app link to copy the URI to your clipboard.

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
* Extension apps are not supported on Mobile.
* If the user is not entitled to the app, the Marketplace will open with the app card in focus
* If the app does not exist in the user's Marketplace, an error will be displayed.
* If no moduleTitle is specified, the first entry in the navigation will open.
* If there is no app that matches all filters (publisher, appId, appName), an app that matches at least two of the filters will open.
{% endhint %}

Examples:

```
Module specified:
https://open.symphony.com/?app/Symphony/com.symphony.sfs.admin-app/Federation%20Suite/WeChat%20Connect

No module specified:
https://open.symphony.com/?app/Symphony/com.symphony.zoom/Zoom%20Cloud
```

## Compatibility with symphony:// URIs

Previous URI links (`symphony://`) continue to work.\
\
In certain cases they may still be the best option for you, for example, when you integrate Symphony with a native app and don't want the universal URI webpage to open.

To create legacy links, simply replace `open.symphony.com` with `symphony://` in the URIs above.
