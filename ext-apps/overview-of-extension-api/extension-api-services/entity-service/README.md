# Entity Service

Use the `entity` service to allow your app to render a Structured Object created by the REST API within a message:

```javascript
var entityService = SYMPHONY.services.subscribe("entity");
```

The following methods are available on the `entity` service:

* [registerRenderer](./#registerrenderer)
* [render](./#render)
* [update](./#update)
* [pause and resume](./#pause-and-resume)

## registerRenderer()

Register a renderer for a `type` of entity:

```javascript
function registerRenderer(type, options, serviceName)
```

<table data-header-hidden><thead><tr><th width="139.33333333333331">Parameter</th><th width="84.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>type</td><td>String</td><td>The type of entity that will be rendered by your application. Entities are namespaced using reverse domain name notation, e.g. <code>com.symphony.address</code>.</td></tr><tr><td>options</td><td>Array</td><td>Reserved for future use.</td></tr><tr><td>serviceName</td><td>String</td><td>The name of the application service that will be used to render this entity.</td></tr></tbody></table>

You must implement the `render()` method on the specified application service. This method will be invoked when the associated entity is rendered in the Symphony client.

## render()

Renders an entity given its type and data values:

```javascript
render: function(type, data) {}
```

<table data-header-hidden><thead><tr><th width="118.33333333333331">Parameter</th><th width="112">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>type</td><td>String</td><td>The type of entity to be rendered.</td></tr><tr><td>data</td><td>Object</td><td>The data for the specific entity being rendered. This data is specified when the message is created.</td></tr></tbody></table>

The render method returns an object with the following fields:

<table data-header-hidden><thead><tr><th width="175.33333333333331">Parameter</th><th width="102">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>template</td><td>String</td><td><p>An ExtensionML string that specifies the object's presentation.</p><p>In addition to ExtensionML tags, iframe tags are also supported.</p></td></tr><tr><td>data</td><td>Object</td><td>An object containing the data referenced by the template. Described in <a href="entity-advanced-templating.md">entity advanced templating</a>.</td></tr><tr><td>entityInstanceId</td><td>String</td><td>A unique identifier used to reference a specific entity.</td></tr></tbody></table>

## update()

Effectively re-renders an entity with new template and data objects given its entityInstanceId:

```javascript
update: function(entityInstanceId, template, data) {}
```

<table data-header-hidden><thead><tr><th width="170.33333333333331">Parameter</th><th width="86">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>entityInstanceId</td><td>String</td><td>The instance id of the entity to be updated</td></tr><tr><td>template</td><td>String</td><td>The updated <a href="message-format-extensionml.md">ExtensionML</a> string that specifies the object presentation.</td></tr><tr><td>data</td><td>Object</td><td>The data for the entity being updated</td></tr></tbody></table>

### Sample Renderer Application

```javascript
// The application service that will be used to handle entity renderering
const helloControllerService = SYMPHONY.services.register("hello:controller");

const entityService = SYMPHONY.services.subscribe("entity");
entityService.registerRenderer(
  "com.symphony.address",
  {},
  "hello:controller"
);

// Implement the trigger method on your application service
helloControllerService.implement({
  render: (type, data) => {
    const template = "<entity><span>Street Address: <text id='address'/></span><br/><span>City: Palo Alto</span><br/><span>State: California</span><br/><span>Zip Code: 94304</span></entity>"
    entityInstanceId = "0";

    if (type == "com.symphony.address") {
      const newTemplate = "<entity><span>The message is updated</span></entity>";
      // Update the entity after 5 seconds with a new template
      setTimeout(() => {
        entityService.update(entityInstanceId, newTemplate, {});
      }, 5000);

      return {
        template,
        data,
        entityInstanceId
      };
    }
  }
});
```

## pause() and resume()

The 'pause' and 'resume' methods are optional. If you choose to use the methods, implement them on the renderer service. These methods will be invoked when the associated entity is rendered in the Symphony client.

Entities are checked periodically (every two seconds) if they are visible on the screen.\
If an entity is completely visible, a **resume** event is triggered to the renderer service of this entity. If an entity is partially visible or completely hidden, a **pause** event is triggered instead.

Example:\
• Pause event: responsible for stopping/pausing a video transmission (video iframe).\
• Resume event: responsible for playing the video.

{% hint style="info" %}
Note: An entity is considered not visible when scrolling the screen down/up or when changing the module (conversation) to a new chat room or screen.

If the entity has an `iframeId`, it will be passed in the invocation of the methods, otherwise the `entityInstanceId` will be used instead.
{% endhint %}

## iFrame Tag Support

In addition to [ExtensionML](https://symphony-developers.symphony.com/docs/extensionml) tags, `iframe` tags are also supported in the `template` parameter:

```javascript
helloControllerService.implement({
  render: function(type, data) {
    if (type == "com.symphony.address") {
      return {
        template: '<entity><iframe src="http://your-site.com/iframe-url.html" /></entity>',
        data: {}
      };
    }
  }
});
```
