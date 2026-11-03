---
hidden: true
---

# Agent Guide

{% hint style="warning" %}
This page is not maintained anymore. The Agent guide is available in [Symphony Docs](https://docs.symphony.com/posts/5576418-agent-api-guide).
{% endhint %}

The **API Agent** is a component that is responsible for encrypting and decrypting the payloads of messages sent and received by an API caller, so that the caller does not need to implement encryption itself. The API Agent thus enables Symphony to provide a stable public API for application developers, even if the underlying Symphony private APIs undergo changes.

This guide describes Symphony's public REST APIs and provides an overview of the technical infrastructure needed to support them. It is intended for infrastructure engineers who are planning to deploy the Agent or the Symphony REST API infrastructure in their organization. It provides an overview of network connectivity and infrastructure requirements for applications that call the REST APIs.

Application developers and development managers who plan to develop REST API-based applications for Symphony may also find the contents of this guide useful background information.

### REST API Architecture

Developers can use Symphony's REST APIs to create tools and applications for sending and receiving messages, user administration, and chat management.

REST API endpoints are implemented on several physical interfaces:

* The **Pod** is a cloud-based Symphony server infrastructure deployed in the cloud.
* The **Key Manager** holds encryption key material for Symphony users.
* The **Agent** provides encryption and decryption services for applications calling the Agent API.

For security reasons, both the Key Manager and the Agent are typically deployed onsite at the customer's location; however, in some cases (for example, in testing environments) they may be deployed in the cloud.
