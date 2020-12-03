# Commerce Service

Apps can offer premium functionality through licensed subscriptions. Use the `commerce` service to identify the products \(premium versions\) to which a user is subscribed:

```javascript
// To use the commerce service, you must subscribe to it from your application
var commerceService = SYMPHONY.services.subscribe("commerce");
```

## getProducts\(\)

Returns the list of products to which the user is subscribed for your app:

```javascript
function getProducts(serviceName)
```

| Parameters | Type | Description |
| :--- | :--- | :--- |
| serviceName \(optional\) | String | The name of a local application-implemented service. If passed, the `productUpdate` event will be fired on that service if the user's product subscriptions change. |

This method returns a promise that will be fulfilled with the array of products the user is subscribed to for your app. For each product, the following is returned:

```javascript
{ 
  name: "<name>", 
  type: "premium", 
  sku: "<sku>", 
  subscribed: true/false
}
```

"Premium" is the term used for paid subscription products, while "Standard" represents a freemium app. The name and SKU will be values specified by the application developer when implementing a premium version of their app.

```javascript
commerceService.getProducts('hello:controller').then(function(products) {
  console.log(products);
});
```

## productUpdate

This event is fired when the user's product subscriptions are changed.

Use the [listen](service-interface.md#listen) method on the service specified in `getProducts()` to subscribe to this event and specify a callback that will be executed when the event is fired. The callback should change the contents/features of your application to match the user's updated product subscriptions.

