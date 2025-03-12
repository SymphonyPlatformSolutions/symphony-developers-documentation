---
description: This section lists the Structured Objects available for use in messages.
---

# Standard Entities

## Standard Entities

### Article

<table data-header-hidden><thead><tr><th width="143">Field</th><th width="186">Required</th><th width="124">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td><code>title</code></td><td>Yes</td><td>String</td><td>The headline of the article</td></tr><tr><td><code>subTitle</code></td><td>No</td><td>String</td><td>The subtitle of the article</td></tr><tr><td><code>blurb</code></td><td>No</td><td>String</td><td>A summary of the article to display</td></tr><tr><td><code>date</code></td><td>No</td><td><a href="https://www.epochconverter.com/">Unix Epoch Timestamp</a></td><td>Date of publication</td></tr><tr><td><code>publisher</code></td><td>No</td><td>String</td><td>Name of the publisher</td></tr><tr><td><code>author</code></td><td>No</td><td>String</td><td>Name of the author</td></tr><tr><td><code>thumbnail</code></td><td>No</td><td>URL (could be a data url)</td><td>Image to be displayed - 106x106px</td></tr><tr><td><code>id</code></td><td>Must provide either <code>id</code> or <code>href</code>, or both.</td><td>String</td><td>An identifier used by the application to deeplink to the article</td></tr><tr><td><code>href</code></td><td>Must provide either <code>id</code> or <code>href</code>, or both.</td><td>URL</td><td>URL to the article (opened in a new browser window)</td></tr></tbody></table>

### Financial Objects

#### org.symphonyoss.fin.security

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="102">Required</th><th width="90">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>org.symphonyoss.fin.security</code>.</td></tr><tr><td>id</td><td>Yes</td><td>Array of Objects</td><td>An array of one or more of the following objects: <em>org.symphonyoss.fin.security.id.ticker</em> org.symphonyoss.fin.security.id.isin <em>org.symphonyoss.fin.security.id.cusip</em> org.symphonyoss.fin.security.id.openfigi  More information about these objects is provided below.</td></tr></tbody></table>

#### org.symphonyoss.fin.security.id.ticker

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="101">Required</th><th width="91">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>org.symphonyoss.fin.security.id.ticker</code>.</td></tr><tr><td>value</td><td>Yes</td><td>String</td><td>The name/ID of a ticker.</td></tr></tbody></table>

#### org.symphonyoss.fin.security.id.isin

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="102">Required</th><th width="87">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>org.symphonyoss.fin.security.id.isin</code>.</td></tr><tr><td>value</td><td>Yes</td><td>String</td><td>The entity's ID.</td></tr></tbody></table>

#### org.symphonyoss.fin.security.id.cusip

<table data-header-hidden><thead><tr><th width="110">Field</th><th width="104">Required</th><th width="90">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>org.symphonyoss.fin.security.id.cusip</code>.</td></tr><tr><td>value</td><td>Yes</td><td>String</td><td>The entity's ID.</td></tr></tbody></table>

#### org.symphonyoss.fin.security.id.openfigi

<table data-header-hidden><thead><tr><th width="110">Field</th><th width="105">Required</th><th width="90">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>org.symphonyoss.fin.security.id.openfigi</code>.</td></tr><tr><td>value</td><td>Yes</td><td>String</td><td>The entity's ID.</td></tr></tbody></table>

### FDC3 Action buttons

FDC3 action buttons allow chat bots to embed buttons in messages which, on click, will raise an intent.&#x20;

Action buttons are only displayed to users who have a Desktop Integration Platform (DIP) set up, such as interop.io, Here Core or Connectifi.

Learn more about Desktop Interop and intents [here](../../../../embedded-modules/desktop-interoperability/).&#x20;

MessageML (`message` property)

```xml
<messageML> This is a FDC3 action button: 
    <br/>
    <span class="entity" data-entity-id="0">View Chart 
        <span class="tempo-text-color--red" style="font-size: 10px">
            <i>(Action button: Desktop Integration Platform is not available.) </i>
        </span>
    </span>
</messageML>
```

**Note**: Please see above the default text that would be displayed to users who don't have a desktop integration platform set up.

EntityJSON part (`data` property)

```json
{
"0":
    {
    "actionData":
        {
        "context":
            {
            "id":
                {
                "ticker": "TSLA"
                },
            "name": "Tesla, inc.",
            "type": "fdc3.instrument"
            },
        "intent": "ViewChart"
        },
    "label": "View a chart",
    "type": "fdc3.entity.action",
    "version": "1.2"
    }
}
```

Display in Symphony:

{% tabs %}
{% tab title="Users with a DIP" %}
<figure><img src="../../../../.gitbook/assets/image (27).png" alt=""><figcaption><p>On click, Symphony will raise the embedded intent.</p></figcaption></figure>
{% endtab %}

{% tab title="Users without a DIP" %}
<figure><img src="../../../../.gitbook/assets/image (58).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}



### Image

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="102">Required</th><th width="98">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of entity. Must be set to <code>com.symphony.media.image</code>.</td></tr><tr><td>version</td><td>Yes</td><td>String</td><td>The version.</td></tr><tr><td>format</td><td>Yes</td><td>String</td><td>The data format. Must be set to <code>image</code>.</td></tr><tr><td>url</td><td>Yes</td><td>String</td><td>The URL of the image.</td></tr></tbody></table>

### Taxonomy (mention)

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="97">Required</th><th width="104">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>com.symphony.user.mention</code>.</td></tr><tr><td>version</td><td>Yes</td><td>String</td><td>The object's version.</td></tr><tr><td>id</td><td>Yes</td><td>Array of objects</td><td>An array of one or more of the following objects: <br>• com.symphony.user.userId<br>More information about these objects is provided below.</td></tr></tbody></table>

#### com.symphony.user.userId

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="103">Required</th><th width="104">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>com.symphony.user.userId</code>.</td></tr><tr><td>value</td><td>Yes</td><td>String</td><td>The ID of a user.</td></tr></tbody></table>

### Video

<table data-header-hidden><thead><tr><th width="112">Field</th><th width="101">Required</th><th width="107">Format</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Required</td><td>Format</td><td>Description</td></tr><tr><td>type</td><td>Yes</td><td>String</td><td>The type of object. Must be set to <code>com.symphony.media.video</code>.</td></tr><tr><td>version</td><td>Yes</td><td>String</td><td>The version.</td></tr><tr><td>format</td><td>Yes</td><td>String</td><td>The video's format. Must be set to <code>youtube</code> or <code>vimeo</code>.</td></tr><tr><td>url</td><td>Yes</td><td>String</td><td>The URL of the video.</td></tr><tr><td>id</td><td>Yes</td><td>String</td><td>The unique ID of the video (can be extracted from the video URL).</td></tr></tbody></table>

## Go further...

Continue here to learn more about structured objects:

{% content-ref url="structured-objects.md" %}
[structured-objects.md](structured-objects.md)
{% endcontent-ref %}

