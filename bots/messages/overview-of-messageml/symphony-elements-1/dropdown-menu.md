# Dropdown Menu

Allows the user to select an option among a static list of items.

The dropdown menu is represented as a set  `<options>` items nested into a  `<select>` tag.\
Each `<option>` element have a `value` attribute containing the data value to submit in the form when that option is selected; You can also include a `selected` attribute on an `<option>` element to make it selected by default when the page first loads.

![](<../../../../.gitbook/assets/dropdown 2.0.png>)

## Attributes

<table data-header-hidden><thead><tr><th width="149">Attribute</th><th width="117">Type</th><th width="166">Required?</th><th>Description</th></tr></thead><tbody><tr><td>Attribute</td><td>Type</td><td>Required?</td><td>Description</td></tr><tr><td><code>name</code></td><td>String</td><td>Yes</td><td>Required attribute of the <code>&#x3C;select></code> tag. It identifies the dropdown menu.</td></tr><tr><td><code>required</code></td><td>Boolean</td><td>Optional</td><td>Optional attribute of the <code>&#x3C;select></code> tag. it is a Boolean attribute indicating that an option with a non-empty string value must be selected.</td></tr><tr><td><code>value</code></td><td>String</td><td>Yes</td><td>Required attribute of the <code>&#x3C;option></code> tag. It contains the data value to submit to the server when that option is selected.</td></tr><tr><td><code>selected</code></td><td>Boolean</td><td>Optional</td><td>You can include a selected attribute on an <code>&#x3C;option></code> element to make it selected by default when the page first loads. Accepted values: <code>true</code> and <code>false</code>.</td></tr><tr><td><code>data-placeholder</code></td><td>String</td><td>Optional</td><td>Text displayed in the dropdown menu before an option is selected. It can be a short hint or a title for the dropdown menu.</td></tr><tr><td><code>title</code></td><td>It accepts a simple text and <code>\n</code> for line breaks</td><td>Optional</td><td>The description that will be displayed when clicking the tooltip icon located on top of the Masked Text Field Element. Max length: 256 characters.</td></tr><tr><td><code>label</code></td><td>String</td><td>Not required but it is recommended if <code>title</code> is defined</td><td>Definition of the label that will be displayed on top of the Masked Text Field Element.</td></tr><tr><td><code>multiple</code></td><td>String<br>Boolean</td><td>Optional<br>Default is false</td><td>Allows users to select multiple values and the developer to send dropdown with multiple preselected options.</td></tr><tr><td><code>min</code></td><td>String<br>Integer ≥ 2 and ≤ <code>max</code> attribute</td><td>Optional<br>Can be used only if <code>multiple</code> attribute is set to true</td><td>Minimum number of options to be selected by the Symphony user.<br><br><em>NB: If undefined, no minimum option needs to be selected. Please use <code>required</code> attribute if you want to set min to 1.</em></td></tr><tr><td><code>max</code></td><td>String<br>Integer ≥ 2</td><td>Optional<br>Can be used only if <code>multiple</code> attribute is set to true</td><td>Maximum number of options to be selected by the Symphony user.<br><br><em>NB: If undefined, user will be able to select as many options as wished. Please use <code>multiple</code> attribute set to false if you want to set max to 1.</em></td></tr><tr><td><code>auto-submit</code></td><td>Boolean</td><td>Optional<br>Default is false</td><td>When enabled, selecting a value will submit the form.</td></tr><tr><td><code>formnovalidate</code></td><td>Boolean</td><td>Optional<br>Default is false</td><td>Only valid when <code>auto-submit</code> is true.<br>When set to true, this submit menu bypasses the form validation (required fields and regular expressions), meaning that the user can submit using this drop down menu even if the form validation is in error.</td></tr></tbody></table>

## Rules and Limitations

The `<select>` tag:

* Select tags only accept `<option>` tags as children. The `<select>` tag must contain at least one `<option>` tag.
* By default, a user can select only one option from the dropdown menu. However, using the attribute `multiple` set to true together with min and max attributes, users will be able to select several options from the dropdown. Please see below the examples to know how to use these attributes.

The `<option>` tag:

* The `<option>` tag contains a required text node, which specifies the text that will be displayed for that option inside the dropdown menu.
* The only valid attributes of the `<option>` tag are `value` and `selected`.
* Only one `<option>` of a given select can have the attribute `selected` as true.

If neither the `selected` or `data-placeholder` attributes are set, the default text (title) of the dropdown menu will be "Dropdown".

{% hint style="info" %}
Message Size Limit:

