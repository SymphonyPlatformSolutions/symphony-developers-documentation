# Extension Applications + Structured Objects

Structured Objects are rich, inline, interactive components for Symphony messages. By injecting a structured object as a JSON payload inside a Symphony message, Symphony is able to richly display this message beyond what is possible with normal text or attachment files. In order to render these structured objects, though, an extension app must have a registered renderer that matches the unique identifier placed on the object. 

When a message is sent along with a structured object via the API, the Symphony client checks to see if there is a custom renderer registered. If one exists that matches the identifier of the structured object itself, the message and the data are dynamically rendered as specified by the custom renderer supplied by the extension application. If no custom renderer matches the identifier of the structured object, the message will be rendered normally.

{% hint style="info" %}
Note: This guide is an overview of how to leverage the Extension API and BDK implementation. For an in depth reference of the Entity Service, refer to the [Entity Service guide](../overview-of-extension-api/extension-api-services/entity-service/).
{% endhint %}

## 1.  Entity Service

In order for your extension application to replace the presentation of structured object, your extension app must subscribe to the `entity` service provided by the Extension API:

```javascript
const entity = SYMPHONY.services.subscribe('entity');
```

After subscribing to this service, extension apps must then implement the `registerRenderer()` method which registers a custom renderer for a given `type` of entity or Structured Object:

```javascript
entity.registerRenderer(type, {}, `${APP_ID}:enricher`)
```

The `registerRenderer()` method takes in the following parameters:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | String | The type of entity that will be rendered by your application.  Entities are namespaced using reverse domain name notation e.g. `com.symphony.address` |
| `options` | Array | Reserved for future use |
| `serviceName` | String | The name of the application service that will be used to render this entity |

Once each of your renderers has been registered, the next step is to actually define the implementation for your custom renderer. To do so, you must implement the `render()` method provided by the entity service:

{% hint style="info" %}
This `render()`method will be called each time a Structured Object id matches the type specified in your `registerRenderer()`function.
{% endhint %}

```javascript
entity.render(type, data)
```

The `render()` method takes in the following parameters:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | String | The type of entity to be rendered |
| `data` | Object | The data for the specific entity being rendered \(object injected into message as JSON\) |

This `render()` method returns the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `template` | String | An ExtensionML string that specifies the object's presentation. |
| `data` | Object | An object containing the data referenced by the template |
| `entityInstanceId` \(optional\) | String | A unique identifier used to reference a specific entity |

The template String returned by the `render()` method can be generated by a built-in or third-party renderer. For example, the implementation of the `render()` method supplied by the BDK's App Template uses a built in handlebars renderer engine to produce valid template strings. These templates are then subsequently rendered by the Symphony client in order to display a rich, inline message to the end-user.

## 2.  Add Custom Business Logic

Now that you understand how the `entity` service is used to register and render structured objects as rich, inline messages, let's now take a look at the intuitive implementation provided by the BDK. In addition, we will learn how to create our own custom renderers within our extension app in order to dynamically render structured objects in Symphony:

{% page-ref page="../tutorials/building-an-extension-app-with-structured-objects.md" %}

