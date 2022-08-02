---
description: >-
  This page describes the change log of the 20.9 (2.62) patch updates of the
  Agent service
---

# Agent - 20.9 (2.62)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://docs.developers.symphony.com/admin-guide/agent-guide/agent-download).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 2.62.7

* Fixed Log4J critical security vulnerability (log4j v2.17).
* Fixed bug where some of the Agent logs were sent to the standard error stream instead of the configured loggers.

### Agent 2.62.4

* Fixed agentservice/ceservice healthcheck
* Fixed some vulnerable dependencies

### Agent 2.62.3

* Fixed some vulnerable dependencies (including upgrades of jackson and httpclient)

### Agent 2.62.2

* Removed the stack trace logging if log level is not set to "debug"
* Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default

### Agent 2.62.1

* Fixed Docker image of the agent
* Upgrade for library dependencies

### Agent 2.62.0

* Support of new Elements features (Expandable Card, Label and Tooltip)
  * Expandable card: new Expandable card with updated display. The card can have three different states, that can be set by the developer: collapsed, expanded but cropped, fully expanded. _See how to use the `expandable-card` tag in_ [_Content Grouping_](../../../../building-bots-on-symphony/messages/overview-of-messageml/messageml-basic-format-tags/content-grouping.md) _specifications._
  * Label: it is now possible to set a Label associated with an element (text-field, masked text-field, textarea, dropdown, person selector) so the user can understand better the field meaning. This way the placeholder can focus on providing a hint of the expected format. _See more details on how to use it in the documentation for specific elements supporting the `label` attribute under the_ [_Interactive Elements Forms_](../../../../building-bots-on-symphony/messages/overview-of-messageml/symphony-elements-1/) _section._
  * Tooltip: it is now possible to add a hint associated with an element (for text-field, masked text-field, textarea, dropdown, person selector) to provide more detailed information to the user on the meaning or expected value of an Element. _See more details on how to use it in the documentation for specific elements supporting the `title` attribute under the_ [_Interactive Elements Forms_](../../../../building-bots-on-symphony/messages/overview-of-messageml/symphony-elements-1/) _section._
* The following API endpoint has been created:
  * [Blast Message](https://developers.symphony.com/restapi/v20.9/reference#blast-message) to send a message to a list of streams (room, IM, MIM).
* Removed a duplicated definition in swagger and moved some endpoints definition to the right swagger repository (see swagger link above)
* Upgrade of library dependencies



## **Deprecation Notice**

### **APIs**

No Agent API was deprecated in Symphony version 20.9.