When designing forms with dropdown menus that include a very large number of options you may hit the characters limit of a Symphony message. For more information about message size limits, refer to [#message-size-limits](../../#message-size-limits "mention").
{% endhint %}

## Examples

The following examples show dropdown menus being used as follows:

* The first dropdown (_init_) shows how to display a **default preselected option** ("opt2": "With selected option"). Note that the preselected option is sent to the payload when submitting the form.
* The second dropdown (_data-placeholder_) shows how a **placeholder text** ("Only data-placeholder") is displayed in the UI. Please note the placeholder text is not sent in the payload if no option from the dropdown menu has been selected by the enduser.
* The third dropdown (_noreq_) shows how a user can interact with a **non-required** field. Even no option is selected by the user, it does not prevent the enduser from submitting the form.
* The fourth dropdown (_req_) shows the behaviour of the unique **required** field of the form, which cannot be submitted in case no option from the dropdown menu is selected by the user; an error is displayed under the field in case the user submits the form with this empty field.
* The fifth dropdown (_label_) shows how a **label text** ("My Label") is displayed.
* The sixth dropdown (_tooltip_) shows how a **title text** ("My Tooltip/n With a second line") is inserted in the UI under the (i) icon, and how the text entered in the title parameter is displayed when the enduser clicks on the icon.
* The seventh dropdown (multiple) shows how to combine **multiple** attribute with **min/max** rules to guide users selecting between 3 and 5 options.

![](../../../../.gitbook/assets/elements_dropdown.gif)

{% tabs %}
{% tab title="MessageML" %}
```markup
<messageML>
  <form id="form_id">
    <h2>dropdown menus</h2>
      <select name="init"><option value="opt1">Unselected option 1</option><option value="opt2" selected="true">With selected option</option><option value="opt3">Unselected option 2</option></select>
      <select name="data-placeholder" data-placeholder="Only data-placeholder"><option value="opt1">Unselected option 1</option><option value="opt2">Unselected option 2</option><option value="opt3">Unselected option 3</option></select>
      <select name="noreq" data-placeholder="Not required"><option value="opt1">First</option><option value="opt2">Second</option><option value="opt3">Third</option></select>
      <select name="req" required="true" data-placeholder="Required"><option value="opt1">First</option><option value="opt2">Second</option><option value="opt3">Third</option></select>
      <select name="label" label="My Label" data-placeholder="With Label"><option value="opt1">Unselected option 1</option><option value="opt2">Unselected option 2</option><option value="opt3">Unselected option 3</option></select>
      <select name="tooltip" title="My Tooltip\n With a second line" data-placeholder="With Tooltip"><option value="opt1">Unselected option 1</option><option value="opt2">Unselected option 2</option><option value="opt3">Unselected option 3</option></select>
      <select name="multiple" label="With multiple select options - between 3 and 5" multiple="true" min="3" max="5"><option value="opt1" selected="true">Preselected option 1</option><option value="opt2" selected="true">Preselected option 2</option><option value="opt3" selected="true">Preselected option 3</option><option value="opt4">Unselected option 4</option><option value="opt5">Unselected option 5</option><option value="opt6">Unselected option 6</option></select>
      <button name="dropdown">Submit</button>
  </form>
</messageML>
```
{% endtab %}

{% tab title="Datafeed Payload" %}
```javascript
[    
    {
        "id": "JQgymy",
        "messageId": "h53CRuPWoInmYbfw2T8dkn___pNK27l7bQ",
        "timestamp": 1566407149188,
        "type": "SYMPHONYELEMENTSACTION",
        "initiator": {
            "user": {
                "userId": 7078106482890,
                "firstName": "User",
                "lastName": "Bot",
                "displayName": "User",
                "email": "user_bot@symphony.com",
                "username": "user_bot"
            }
        },
        "payload": {
            "symphonyElementsAction": {
                "actionStream": {
                    "streamId": "0YeiA-neZa1PrdHy1L82jX___pQjntU-dA"
                },
                "formStream": {
                    "streamId": "YuK1c2y2yuie6+UfQnjSPX///pQEn69idA=="
                },
                "formMessageId": "RfqsxcfTHCV08+UcO03HQH///pIqaO6fdA==",
                "formId": "form_id",
                "formValues": {
                    "action": "dropdown",
                    "init": "opt2",
                    "data-placeholder": "",
                    "noreq": "",
                    "req": "opt2",
                    "label": "",
                    "tooltip": "",
                    "multiple": ["opt1", "opt2", "opt3", "opt5", "opt6"]
                }
            }
        }
    }
]
```
{% endtab %}
{% endtabs %}

## Versions

<table><thead><tr><th>Features introduced</th><th>Agent needed to parse message sent by the bot</th><th width="150">Client 2.0 release</th><th>Mobile</th></tr></thead><tbody><tr><td>Initial release</td><td>2.55.9</td><td>Since first version</td><td>Since first version</td></tr><tr><td>Label</td><td>20.6</td><td>Since first version</td><td>Since first version</td></tr><tr><td>Tooltip (title)</td><td>20.7</td><td>Since first version</td><td>Since first version</td></tr><tr><td>Multiple (with min and max) attributes</td><td>20.14</td><td>21.12</td><td>Since first version</td></tr><tr><td>auto-submit</td><td>23.11</td><td>23.12</td><td><strong>Not supported yet.</strong></td></tr><tr><td>formnovalidate</td><td>25.6</td><td>25.9</td><td><strong>Not supported yet.</strong></td></tr></tbody></table>
