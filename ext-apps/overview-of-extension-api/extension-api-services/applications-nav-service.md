# Applications-Nav Service

The Applications navigation section is found at the bottom of the left-hand sidebar of the Symphony client workspace. Use the `applications-nav` service to create a navigation item for your application:

```javascript
// To use the applications-nav service, you must subscribe to it from your application
var navService = SYMPHONY.services.subscribe("applications-nav");
```

The following methods are available on the `applications-nav` service:

* add
* remove
* count
* rename
* focus

## add()

Add a new navigation item to the Applications section of the left-hand sidebar:

```javascript
function add(id, title, serviceName)
```

<table data-header-hidden><thead><tr><th width="156.33333333333331">Parameter</th><th width="104">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>A unique id for this navigation item (must be unique across all navigation items of a given application)</td></tr><tr><td><strong>Either</strong> <code>title</code> <strong>or</strong> <code>{title, icon}</code></td><td>String or Object</td><td><strong>Either</strong> the title of the left navigation item as a string <strong>or</strong> an object with the keys title and icon where the value of title is a string and the value of icon is the url of a square SVG (recommended), or a 32x16 pixel sprite sheet (Only the first 16x16 pixels will be used. The same sprite sheet can be used when displaying a module.)</td></tr><tr><td>serviceName</td><td>String</td><td>The name of a local service implemented by your application that will be invoked when a user action is performed relating to the application navigation</td></tr></tbody></table>

{% hint style="info" %}
Note: You must implement the `select` method on your application service in order to handle clicks on the created left navigation item.
{% endhint %}

```javascript
// The application service that will be used to handle left navigation item clicks
var helloControllerService = SYMPHONY.services.register("hello:controller");

navService.add("hello-nav", "Hello World App", "hello:controller");

// Implement the select method on your application service
helloControllerService.implement({
  select: function(id) {
    if (id == "hello-nav") {
      console.log("hello-nav was selected.");
    }
  }
});
```

## remove()

Remove an existing application navigation item:

```javascript
function remove(id)
```

<table data-header-hidden><thead><tr><th width="152.33333333333331">Parameter</th><th width="91">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>The id of the navigation item that should be removed</td></tr></tbody></table>

```javascript
navService.remove('hello-nav');
```

## count()

Set the badge (notification) count on an application navigation item:

```javascript
function count(id, count)
```

<table data-header-hidden><thead><tr><th width="136.33333333333331">Parameter</th><th width="118">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>The id of the navigation item that should have its count updated</td></tr><tr><td>count</td><td>Integer</td><td>The new badge count number. Specifying 0 will hide the badge count.</td></tr></tbody></table>

```javascript
navService.count("hello-nav", count);
```

## rename()

Change the title of an existing application navigation item.

Note that this only changes the title of a specific navigation item -- not to all navigation items created by the application:

```javascript
function rename(id, title)
```

<table data-header-hidden><thead><tr><th width="155.33333333333331">Parameter</th><th width="104">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td><code>id</code></td><td>String</td><td>The id of the navigation item that should be renamed</td></tr><tr><td><strong>Either</strong> <code>title</code> <strong>or</strong> <code>{title, icon}</code></td><td>String or Object</td><td><strong>Either</strong> the title of the left navigation item as a string <strong>or</strong> an object with the keys title and icon where the value of title is a string and the value of icon is the url of a square SVG (recommended), or a 32x16 pixel sprite sheet (Only the first 16x16 pixels will be used. The same sprite sheet can be used when displaying a module.)</td></tr></tbody></table>

```javascript
navService.rename('hello-nav', 'New Left Nav Title');
```

## focus()

Focus an existing application navigation item:

```javascript
function focus(id)
```

<table data-header-hidden><thead><tr><th width="146.33333333333331">Parameter</th><th width="98">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td><code>id</code></td><td>String</td><td>The id of the application navigation item to focus</td></tr></tbody></table>

```javascript
navService.focus("hello-nav");
```
