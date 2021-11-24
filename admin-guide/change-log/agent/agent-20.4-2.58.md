---
description: >-
  This page describes the change log of the 20.4 (2.58) patch updates of the
  Agent service
---

# Agent - 20.4 (2.58)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](agent-20.4-2.58.md#agent-download).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 2.58.0

* General changes
  * Fixed an issue when sending an article with the Share v3 API was showing the wrong notification format.
  * Fixed an issue with users blocked by IB policies. Now, a subscription error is shown when an API caller subscribes to a visible signal created by an IB blocked user.
  * The messageML has been improved so that linebreaks are accepted in Text Area Elements.
* Agent APIs updates
  * [Import Message](https://developers.symphony.com/restapi/reference#import-message-v4): fixed an issue when importing a message that contains DLP violations was not returning the diagnostic message.
  * Fixed inconsistencies with the returned response body of DLP APIs.

### Agent 2.58.1

* A fix was added to the Agent Health Check (v2 and v3) in order to ignore Datafeed v2 status.

## **Deprecation Notice**

### **APIs**

No Agent API was deprecated in Symphony version 20.4.
