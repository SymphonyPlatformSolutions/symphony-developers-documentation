---
description: >-
  This article gives an overview of the Symphony message workflow and shows how
  message representations are used throughout the workflow. In its subpages are
  presented the specifications of messageML.
---

# MessageML

## Introduction of the MessageML

When calling API methods that create messages, the content of the message must be sent using _MessageML_ markup. MessageML is a tag-based language that is a subset of XHTML, with the addition of tags specific to Symphony for embedding information (e.g. a mention) into a message.

You can find the specifications of the MessageML language in the attached subpages. Even if they are grouped in different categories for documentation clarity purposes, please note you can do your own mix, respecting the specific rules explained at each component specification level.

Also, please note that **messages in MessageML markup are enclosed in a `<messageML>` tag.**

MessageML has full unicode support and messages should be sent using UTF-8 character encoding.

When [creating ](https://developers.symphony.com/restapi/main/messages/create-message-v4)or [retrieving](https://developers.symphony.com/restapi/main/messages/messages-v4) messages using the API, MessageML shorthand tags are translated into equivalent XHTML tags and returned in [PresentationML](../overview-of-presentationml.md).

{% hint style="info" %}
Note: MessageML is just a subset of PresentationML that makes it easier to construct messages from your bot. The API can ingest either MessageML or PresentationML. However, the API will only deliver messages as PresentationML to a bot.
{% endhint %}

{% hint style="warning" %}
## XML Formatting

MessageML is formatted as XML and should have all tags properly formatted. For example, rather than using `<br>` you must use `<br/>`.\
For string attributes, standard rules for escaping XML special characters apply, i.e. escaping:

* `'` with `&apos;` (if single quotes are used to quote the value)
* `"` with `&quot;` (if single quotes are used to quote the value)
* `<` with `&lt;`
* `&` with `&amp;` Other XML named entity sequences such as `&gt;` may be used.
{% endhint %}

{% hint style="warning" %}
## Valid characters for hashtags and cashtags

Keywords may only contain alphanumeric characters, underscore, dot and dash.

Important: when sending numeric $cashtags as signals, add an `*` after the $ sign, for example, $\_122450.\
\<cash tag="$\_122450"/>
{% endhint %}

