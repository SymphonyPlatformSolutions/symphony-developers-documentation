# Entities

Entities (also called Structured Objects) are rich, inline, interactive components for Symphony messages that allow you to embed information that is more complex than simple text.

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

Please continue below in the subpages if you want to learn more about Structured Objects
