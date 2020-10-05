# UI Service

Use the `ui` service to extend various parts of the Symphony client user interface. For example, add buttons on IM, MIM, and chatroom modules or add links to the \#hashtag and $cashtag hovercards:

```javascript
// To use the ui service, you must subscribe to it from your application
var uiService = SYMPHONY.services.subscribe("ui");
```

Extension apps can receive stream participant information when an end user clicks on a button added by the app. For more information, refer to [Receiving Conversation and User Data](receiving-conversation-and-user-information.md).

The following methods are available on the `ui` service:

* registerExtension
* unregisterExtension

The following events are fired by the `ui` service:

* themeChangeV2

## registerExtension\(\)

Add an element to the Symphony user interface.

Elements are added to particular classes of the UI, such as IM modules, \#hashtag or $cashtag hovercards, so they will appear in multiple places.

```javascript
function registerExtension(uiClass, id, serviceName, options)
```

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Possible Values</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">uiClass</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">
        <p></p>
        <ul>
          <li>single-user-im</li>
          <li>multi-user-im</li>
          <li>room</li>
          <li>profile</li>
          <li>hashtag</li>
          <li>cashtag</li>
          <li>settings</li>
        </ul>
      </td>
      <td style="text-align:left">The location within the Symphony application where the UI extension should
        be registered (since this is a class, the extension may appear in more
        than one place)</td>
    </tr>
    <tr>
      <td style="text-align:left">id</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">A unique identifier for this extension (can be used to unregister)</td>
    </tr>
    <tr>
      <td style="text-align:left">serviceName</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">The name of a local service implemented by your application that will
        be invoked when a user action is performed relating to this extension</td>
    </tr>
    <tr>
      <td style="text-align:left">options</td>
      <td style="text-align:left">Object</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p>An object, containing:</p>
        <ul>
          <li>icon: a url for an icon that will be displayed when the user interface
            calls for an icon</li>
          <li>label: a label to put on the user interface element when it calls for
            text</li>
          <li>data: an opaque block of data that will be passed along with the trigger
            event</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Extensions can be registered on various parts of the Symphony user interface by specifying the `uiClass`. The following UI classes are available:

| uiClass | Description |
| :--- | :--- |
| `single-user-im` | Button added to 1-1 instant message module header |
| `multi-user-im` | Button added to multi-party instant message module header |
| `room` | Button added to chatroom module header |
| `hashtag` | Link added to hovercard that appears when hovering over a hashtag \(e.g. \#symphony\) |
| `cashtag` | Link added to hovercard that appears when hovering over a cashtag \(e.g. $GOOG\) |
| `settings` | Link added to footer of Application Preferences |

You must implement the `trigger` method on your application service in order to handle clicks on the registered extensions:

```javascript
// The application service that will be used to handle clicks on UI extensions
var helloControllerService = SYMPHONY.services.register("hello:controller");
// The application service that will handle the filter on UI extensions
var helloFilterService = SYMPHONY.services.register("hello:filter");

// Displays a button on 1-1 instant messages
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

## unregisterExtension\(\)

Remove a previously registered extension.

This will remove all instances of a particular extension -- for example, from all IM modules or all \#hashtag and $cashtag hovercards.

```javascript
function unregisterExtension(uiClass, id)
```

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Possible Values</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">uiClass</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">
        <p></p>
        <ul>
          <li>single-user-im</li>
          <li>multi-user-im</li>
          <li>room</li>
          <li>hashtag</li>
          <li>cashtag</li>
          <li>settings</li>
        </ul>
      </td>
      <td style="text-align:left">The location within the Symphony application where the UI extension was
        registered</td>
    </tr>
    <tr>
      <td style="text-align:left">id</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">The id of the UI extension that should be removed</td>
    </tr>
  </tbody>
</table>

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

