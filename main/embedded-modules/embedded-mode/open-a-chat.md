# Open a chat

### Open chat with StreamId

The `openStream` function exposed by the SDK allows you to open a conversation or switch to a different conversation, specified by its `streamId`.

In Focus mode, if a selector is provided, the SDK will either create a new iFrame and add the chat in it, or, if the container already included a chat, it will update the chat.

If the second parameter is not provided, or if in Collaboration mode, the chat will be opened in the `main` iFrame (the one that was created with the `render` function).

#### Parameters

<table><thead><tr><th width="191">Parameter</th><th width="132.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>streamId</td><td>string</td><td>Stream ID of the chat conversation</td></tr><tr><td>containerSelector</td><td>string | undefined</td><td>Selector of the container to add the new Embedded Mode iFrame into (<strong>Focus mode only</strong>)</td></tr></tbody></table>

#### Returns

A Promise that resolves when the chat is ready. See the promise definition [below](open-a-chat.md#returned-promise).

#### Example

Open a different chat in the main iFrame:

```javascript
window.symphony.openStream('sdaP4miqUAe8OyLsJRmb/H///n+esBXidA==')
```

Open a chat in a specific container:

```html
<div id="ecp-chat"></div>
```

```javascript
// You can also refer to a div by ID, with #
window.symphony.openStream('sdaP4miqUAe8OyLsJRmb/H///n+esBXidA==', '#ecp-chat');
```

### Open chat with users

The `startRoom` function will let you start a direct message or group chat with specific users.

Similarly to the `openStream` function, while in Focus mode, you can pass a `containerSelector` parameter to open the chat in a specific container.

If a direct message or group chat with the user(s) already exists, it will open it. If it does not exist, it will create and open one.

#### Parameters

<table><thead><tr><th width="186.4465408805031">Parameter</th><th width="149">Type</th><th>Description</th></tr></thead><tbody><tr><td>Users</td><td>Array&#x3C;string></td><td>Array of users. Users can be represented by their user ID or email address.</td></tr><tr><td>containerSelector</td><td>string | undefined</td><td>Selector of the container in which to add the new Embedded Mode iFrame (<strong>Focus mode only</strong>)</td></tr></tbody></table>

#### Returns

A Promise that resolves when the chat is ready. See the promise definition [here](send-a-message.md#returned-promise).

#### Example

Open a direct message in the main iFrame with a user identified by their user ID:

```javascript
window.symphony.startRoom(['71811853191063'])
```

Open a group chat in a specific container with two users (one identified by their user ID, and one identified by their email address):

```html
<div id="ecp-chat"></div>
```

```javascript
window.symphony.startRoom(['71811853191063', 'john.doe@symphony.com'], '#ecp-chat');
```

### Returned promise

The functions `openStream` and `startRoom` return a [**JavaScript Promise**](https://www.w3schools.com/js/js\_promise.asp) that will resolve once the chat is displayed. The promise has the following interface:

#### Success

<table><thead><tr><th width="175.4465408805031">Parameter</th><th width="212">Type</th><th>Description</th></tr></thead><tbody><tr><td>streamId</td><td>string | undefined</td><td>Stream ID of the chat displayed.</td></tr><tr><td>userIds</td><td>string[] | undefined</td><td>List of user IDs</td></tr></tbody></table>

