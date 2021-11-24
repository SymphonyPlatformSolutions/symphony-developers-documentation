---
description: >-
  This page describes the change log of the 20.7 (2.61) patch updates of the
  Agent service
---

# Agent - 20.7 (2.61)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](agent-20.7-2.61.md#agent-download).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 2.61.0

* Fixed issues in the conversion of the emoji shortcode from messageML to presentationML.
* Improved the [Health Check Extended v3](https://developers.symphony.com/v20.7/restapi/reference#health-check-extended-v3) API endpoint to return the authType field, showing if the Agent authentication is configured to use RSA or Certificate.
* [Message Create v4](https://developers.symphony.com/restapi/v20.7/reference#create-message-v4): Fixed issue when sending a message that mentions an external user by his/her email.
* Properly return a 451 error code when a message sent is blocked by DLP (Data Loss Prevention) instead of returning a 400 error code.
* More secured way to provide Authentication credentials for the Agent: RSA private key for the agentservice user and ceservice user can be passed through VM parameters. For more information, refer to [Agent 2.X and above Installation](../../agent-guide/agent-2.x-and-above-installation.md).

### Agent 2.61.1

* Fix backward compatibility bug for Elements buttons (Deprecated `primary-destructive` and `secondary-destructive` classes are now mapped to `primary` and `secondary`)

### Agent 2.61.2

* Removed a duplicated definition in swagger
* Fixed some bugs

### Agent 2.61.3

* Removed the stack trace logging if log level is not set to "debug"
* Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default

## **Deprecation Notice**

### **APIs**

No Agent API was deprecated in Symphony version 20.7.
