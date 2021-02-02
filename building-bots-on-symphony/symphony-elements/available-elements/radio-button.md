# Radio Button

Radio buttons are shown as small circles, which are filled or highlighted when selected. Only one radio button in a given group can be selected at the same time.

Frequently, a set of radio buttons represents a single question which the user can answer by selecting a possible answer.

Note: If you want the user to be able to select more than one option, use the [Checkbox](checkbox.md) element.

![](../../../.gitbook/assets/97fab2f-radio-button.jpg)

## Attributes

| Attribute | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Identifies the radio button. |
| `value` | String | No | The `value` is the string that will be sent to the server. If the value is not specified, the string **on** will be sent by default. |
| `checked` | Boolean | No | If `true`, it specifies that the `<radio>` element should be pre-selected \(checked\) when the page loads. Accepted values: `true` and `false`. |

## Rules and Limitations

* The text node of the MessageML will be converted to the `<label>` tag. This will preserve the formatting tags `<i>` and `<b>`, if present.
* Radio buttons are presented in radio groups \(a collection of radio buttons describing a set of related options\). Only one radio button in a group can be selected at the same time. Note: The radio group must share the same name \(the value of the `name` attribute\) to be treated as a group. Once the radio group is created, selecting any radio button in that group automatically deselects any other selected radio button in the same group.
* A form can have a maximum of 50 radio buttons within it which means that you can have more than one radio group on a form but the total number of radios cannot be more than 50.
* Once the user has selected a radio option, it can be deselected only by clicking on another radio option. The only way to deselect all the radio options is by clicking the **reset** button.

## Examples

The following example shows radio buttons being used. It shows how developers can use the **checked** parameter with the value01 preselected when the form is sent. It also shows how users can select another radio button and how it automatically unselect any other value checked, as the 3 radio buttons have the same name and therefore are part of the same group "groupId".

![](../../../.gitbook/assets/b4275a0-radio-buttons-20.9.gif)

{% tabs %}
{% tab title="MessageML" %}
```markup
<messageML>
  <form id="form_id">
    <h2>radio buttons</h2>
      <radio name="groupId" value="value01" checked="true">red</radio>
      <radio name="groupId" value="value02">green</radio>
      <radio name="groupId" value="value03">blue</radio>
      <button type="reset">Reset</button>
      <button name="radio" value="action">Submit</button>
  </form>
</messageML>
```
{% endtab %}

{% tab title="Datafeed Payload" %}
```javascript
[
    {
        "id": "chxhFk",
        "messageId": "BwcQN6Y7RcKxwpWDfcjL2n___pQD2WPebQ",
        "timestamp": 1563303517217,
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
                "stream": {
                  "streamId": "0YeiA-neZa1PrdHy1L82jX___pQjntU-dA",
                  "streamType": "ROOM"
                },
                "formMessageId": "qXF5jpNbJtlulAmjKjn0Pn///pQD2mc/dA==5935",
                "formId": "form_id",
                "formValues": {
                    "action": "radio",
                    "groupId": "value03"
                }
            }
        }
    }
]
```
{% endtab %}
{% endtabs %}

