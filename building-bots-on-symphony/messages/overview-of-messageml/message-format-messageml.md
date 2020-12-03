# Message Format - MessageML

When calling API methods that create messages, the content of the message must be sent using _MessageML_ markup. MessageML is a tag-based language that is a subset of XHTML, with the addition of [shorthand tags](message-format-messageml.md#shorthand-tags) for embedding information \(e.g. a mention\) into a message. Messages in MessageML markup are enclosed in a `<messageML>` tag.

MessageML has full unicode support and messages should be sent using UTF-8 character encoding.

When [creating](https://rest-api.symphony.com/docs/create-message-v4) or [retrieving](https://rest-api.symphony.com/docs/messages-v4) messages using the API, MessageML shorthand tags are translated into equivalent XHTML tags and returned in [PresentationML](../overview-of-presentationml.md).

## PresentationML Live Renderer Tool:

Symphony created the [Presentation ML Live Renderer Tool](https://renderer-tool.app.symphony.com/) that you can use to see your MessageML rendered in PresentationML or markdown \(mobile\) without coding:

## Message Size Limits

Messages may include:

* Maximum 40 entities \(\#hashtags, $cashtags, and mentions\).
* Maximum 2,500 unique tokens in the markdown representation of the message.
* 81,130 characters of the encrypted markdown representation of the message. Note that there is a greater chance of reaching the token or the entity limit than the character limit.

{% hint style="warning" %}
## XML Formatting

MessageML is formatted as XML and should have all tags properly formatted. For example, rather than using `<br>` you must use `<br/>`.  
For string attributes, standard rules for escaping XML special characters apply, i.e. escaping:

* `'` with `&apos;` \(if single quotes are used to quote the value\)
* `"` with `&quot;` \(if single quotes are used to quote the value\)
* `<` with `&lt;`
* `&` with `&amp;` Other XML named entity sequences such as `&gt;` may be used.
{% endhint %}

{% hint style="warning" %}
## Valid characters for hashtags and cashtags

Keywords may only contain alphanumeric characters, underscore, dot and dash.

Important: when sending numeric $cashtags as signals, add an `*` after the $ sign, for example, $\_122450.  
&lt;cash tag="$\_122450"/&gt;
{% endhint %}

## Root Tag:

MessageML messages are enclosed in a `<messageML>` tag. The following is a simple example:

```markup
<messageML>
  Hello <b>messageML</b> v2!
</messageML>
```

## Handling Special Characters

The Apache Freemarker uses the HTML output format by default.  In some cases, special characters placed within the MessageML must be HTML-escaped, otherwise, the request sending the MessageML will receive a 400 error response. The following are examples of valid HTML-escaping:

| Character | HTML escaping | Required escaping | messageML example |
| :--- | :--- | :--- | :--- |
| `<` | `&lt;` | Yes | `<messageML>&lt;</messageML>` |
| `&` | `&#38;` | Yes | `<messageML>&#38; </messageML>` |
| `$` | `&#36;` | Yes The $ character only needs to be escaped if it comes before the { character. | `<messageML>&#36;{}</messageML>` |
| `#` | `&#35;` | Yes The \# character only needs to be escaped if it comes before the { character. | `<messageML>&#35;{}</messageML>` |
| `>` | `&gt;` | No | `<messageML>&gt;</messageML>` |
| `"` | `&quot;` | No | `<messageML>&quot;</messageML>` |
| `'` | `&#39;` | No | `<messageML>&#39;</messageML>` |
| `*` | `&#42;` | No | `<messageML>&#42;</messageML>` |
| `%` | `&#37;` | No | `<messageML>&#37;</messageML>` |

## Content Grouping

MessageML supports the following tags for grouping information within a message:

| Tag | Description | Optional attributes |
| :--- | :--- | :--- |
| `<p>paragraph</p>` | Paragraph formatting. | \* `class` |
| `<hr />` | Horizontal rule. | None. |
| `<ul>` `<li>list item</li>` `</ul>` | Unordered or bullet list. | \* `class` |
| `<ol>` `<li>list item</li>` `</ol>` | Numbered list. | \* `class` |
| `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` | Heading text. 6 levels. | \* `class` |
| `<div>paragraph</div>` | Block of text. _This tag can be used to specify visual styles, by adding a `class` attribute._ This tag is used to create [Structured objects](../structured-objects.md). \* This tag is also the root of any message read through the API. | _`class`:_ [_color options_](../../../developer-tools/developer-tools/ui-style-guide/colors.md)_._ `data-entity-id` _`data-icon-src`_ `data-accent-color` \* See below for list of translated PresentationML attributes. |

## Text-level formatting and semantics

MessageML supports the following tags for formatting content within a message:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Tag</th>
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Optional attributes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>&lt;br/&gt;</code>
      </td>
      <td style="text-align:left">Insert a line break.</td>
      <td style="text-align:left">None.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>&lt;a href=&quot;url&quot;&gt;</code>
        <br /><code>Link Text</code>
        <br /><code>&lt;/a&gt;</code>
      </td>
      <td style="text-align:left">Insert a hyperlink that will be displayed in the message.</td>
      <td style="text-align:left"><em><code>href</code>: the URL of the link<br /></em><code>class</code>:
        <a
        href="../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>&lt;b&gt;text&lt;/b&gt;</code>
      </td>
      <td style="text-align:left">Bold formatting.
        <br />
        <br /><b>Note</b>: when receiving a message from an Agent that contains whitespace
        between the last character in a bolded section and the closing <code>&lt;/b&gt;</code> tag,
        the bold section will be returned in Markdown (i.e. surrounded by double
        &apos;*&apos; characters) instead of XHTML tags.</td>
      <td style="text-align:left">* <code>class</code>: <a href="../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left">1.53 version onwards
        <br /><code>&lt;code&gt;text&lt;/code&gt;</code>
        <br />
        <br />
        <br />1.52 and prior versions:
        <br /><code>&lt;code&gt;text</code>
        <br /><code>&lt;/code&gt;</code>
      </td>
      <td style="text-align:left">
        <p>Fixed-character formatting for code samples.
          <br />
          <br />
        </p>
        <p>&lt;b&gt;&lt;/b&gt;</p>
        <p>&lt;b&gt;&lt;/b&gt;</p>
        <p><b>Note:</b> 1.52 and prior versions require a line break before the closing <code>&lt;/code&gt;</code> tag,
          otherwise, the content will not be rendered.
          <br />Also note that only up to 100 lines of code will be highlighted.</p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>&lt;i&gt;text&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">Italics formatting.
        <br />
        <br /><b>Note</b>: when receiving a message from an Agent that contains whitespace
        between the last character in an italics-formatted section and the closing <code>&lt;/i&gt;</code> tag,
        the italics section will be returned in Markdown (i.e. surrounded by single
        &apos;*&apos; characters) instead of XHTML tags.</td>
      <td style="text-align:left">* <code>class</code>: <a href="../../../developer-tools/developer-tools/ui-style-guide/colors.md">color options</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>&lt;pre&gt;</code>
        <br /><code>preformatted text</code>
        <br /><code>&lt;/pre&gt;</code>
      </td>
      <td style="text-align:left">Preformatted text.</td>
      <td style="text-align:left"><em><code>class</code>:</em>  <a href="../../../developer-tools/developer-tools/ui-style-guide/colors.md"><em>color options</em></a><em>.<br /></em>Non-HTML
        MessageML <a href="message-format-messageml.md#shorthand-tags">shorthand tags</a> are
        not supported inside <code>&lt;pre&gt;</code>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>&lt;span&gt;text&lt;/span&gt;</code>
      </td>
      <td style="text-align:left">No formatting.
        <br /><em>This tag can be used to specify visual styles, by adding a <code>class</code> attribute.<br /></em>This
        tag is used to create <a href="../structured-objects.md">Structured objects</a>.</td>
      <td
      style="text-align:left"><em><code>class</code>:</em>  <a href="../../../developer-tools/developer-tools/ui-style-guide/colors.md"><em>color options</em></a><em>.<br /></em><code>data-entity-id</code>
        <br
        />* See below for list of translated PresentationML attributes.</td>
    </tr>
  </tbody>
</table>

## Tables

MessageML supports the following tags to arrange information within a message using tables:

| Tags | Description | Optional attributes |
| :--- | :--- | :--- |
| `<table>` `<tr>` `<td>text</td>` `</tr>` `</table>` | Render "text" in a table format. | _`class`_ `rowspan` \* `colspan` |
| `<thead>`, `<tbody>`, `<tfoot>` | Table sections. | \* `class` |

## Images and Media

MessageML supports the following tags to embed media into messages:

| Tags | Description | Attributes |
| :--- | :--- | :--- |
| `<img src="url"/>` | Image. Images have a max height of 256px; otherwise, the default size is the size of the image. For more information on how to send images through API call, refer to [Sending images](message-format-messageml.md#sending-images). | _`src`_ `class` |
| `<audio/>` | Only supported for chime. See below. | _`src`_ |

## Sending Images

For the following examples, we are sending an SVG image along with the message.

Note that an admin user might have to enable the sending of some specific file types. To do that, go to _AC Portal &gt;&gt; Company Settings &gt;&gt; Edit Entitlements &gt;&gt; File Types_.

• Sending an image via the [Create Message](https://rest-api.symphony.com/v1.54/reference#create-message-v4) API using the image URL

```markup
$ curl -X POST https://yourpod.com/agent/v4/stream/:sid/message/create \
-H 'content-type: multipart/form-data' \
-H 'keyManagerToken: 01008e3fc538...5d82870985576' \
-H 'sessionToken: eyJhbGciOiJSU...6YmlWyim0peFkMA' \
-F 'message=<messageML>Sending attachment via API<img src="https://yourimg.com/test/myimage.svg"></img></messageML>'
```

Sending an image via [Create Message](https://rest-api.symphony.com/v1.54/reference#create-message-v4) API using Data URL \(base64 encoding\).  
Note that it is necessary to include `data:image/imageType+xml;base64` before the data string, as shown in the following example:

```markup
$ curl -X POST https://yourpod.com/agent/v4/stream/:sid/message/create \
-H 'content-type: multipart/form-data' \
-H 'keyManagerToken: 01008e3fc538...5d82870985576' \
-H 'sessionToken: eyJhbGciOiJSU...6YmlWyim0peFkMA' \
-F 'message=<messageML>Sending attachment via API<img src="data:image/svg+xml;base64,PHN2ZyBpZD0i...DcuMjcsMTYuN="></img></messageML>'
```

## Shorthand Tags

MessageML supports the following tags to embed additional information into messages:

| Tag | Description | Optional attributes |
| :--- | :--- | :--- |
| `<mention uid="123456789"/>` | Insert a mention for the user whose Symphony userid is `123456789`. |  |
| `<mention email="user@music.org"/>` | Insert a mention for the user whose email address is `user@music.org`. | _`strict`=`true`, the API will throw an error if no user of that email address exists. \(default\)_ `strict`=`false` . Message is accepted even if the user cannot be resolved. |
| `<hash tag="label"/>` | Insert "label" as a hashtag. |  |
| `<cash tag="ticker"/>` | Insert "ticker" as a cashtag. Important: when sending numeric cashtags as signals, add a `*` after the $ sign, for example, $\_122450.  `<messageML>` \`&lt;cash tag="$\_122450"/&gt; ```\`` |  |
| `<chime />` | Send a chime message. No other content is permitted with a `<chime/>` tag. |  |
| `<card>` \(see example below\) | Inserts a card. | _`iconSrc`: image will be resized to 28 pixels by 28 pixels, use spacious mode. \(.jpg, .png and .gif\)_ `accent`: use [background color values](../../../developer-tools/developer-tools/ui-style-guide/colors.md) to select the accent color of the card. |
| `<emoji shortcode="hearts">` | Inserts an emoji. | For a list of available emojis, refer to [Emojis](../emojis.md). |

An example of a card tag that could be embedded into a message:

```markup
<card iconSrc="url" accent="tempo-bg-color--blue">
    <header>Card Header. Always visible.</header>
    <body>Card Body. User must click to view it.</body>
</card>
```

## Structured Objects and Tags

Structured objects are rich, inline, interactive components for Symphony messages that allow you to embed information that is more complex than simple text.

To [create a message](https://rest-api.symphony.com/docs/create-message-v4) containing a Structured object, construct the message content using MessageML with either a `<div>` or a `<span>` element containing the following attributes:

* `class="entity"`: specifies that the message contains a corresponding structured object.
* `data-entity-id`: the unique ID of the corresponding structure object.

This MessageML markup is then passed into the endpoint via the `message` parameter. The following examples show the use of the attributes in `<div>` and `<span>` respectively:

```markup
<div class="entity" data-entity-id="entityIdentifier">An object</div>
```

```markup
<span class="entity" data-entity-id="entityIdentifier">An inline object</span>
```

The examples above reference an entity object called `entityIdentifier`. The JSON corresponding to this object is passed to the create message endpoint via the `data` parameter. For example:

```bash
Data:
{
  "entityIdentifier": {
    "type": "org.symphonyoss.fin.security",
    "version": "0.1",
    "id": [{
      "type": "org.symphonyoss.fin.security.id.isin",
      "value": "US0378"
    },
      {
        "type": "org.symphonyoss.fin.security.id.cusip",
        "value": "037"
      },
      {
        "type": "org.symphonyoss.fin.security.id.openfigi",
        "value": "BBG000"
      }
    ]
  }
}
```

To learn more about Structured Objects, continue here:

{% page-ref page="../structured-objects.md" %}

## Style Attributes

Tags support the following `style` attributes where applicable:

```bash
background
background-attachment
background-blend-mode
background-clip
background-color
background-image
background-position
background-repeat
background-size
border
border-bottom
border-bottom-color
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-collapse
border-color
border-image
border-image-outset
border-image-repeat
border-image-slice
border-image-source
border-image-width
border-left
border-left-color
border-left-style
border-left-width
border-radius
border-right
border-right-color
border-right-style
border-right-width
border-spacing
border-style
border-top
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
border-width
box-shadow
box-sizing
caption-side
clear
color
content
counter-increment
counter-reset
display
empty-cells
font
font-family
font-kerning
font-size
font-size-adjust
font-stretch
font-style
font-variant
font-weight
height
letter-spacing
line-height
list-style
list-style-image
list-style-position
list-style-type
margin
margin-bottom
margin-left
margin-right
margin-top
max-height
max-width
min-height
min-width
opacity
outline
outline-color
outline-offset
outline-style
outline-width
overflow
overflow-x
overflow-y
padding
padding-bottom
padding-left
padding-right
padding-top
table-layout
text-align
text-align-last
text-decoration
text-decoration-color
text-decoration-line
text-decoration-style
text-indent
text-justify
text-overflow
text-shadow
text-transform
visibility
white-space
width
word-break
word-spacing
word-wrap
```

The following shows an example of using styles for an HTML table:

```markup
<table style="border-collapse:collapse;border:2px solid black;table-layout:auto;width:100%;background-color:#f2f2f2;box-shadow: 5px 5px">
    <thead>
        <tr style="background-color:#4D94FF;color:#ffffff;font-size:1rem" class="tempo-text-color-white tempo-bg-color-black\">
            <td style='text-shadow: 2px 2px black;border:1px solid blue;border-bottom: double blue;width:15%;text-align:center'>
                SUBJECT
            </td>
        </tr>
    </thead>
</table>
```

To learn more about Symphony's built in styles, continue here:

{% page-ref page="../../../developer-tools/developer-tools/ui-style-guide/" %}

## Standard Entities

This section lists the Structured Objects available for use in messages.

## Article

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| `title` | Yes | String | The headline of the article |
| `subTitle` | No | String | The subtitle of the article |
| `blurb` | No | String | A summary of the article to display |
| `date` | No | [Unix Epoch Timestamp](https://www.epochconverter.com/) | Date of publication |
| `publisher` | No | String | Name of the publisher |
| `author` | No | String | Name of the author |
| `thumbnail` | No | URL \(could be a data url\) | Image to be displayed - 106x106px |
| `id` | Must provide either `id` or `href`, or both. | String | An identifier used by the application to deeplink to the article |
| `href` | Must provide either `id` or `href`, or both. | URL | URL to the article \(opened in a new browser window\) |

## Financial Objects

### org.symphonyoss.fin.security

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `org.symphonyoss.fin.security`. |
| id | Yes | Array of Objects | An array of one or more of the following objects: _org.symphonyoss.fin.security.id.ticker_ org.symphonyoss.fin.security.id.isin _org.symphonyoss.fin.security.id.cusip_ org.symphonyoss.fin.security.id.openfigi  More information about these objects is provided below. |

### org.symphonyoss.fin.security.id.ticker

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.ticker`. |
| value | Yes | String | The name/ID of a ticker. |

### org.symphonyoss.fin.security.id.isin

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.isin`. |
| value | Yes | String | The entity's ID. |

### org.symphonyoss.fin.security.id.cusip

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.cusip`. |
| value | Yes | String | The entity's ID. |

### org.symphonyoss.fin.security.id.openfigi

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.openfigi`. |
| value | Yes | String | The entity's ID. |

## Image

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of entity. Must be set to `com.symphony.media.image`. |
| version | Yes | String | The version. |
| format | Yes | String | The data format. Must be set to `image`. |
| url | Yes | String | The URL of the image. |

## Taxonomy \(mention\)

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `com.symphony.user.mention`. |
| version | Yes | String | The object's version. |
| id | Yes | Array of objects | An array of one or more of the following objects: \* com.symphony.user.userId  More information about these objects is provided below. |

### com.symphony.user.userId

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `com.symphony.user.userId`. |
| value | Yes | String | The ID of a user. |

## Video

| Field | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| type | Yes | String | The type of object. Must be set to `com.symphony.media.video`. |
| version | Yes | String | The version. |
| format | Yes | String | The video's format. Must be set to `youtube` or `vimeo`. |
| url | Yes | String | The URL of the video. |
| id | Yes | String | The unique ID of the video \(can be extracted from the video URL\). |

Continue here to learn more about structured objects:

{% page-ref page="../structured-objects.md" %}

## Symphony Elements

Symphony Elements is a collection of interactive elements that can be sent within messages to facilitate communication with Symphony users.

Through the use of the elements, bots can send messages that contain forms with text fields, dropdown menus, person selectors, buttons and more! To use the Elements, you just need to call the [Create Message](https://developers.symphony.com/restapi/reference#create-message-v4) endpoint using the MessageML v2 format. For more information and examples check out our guide on Symphony Elements:

{% page-ref page="../../symphony-elements/" %}

