# Tags and mentions

## Tags

MessageML supports the following tags to embed additional information into messages:

<table data-header-hidden><thead><tr><th width="236">Tag</th><th width="283.3333333333333">Description</th><th>Optional attributes</th></tr></thead><tbody><tr><td>Tag</td><td>Description</td><td>Optional attributes</td></tr><tr><td><code>&#x3C;mention uid="123456789"/></code></td><td>Insert a mention for the user whose Symphony userid is <code>123456789</code>.</td><td></td></tr><tr><td><code>&#x3C;mention email="user@music.org"/></code></td><td>Insert a mention for the user whose email address is <code>user@music.org</code>.</td><td>• <code>strict</code>=<code>true</code>, the API will throw an error if no user of that email address exists. (default) <br>• <code>strict</code>=<code>false</code> . Message is accepted even if the user cannot be resolved.</td></tr><tr><td><code>&#x3C;hash tag="label"/></code></td><td>Insert "label" as a free-text hashtag.</td><td></td></tr><tr><td><code>&#x3C;cash tag="ticker"/></code></td><td>Insert "ticker" as a free-text cashtag. Important: when sending numeric cashtags as signals, add a <code>*</code> after the $ sign, for example, $_122450.  <code>&#x3C;messageML></code> `&#x3C;cash tag="$_122450"/> <code>`\</code></td><td><strong>Note</strong>: Cashtags are deprecated. Please use the &#x3C;tag /> notation for financial instruments. </td></tr><tr><td><code>&#x3C;tag /></code> </td><td><p>Insert a financial instrument (enhanced tag) in your message, coming from our reference database.</p><p>The following instruments are supported: Stocks, ETFs, Indices and currency pairs.<br><br>To identify an instrument, you'll need to provide at least one identifier (e.g. an ISIN), and optionally some filters if your identifier is not specific enough.<br><br>You can also specify a <code>fallback-ticker</code> that will act as a free-text tag (workaround) if we are not able to find the instrument referenced.</p><p></p><p>More information on the new tags is available in the <a data-mention href="enhanced-tags-notice.md">enhanced-tags-notice.md</a>.<br></p></td><td><p>Identifiers:</p><ul><li><code>fullbbgcompticker</code></li><li><code>figi</code></li><li><code>bbgcompticker</code></li><li><code>us-code</code></li><li><code>isin</code></li><li><code>local-code</code></li></ul><p>Filters:</p><ul><li><code>instrument-class</code></li><li><code>bbgmarket-sector</code></li><li><code>return-main-listing</code></li><li><code>country-code</code></li><li><code>operational-mic</code></li></ul><p>Others:</p><ul><li><code>fallback-ticker</code><br></li></ul></td></tr><tr><td><code>&#x3C;chime /></code></td><td><p>Send a chime alert.</p><p><br><strong>Note</strong>: No other content (even line breaks) is permitted with a <code>&#x3C;chime/></code> tag. Please see an example of the messageML to send a chime below.</p></td><td></td></tr></tbody></table>

## Examples

Here after you can find an example of a message sent by a bot and containing these tags specific to Symphony as well as the structure of the messageML sent:

#### Mentions

```xml
<messageML>
  <br/><span>Mention with an email: </span>
  <mention email="pierre.neu@symphony.com"/>
  <br/><span>Mention with a user Id: </span>
  <mention uid="71811853190567"/>
</messageML>
```

<figure><img src="../../../../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

#### Free-text Tags

```xml
<messageML>
  <br/>
  <p>Hashtags: <hash tag="important"/><hash tag="stockmarket"/></p>
  <p>Legacy cashtags:	<cash tag="AAPL US"/> <cash tag="TSLA US"/></p>
</messageML>
```

<figure><img src="../../../../../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>

#### Enhanced tags (Financial instruments)

Below several examples of financial instruments, using different types of identifiers and filters.&#x20;

When identifiers and filters are not sufficient to identify a unique match, or when an instrument is not found in our reference database, an error is returned, except if a `fallback-ticker` is specified.&#x20;

```xml
<messageML>
  <table class="pasted-table">
    <thead>
      <tr>
        <th>Identifiers and filters</th>
        <th>Tag</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>FullBBGCompTicker</td>
        <td><tag fullbbgcompticker="TSLA US Equity"/></td>
        <td># unique if found</td>
      </tr>
      <tr>
        <td>Figi</td>
        <td><tag figi="BBG000N9P426" fallback-ticker="TSLA"/></td>
        <td># unique if found</td>
      </tr>
      <tr>
        <td>BBG Comp ticker on Market sector</td>
        <td><tag bbgcompticker="TSLA US" bbgmarket-sector="Equity" fallback-ticker="TSLA"/></td>
        <td># unique if found</td>
      </tr>
      <tr>
        <td>Figi ticker</td>
        <td><tag figi-ticker="TSLA UW" fallback-ticker="TSLA"/></td>
        <td># likely unique, may need filters</td>
      </tr>
      <tr>
        <td>BBG Comp ticker</td>
        <td><tag bbgcompticker="TSLA US" fallback-ticker="TSLA"/></td>
        <td># likely unique, may need filters</td>
      </tr>
      <tr>
        <td>US Code</td>
        <td><tag us-code="88160R101" fallback-ticker="TSLA"/></td>
        <td># likely NOT unique listing for stocks, need filters.</td>
      </tr>
      <tr>
        <td>US Code on Main listing</td>
        <td><tag us-code="88160R101" return-main-listing="true" fallback-ticker="TSLA"/></td>
        <td># ask SYM to return the instrument listed on primary exchange</td>
      </tr>
      <tr>
        <td>ISIN</td>
        <td><tag isin="US88160R1014" fallback-ticker="TSLA"/></td>
        <td># likely NOT unique listing for stocks, need filters.</td>
      </tr>
      <tr>
        <td>ISIN on Main listing</td>
        <td><tag isin="US88160R1014" return-main-listing="true" fallback-ticker="TSLA"/></td>
        <td># ask SYM to return the instrument listed on primary exchange</td>
      </tr>
      <tr>
        <td>Local code</td>
        <td><tag local-code="TSLA" fallback-ticker="TSLA"/></td>
        <td># likely NOT unique listing for stocks, need filters.</td>
      </tr>
      <tr>
        <td>Local code with Country</td>
        <td><tag local-code="TSLA" country-code="US" fallback-ticker="TSLA"/></td>
        <td># likely unique listing for US stocks</td>
      </tr>
      <tr>
        <td>Local code with MIC</td>
        <td><tag local-code="TSLA" operational-mic="XNAS" fallback-ticker="TSLA"/></td>
        <td># likely unique listing</td>
      </tr>
      <tr>
        <td>Local code with MIC and instrument class</td>
        <td><tag local-code="TSLA" operational-mic="XNAS" instrument-class="equity" fallback-ticker="TSLA"/></td>
        <td># likely unique listing</td>
      </tr>
      <tr>
        <td>Fallback ticker</td>
        <td><tag fallback-ticker="TSLA"/></td>
        <td>Always include a fall back to ensure the message will be accepted.</td>
      </tr>
    </tbody>
  </table>
</messageML>

```

<figure><img src="../../../../../.gitbook/assets/image (88).png" alt=""><figcaption></figcaption></figure>

#### Chime

```xml
<messageML><chime/></messageML>
```

<figure><img src="../../../../../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption></figcaption></figure>
