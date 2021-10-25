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

| Parameter      | Type     | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| methodName     | String   | The name of the method to create on your service |
| implementation | Function | The implementation of the method                 |

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

| Parameters      | Type   | Description                                                                                                                                                |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| implementations | Object | An object containing one or more functions to create on this service, where the keys are the names of the functions and the values are the implementations |

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

| Parameters | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| methodName | String | The name of the method to call on the service |

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

| Parameters | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| eventName  | String | The name of the event to fire |

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");
helloAppService.fire('myEvent');
```

## listen()

Subscribe a service to an event that is fired by another service (or itself). This method returns a handle that can later be used to remove the listener:

```javascript
function listen(eventName, callback)
```

| Parameters | Type     | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| eventName  | String   | The name of the event to listen for                      |
| callback   | Function | The function that will be called when the event is fired |

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

| Parameters | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| eventName  | String | The name of the event to unsubscribe from |
| handle     | String | The handle returned by the call to listen |

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
