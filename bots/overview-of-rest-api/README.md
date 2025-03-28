# Overview of REST API

The Symphony Messaging REST API acts as a secure interface between your Symphony Messaging Bot and Symphony Messaging's components. Symphony's architecture for bots comprises three components: the **Symphony Messaging Pod**, the **API Agent** and the **Key Manager**.

The Symphony Messaging REST API is spread out across these components according to the type of API being called.

{% hint style="info" %}
While Bots can call the Symphony Messaging API directly, Symphony Messaging's dedicated BDK and WDK toolkits provide language-specific API bindings that enable bot developers to easily call the API directly from code:

* The [Java Bot Developer Kit](../../dev-tools/bdk-java/) (Java BDK)
* The [Python Bot Developer Kit](../../dev-tools/bdk-python.md) (Python BDK)
{% endhint %}

## API Swagger files

The API Swagger files are available [here](https://github.com/finos/symphony-api-spec#symphony-api-spec).&#x20;

There is one sub-folder per API collection, and each API collection is split in two swagger files: one for the supported endpoints and a second one listing only the deprecated endpoints (e.g. `/pod/pod-api-public-deprecated.yaml`).

Depending on your pod or agent version, a newly introduced endpoint may not yet be available to you. You can spot these new endpoints as they are tagged with the `x-since` attribute. For example, an endpoint flagged as `x-since: 20.15` will not be present if you are still on SBE 20.14.

## REST API Architecture

To learn more about how bots securely interact with Symphony Messaging's three components, continue onto the REST API Architecture guide below:

{% content-ref url="rest-api-architecture.md" %}
[rest-api-architecture.md](rest-api-architecture.md)
{% endcontent-ref %}

## Pod API

To learn more about how bots can make authentication and administrative calls such as manage streams, manage users or facilitate cross-pod connections, continue onto the Pod API guide below:

{% content-ref url="pod-api.md" %}
[pod-api.md](pod-api.md)
{% endcontent-ref %}

## Key Manager API

To learn more about how bots can authenticate and encrypt messages on Symphony Messaging, continue onto the Key Manager API guide below:

{% content-ref url="key-manager-api.md" %}
[key-manager-api.md](key-manager-api.md)
{% endcontent-ref %}

## Agent API

To learn more about how bots can send and receive encrypted messages on Symphony Messaging, continue onto the Agent API guide below:

{% content-ref url="agent-api.md" %}
[agent-api.md](agent-api.md)
{% endcontent-ref %}

## REST API Reference

For the full Symphony Messaging API reference continue here:

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
