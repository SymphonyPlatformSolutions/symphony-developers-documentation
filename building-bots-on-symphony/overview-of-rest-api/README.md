# Overview of REST API

The Symphony REST API acts as a secure interface between your Symphony Bot and Symphony's components. Symphony's architecture for bots comprises three components: the **Symphony Pod**, the **API Agent** and the **Key Manager**.

The Symphony REST API is spread out across these components according to the type of API being called.

{% hint style="info" %}
### While Bots can call the Symphony API directly, Symphony's dedicated SDKs and BDK provide language-specific API bindings that enable bot developers to easily call the API directly from code:

* [SDKs](../../developer-tools/developer-tools/sdks/)
* [BDK](../../developer-tools/developer-tools/bdk-2.0/bdk-1.0/)
* [BDK 2.0](../../developer-tools/developer-tools/bdk-2.0/)
{% endhint %}

## REST API Architecture

To learn more about how bots securely interact with Symphony's three components, continue onto the REST API Architecture guide below:

{% content-ref url="rest-api-architecture.md" %}
[rest-api-architecture.md](rest-api-architecture.md)
{% endcontent-ref %}

## Pod API

To learn more about how bots can make authentication and administrative calls such as manage streams, manage users or facilitate cross-pod connections, continue onto the Pod API guide below:

{% content-ref url="pod-api.md" %}
[pod-api.md](pod-api.md)
{% endcontent-ref %}

## Key Manager API

To learn more about how bots can authenticate and encrypt messages on Symphony, continue onto the Key Manager API guide below:

{% content-ref url="key-manager-api.md" %}
[key-manager-api.md](key-manager-api.md)
{% endcontent-ref %}

## Agent API

To learn more about how bots can send and receive encrypted messages on Symphony, continue onto the Agent API guide below:

{% content-ref url="agent-api.md" %}
[agent-api.md](agent-api.md)
{% endcontent-ref %}

## REST API Reference

For the full Symphony API reference continue here:

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
