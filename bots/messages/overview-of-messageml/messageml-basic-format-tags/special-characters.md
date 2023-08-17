# Special Characters

## Tags

The Apache Freemarker uses the HTML output format by default.  In some cases, special characters placed within the MessageML must be HTML-escaped, otherwise, the request sending the MessageML will receive a 400 error response. The following are examples of valid HTML-escaping:

| Character | HTML escaping | Required escaping                                                                | messageML example                |
| --------- | ------------- | -------------------------------------------------------------------------------- | -------------------------------- |
| `<`       | `&lt;`        | Yes                                                                              | `<messageML>&lt;</messageML>`    |
| `&`       | `&#38;`       | Yes                                                                              | `<messageML>&#38; </messageML>`  |
| `$`       | `&#36;`       | Yes The $ character only needs to be escaped if it comes before the { character. | `<messageML>&#36;{}</messageML>` |
| `#`       | `&#35;`       | Yes The # character only needs to be escaped if it comes before the { character. | `<messageML>&#35;{}</messageML>` |
| `>`       | `&gt;`        | No                                                                               | `<messageML>&gt;</messageML>`    |
| `"`       | `&quot;`      | No                                                                               | `<messageML>&quot;</messageML>`  |
| `'`       | `&#39;`       | No                                                                               | `<messageML>&#39;</messageML>`   |
| `*`       | `&#42;`       | No                                                                               | `<messageML>&#42;</messageML>`   |
| `%`       | `&#37;`       | No                                                                               | `<messageML>&#37;</messageML>`   |

## Examples

Here after you can find an example of a message sent by a bot and containing these special characters as well as the structure of the messageML sent:

{% tabs %}
{% tab title="Message containing special characters" %}
![](../../../../.gitbook/assets/mml\_special\_characters.png)
{% endtab %}

{% tab title="messageML structure" %}
```markup
<messageML>
    These are special characters:
    <ul>
        <li>&lt;;</li>
        <li>&#38;;</li>
        <li>$ or &#36;;</li>
        <li># or &#35;;</li>
        <li>> or &gt;;</li>
        <li>" or &quot;;</li>
        <li>' or &#39;;</li>
        <li>* or &#42;;</li>
        <li>% or &#37;.</li>
    </ul>
</messageML>
```
{% endtab %}
{% endtabs %}

