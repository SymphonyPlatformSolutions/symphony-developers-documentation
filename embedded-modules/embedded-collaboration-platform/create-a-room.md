# Create a room

## Create a room

The `createRoom` function exposed by the SDK allows you to open a room creation dialog and prepopulate the room settings, room participants, and an initial message. The user can then update the prepopulated information and create the room in one click.

Alternatively, it is also possible to create a room _silently_, without showing a creation dialog, by setting the `silent` parameter. Please note that the [Custom pricing tier ](pricing-tiers.md)is required for silent room creation. Note that if some of the members of the room are from a different company (External) and not connected with the logged in user, these unconnected users may not be added into the room if they are not configured to automatically accept connection requests.

In Focus mode, if a selector is provided, the SDK will create a new iFrame and show the room creation dialog in it.

If the selector parameter is not provided, or if in Collaboration mode, the dialog will be opened in the `main` iFrame (the one that was created with the `render` function).

#### Parameters

<table><thead><tr><th width="131.33333333333331">Parameter</th><th width="290">Type</th><th>Description</th></tr></thead><tbody><tr><td>roomName</td><td>string</td><td>name of the room (max 50 chars)</td></tr><tr><td>userIds</td><td>string[]</td><td>array of user Ids or user emails</td></tr><tr><td>options</td><td>Partial&#x3C;ECPCreateRoomOptions></td><td>room settings (see below) and initial message</td></tr><tr><td>selector</td><td>string | undefined</td><td>Selector of the container to add the new ECP iFrame into (<strong>Focus mode only</strong>)</td></tr></tbody></table>

ECPCreateRoomOptions contains the list of room settings that will be preselected, and is defined as below:&#x20;

```
{
  public?: boolean;
  external?: boolean;
  multilateral?: boolean;
  allowHistoryBrowsing?: boolean;
  allowMessageCopy?: boolean;
  allowSendMessages?: boolean;
  allowAddUser?: boolean;
  discoverable?: boolean;
  message?: string | SharedMessage;
  silent?: boolean;
}
```

The format of the `message` is the same as the one described for the [sendMessage ](send-a-message.md)method, with the exception of attachments, which are not yet supported.

The room settings preset can be automatically overridden in several situations:

* Manually by the user, in the room creation dialog
* Automatically because of the user entitlements or other admin controlled settings
* Automatically if the preset settings are not compatible with one another. For example, if an external participant is prepopulated in the list of recipients, the room automatically becomes external.

The behavior is consistent with the room creation UI in the Symphony web app.

#### Returned promise

The Create room function returns a [**JavaScript Promise**](https://www.w3schools.com/js/js\_promise.asp) that will resolve once the action has been completed. The promise has the following interface:

&#x20; \- Success

<table><thead><tr><th width="175.4465408805031">Parameter</th><th width="194">Type</th><th>Description</th></tr></thead><tbody><tr><td>streamId</td><td>string [] | undefined</td><td>Stream ID of the chat where the message was sent.</td></tr><tr><td>userIds</td><td>string[] | undefined</td><td>List of user IDs</td></tr><tr><td>messages</td><td>object[] | undefined</td><td>Array of <code>{messageId, streamId}</code> representing the sent message</td></tr></tbody></table>

&#x20; \- Error

<table><thead><tr><th width="196">Parameter</th><th width="113">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of error: <br><code>ERROR</code> for generic errors<br><code>INVALID_USERS</code> if a user id was invalid<br><code>NON_CONNECTED_USERS</code> if some users were not connected to the current user</td></tr><tr><td>message</td><td>string</td><td>Description of the error</td></tr><tr><td>data</td><td>Object | undefined</td><td>Additional data on the error, if any.</td></tr></tbody></table>
