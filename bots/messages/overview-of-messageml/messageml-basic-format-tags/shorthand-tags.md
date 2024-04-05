# Specific to Symphony

## Tags

MessageML supports the following tags to embed additional information into messages:

<table data-header-hidden><thead><tr><th width="236">Tag</th><th width="283.3333333333333">Description</th><th>Optional attributes</th></tr></thead><tbody><tr><td>Tag</td><td>Description</td><td>Optional attributes</td></tr><tr><td><code>&#x3C;mention uid="123456789"/></code></td><td>Insert a mention for the user whose Symphony userid is <code>123456789</code>.</td><td></td></tr><tr><td><code>&#x3C;mention email="user@music.org"/></code></td><td>Insert a mention for the user whose email address is <code>user@music.org</code>.</td><td>• <code>strict</code>=<code>true</code>, the API will throw an error if no user of that email address exists. (default) <br>• <code>strict</code>=<code>false</code> . Message is accepted even if the user cannot be resolved.</td></tr><tr><td><code>&#x3C;hash tag="label"/></code></td><td>Insert "label" as a hashtag.</td><td></td></tr><tr><td><code>&#x3C;cash tag="ticker"/></code></td><td>Insert "ticker" as a cashtag. Important: when sending numeric cashtags as signals, add a <code>*</code> after the $ sign, for example, $_122450.  <code>&#x3C;messageML></code> `&#x3C;cash tag="$_122450"/> <code>`\</code></td><td>Note: Cashtags will soon be replaced by the new <a href="enhanced-tags-notice.md">enhanced tags</a>. </td></tr><tr><td><code>&#x3C;chime /></code></td><td><p>Send a chime message.</p><p><br><strong>Note</strong>: No other content (even line breaks) is permitted with a <code>&#x3C;chime/></code> tag. Please see an example of the messageML to send a chime below.</p></td><td></td></tr><tr><td><code>&#x3C;tag /></code> <br><br><strong>Note</strong>: This feature is not yet available in production. It will be released in the coming months.</td><td>Insert a financial instrument (enhanced tag) in your message, coming from our reference database.<br><br>To identify an instrument, you'll need to provide at least one identifier (e.g. an ISIN), and optionally some filters if your identifier is not specific enough.<br><br>You can also specify a <code>fallback-ticker</code> that will act as a free-text tag (workaround) if we are not able to find the instrument referenced.<br></td><td><p>Identifiers:</p><ul><li><code>fullbbgcompticker</code></li><li><code>figi</code></li><li><code>bbgcompticker</code></li><li><code>figi-ticker</code></li><li><code>us-code</code></li><li><code>isin</code></li><li><code>local-code</code></li></ul><p>Filters:</p><ul><li><code>instrument-class</code></li><li><code>bbgmarket-sector</code></li><li><code>return-main-listing</code></li><li><code>country-code</code></li><li><code>operational-mic</code></li></ul><p>Others:</p><ul><li><code>fallback-ticker</code><br></li></ul></td></tr></tbody></table>

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
