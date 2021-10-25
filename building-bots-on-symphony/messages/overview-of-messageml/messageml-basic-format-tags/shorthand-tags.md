# Specific to Symphony

## Tags

MessageML supports the following tags to embed additional information into messages:

| Tag                                 | Description                                                                                                                                                                               | Optional attributes                                                                                                                                                                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<mention uid="123456789"/>`        | Insert a mention for the user whose Symphony userid is `123456789`.                                                                                                                       |                                                                                                                                                                                                                                        |
| `<mention email="user@music.org"/>` | Insert a mention for the user whose email address is `user@music.org`.                                                                                                                    | <p>• <code>strict</code>=<code>true</code>, the API will throw an error if no user of that email address exists. (default) <br>• <code>strict</code>=<code>false</code> . Message is accepted even if the user cannot be resolved.</p> |
| `<hash tag="label"/>`               | Insert "label" as a hashtag.                                                                                                                                                              |                                                                                                                                                                                                                                        |
| `<cash tag="ticker"/>`              | Insert "ticker" as a cashtag. Important: when sending numeric cashtags as signals, add a `*` after the $ sign, for example, $\_122450.  `<messageML>` \`\<cash tag="$\_122450"/> `` `\ `` |                                                                                                                                                                                                                                        |
| `<chime />`                         | Send a chime message. No other content is permitted with a `<chime/>` tag.                                                                                                                |                                                                                                                                                                                                                                        |

## Examples



{% tabs %}
{% tab title="" %}
```markup
<expandable-card state="collapsed">
  <header>Card Header. Always visible.</header>
  <body variant="error">
      Card Body. User must click to view it (when the card is sent collapsed/cropped).
      [it may contain a title, a paragraph, other elements for e.g. data bar and action bar]
  </body>
</expandable-card>
```
{% endtab %}
{% endtabs %}
