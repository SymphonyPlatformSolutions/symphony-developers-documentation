# Register and Connect

You must register your application controller with Symphony and connect your application views using the `SYMPHONY.application` methods. During this time, the [Services](extension-api-services/) that will be used by your application must be specified.

## SYMPHONY.application.register()

Register an application controller with the Symphony client. Additionally, subscribe the application to remote services and register local services that can be used remotely. Returns a promise that will be fulfilled when registration is complete.

This method must be called before the application can [register or subscribe](extension-api-services/register-and-subscribe.md) to any services.

```javascript
register : function(id, servicesWanted, servicesSent)
```

<table data-header-hidden><thead><tr><th width="185.33333333333331">Parameter</th><th width="158">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td><code>id</code></td><td>String</td><td>The id of your application. For partner apps, this is an alphanumeric string chosen by the partner. For custom enterprise apps, this is generated when creating the app in the Admin Portal.</td></tr><tr><td><code>servicesWanted</code></td><td>Array of Strings</td><td>A list of names of remote services that your application wants to subscribe to</td></tr><tr><td><code>servicesSent</code></td><td>Array of Strings</td><td>A list of names of local services your application wants to make available remotely (any implemented methods on this service will be made available remotely)</td></tr></tbody></table>

<table data-header-hidden><thead><tr><th width="207.33333333333331">Returns</th><th width="100">Type</th><th>Description</th></tr></thead><tbody><tr><td>Returns</td><td>Type</td><td>Description</td></tr><tr><td><code>userReferenceId</code></td><td>String</td><td>A unique anonymized identifier for the user in context that will perpetuate until the user uninstalls the application</td></tr></tbody></table>

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

<table data-header-hidden><thead><tr><th width="211.33333333333331">Parameter</th><th width="157">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td><code>id</code></td><td>String</td><td>The id of your application. For partner apps, this is an alphanumeric string chosen by the partner. For custom enterprise apps, this is generated when creating the app in the Admin Portal.</td></tr><tr><td><code>servicesWanted</code></td><td>Array of Strings</td><td>A list of names of remote services that your application wants to subscribe to</td></tr><tr><td><code>servicesSent</code></td><td>Array of Strings</td><td>A list of names of local services your application wants to make available remotely (any implemented methods on this service will be made available remotely)</td></tr></tbody></table>

<table data-header-hidden><thead><tr><th width="213.33333333333331">Returns</th><th width="131">Type</th><th>Description</th></tr></thead><tbody><tr><td>Returns</td><td>Type</td><td>Description</td></tr><tr><td><code>userReferenceId</code></td><td>String</td><td>A unique anonymized identifier for the user in context that will perpetuate until the user uninstalls the application</td></tr></tbody></table>

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
