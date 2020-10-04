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

## registerRenderer\(\)

Register a renderer for a `type` of entity:

```javascript
function registerRenderer(type, options, serviceName)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| type | String | The type of entity that will be rendered by your application. Entities are namespaced using reverse domain name notation, e.g. `com.symphony.address`. |
| options | Array  | Reserved for future use. |
| serviceName | String | The name of the application service that will be used to render this entity. |

You must implement the `render()` method on the specified application service. This method will be invoked when the associated entity is rendered in the Symphony client.

## render\(\)

Renders an entity given its type and data values:

```javascript
render: function(type, data) {}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| type | String | The type of entity to be rendered. |
| data | Object | The data for the specific entity being rendered. This data is specified when the message is created. |

The render method returns an object with the following fields:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">template</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">
        <p>An ExtensionML string that specifies the object&apos;s presentation.</p>
        <p>In addition to ExtensionML tags, iframe tags are also supported.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">data</td>
      <td style="text-align:left">Object</td>
      <td style="text-align:left">An object containing the data referenced by the template. Described in
        <a
        href="https://developers.symphony.com/extension/docs/entity-advanced-templating">entity advanced templating</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left">entityInstanceId</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">A unique identifier used to reference a specific entity.</td>
    </tr>
  </tbody>
</table>

## update\(\)

Effectively re-renders an entity with new template and data objects given its entityInstanceId:

```javascript
update: function(entityInstanceId, template, data) {}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| entityInstanceId | String | The instance id of the entity to be updated |
| template | String | The updated [ExtensionML](https://symphony-developers.symphony.com/docs/extensionml) string that specifies the object presentation. |
| data | Object | The data for the entity being updated |

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

## pause\(\) and resume\(\)

The 'pause' and 'resume' methods are optional. If you choose to use the methods, implement them on the renderer service. These methods will be invoked when the associated entity is rendered in the Symphony client.

Entities are checked periodically \(every two seconds\) if they are visible on the screen.  
If an entity is completely visible, a **resume** event is triggered to the renderer service of this entity. If an entity is partially visible or completely hidden, a **pause** event is triggered instead.

Example:  
• Pause event: responsible for stopping/pausing a video transmission \(video iframe\).  
• Resume event: responsible for playing the video.

{% hint style="info" %}
Note: An entity is considered not visible when scrolling the screen down/up or when changing the module \(conversation\) to a new chat room or screen.

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

