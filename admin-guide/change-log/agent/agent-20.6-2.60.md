---
description: >-
  This page describes the change log of the 20.6 (2.60) patch updates of the
  Agent service
---

# Agent - 20.6 (2.60)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](agent-20.6-2.60.md#agent-download).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 2.60.0

* Support of Regular Expression filtering on Elements for the Text Field and Text Area Elements.
* Improved velocity of Agent APIs responses.
* Fixed an issue when replying to messages containing tables.
* Fixed an issue when sending attachments using the Create Message (V2 and V3) API endpoints, where it was not possible to then download the attachment in the Client.
* Changes to the [Health Check Extended v3](https://developers.symphony.com/restapi/v20.6/reference#authentication) API endpoint in order to return the Agent status as `UP` when the `ceservice` or `agentservice` users are not configured in the Agent configuration file (agent.yml).
* [Download Attachment](https://developers.symphony.com/restapi/v20.6/reference#attachment): Properly return a 404 error code when trying to download an attachment for a non existent message or invalid file id.

### Agent 2.60.1

* Fixed an issue when mentioning external users with their email (`<mention />` in messageML)
* FIxed a DLP issue returning 400 for a blocked message instead of expected 451
* Removed a duplicated definition in swagger
* Moved v3 healthcheck API specifications to Swagger specs
* Moved Datafeed v2 API specifications to Swagger specs
* Updated the agent image for multi-tenancy project
* Updated the messageml library version
* Check if agent or CE service user is configured before testing health check

### Agent 2.60.2

* Removed the stack trace logging if log level is not set to "debug"
* Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default
* Fixed security vulnerabilities in the Agent

## **Deprecation Notice**

### **APIs**

No Agent API was deprecated in Symphony version 20.5.
