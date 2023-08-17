# Pin a message

The `pinMessage` function exposed by the SDK allows you to pin at the top of a chat a message, specified by its `messageId`.

If another message is already pinned, it is replaced.

Currently it is not possible to programmatically unpin a message.&#x20;

The user needs to be owner of the room to be able to pin the message, otherwise an error will be returned.

&#x20;**Parameters**

<table><thead><tr><th width="191">Parameter</th><th width="132.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>messageId</td><td>string</td><td>Id of the message to be pinned.</td></tr></tbody></table>

#### Returned promise

The Pin message function returns a [**JavaScript Promise**](https://www.w3schools.com/js/js\_promise.asp) that will resolve once the action has been completed. The promise has the following interface:

```javascript
Promise<true | SdkError>;
```

Success

&#x20; \- In case of success, the promise returns `true`.

Error

&#x20; \- In case of error, the promise returns a `SdkError` structure, with the following properties:

<table><thead><tr><th width="196">Parameter</th><th width="113">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of error: <br><code>ERROR</code> for generic errors;<br><code>MESSAGE_ID_NOT_FOUND</code> if the message Id is not valid</td></tr><tr><td>message</td><td>string</td><td>Description of the error.</td></tr><tr><td>data</td><td>Object</td><td>Additional data on the error, with the message Id that was specified for the pin method.</td></tr></tbody></table>

#### Example

```javascript
const result = await window.symphony.sdk.pinMessage('ORRT7G00Bm0skftV+kK2tX///nZz1Vs4bQ==');
```
