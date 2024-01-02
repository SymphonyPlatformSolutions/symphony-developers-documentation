# Special Characters

## Tags

The Apache Freemarker uses the HTML output format by default.  In some cases, special characters placed within the MessageML must be HTML-escaped, otherwise, the request sending the MessageML will receive a 400 error response. The following are examples of valid HTML-escaping:

<table data-header-hidden><thead><tr><th width="104">Character</th><th width="127">HTML escaping</th><th width="204">Required escaping</th><th>messageML example</th></tr></thead><tbody><tr><td>Character</td><td>HTML escaping</td><td>Required escaping</td><td>messageML example</td></tr><tr><td><code>&#x3C;</code></td><td><code>&#x26;lt;</code></td><td>Yes</td><td><code>&#x3C;messageML>&#x26;lt;&#x3C;/messageML></code></td></tr><tr><td><code>&#x26;</code></td><td><code>&#x26;#38;</code></td><td>Yes</td><td><code>&#x3C;messageML>&#x26;#38; &#x3C;/messageML></code></td></tr><tr><td><code>$</code></td><td><code>&#x26;#36;</code></td><td>Yes The $ character only needs to be escaped if it comes before the { character.</td><td><code>&#x3C;messageML>&#x26;#36;{}&#x3C;/messageML></code></td></tr><tr><td><code>#</code></td><td><code>&#x26;#35;</code></td><td>Yes The # character only needs to be escaped if it comes before the { character.</td><td><code>&#x3C;messageML>&#x26;#35;{}&#x3C;/messageML></code></td></tr><tr><td><code>></code></td><td><code>&#x26;gt;</code></td><td>No</td><td><code>&#x3C;messageML>&#x26;gt;&#x3C;/messageML></code></td></tr><tr><td><code>"</code></td><td><code>&#x26;quot;</code></td><td>No</td><td><code>&#x3C;messageML>&#x26;quot;&#x3C;/messageML></code></td></tr><tr><td><code>'</code></td><td><code>&#x26;#39;</code></td><td>No</td><td><code>&#x3C;messageML>&#x26;#39;&#x3C;/messageML></code></td></tr><tr><td><code>*</code></td><td><code>&#x26;#42;</code></td><td>No</td><td><code>&#x3C;messageML>&#x26;#42;&#x3C;/messageML></code></td></tr><tr><td><code>%</code></td><td><code>&#x26;#37;</code></td><td>No</td><td><code>&#x3C;messageML>&#x26;#37;&#x3C;/messageML></code></td></tr></tbody></table>

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

