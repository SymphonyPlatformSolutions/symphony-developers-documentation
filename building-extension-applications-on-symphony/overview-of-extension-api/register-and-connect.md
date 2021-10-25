# Register and Connect

You must register your application controller with Symphony and connect your application views using the `SYMPHONY.application` methods. During this time, the [Services](extension-api-services/) that will be used by your application must be specified.

## SYMPHONY.application.register()

Register an application controller with the Symphony client. Additionally, subscribe the application to remote services and register local services that can be used remotely. Returns a promise that will be fulfilled when registration is complete.

This method must be called before the application can [register or subscribe](extension-api-services/register-and-subscribe.md) to any services.

```javascript
register : function(id, servicesWanted, servicesSent)
```

| Parameter        | Type             | Description                                                                                                                                                                                  |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | String           | The id of your application. For partner apps, this is an alphanumeric string chosen by the partner. For custom enterprise apps, this is generated when creating the app in the Admin Portal. |
| `servicesWanted` | Array of Strings | A list of names of remote services that your application wants to subscribe to                                                                                                               |
| `servicesSent`   | Array of Strings | A list of names of local services your application wants to make available remotely (any implemented methods on this service will be made available remotely)                                |

| Returns           | Type   | Description                                                                                                           |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `userReferenceId` | String | A unique anonymized identifier for the user in context that will perpetuate until the user uninstalls the application |

```javascript
// Register the "hello" application with the Symphony client
// Subscribe our application to Symphony's services
// Register the "hello" app's controller service (this service must be registered using SYMPHONY.services.register())
SYMPHONY.application.register(
  "hello",
  ["modules", "applications-nav", "ui", "share", "commerce"],
  ["hello:controller"]
).then(function(response) {
  var userId = response.userReferenceId;
}));
```

## SYMPHONY.application.connect()

Connect an application view to an existing application that has been registered with Symphony. Additionally, subscribe the application to remote services and register local services that can be used remotely. Returns a promise that will be fulfilled when connection is complete.

```javascript
connect : function(id, servicesWanted, servicesSent)
```

| Parameter        | Type             | Description                                                                                                                                                                                  |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | String           | The id of your application. For partner apps, this is an alphanumeric string chosen by the partner. For custom enterprise apps, this is generated when creating the app in the Admin Portal. |
| `servicesWanted` | Array of Strings | A list of names of remote services that your application wants to subscribe to                                                                                                               |
| `servicesSent`   | Array of Strings | A list of names of local services your application wants to make available remotely (any implemented methods on this service will be made available remotely)                                |

| Returns           | Type   | Description                                                                                                           |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `userReferenceId` | String | A unique anonymized identifier for the user in context that will perpetuate until the user uninstalls the application |

```javascript
// Connect an application view to the "hello" application
// Subscribe our application to Symphony's services
// Register the "hello" app's view service (this service must be registered using SYMPHONY.services.register())
SYMPHONY.application.connect(
  "hello",
  ["modules", "applications-nav", "ui", "share", "commerce"],
  ["hello:app"]
).then(function(response) {
  var userId = response.userReferenceId;
}));
```
