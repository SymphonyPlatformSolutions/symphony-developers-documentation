---
description: >-
  This page describes the change log of the 20.13 patch updates of the Agent
  service
---

# Agent - 20.13

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](agent-20.13.md#agent-download).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 20.13.8

* Fixed Log4J critical security vulnerability (log4j v2.17).
* Fixed file descriptor leak.

### Agent 20.13.3

* Fixed Blast message endpoint returning a 500 instead of 200 when one of the messages could not be sent (e.g one of the stream ids was not correct).&#x20;
* Fixed that the ROOMUPDATED event received on the datafeed did not contain the stream id when the updated conversation was a group chat.
* Fixed memory leak when sending an attachment.

### Agent 20.13.2

* Fixed bug where OBO calls are failing repeatedly

### Agent 20.13.1

* Introduced Message Update functionality for bots messages as a Beta version. See more info on [Message API endpoints](../../../building-bots-on-symphony/messages/) section in the Messages documentation, as well as the new endpoints available in our REST API reference. Please note there is a dependency on the SBE 20.13.2 version for this feature to be working.
* Fixed bug where payload was missing when message is sent on mobile with @ mention when Datafeed v2 is configured on the pod.

### Agent 20.13.0

* Datafeed v2 now properly supports the Presence events.
* Fixed bug where the endpoint to share an article could bypass the DLP checks.
* New metrics are now available in the logs to help the troubleshooting (such as memory/CPU usage, health check statuses, cache, client pool, or thread pool usage, in/out response time, etc.).
* In the configuration file, the keystore password can now be encrypted.
* Fixed a bug of excessive token storing duration in cache, causing occasional 401s when trying to read datafeed v2 once expired.



## **Deprecation Notice**

### **APIs**

No Agent API endpoint was deprecated in Symphony version 20.13.
