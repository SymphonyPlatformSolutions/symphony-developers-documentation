# Register and Subscribe

In order to leverage the services provided by the Client Extension API, you must first subscribe to them. To use your applications own services, you must register them via the Client Extension API. Extension apps can register and subscribe to local and remote services in the following ways:

## SYMPHONY.services.make()

Creates a new local service and register it using existing classes:

If you are developing an Object-Oriented Application, `SYMPHONY.services.make()` allows you to use a class as a prototype for implementing service methods, allowing you to choose which methods of the class will be available in the service by specifying them in the `implements` list.

This cannot be and this cannot be achieved by the `SYMPHONY.services.register()` function, which is only recommended when creating small services since it does not require any class, and it only requires the `serviceName`. If you use `SYMPHONY.services.register()` for large services, you will have to call `service.implement()` passing an object to it. As a result, all the methods will be public and the code might look unorganized.

```javascript
SYMPHONY.services.make(name, context, methods, makeEventHandlers)
```

| Parameter         | Description                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| name              | The name of the service being created                                                                                              |
| context           | The object instance, usually **this**                                                                                              |
| methods           | The names of the methods of this object that will be available on the created service                                              |
| makeEventHandlers | If true, the methods listen and fire will be added to this instance. Calling the listen or fire objects will do so on the service. |

```javascript
class Navigation {
    implements = ['ready', 'select'];
    serviceName = 'sample-navigation';

    register() {
        SYMPHONY.services.make(this.serviceName, this, this.implements, true);
    }

    ready() {
        this.nav = SYMPHONY.services.subscribe('applications-nav');
        this.nav.add('sample', 'My App', this.serviceName)
    }

    select() {
    // do something here
    }
}

var service = new Navigation();
service.register()
```

## SYMPHONY.services.register()

Creates a new local service and register it to be used by a specific application view or your application controller:

{% hint style="info" %}
`SYMPHONY.services.register()` is an alternative method for creating a new local service and it is recommended only when creating small services.\
For Object-Oriented Applications, the use of the `SYMPHONY.services.make()` is recommended since it uses the class as a prototype for implementing the service methods.
{% endhint %}

```javascript
register: function(serviceName)
```

| Parameter   | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| serviceName | String | The name of the service to register |

{% hint style="info" %}
Local services should be namespaced using a string representing the application followed by a colon. For example: `hello:controller`.
{% endhint %}

```javascript
// hello:controller is a service implemented by my application
var helloControllerService = SYMPHONY.services.register("hello:controller");
```

## SYMPHONY.services.subscribe()

Finds a service - either local or remote - that has been registered and returns it. Returns false if the service does not exist.

In order to use a service, it must have been requested by your application during `application.register()` or `application.connect()` .

```javascript
subscribe : function(serviceName)
```

| Parameter   | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| serviceName | String | The name of the service to subscribe to |

```javascript
// modules is a service provided by the Client Extensions API
var modulesService = SYMPHONY.services.subscribe("modules");
```

## SYMPHONY.remote.register()

Takes an existing local service and makes it available remotely. Use this to make services available between multiple application views or between your application view and controller:

```javascript
register : function(serviceName)
```

| Parameter   | Type   | Description                                                       |
| ----------- | ------ | ----------------------------------------------------------------- |
| serviceName | String | The name of the existing local service to make available remotely |

## SYMPHONY.remote.subscribe()

Imports a remote service and makes it available locally. Returns a promise which resolves to a reference to a service. This service would now be available in your registry using `SYMPHONY.services.subscribe:`

```javascript
subscribe : function(serviceName)
```

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| serviceName | String | The name of the remote service that you would like to access locally. |
