# Entity Advanced Templating

The `template`parameter in the `render()` function of the [entity Service](./) is an [ExtensionML](message-format-extensionml.md) string used to render entities. To render a static object or an iFrame, you can use advanced templating.

For a full ExtensionML reference, continue here:

{% content-ref url="message-format-extensionml.md" %}
[message-format-extensionml.md](message-format-extensionml.md)
{% endcontent-ref %}

## Template and Data

You can create a reusable `template` that leverages the values in the `data` object for the specific object. When using the `data` for these attributes, the template uses the `id` attribute on the tag to specify which member of the data object holds these attributes.

For example, the template and data below could be used to display a link within a Symphony message:

```markup
<!-- A <text> primitive must be used to inject 
     text objects from the JSON data into the template -->
<messageml>
  <a id="url"><text id="text"></a>
</messageml>
```

```javascript
{
  url: "https://www.symphony.com",
  text: "Symphony website"
}
```

## Flow Control Tags

Use the following flow control tags to support entities that have conditional logic or recursive data:

<table data-header-hidden><thead><tr><th width="188">Tag</th><th>Description</th></tr></thead><tbody><tr><td>Tag</td><td>Description</td></tr><tr><td><code>&#x3C;if></code></td><td>Use this tag to conditionally use the enclosing template. This tag must include an <code>id</code> attribute. If there is data at the <code>key</code> specified by the <code>id</code>, then the enclosing template will be used, otherwise it will be skipped.</td></tr><tr><td><code>&#x3C;if:last></code></td><td>Use this tag within an iteration to conditionally use the enclosing template. If the current iteration is the last item in the iterated list, the enclosing template will be used.</td></tr><tr><td><code>&#x3C;if:not-last></code></td><td>Use this tag within an iteration to conditionally use the enclosing template. If the current iteration is not last item in the iterated list, the enclosing template will be used. This is useful to add commas between items in a list, without adding one to the last item.</td></tr><tr><td><code>&#x3C;iterate></code></td><td>Use this tag to loop through the items in an array. The template between the opening and closing <code>&#x3C;iterate></code> tag will be used for each item in the array. The data for the template will reference the data in current the list item. This tag must include an <code>id</code> attribute. This must be the <code>key</code> to an array in the <code>data</code> object.</td></tr></tbody></table>

## Interactivity Tags

Use the following tags to have interactivity on messages by implementing methods that are called to execute business logic:

<table data-header-hidden><thead><tr><th width="161">Tag</th><th>Description</th></tr></thead><tbody><tr><td>Tag</td><td>Description</td></tr><tr><td><code>&#x3C;action></code></td><td>Use this tag to enable clicks on entities. For more information on how to use the <code>action</code> tag, refer to <a href="entity-advanced-templating.md#using-actions">Using Actions</a>.</td></tr></tbody></table>

### Using Actions

The following steps show examples on how to use actions.

1. Add the `<action>` tag to an entity template.

```markup
<entity id="survey-voting-template" class="template">
    <card id="card">
        <h3>How did you like today's <text id="type"/> from <text id="venue"/>?</h3>
        <p>
            Please provide feedback by clicking one of the stars below to rate the meal.
        </p>
        <p>
            <action id="onestar"/>
            <action id="twostars"/>
            <action id="threestars"/>
            <action id="fourstars"/>
            <action id="fivestars"/>
        </p>
        <p>
            Voting ends at <text id="end"/>
        </p>
    </card>
</entity>
```

1. The data field of the entity must have objects that match the actions ids. For these objects, we can     provide an icon, a label and a service name for the action.

```javascript
 onestar: {
                icon: 'icon_url',
                label: '',
                service: serviceName,
                data: {}
              }
```

1. Implement an action method for the service of the entity renderer. This method will be called once the `<action>` tag is clicked.

```javascript
action: function(data){
    console.log(data);
        }
```
