# Symphony URI

#### URIs allow you to launch Symphony with a predefined context, from a simple link.

This works both on desktop and mobile, as well as on the web version of Symphony.

## Universal URIs

Symphony now supports universal URIs (https links starting with `open.symphony.com`), but still supports the previous `symphony://` URIs. See the section [Compatibility with symphony:// URIs](./#compatibility-with-symphony-uris) below for more info.

When a user clicks on a universal URI, a webpage opens and proposes several options relevant to the user, such as opening the link in the Symphony Desktop Application or in the mobile app, depending on the current context, but also opening in the browser (web version).

<figure><img src="../../.gitbook/assets/image (54).png" alt=""><figcaption><p><em>Universal URI landing page</em></p></figcaption></figure>

## Launch the Symphony Desktop client

```
https://open.symphony.com/?
```

* If the Symphony desktop client is not running, it starts up and focuses on the Symphony desktop client.
* If the Symphony desktop client is already running, it switches focus to the Symphony desktop client. If the client is minimized, it brings the client to the foreground.
* If the Symphony desktop client is already running and in focus, it has no effect (the Symphony desktop client remains in focus).
* If the Symphony desktop client is not installed, the Windows operating system will handle the request with its default behavior.

## Launch the Symphony Desktop client with a direct message or group chat in focus

* If the Symphony desktop client is not running, it starts up and focuses on the Symphony desktop client with a chat with the specified user IDs in focus.
* If the Symphony desktop client is already running, it switches focus to the Symphony desktop client. If the client is minimized, it brings the client to the foreground and loads the chat with the specified user IDs in focus.
* If the Symphony desktop client is already running and in focus, it opens the chat with the specified user IDs.
* If the Symphony desktop client is not installed, the Windows operating system will handle the request with its default behavior.

> #### Error Handling
>
> If all provided user IDs are invalid, Symphony will open but no chat will be displayed.\
> For a group chat, if at least one of the user IDs is valid, a group chat with the valid users will open.

### Open a chat with a single user

{% tabs %}
{% tab title="1 to 1 chat" %}
```
https://open.symphony.com/?startChat=71811853189751
```
{% endtab %}
{% endtabs %}

### Open a chat with other users

{% tabs %}
{% tab title="Group chat" %}
```
https://open.symphony.com/?startChat=71811853187751,3563645678951
```
{% endtab %}
{% endtabs %}

## Create a chat room

The room creator's `userID` or `userEmail` must be included in the list of users alongside the other room members. If the current user is not included, the user will receive an error message: _'Please ensure your own email address is included in room creation URL'_

The room name is mandatory. If it is not provided, nothing will happen.

It is possible to either directly create the room, or show a room creation modal where the user will be able to configure and confirm the room creation, see example below.

Note: The room name can contain spaces only if the link is opened in Google Chrome.

### Create a chat room with user IDs

```
https://open.symphony.com/?startRoom=RoomName=Example&userIds=4378106230763,5478106410145,7078106304564
```

### Create a chat room with user emails

```
Protocol example with userEmails
https://open.symphony.com/?startRoom=RoomName=AroomWith2people&userEmails=sample@symphony.com,acme@bank.com
```

### Create a chat room with room creation dialog

{% hint style="info" %}
Note: This feature is available starting with Client 23.8, August 2023.
{% endhint %}

By default, the create room URI silently creates the room. It is possible instead to show a room creation dialog, where the user will be able to configure settings, add members if needed, and initiate connection requests if some of the prepopulated members where not connected.

To do that, set the `silent` flag to false (default:`true`).

```
https://open.symphony.com/?startRoom=RoomName=AroomWith2people&silent=false&userEmails=sample@symphony.com,acme@bank.com
```

## Launch the Symphony Desktop Client with a stream in focus

Starts Symphony and displays the chat conversation identified by its `streamId`.

```
https://open.symphony.com/?streamId=STREAM_ID&streamType=STREAM_TYPE
```

* If no modules are open, it opens the specified stream in the grid.
* If an unpinned module is open in the grid, it replaces the unpinned module with the specified stream.
* If there are existing pinned modules, it opens a new module with the specified stream, while retaining the existing modules.
* If the user is not logged in to Symphony when the client is launched, the user will be required to log in first. Once logged in, the specified stream will be displayed.
* You must specify the `streamType`, which can be either `im` (for direct messages or group chats) or `chatroom`. If the `streamType` is not specified, nothing will happen.

> **Error Handling**
>
> * If the wrong stream type is specified, nothing will happen.
> * If no such stream exists and `streamType=chatroom`, nothing will happen.
> * If no such stream exists and `streamType=im`, a rendering error message is displayed.
> * If a stream where the user is not a participant is specified, nothing will happen.

## Launch the Symphony Desktop Client with a profile in focus

Starts Symphony and displays the user profile of the Symphony user identified by its `userID`.

```
https://open.symphony.com/?userId=USER_ID
```

* If no modules are open, it opens the specified profile in the grid.
* If an unpinned module is open in the grid, it replaces the unpinned module with the specified profile.
* If there are existing pinned modules, it opens a new module with the specified profile, while retaining the existing modules.
* If the user is not logged in to Symphony when the client is launched, the user will be required to log in first. Once logged in, the specified profile will be displayed.

> **Error handling**
>
> * If no such user exists but the `userId` is of a valid format (integer), a blank user profile is opened.
> * If a `userId` of invalid format is specified, nothing happens.
> * If an external `userId` of a user who is not entitled to external communications is specified, a blank user profile is opened.

## Compatibility with symphony:// URIs

Previous URI links (`symphony://`) continue to work.\
\
In certain cases they may still be the best option for you, for example, when you integrate Symphony with a native app and don't want the universal URI webpage to open.

To create legacy links, simply replace `open.symphony.com` with `symphony://` in the links above.
