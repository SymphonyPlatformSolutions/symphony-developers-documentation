# Specific to Symphony

## Tags

MessageML supports the following tags to embed additional information into messages:

| Tag                                 | Description                                                                                                                                                                                                         | Optional attributes                                                                                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<mention uid="123456789"/>`        | Insert a mention for the user whose Symphony userid is `123456789`.                                                                                                                                                 |                                                                                                                                                                                                                                        |
| `<mention email="user@music.org"/>` | Insert a mention for the user whose email address is `user@music.org`.                                                                                                                                              | <p>• <code>strict</code>=<code>true</code>, the API will throw an error if no user of that email address exists. (default) <br>• <code>strict</code>=<code>false</code> . Message is accepted even if the user cannot be resolved.</p> |
| `<hash tag="label"/>`               | Insert "label" as a hashtag.                                                                                                                                                                                        |                                                                                                                                                                                                                                        |
| `<cash tag="ticker"/>`              | Insert "ticker" as a cashtag. Important: when sending numeric cashtags as signals, add a `*` after the $ sign, for example, $\_122450.  `<messageML>` \`\<cash tag="$\_122450"/> `` `\ ``                           |                                                                                                                                                                                                                                        |
| `<chime />`                         | <p>Send a chime message.</p><p><br><strong>Note</strong>: No other content (even line breaks) is permitted with a <code>&#x3C;chime/></code> tag. Please see an example of the messageML to send a chime below.</p> |                                                                                                                                                                                                                                        |

## Examples

Here after you can find an example of a message sent by a bot and containing these tags specific to Symphony as well as the structure of the messageML sent:

{% tabs %}
{% tab title="Message containing tags specific to Symphony" %}
![](../../../../.gitbook/assets/mml\_symphony\_specific.png)
{% endtab %}

{% tab title="messageML structure" %}
```markup
<messageML>
    <h1>Mentions</h1>
    <p>A user can be mentioned via its user ID (<mention uid="349026222355596"/>) or via email (<mention email="bot@symphony.com" />).<br/>Here is an example of a non-existing user display with strict attribute to false: <mention email="false_email@symphony.com" strict="false"/>.</p>
    <h1>Hash/Cash tags</h1>
    <p><hash tag="symphony"/> is a hashtag and <cash tag="aapl"/> is a cashtag.</p>
</messageML>
```
{% endtab %}

{% tab title="chime messageML structure" %}
```html
<messageML><chime /></messageML>
```
{% endtab %}
{% endtabs %}
