# Room Selector

The Room Selector is an element that allows users to find and select both rooms or persons. It behaves the same way as the chat selector you see when you forward a message and select where the message should be forwarded.

When a user starts typing in the field, a list of conversations and people will be displayed for selection. Only the chats that the user has access to will be displayed.

<figure><img src="../../../../.gitbook/assets/image (73).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../../.gitbook/assets/image (74).png" alt=""><figcaption></figcaption></figure>

## Attributes

<table data-header-hidden><thead><tr><th width="152">Attribute</th><th width="124">Type</th><th width="115">Required?</th><th>Description</th></tr></thead><tbody><tr><td>Attribute</td><td>Type</td><td>Required?</td><td>Description</td></tr><tr><td><code>name</code></td><td>String</td><td>Yes</td><td>Identifies the room selector.</td></tr><tr><td><code>placeholder</code></td><td>String</td><td>No</td><td>Specifies a short hint that describes the expected value of the field.</td></tr><tr><td><code>required</code></td><td>Boolean</td><td>No</td><td>If <code>true</code>, at least one chat or person must be selected to be able to submit the form.</td></tr><tr><td><code>label</code></td><td>String</td><td>No</td><td>Label displayed on top of the Room Selector.</td></tr><tr><td><code>value</code></td><td><p>Array of </p><p><code>string</code></p></td><td>No</td><td>Default values that will be preselected in the Room Selector. The array can contain both streamIds, as well as userIds. Please note that if the user does not have access to these users or conversations, they will not be displayed.</td></tr></tbody></table>

## Rules and Limitations

* The Room Selector element supports multi selection which means that you can search for more than one chat or person.
* The Room Selector is not yet available on Symphony Mobile. Mobile will be supported in a future release.&#x20;

## Example

{% tabs %}
{% tab title="MessageML" %}
Example of a room selector with both a room and a user pre-selected.\
Please note that pre-selected streamIds must follow [**URL Safe Base64 encoded StreamID.**](../../#message-identifiers)

```xml
<messageML>
     <form id="test"> 
        <room-selector name="room-selector" 
            label="Select the chats where the alert will be sent." 
            value="['rsxB51ieSYfPLQ0jgFKg93___nUqhvz4dA','9139691037944']"  
            placeholder="Select rooms"/>
        <button name="submit_button" type="action">Create Alert</button>    
    </form>
</messageML>
```
{% endtab %}

{% tab title="Datafeed Payload" %}
Resulting payload when a user submitted the form afer having selected two chats and one user in the Room Selector.

```json
"payload": {
    "symphonyElementsAction": {
        "stream": {
            "streamId": "9vwxSTElsJDEqmRt2CWQpn___nRRfCVgdA",
            "streamType": "IM"
        },
        "formMessageId": "t2AFSQooaBvh_OrDrNDR53___nGF6NqybQ",
        "formId": "test",
        "formValues": {
            "action": "submit_button",
            "room-selector": {
                "userIds": [
                    "9139691037944"
                ],
                "streamIds": [
                    "fy0RUFUt6pkiiV3nPZVr5X///nJeKqjMdA==",
                    "5fXylrRrqEb1vH4bvBMWNn///nWQegjtdA=="
                ]
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## Versions and Compatibility

<table data-header-hidden><thead><tr><th width="153">Main features introduced</th><th>Agent needed to parse message sent by the bot</th><th width="150">Client 2.0 release</th><th>Mobile versions</th></tr></thead><tbody><tr><td>Main features introduced</td><td>Agent needed to parse message sent by the bot</td><td>Client 2.0 release</td><td><em>Backward client-compatibility behavior (e.g. external rooms)</em></td></tr><tr><td>Feature introduced</td><td>23.11</td><td>C2 24.4 (April 2024)</td><td>Not available yet. Room Selector is not displayed.</td></tr></tbody></table>
