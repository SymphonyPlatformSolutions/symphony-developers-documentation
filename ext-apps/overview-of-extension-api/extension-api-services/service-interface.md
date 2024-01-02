# Service Interface

Both the Client Extensions API services and your application services use the same interface. The service interface consists of the following methods:

* [implement](service-interface.md#implement)
* [invoke](service-interface.md#invoke)
* [fire](service-interface.md#fire)
* [listen](service-interface.md#listen)
* [remove](service-interface.md#remove)

## implement()

Create a method on a service and specify the implementation.

```javascript
function implement(methodName, implementation)
```

<table data-header-hidden><thead><tr><th width="186">Parameter</th><th width="116.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>methodName</td><td>String</td><td>The name of the method to create on your service</td></tr><tr><td>implementation</td><td>Function</td><td>The implementation of the method</td></tr></tbody></table>

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");

helloAppService.implement("helloWorld", function() {
    console.log("Hello World!");
});
```

Alternately, create several methods on a service at once by specifying an object consisting of multiple functions:

```javascript
function implement(implementations)
```

<table data-header-hidden><thead><tr><th width="182.33333333333331">Parameters</th><th width="86">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>implementations</td><td>Object</td><td>An object containing one or more functions to create on this service, where the keys are the names of the functions and the values are the implementations</td></tr></tbody></table>

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");

helloAppService.implement({
    helloWorld: function() {
      console.log("Hello World!");
  }
});
```

## invoke()

Call a method on a service. Any extra parameters passed to this method will be sent as arguments to the service method:

```javascript
function invoke(methodName, ...)
```

<table data-header-hidden><thead><tr><th width="190.33333333333331">Parameters</th><th width="116">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>methodName</td><td>String</td><td>The name of the method to call on the service</td></tr></tbody></table>

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");

helloAppService.implement("helloWorld", function() {
    console.log("Hello World!");
});

helloAppService.invoke("helloWorld");
```

## fire()

Fire an event from a service. Any extra parameters passed to this method will be passed to the callbacks defined by services that listen to this event:

```javascript
function fire(eventName, ...)
```

<table data-header-hidden><thead><tr><th width="152.33333333333331">Parameters</th><th width="125">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>eventName</td><td>String</td><td>The name of the event to fire</td></tr></tbody></table>

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");
helloAppService.fire('myEvent');
```

## listen()

Subscribe a service to an event that is fired by another service (or itself). This method returns a handle that can later be used to remove the listener:

```javascript
function listen(eventName, callback)
```

<table data-header-hidden><thead><tr><th width="168.33333333333331">Parameters</th><th width="127">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>eventName</td><td>String</td><td>The name of the event to listen for</td></tr><tr><td>callback</td><td>Function</td><td>The function that will be called when the event is fired</td></tr></tbody></table>

{% hint style="info" %}
The `listen` namespace is the same as the namespace for methods, thus names must be unique across both service methods and events.
{% endhint %}

```javascript
var uiService = SYMPHONY.services.subscribe("ui");

// themeChangeV2 is an event fired by the UI service when the user changes his theme or font. The themeV2 object which contains the theme name and font size is also passed along with the event.
uiService.listen("themeChangeV2", function() {
  themeColor = data.themeV2.name;
  themeSize = data.themeV2.size;
  console.log("The user changed his theme color to " + themeColor " and font size to " + themeSize ".");
});
```

## remove()

Unsubscribe a service from an event:

```javascript
function remove(eventName, handle)
```

<table data-header-hidden><thead><tr><th width="167.33333333333331">Parameters</th><th width="112">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>eventName</td><td>String</td><td>The name of the event to unsubscribe from</td></tr><tr><td>handle</td><td>String</td><td>The handle returned by the call to listen</td></tr></tbody></table>

```javascript
var uiService = SYMPHONY.services.subscribe("ui");

// themeChangeV2 is an event fired by the UI service when the user changes his theme or font. The themeV2 object which contains the theme name and font size is also passed along with the event.
var handle = uiService.listen("themeChangeV2", function() {
  themeColor = data.themeV2.name;
  themeSize = data.themeV2.size;
  // Styling is achieved by specifying the appropriate classes on the app module's body element.
  document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
  console.log("The user changed his theme color to " + themeColor " and font size to " + themeSize ".");
});

uiService.remove("themeChangeV2", handle);
```

