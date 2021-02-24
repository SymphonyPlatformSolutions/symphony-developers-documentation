# PresentationML

Messages sent using the API are translated into equivalent XHTML tags known as _PresentationML_, that can be rendered and processed by any HTML client. For example, when you create a message using [Create Message v4](https://rest-api.symphony.com/docs/create-message-v4) , the `message` field in the response contains the message in _PresentationML_ format.

Messages in PresentationML markup are enclosed in a `<div>` tag with the following attributes:

* data-format: must be set to `PresentationML`.
* data-version: specifies the markup version.

```markup
<div data-format=\"PresentationML\" data-version=\"2.0\"> content here... </div>
```

Since PresentationML was included as part of the MessageML format design, you can create messages by passing the message content in MessageML or in PresentationML. Note that PresentationML uses [Structured Objects](structured-objects.md) rather than shorthand tags. Therefore, when you send a message using [Create Message v4](https://rest-api.symphony.com/docs/create-message-v4), the `message` parameter must contain the message content in PresentationML XHTML markup, and the `data` parameter must contain the XML markup for the [standard entities](overview-of-messageml/message-format-messageml.md#standard-entities) referenced in the message.

**Shorthand tags translations:**

The following table lists XHTML tags for MessageML on the left, and the corresponding PresentationML tags on the right:

| Shorthand tag in MessageML | PresentationML Translation |
| :--- | :--- |
| `<messageML>` | `<div data-format=\"PresentationML\" data-version=\"2.0\">` |
| `<mention uid="123456789"/>` | `<span class="entity" data-entity-id="mention123">@Name</span>` |
| `<hash tag="hashtag"/>` | `<span class="entity" data-entity-id="keyword123">#hashtag</span>` |
| `<cash tag="ticker"/>` | `<span class="entity" data-entity-id="keyword456">$tag</span>` |
| `<chime />` | `<audio src="https://asset.symphony.com/symphony/audio/chime.mp3" autoplay="true" />` |
| `<card>` | `<div class="card barStyle" data-icon-src="url" data-accent-color="blue">` `<div class="cardHeader">PresentationML</div>` `<div class="cardBody">PresentationML</div> </div>` |

**Root `<div>` tag**  
When retrieving a message using the API, the message is always encapsulated in a root `<div>` tag, for easy parsing.

When you create a message using PresentationML, you must include the root `<div>` tag.

| Tag | Description | Attributes |
| :--- | :--- | :--- |
| root `<div>` | The root element of a Symphony message, when read through the API. | • `data-format`: must be set to "PresentationML"  • `data-version` |

The following is an example of content for a simple message using presentationML markup:

```markup
<div data-format=\"PresentationML\" data-version=\"2.0\">
  This is a message.
</div>
```

