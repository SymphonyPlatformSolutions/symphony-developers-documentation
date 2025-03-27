# Logout

### Log out of all Symphony Messaging instances

The `logout` function exposed by the SDK allows you to log the user out of all Symphony Messaging instances.  The function is available in Focus and Collaboration modes.

When called, the function will log the user out of Symphony Messaging servers, and then delete all the iFrames controlled by our SDK.&#x20;

Once logged out, Symphony Messaging is back in a state as if the [first `render` method](broken-reference) had never been called so any other function provided by the SDK would not have any effect. **The `render` method needs to be called  again.**

```typescript
window.symphony.logout(): Promise<{error?: {type: string; message: string}}>;
```

#### Returned Promise

The Logout function returns a [**JavaScript Promise**](https://www.w3schools.com/js/js_promise.asp) that will resolve once the action has been completed. The promise has the following interface:

\- Success: {}

\- Error:&#x20;

<table><thead><tr><th width="196">Parameter</th><th width="113">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of error: <br><code>ERROR</code> for generic errors</td></tr><tr><td>message</td><td>string</td><td>Description of the error</td></tr><tr><td>data</td><td>Object | undefined</td><td>Additional data on the error, if any.</td></tr></tbody></table>

**Use with caution:** This function logs the user out of all the Symphony Messaging instances of their current browser. So if the user is logged in Embedded Mode from two web apps (yours, and another one), then you will log them out of the two apps.
