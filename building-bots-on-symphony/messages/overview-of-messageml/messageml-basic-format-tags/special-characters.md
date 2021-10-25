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

