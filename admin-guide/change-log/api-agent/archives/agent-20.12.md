---
description: >-
  This page describes the change log of the 20.12 patch updates of the Agent
  service
---

# Agent - 20.12

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.12.12.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 20.12.12

* Fixed service users not able to send a message to a specific chat room (cached content key not refreshed).&#x20;

### Agent 20.12.11

* Fixed file descriptor leak.
* Upgrade Spring Boot version (security vulnerability patch)

### Agent 20.12.10

* Fixed Log4J critical security vulnerability (log4j v2.17).
* Fixed file descriptor leak.

### Agent 20.12.5

* Fixed Blast message endpoint returning a 500 instead of 200 when one of the messages could not be sent (e.g one of the stream ids was not correct).&#x20;
* Fixed that the ROOMUPDATED event received on the datafeed did not contain the stream id when the updated conversation was a group chat.

### Agent 20.12.4

* Fixed bug where payload was missing when message is sent on mobile with @ mention when Datafeed v2 is configured on the pod.
* Fixed memory leak bug.
* Updated dependencies to address potential security vulnerabilities.

### Agent 20.12.3

* Fixed bug due to excessive token storing duration in cache, causing occasional 401s when trying to read datafeed v2 once expired

### Agent 20.12.2

* Fixed bug where some of the Agent logs were sent to the standard error stream instead of the configured loggers.
* Collection of statistics on the usage of messageML features. The statistics consist in the usage of features such as the Elements Datepicker or the usage of regex patterns in  textfields. The data will help understanding which features are favoured by developers and will help driving evolutions to the messageML language going forward. No sensitive parts of messages can be captured in any circumstances.
* Support for future MessageML features, dependent on a new Client 2.0 release. Features will be documented once available in Client 2.0.
  * Elements - Support multiple submits of a form (optional parameter).
  * Elements - Support the future Dialog element.&#x20;
  * UI Action - Support the future Open Chat UI Action.
* Fixed an issue with the DLP support of the Share endpoint (/agent/v3/stream/:sid/share/)
* Performance improvement: The time required to parse MessageML has been divided by a factor of 5.
* Ability for service users to benefit from a reduced latency when sending messages, by bypassing the DLP service (Data Loss Prevention). This behavior can be configured through a service user entitlement "Bypass DLP" available in the Admin Portal. By default, DLP is enabled for all service users.

### Agent 20.12.1

* Agent now supports the encryption of the sensitive Agent configuration parameters such as passwords and keys. Please refer to Agent [installation page](https://docs.developers.symphony.com/v/v20.12/admin-guide/agent-guide/agent-2.x-and-above-installation#overview-of-the-setup-script) (Setup Script option i) for more information.&#x20;
* Fixed connection pool shortage issue related to an unreleased connection in the Healthcheck.

### Agent 20.12.0

* General changes:
  * Introduction of 3 new Elements: [Date Picker](../../../../bots/messages/overview-of-messageml/symphony-elements-1/date-picker.md), [Time Picker](../../../../bots/messages/overview-of-messageml/symphony-elements-1/time-picker.md), and [Timezone Picker](../../../../bots/messages/overview-of-messageml/symphony-elements-1/timezone-picker.md). _Please go to the description of these new Elements to see their availability on the Client side, as some of them are not or only partially available in the 20.12 version of the Client 1.5, but already released in compatible versions of Client 2.0._
  * Agent now supports new 429 Retry later replies from downstream services (such as Symphony Back-End) as follows: for backward-compatibility purposes, if a 429 is received by the agent, it is mapped to a 400 and the "Retry-After" header is forwarded. _Please start updating your bots to support 429 errors as we will introduce them in the future._
  * Improved performance when creating message with multiple files attached.
  * MessageML: Fix to support the usage of base64 image in background-image style.
  * Updated dependencies to address potential security vulnerabilities.
* APIs updates:
  * [POST](https://developers.symphony.com/restapi/v20.12/reference#message-search-post) and [GET Message Search](https://developers.symphony.com/restapi/v20.12/reference#message-search-get) endpoints were updated to return 400 error instead of 500 when call requested to search by invalid StreamId.
  * [Create Message v4](https://developers.symphony.com/restapi/v20.12/reference#create-message-v4) endpoint was updated to return 400 error instead of 500 when creating a message into a deleted room.
  * [Import Message](https://developers.symphony.com/restapi/v20.12/reference#import-message-v4) endpoint was updated to return a more explicit message when trying to import a message into a deleted conversation.
  * Agent was updated to return a 400 error as well as an explicit message when the backend identifies that the message size limit has been exceeded at ingestion.
  * In order to be consistent with other endpoints, [Attachment](https://developers.symphony.com/restapi/v20.12/reference#attachment) 404 errors are mapped by the agent to 400.
  * [Read Datafeed v5](https://developers.symphony.com/restapi/v20.12/reference#read-datafeed-v5) response now contains empty events array for changing presence status instead of an events array containing the 'null' value.
  * Fixed the issue of still getting wall post messages via the [Get Message v1](https://developers.symphony.com/restapi/v20.12/reference#get-message-v1) endpoint, although "Allow user to read wall posts" entitlement was set to No



## **Deprecation Notice**

### **APIs**

* [Health Check v2](https://developers.symphony.com/restapi/v20.12/reference#health-check-v2) endpoint was deprecated.

### **General products**

* **Deprecation notice**: The legacy Java & Python SDKs are now replaced with the new [Java BDK](https://github.com/finos/symphony-bdk-java) and [Python BDK](https://github.com/finos/symphony-bdk-python). These are now the reference for building Bots in Java or Python on Symphony, and are hosted on FINOS. The legacy SDKs will have a reduced support starting in **January 2022** and will no longer be supported in **March 2022**. At this date, you will still be able to use the legacy SDKs, however please consider migrating to the new BDKs for faster development, higher reliability & always benefit from the new features.&#x20;
* **Deprecation notice:** Symphony will stop supporting the legacy NodeJS SDK in the coming months, with the following timeline: In **January 2022**, only critical issues will be fixed in the legacy NodeJS SDK. **In March 2022**, the SDK will no longer be actively supported. At this date you will still be able to use the SDK, however, please consider our SDKs in Java, Python or .Net if you prefer to benefit from a better support.
