# UI Service

Use the `ui` service to extend various parts of the Symphony client user interface. For example, add buttons on IM, MIM, and chatroom modules or add links to the #hashtag and $cashtag hovercards:

```javascript
// To use the ui service, you must subscribe to it from your application
var uiService = SYMPHONY.services.subscribe("ui");
```

Extension apps can receive stream participant information when an end user clicks on a button added by the app. For more information, refer to [Receiving Conversation and User Data](receiving-conversation-and-user-information.md).

The following methods are available on the `ui` service:

* openIMbyStreamID
* openIMbyUserIDs
* registerExtension
* unregisterExtension

The following events are fired by the `ui` service:

* themeChangeV2

## openIMbyStreamID()

Open an existing conversation in a new module.

Released in version 20.10.

```javascript
function openIMbyStreamID(streamID, messageId)
```

<table data-header-hidden><thead><tr><th width="139">Parameter</th><th width="86">Type</th><th width="163">Possible Values</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Possible Values</td><td>Description</td></tr><tr><td>streamID</td><td>String</td><td></td><td>The stream ID or conversation ID to be opened.</td></tr><tr><td>messageID</td><td>String</td><td>Either a messageID, or the null value</td><td>The messageId can be used in addition to the streamId to focus on a specific message of the conversation.<br>Use "null" as parameter value to jump to the latest message of the conversation.</td></tr></tbody></table>

## openIMbyUserIDs()

Open a conversation with one or more users in a new module.

Released in version 20.10.

```javascript
function openIMbyUserIDs(userIds)
```

<table data-header-hidden><thead><tr><th width="136">Parameter</th><th width="96">Type</th><th width="161">Possible Values</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Possible Values</td><td>Description</td></tr><tr><td>userIds</td><td>String[]</td><td></td><td>Array of userIds.</td></tr></tbody></table>

## registerExtension()

Add an action button to the Symphony user interface.

Action buttons are added to various places in the UI, such as in the header of chat modules, in #hashtag or $cashtag hovercards, on the profile of users and more.

```javascript
function registerExtension(uiClass, id, serviceName, options)
```

<table data-header-hidden><thead><tr><th width="148">Parameter</th><th width="83">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>uiClass</td><td>String</td><td>The location within the Symphony application where the action button should be placed. Possible values:<br>- <code>single-user-im</code> : Button added to the header of 1-1 chats<br>- <code>multi-user-im</code> : Button added to the header of group chats<br>- <code>room</code>  : Button added to the header of chatrooms<br>- <code>hashtag</code>  : Link added to the hovercard that appears when hovering over a hashtag (e.g. #symphony)<br>- <code>cashtag</code>  : Link added to the hovercard that appears when hovering over a cashtag (e.g. $GOOG)<br>- <code>settings</code>  : Link added to detail card of the application in the Marketplace<br>- <code>profile</code> :  Link added to the user profile page and profile hovercard</td></tr><tr><td>id</td><td>String</td><td>A unique identifier for this extension (can be used to unregister).</td></tr><tr><td>serviceName</td><td>String</td><td>The name of a local service implemented by your application that will be invoked when a user clicks on your action button.</td></tr><tr><td>options</td><td>Object</td><td><p>An object, containing:</p><ul><li>icon: the url of an image that will be displayed on the action button. Recommended format is a square SVG.</li><li>label: a label associated with the action button.</li><li>data: an opaque block of data that will be passed along with the trigger event</li></ul></td></tr></tbody></table>

### trigger()

You must implement the `trigger` method on your application service in order to handle clicks on the registered action buttons:

```javascript
// The application service that will be used to handle clicks on UI extensions
var helloControllerService = SYMPHONY.services.register("hello:controller");
// The application service that will handle the filter on UI extensions
var helloFilterService = SYMPHONY.services.register("hello:filter");

// Displays a button in the header of 1-1 chats
uiService.registerExtension(
  "single-user-im", 
  "hello-im", 
  "hello:controller", 
  {
    label: "IM Button", 
    data: {"datetime": Date()}
  }
);

// Implement the trigger method on your application service
helloControllerService.implement({
  trigger: function(uiClass, id, payload, data) {
    if (uiClass == "single-user-im") {
      console.log('IM button was clicked on ' + data.datetime + '.');
    }
```

## unregisterExtension()

Remove a previously registered action button.

This will remove all instances of a particular extension - for example, from all single chat modules or all #hashtag and $cashtag hovercards.

```javascript
function unregisterExtension(uiClass, id)
```

<table data-header-hidden><thead><tr><th width="135">Parameter</th><th width="97">Type</th><th width="181">Possible Values</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Possible Values</td><td>Description</td></tr><tr><td>uiClass</td><td>String</td><td><ul><li>single-user-im</li><li>multi-user-im</li><li>room</li><li>hashtag</li><li>cashtag</li><li>settings</li></ul></td><td>The location within the Symphony application where the action button was registered.</td></tr><tr><td>id</td><td>String</td><td></td><td>The id of the UI extension that should be removed.</td></tr></tbody></table>

```javascript
uiService.unregisterExtension('single-user-im', 'hello-im');
```

## themeChangeV2 event

This event is fired when the user's font size or theme is changed.

Use the [listen](../service-interface.md#listen) method on this service to subscribe to this event and specify a callback that will be executed when the event is fired. The callback should change the styling of your application to match the user's new theme.

```javascript
var uiService = SYMPHONY.services.subscribe("ui");

uiService.listen("themeChangeV2", function() {
  themeColor = data.themeV2.name;
  themeSize = data.themeV2.size;
  // Styling is achieved by specifying the appropriate classes on the app module's body element.
  document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
});
```
