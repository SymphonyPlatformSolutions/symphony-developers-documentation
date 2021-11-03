# Text formatting and semantics

## Tags

MessageML supports the following tags for formatting content within a message:

| Tag                                                                                          | Description                                                                                                                                                                                                                                                                                                                                        | Optional attributes                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<br/>`                                                                                      | Insert a line break.                                                                                                                                                                                                                                                                                                                               | None.                                                                                                                                                                                                                                                           |
| <p><code>&#x3C;a href="url"></code><br><code>Link Text</code><br><code>&#x3C;/a></code></p>  | Insert a hyperlink that will be displayed in the message.                                                                                                                                                                                                                                                                                          | <p>• <code>href</code>: the URL of the link<br><em></em>• <code>class</code>: <a href="../../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.</p>                                                                             |
| `<b>text</b>`                                                                                | <p>Bold formatting.<br><br><strong>Note</strong>: when receiving a message from an Agent that contains whitespace between the last character in a bolded section and the closing <code>&#x3C;/b></code> tag, the bold section will be returned in Markdown (i.e. surrounded by double '*' characters) instead of XHTML tags.</p>                   | • `class`: [color options](../../../../developer-tools/developer-tools/ui-style-guide/colors.md).                                                                                                                                                               |
| `<i>text</i>`                                                                                | <p>Italics formatting.<br><br><strong>Note</strong>: when receiving a message from an Agent that contains whitespace between the last character in an italics-formatted section and the closing <code>&#x3C;/i></code> tag, the italics section will be returned in Markdown (i.e. surrounded by single '*' characters) instead of XHTML tags.</p> | • `class`: [color options](../../../../developer-tools/developer-tools/ui-style-guide/colors.md).                                                                                                                                                               |
| <p><code>&#x3C;pre></code><br><code>preformatted text</code><br><code>&#x3C;/pre></code></p> | Preformatted text.                                                                                                                                                                                                                                                                                                                                 | <p>• <code>class</code>: <a href="../../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.<br><em></em>• Non-HTML MessageML <a href="broken-reference">shorthand tags</a> are not supported inside <code>&#x3C;pre></code>.</p> |
| `<span>text</span>`                                                                          | <p>No formatting.<br>• This tag can be used to specify visual styles, by adding a <code>class</code> attribute.<br><em></em>• This tag is used to create <a href="../entities/structured-objects.md">Structured objects</a>.</p>                                                                                                                   | <p>• <code>class</code>: <a href="../../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.<br><em></em>• <code>data-entity-id</code><br>• See below for list of translated PresentationML attributes.</p>                       |

## Examples

Here after you can find an example of a message sent by a bot and containing these formatting and semantics tags as well as the structure of the messageML sent:

{% tabs %}
{% tab title="Message containing formatting and semantics tags" %}
![](../../../../.gitbook/assets/mml\_formatting.png)
{% endtab %}

{% tab title="messageML structure" %}
```markup
<messageML>
    <h1>Formatting and semantics</h1>
    <p>This is a <a href="https://docs.developers.symphony.com/">Link</a> to our developer documentation.</p>
    <p>Part 1 of the paragraph separated from part 2 with a line break.<br/>Part 2 of the paragraph.</p>
    <p>This text can be either <b>bold</b> or <i>italic</i> or <span style="color:red;">red</span>, or even combine <b><i style="color:red;">several</i></b> formatting tags.</p>
    <pre>This is a preformatted text.</pre>
</messageML>
```
{% endtab %}
{% endtabs %}

## Versions and Compatibility



| Main features introduced                    | Agent needed to parse message sent by the bot | Client 2.0 release      | Backward client-compatibility behavior (e.g. external rooms) | Client 1.5 release      |
| ------------------------------------------- | --------------------------------------------- | ----------------------- | ------------------------------------------------------------ | ----------------------- |
| Initial release                             | Since the first version                       | Since the first version | -                                                            | Since the first version |
| Closing \<b> and \<i> without line breaks\* | Since the first version                       | Since the first version | -                                                            | 1.53                    |

_\*Note: 1.52 and prior versions require a line break before the closing `</code>` tag, otherwise, the content will not be rendered._\
_Also note that only up to 100 lines of code will be highlighted._

1.53 version onwards\
`<code>text</code>`\
\
1.52 and prior versions:\
`<code>text`\
`</code>`