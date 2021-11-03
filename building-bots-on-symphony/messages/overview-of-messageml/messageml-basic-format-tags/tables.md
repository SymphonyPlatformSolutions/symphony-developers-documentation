# Tables

## Tags

MessageML supports the following tags to arrange information within a message using tables:

| Tags                                                | Description                      | Optional attributes                                                                        |
| --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `<table>` `<tr>` `<td>text</td>` `</tr>` `</table>` | Render "text" in a table format. | <p>• <em><code>class</code></em> <br>• <code>rowspan</code> <br>• <code>colspan</code></p> |
| `<thead>`, `<tbody>`, `<tfoot>`                     | Table sections.                  | • `class`                                                                                  |

## Examples

Here after you can find an example of a message sent by a bot and containing table tags as well as the structure of the messageML sent:

{% tabs %}
{% tab title="Message containing table tags" %}
![](../../../../.gitbook/assets/mml\_tables.png)
{% endtab %}

{% tab title="messageML structure" %}
```markup
<messageML>
    <h1>Tables</h1>
    <p>This is table:</p>
    <table>
        <thead>
            <tr>
                <td>Header column 1</td>
                <td>Header column 2</td>
                <td>Header column 2</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell row 1 column 1</td>
                <td>Cell row 1 column 2</td>
                <td>Cell row 1 column 3</td>
            </tr>
            <tr>
                <td>Cell row 2 column 1</td>
                <td>Cell row 2 column 2</td>
                <td>Cell row 2 column 3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Footer column 1</td>
                <td>Footer column 2</td>
                <td>Footer column 2</td>
            </tr>
        </tfoot>
    </table>
</messageML>
```
{% endtab %}
{% endtabs %}

