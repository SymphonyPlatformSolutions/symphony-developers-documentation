# Service Interface

Both the Client Extensions API services and your application services use the same interface. The service interface consists of the following methods:

* implement
* invoke
* fire
* listen
* remove

## Implement:

Create a method on a service and specify the implementation.

```javascript
function implement(methodName, implementation)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| methodName | String | The name of the method to create on your service |
| implementation | Function | The implementation of the method |

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

| Parameters | Type | Description |
| :--- | :--- | :--- |
| implementations | Object | An object containing one or more functions to create on this service, where the keys are the names of the functions and the values are the implementations |

```javascript
var helloAppService = SYMPHONY.services.register("hello:app");

helloAppService.implement({
	helloWorld: function() {
  	console.log("Hello World!");
  }
});
```

## Invoke:



