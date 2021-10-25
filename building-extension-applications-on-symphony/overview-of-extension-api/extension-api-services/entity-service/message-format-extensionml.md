# Message Format - ExtensionML

ExtensionML is a special form of markup that a front end app can use to perform custom rendering of an entity, instead of relying on Symphony to perform the default presentation.

ExtensionML is generated from a given entity and emitted by a built-in or third-party _renderer_. It is similar to [PresentationML](../../../../building-bots-on-symphony/messages/overview-of-presentationml.md) but is used for interactive presentation.

While similar to PresentationML, ExtensionML consists of a template and corresponding data. Each tag in the template can have an ID that references a value stored in the data, binding the data to whatever is being rendered. For example, multiple paragraphs in the template can reference a sentence stored in the data by ID, allowing for reuse of that sentence in multiple places within the template being rendered.

{% hint style="danger" %}
### Symphony Elements

Note: ExtensionML does not support Symphony Elements. For more information, refer to [Symphony Elements](https://docs.developers.symphony.com/v/v20.7-1.61/building-bots-on-symphony/symphony-elements).
{% endhint %}

### Standard HTML Tags <a href="standard-html-tags" id="standard-html-tags"></a>

A number of standard HTML tags are supported within templates: `b`, `u`, `i`, `strong`, `br`, `ul`, `ol`, `li`, `span`, `div`, `table`, `th`, `tr`, and `td`.

These behave like their HTML counterparts but must be properly-formatted XML. So, for example, rather than `<br>` you must use `<br/>`.

### Text Tags <a href="text-tags" id="text-tags"></a>

The following tags present text in different ways. Most of these require data to specify their content, but some can also use the content between the opening and closing tags.

| Tag            | Description                                                                                                                                                                                        | Attributes                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<formatted>`  | Adds text formatted with HTML markup. This must be properly formatted XML See [here](message-format-extensionml.md#generating-properly-formatted-xml) for information on converting HTML to XHTML. | • `id` (Required): The key of a string within the template data.                                                                                            |
| `<text>`       | Specifies regular text to be inserted into the entity. This text is inserted as is, without processing any HTML markup.                                                                            | • `id` (Optional): The key of a string within the template data. If no `id` is specified, it uses the contents between the opening and closing tags.        |
| `<label>`      | Inserts a label. Labels are like text tags but are styled differently.                                                                                                                             | • `id` (Optional): The key of a string within the template data. If no `id` is specified, it uses the contents between the opening and closing tags.        |
| `<color-text>` | Inserts a colored text. Supported colors: red, purple, green, darkGreen, blue, darkBlue, orange, grey, and yellow.                                                                                 | <p><code>id</code> (Optional): The key of an object with two members: <br>• text specifies the text to be used <br>• color is one of the listed colors.</p> |
| `<pill>`       | Inserts text with a colored background and rounded corners. Supported colors: red, purple, green, darkGreen, blue, darkBlue, orange, grey, and yellow.                                             | <p><code>id</code> (Optional): The key of an object with two members: <br>• text specifies the text to be used <br>• color is one of the listed colors.</p> |

### Extended HTML Tags <a href="extended-html-tags" id="extended-html-tags"></a>

The following HTML tags are handled in a slightly modified way:

| Tag            | Description                     | Attributes                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<a>`          | Inserts a link.                 | •  `id` (Optional): The tag must include either an `id` attribute or an `href` attribute. If `id` is specified, it must be a key to a string specifying the URL of the link. If no `id` attribute is specified, the `href` attribute is used.                                                                                      |
| `<hr>`         | Inserts a horizontal line.      | ​                                                                                                                                                                                                                                                                                                                                  |
| `<icon>`       | Displays a 16x16 pixel icon.    | • `id` (Required): The key to a text string specifying the URL to the image to display.                                                                                                                                                                                                                                            |
| `<small-icon>` | Displays a 13x13 pixel icon.    | •  `id` (Required): The key to a text string specifying the URL to the image to display.                                                                                                                                                                                                                                           |
| `<img>`        | Displays a 128x128 pixel image. | • `id` (Optional): The tag must include either an `id` attribute or an `src` attribute. If `id` is specified, it must be a key to a string specifying the URL of the link. If no `id` attribute is specified, the `src` attribute is used.                                                                                         |
| `<iframe>`     | Inserts an iframe.              | <p>• <code>src</code> (Required): The URL to the iframe. <br>• <code>height</code> (Optional): If not specified, the default height of the iframe will be 50px. The maximum height is 1000px. <br>• <code>width</code> (Optional): If not specified, the default width of the iframe will be 100%. The maximum width is 300px.</p> |

### Special Entity Tags <a href="special-entity-tags" id="special-entity-tags"></a>

| Tag         | Description        | Attributes                                                                                                                                                                                                                                 |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<mention>` | Insert a mention.  | <p>• <code>id</code> (required): The key to an object with the following members: <br>- <code>id</code>: The unique ID of the user being mentioned. <br>- <code>name</code>: The pretty name that is displayed for the mentioned user.</p> |
| `<hashtag>` | Inserts a hashtag. | • `id` (required): The key to a string specifying the hashtag. The string must be prefixed with '#'.                                                                                                                                       |
| `<cashtag>` | Inserts a cashtag. | • `id` (required): The key to a string specifying the cashtag. The string must be prefixed with '$'.                                                                                                                                       |

### Flow Control Tags <a href="flow-control-tags" id="flow-control-tags"></a>

The following flow control tags are used for entities that have conditional logic or data that can be iterated upon:

| Tag             | Description                                                                                                                                                                                                                                                                  | Attributes                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `<if>`          | Conditionally uses the enclosing template.                                                                                                                                                                                                                                   | • `id` (required): The key to the data. If there is data at the specified key, the enclosing template is used; otherwise it is skipped. |
| `<if:not-last>` | Conditionally uses the enclosing template within an iteration. If the current iteration is not the last item in the iterated list, the enclosing template is used. This is convenient when you want to add commas between list items without adding one after the last item. | ​                                                                                                                                       |
| `<if:last>`     | Conditionally uses the enclosing template within an iteration. If the current iteration is the last item in the iterated list, the enclosing template will be used.                                                                                                          | ​                                                                                                                                       |
| `<iterate>`     | Loops through the items in an array. The template between the opening and closing `iterate` tag is used for each array item. The data for the template references the data in the current list item.                                                                         | • `id` (Required): The key to an array in the data object.                                                                              |

The following example shows the XML template for an entity with flow control logic and corresponding data:

{% tabs %}
{% tab title="XML" %}
```markup
<entity>
    <label>Guild: </label><text id="guildName"/>
    <if id="webpageLink">
        <label>Web page: </label>
        <a id="webpageLink"><text id="webpageName"/></a>
    </if>
    <if id="people">
        <iterate id="people">
            <label>Name: </label><text id="name">
            <label>Notes:</label><br/>
            <formatted id="notes"/>
            <if:not-last><hr/></if:not-last>
        </iterate>
    </if>
</entity>
```
{% endtab %}
{% endtabs %}

```javascript
var data = {
    "content" = {
        "guildName": "Loyal Order of Water Buffalo",
        "webpageLink": "https://www.waterbuffalo.net/bedrock",
        "webpageName": "The Loyal Order of Water Buffalo, Bedrock Chapter",
        "people": [{
            "name": "Fred Flintstone",
            "notes": "Yabba Dabba Dooooo!"
        },
        {
            "name": "Barney Rubble",
            "notes": "Fred's sidekick"
        },
        {
            "name": "Dino",
            "notes": "He's kind of like a dog, but also a small sauropod. Yaps a lot.<br/> Really odd, he spoke in his first appearance."
        }]
    }
}
```

### Generating Properly Formatted XML

The following function can be used to turn HTML into properly formatted XML:

{% tabs %}
{% tab title="xmlize" %}
```javascript
function xmlize(html) {
    return new XMLSerializer().serializeToString($('<span>').html(html)[0])
}
```
{% endtab %}
{% endtabs %}
