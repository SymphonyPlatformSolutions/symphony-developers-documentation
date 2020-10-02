# Modules Service

A module is a new window inside the Symphony client workspace, such as a chatroom or an instant message. Use the `modules` service to create application-specific modules.

```javascript
// To use the modules service, you must subscribe to it from your application
var modulesService = SYMPHONY.services.subscribe("modules");
```

The following methods are available on the `modules` service:

* [show](https://developers.symphony.com/extension/docs/modules-service#section-show)
* [hide](https://developers.symphony.com/extension/docs/modules-service#section-hide)
* [setTitle](https://developers.symphony.com/extension/docs/modules-service#section-settitle)
* [focus](https://developers.symphony.com/extension/docs/modules-service#section-focus)
* [addMenuItem](https://developers.symphony.com/extension/docs/modules-service#section-addmenuitem)
* [setHandler](https://developers.symphony.com/extension/docs/modules-service#section-sethandler)
* [openLink](https://developers.symphony.com/extension/docs/modules-service#section-openlink)
* [redirect](https://developers.symphony.com/extension/docs/modules-service#section-redirect)

## show\(\)

Show a new application module:

```javascript
function show(id, title, serviceName, iframe, options)
```

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">id</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">A unique id for this module (must be unique across all modules of a given
        application)</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Either</b>  <code>title</code>
        <br /><b>or</b>  <code>{title, icon}</code>
      </td>
      <td style="text-align:left">String or Object</td>
      <td style="text-align:left"><b>Either</b> the title of the module as a string
        <br /><b>or</b> an object with the keys <code>title</code> and <code>icon</code> where
        the value of <code>title</code> is a string and the value of <code>icon</code> is
        the url of a 32x16 pixel sprite sheet
        <br />(The first 16x16 pixels will be used in a dark theme, and second will
        be used in the light theme.)</td>
    </tr>
    <tr>
      <td style="text-align:left">serviceName</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">The name of a local service implemented by your application that will
        be invoked when a user action is performed relating to this module</td>
    </tr>
    <tr>
      <td style="text-align:left">iframe</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">The URL for the content of the module (must be an HTTPS URL)</td>
    </tr>
    <tr>
      <td style="text-align:left">options</td>
      <td style="text-align:left">Object</td>
      <td style="text-align:left">
        <p></p>
        <p>
          <br />An object, which can contain:</p>
        <ul>
          <li><code>canFloat</code>: if set to true, a menu item will be added to the
            More menu (found under the (&#x2026;) on the module frame) that, when clicked,
            will pop the module out into its own browser window</li>
          <li><code>parentModuleId</code>: if set to the ID of a module opened by an
            application, the specified module will not be closed when this module is
            shown</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

```javascript
modulesService.show(
  "hello", 
  {title: "Hello World App"}, 
  "hello:controller", 
  "https://localhost:4000/app.html", 
  {
    "canFloat": true
  }
);
```

## hide\(\)

Hide an existing application module:

```javascript
function hide(id)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | String | The id of the module that should be hidden. |

```javascript
modulesService.hide("hello");
```

## setTitle\(\)

Change the title of an existing application module:

{% hint style="info" %}
Note that this only changes the title of a specific module, not all titles of all modules created by the application.
{% endhint %}

```javascript
function setTitle(id, title)
```

| Parameters | Type | Description |
| :--- | :--- | :--- |
| id | String | The id of the module for which the title should be changed |
| **Either** `title` **or** `{title, icon}` | String or Object | **Either** the title of the module as a string **or** an object with the keys `title` and `icon` where the value of `title` is a string and the value of `icon` is the url of a 32x16 pixel sprite sheet \(The first 16x16 pixels will be used in a dark theme, and second will be used in the light theme.\) |

```javascript
modulesService.setTitle("hello", "New Module Title");
```

## focus\(\)

Focus an existing application module:

```javascript
function focus(id)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | String | The id of the module to focus |

```javascript
modulesService.focus("hello");
```

## addMenuItem\(\)

Add a menu item to the module's More \(...\) menu:

```javascript
function addMenuItem(moduleId, title, itemId)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| moduleId | String | The id of the module to which a menu item should be added |
| title | String | The title of the item being added |
| itemId | String | The id of the item being added to the menu |

## setHandler\(\)

You must specify your own application service for handling clicks on the menu item using `setHandler`.

You must implement the `menuSelect` method on your application service in order to handle clicks on the created menu item:

```javascript
function setHandler(moduleId, serviceName)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| moduleId | String | The id of the module for which menu selection is being handled |
| title | String | The name of your application service that will be called when a module menu item has been selected \(This service must previously have been registered remotely.\) |

```javascript
// The application service that will be used to handle menu item clicks
var helloAppService = SYMPHONY.services.register("hello:app");

modulesService.addMenuItem("hello", "About Hello World App", "hello-menu-item");
modulesService.setHandler("hello", "hello:app");

// Implement the menuSelect method on your application service
helloAppService.implement({
  menuSelect: function(itemId) {
    if (itemId == "hello-menu-item") {
      console.log("hello-menu-item was selected");
    }
  }
});
```

## openLink\(\)

Opens a link from your application in a new tab in the user's default browser. This method should be used to open links, rather than `<a href="..." target="_blank">...</a>`.

```javascript
function openLink(url)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| url | String | The URL to be opened |

```javascript
// This code will live in your application view.

// Assume there is a button element with id "link" on the application module
// If that button is clicked, open a Google link.

var linkButton = document.getElementById("link");

linkButton.addEventListener("click", function(){
  modulesService.openLink("https://www.google.com");
});
```

## redirect\(\)

Reloads the content of the module at the new URL.

The Client Extensions API is designed for single-page applications. Use this method with multi-page applications to load new content when users navigate to another page:

```javascript
function redirect(id, url)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | String | The unique identifier for the module. A module with this id must already exist. |
| url | String | The URL of the new iframe to load in the module. |

```javascript
onSelect : function(symbol) {
		this.modulesService.redirect(this.moduleId, MODULE.baseUrl + 'details?symbol=' + encodeURIComponent(symbol));
	},
```

