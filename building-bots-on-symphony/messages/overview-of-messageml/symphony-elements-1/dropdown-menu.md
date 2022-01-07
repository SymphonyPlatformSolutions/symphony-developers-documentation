# Dropdown Menu

A dropdown menu **is a static list** of items that appears whenever a piece of text or a button is clicked. This is a graphical approach presented to users from which they can choose one or several values from the list presented.

A dropdown menu is also known as a pull-down menu, pull-down list, dropdown list or dropdown box.

The dropdown menu is represented by the `<select>` tag which provides a menu of `<options>`.\
Each `<option>` element should have a `value` attribute containing the data value to submit to the server when that option is selected; You can also include a `selected` attribute on an `<option>` element to make it selected by default when the page first loads.

![](<../../../../.gitbook/assets/dropdown 2.0.png>)

## Attributes

| Attribute          | Type                                                          | Required?                                                                             | Description                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | String                                                        | Yes                                                                                   | Required attribute of the `<select>` tag. It identifies the dropdown menu.                                                                                                                                                                          |
| `required`         | Boolean                                                       | No                                                                                    | Optional attribute of the `<select>` tag. it is a Boolean attribute indicating that an option with a non-empty string value must be selected.                                                                                                       |
| `value`            | String                                                        | Yes                                                                                   | Required attribute of the `<option>` tag. It contains the data value to submit to the server when that option is selected.                                                                                                                          |
| `selected`         | Boolean                                                       | Optional                                                                              | You can include a selected attribute on an `<option>` element to make it selected by default when the page first loads. Accepted values: `true` and `false`.                                                                                        |
| `data-placeholder` | String                                                        | Optional                                                                              | Text displayed in the dropdown menu before an option is selected. It can be a short hint or a title for the dropdown menu.                                                                                                                          |
| `title`            | It accepts a simple text and `\n` for line breaks             | Optional                                                                              | The description that will be displayed when clicking the tooltip icon located on top of the Masked Text Field Element. Max length: 256 characters.                                                                                                  |
| `label`            | String                                                        | Not required but it is recommended if `title` is defined                              | Definition of the label that will be displayed on top of the Masked Text Field Element.                                                                                                                                                             |
| `multiple`         | <p>String<br>Boolean</p>                                      | <p>Optional<br>Default is false</p>                                                   | Allows users to select multiple values and the developer to send dropdown with multiple preselected options.                                                                                                                                        |
| `min`              | <p>String<br>Integer ≥ 2 and ≤ <code>max</code> attribute</p> | <p>Optional<br>Can be used only if <code>multiple</code> attribute is set to true</p> | <p>Minimum number of options to be selected by the Symphony user.<br><br><em>NB: If undefined, no minimum option needs to be selected. Please use <code>required</code> attribute if you want to set min to 1.</em></p>                             |
| `max`              | <p>String<br>Integer ≥ 2</p>                                  | <p>Optional<br>Can be used only if <code>multiple</code> attribute is set to true</p> | <p>Maximum number of options to be selected by the Symphony user.<br><br><em>NB: If undefined, user will be able to select as many options as wished. Please use <code>multiple</code> attribute set to false if you want to set max to 1.</em></p> |

## Rules and Limitations

The `<select>` tag:

* The `<select>` tag stands for our dropdown parent tag, which has `<options>` as its children; one for each select.
* Select tags only accept `<option>` tags as children. The `<select>` tag must contain at least one `<option>` tag.
* The only valid attributes of the `<select>` tag are `name` and `required`.
* Note that, by default, Symphony users will only be able to select one option from the dropdown menu. However, using the attribute multiple set to true together with min and max attributes, users will be able to select several options from the dropdown. Please see below the examples to know how to use these attributes.

The `<option>` tag:

* The `<option>` tag cannot have other `<option>` tags as children. The only valid child of a `<option>` tag is a text node, which specifies the text that will be displayed for that option inside the dropdown menu. The text node is also required.
* The only valid attributes of the `<option>` tag are `value` and `selected`.
* Only one `<option>` of a given select can have the attribute `selected` as true.

If neither the `selected` or `data-placeholder` attributes are set, the default text (title) of the dropdown menu will be "Dropdown".

{% hint style="info" %}
Message Size Limit:

When designing forms with dropdowns within it be aware that there is a chance of reach the characters limit if too many dropdown options are included in the message. For more information about message size limits, refer to [MessageML](broken-reference).
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

![](../../../../.gitbook/assets/elements\_dropdown.gif)

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

## Versions and Compatibility

| Main features introduced               | Agent needed to parse message sent by the bot | Client 2.0 release  | _Client 1.5 release_ | _Backward client-compatibility behavior (e.g. external rooms)_ |
| -------------------------------------- | --------------------------------------------- | ------------------- | -------------------- | -------------------------------------------------------------- |
| Initial release                        | 2.55.9                                        | Since first version | _1.55_               | _Not working_                                                  |
| Label                                  | 20.6                                          | Since first version | _20.9_               | _Label displayed and form can still be submitted_              |
| Tooltip (title)                        | 20.7                                          | Since first version | _20.9_               | _Tooltip not displayed but form can still be submitted_        |
| Multiple (with min and max) attributes | 20.14                                         | 21.12               | _Not supported_      | _-_                                                            |
