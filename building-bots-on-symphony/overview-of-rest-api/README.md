# Overview of REST API

The Symphony REST API acts as a secure interface between your Symphony Bot and Symphony's components. Symphony's architecture for bots comprises three components: the **Symphony Pod**, the **API Agent** and the **Key Manager**.

The Symphony REST API is spread out across these components according to the type of API being called.

{% hint style="info" %}
### While Bots can call the Symphony API directly, Symphony's dedicated SDKs and BDK provide language-specific API bindings that enable bot developers to easily call the API directly from code:

* [SDKs](../../developer-tools/developer-tools/sdks.md)
* [BDK](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/01be512d5039efcee08612261ab28623b53067c7/developer-tools/developer-tools/bdk-2.0/bdk-1.0)
* [BDK 2.0](../../developer-tools/developer-tools/bdk-2.0/)
{% endhint %}

## REST API Architecture

To learn more about how bots securely interact with Symphony's three components, continue onto the REST API Architecture guide below:

{% page-ref page="rest-api-architecture.md" %}

## Pod API

To learn more about how bots can make authentication and administrative calls such as manage streams, manage users or facilitate cross-pod connections, continue onto the Pod API guide below:

{% page-ref page="pod-api.md" %}

## Key Manager API

To learn more about how bots can authenticate and encrypt messages on Symphony, continue onto the Key Manager API guide below:

{% page-ref page="key-manager-api.md" %}

## Agent API

To learn more about how bots can send and receive encrypted messages on Symphony, continue onto the Agent API guide below:

{% page-ref page="agent-api.md" %}

## REST API Reference

For the full Symphony API reference continue here:

