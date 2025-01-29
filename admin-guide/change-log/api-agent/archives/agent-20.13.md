---
description: >-
  This page describes the change log of the 20.13 patch updates of the Agent
  service
---

# Agent - 20.13

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.13.12.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 20.13.12

* Upgrade to SpringBoot 2.6.8
* Fixed security vulnerability

### Agent 20.13.11

* Fixed health check v2 failing (agent service authentication not renewed).

### Agent 20.13.10

* Fixed service users not able to send a message to a specific chat room after a KM rotation/NIST transformation (cached content key not refreshed).&#x20;
* Fixed failure when reading from a new datafeed with a null datafeed ackId.

### Agent 20.13.9

* Fixed file descriptor leak when uploading DLP dictionaries.
* Fixed service users not able to refresh tokens once they expire.

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

* Introduced Message Update functionality for bots messages as a Beta version. See more info on [Message API endpoints](../../../../bots/messages/) section in the Messages documentation, as well as the new endpoints available in our REST API reference. Please note there is a dependency on the SBE 20.13.2 version for this feature to be working.
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
