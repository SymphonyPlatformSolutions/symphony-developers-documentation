---
description: >-
  This page describes the change log of the 20.5 (2.59) patch updates of the
  Agent service
---

# Agent - 20.5 (2.59)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](agent-20.5-2.59.md#agent-download).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 2.59.0Line breaks ('\n') are now allowed in the Text Area Element.

* General Changes
  *
  * Fixed an issue with users blocked by IB policies. Now, a subscription error is shown when an API caller subscribes to a visible signal created by an IB blocked user.
  * Improvements in DLP error responses.
  * Fixed issues with OBO session cache.
  * Missing metrics were added to the metrics report.
* APIs updates
  * A fix was added to the Agent Health Check (v2 and v3) in order to ignore Datafeed v2 status.
  * Fixed an issue that when removing a user from a wall post stream was returning an incorrect message response.

## **Deprecation Notice**

### **APIs**

No Agent API was deprecated in Symphony version 20.5.
