---
description: >-
  This page describes the change log of the 20.12 patch updates of the Agent
  service
---

# Agent - 20.10

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://docs.developers.symphony.com/admin-guide/agent-guide/agent-download).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 20.10.8

* Fixed Log4J critical security vulnerability (log4j v2.17).
* Fixed file descriptor leak.

### Agent 20.10.3

* Fixed bug where some of the Agent logs were sent to the standard error stream instead of the configured loggers

### Agent 20.10.2

* Fixed connection pool shortage issue related to an unreleased connection in the Healthcheck
* Updated dependencies to address potential security vulnerabilities

### Agent 20.10.1

* Fixed some vulnerable dependencies

### Agent 20.10.0

* General changes:
  * The Agent will return a direct error when trying to send a message larger than the max message length. Please keep in mind that other errors related to message size limits such as the number of Search tokens to be indexed will continue to be returned indirectly through the datafeed.
  * Elements Checkboxes and Radio buttons: The limit of number of Elements in a form has been increased to 50. Please note that this limit has been set as a safeguard to avoid reaching the limit of the message total number of characters.
  * Agent compatibility with OpenJDK 1.8 262 has been verified&#x20;
  * Fixed security vulnerabilities in the Agent
  * Removed logging of Agent properties at startup
  * Removed the stack trace logging if log level is not set to "debug"
  * Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default
* APIs updates:
  * The behavior of some API endpoints has been changed to ignore unexpected parameters. Please keep in mind that unexpected parameters are not officially supported and may result in an error in a future version.



## **Deprecation Notice**

### **APIs**

No Agent API endpoint was deprecated in Symphony version 20.10.
