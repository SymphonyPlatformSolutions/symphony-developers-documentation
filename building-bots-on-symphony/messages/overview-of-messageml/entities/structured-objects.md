# Custom Entities

## Definition

Structured Objects are rich, inline, interactive components of Symphony messages. Objects allow you to build innovative workflows that go beyond working with normal text or attached files.

* Unlike normal message text, these objects are structured and do not need to be parsed to have business logic.
* Unlike attachments, end-users can view and interact with objects directly from their Symphony client, without having to change context.
* Structured Objects can be "injected" into Symphony by sending messages using Symphony's REST API.&#x20;
* Structured Objects can be rendered richly using [Symphony's Extension API](../../../../building-extension-applications-on-symphony/overview-of-extension-api/).

## Prerequisites

To inject messages containing structured objects:

* Your pod must be configured for Symphony's REST API, and you must have the Agent, the component used for handling encryption and decryption of messages and content, set up.
* Your Agent must be version 1.51 or later.
* You must have an X.509 identity certificate for your bot service user for REST API authentication, where the common name on the certificate matches your service user's username.

To build renderer applications for displaying your structured object:

* You need to have an extension application created and enabled on your pod.

## Sending Structured Objects in Messages

Structured Objects are placed into Symphony messages and have two components:

* Object Presentation, in [MessageML v2](broken-reference) format.
* Object Data, a JSON object.

Any message in Symphony can contain zero or more Structured Objects.

* A message will always contain message presentation, in [MessageML v2](broken-reference) format, with the optional object presentation of the Structured Objects it may contain.
* If the message contains any structured objects, it will contain JSON data with all object data of the structured objects it may contain.

You can create an object by invoking the [Create Message](https://rest-api.symphony.com/docs/create-message-v4) endpoint. You need to include:

* The `message` parameter, which contains the message presentation, with the object presentation for each Structured Object.
* The `data` parameter, which contains JSON data with the object presentation for each structured object.

These parameters also support using [Apache FreeMarker templates](http://freemarker.org) with Structured Objects.

## Message and Object Presentation

Message presentation is represented in MessageML format. For example:HTML

```markup
<messageML>
  Hello <mention email="user@music.org" />. Here is an important message
</messageML>
```

To add an object to a message, include a `div` or a `span` tag with a unique `data-entity-id` attribute:HTML

```markup
<messageML>
  Hello <mention email="user@music.org" />. Here is an important message with an
  <div class="entity" data-entity-id="object001" /> 
  included.
</messageML>
```

The `data-entity-id` tag refers to a specific object in the JSON data, which needs to include:

* The data `type`.
* The data `version` of that `type`. Both are needed to build renderer applications which can render this `type` of that `version`.

```
{
    "object001":
    {
        "type":     "org.symphonyoss.fin.security",
        "version":  "1.0",
        "id":
        [
            {
                "type":     "org.symphonyoss.fin.security.id.ticker",
                "value":    "IBM"
            },
            {
                "type":     "org.symphonyoss.fin.security.id.isin",
                "value":    "US0378331005"
            },
            {
                "type":     "org.symphonyoss.fin.security.id.cusip",
                "value":    "037833100"
            }
        ]
    }
}
```

This data can be used by applications in the web client to provide a rich display or end-user interactivity. In case no specific renderer application is available, you must provide a default presentation in the `div` or a `span` tags.HTML

```markup
<messageML>
  Hello <mention email="user@music.org" />. Here is an important message with an 
  <div class="entity" data-entity-id="object001">object</div> 
  included.
</messageML>
```

## Reading objects

You can read objects using any of the endpoints designed to read messages, for example, the [Read Message](https://rest-api.symphony.com/docs/messages-v4) endpoint. This endpoint will let you read both the message presentation and object data fields.

{% hint style="info" %}
Note:

As described in [Message Format - MessageML v2](broken-reference), messages with [Structured Objects](structured-objects.md) can be created using the shorthand tags or the full tags. When they are read, the message presentation always contain the full tags, which are a subset of HTML tags.
{% endhint %}

## Renderer Applications

Renderer Applications leverage the Extension API to dynamically replace the presentation of a structured object.\
To create a renderer application:

* Create an [Extension application](../../../../building-extension-applications-on-symphony/building-extension-applications-on-symphony.md)
* Your application needs to use the [entity service](../../../../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/entity-service/), which will allow you to:
  * Register your application as being able to render a specific type, using the [`registerRenderer` function](../../../../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/entity-service/#registerrenderer).
  * Render the object itself, by implementing the [`render` function](../../../../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/entity-service/#render).

## Go further...

To learn more about building Extension Applications that leverage structured objects, continue here:

{% content-ref url="../../../../building-extension-applications-on-symphony/planning-your-app/extension-applications-+-structured-objects.md" %}
[extension-applications-+-structured-objects.md](../../../../building-extension-applications-on-symphony/planning-your-app/extension-applications-+-structured-objects.md)
{% endcontent-ref %}
