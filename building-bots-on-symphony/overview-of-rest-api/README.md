# Overview of REST API

The Symphony REST API acts as a secure interface between your Symphony Bot and the Symphony Platform. Symphony's architecture is comprised of three components: the **Symphony Pod**, the **Symphony Agent**, and the **Symphony Key Manager**.

The Symphony REST API is spread out across these components according to the type of API being called.

{% hint style="info" %}
#### While Bots can call the Symphony API directly, Symphony's dedicated SDKs and BDK provide language-specific API bindings that enable developers to easily call the API directly from their Bot code:

* [SDKs](../../developer-tools/developer-tools/sdks/)
* [BDK](../../developer-tools/developer-tools/bdk/)
* [BDK 2.0 \(Beta\)](../../developer-tools/developer-tools/bdk-2.0.md)
{% endhint %}

## REST API Architecture

To learn more about how bots securely interact with Symphony's three components continue onto the REST API Architecture guide below:

{% page-ref page="rest-api-architecture.md" %}

## Pod API

To learn more about how Bots can make authentication and administrative calls such as manage streams, manage users, and facilitate cross-pod connections continue onto the Pod API guide below:

{% page-ref page="pod-api.md" %}

## Key Manager API

To learn more about how Bots can authenticate and encrypt messages on Symphony, continue onto the Key Manager API guide below:

{% page-ref page="key-manager-api.md" %}

## Agent API

To learn more about how Bots can send and receive encrypted messages on Symphony, continue onto the Agent API guide below:

{% page-ref page="agent-api.md" %}

## REST API Reference

For a full Symphony API reference continue here:

