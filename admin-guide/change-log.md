---
description: >-
  This page contains essential information about the changes that occurred in
  the Agent service and in Symphony's REST APIs.
---

# Change Log

## **Symphony 20.12 - Agent 20.12.3**

### Swagger

The Swagger file for v20.12 available [here](%20https://github.com/symphonyoss/symphony-api-spec/tree/20.12).

### Agent Changes

#### Agent 20.12.3

* Fixed bug due to excessive token storing duration in cache, causing occasional 401s when trying to read datafeed v2 once expired

#### Agent 20.12.2

* Fixed bug where some of the Agent logs were sent to the standard error stream instead of the configured loggers.
* Collection of statistics on the usage of messageML features. The statistics consist in the usage of features such as the Elements Datepicker or the usage of regex patterns in  textfields. The data will help understanding which features are favoured by developers and will help driving evolutions to the messageML language going forward. No sensitive parts of messages can be captured in any circumstances.
* Support for future MessageML features, dependent on a new Client 2.0 release. Features will be documented once available in Client 2.0.
  * Elements - Support multiple submits of a form \(optional parameter\).
  * Elements - Support the future Dialog element. 
  * UI Action - Support the future Open Chat UI Action.
* Fixed an issue with the DLP support of the Share endpoint \(/agent/v3/stream/:sid/share/\)
* Performance improvement: The time required to parse MessageML has been divided by a factor of 5.
* Ability for service users to benefit from a reduced latency when sending messages, by bypassing the DLP service \(Data Loss Prevention\). This behavior can be configured through a service user entitlement "Bypass DLP" available in the Admin Portal. By default, DLP is enabled for all service users.

#### Agent 20.12.1

* Agent now supports the encryption of the sensitive Agent configuration parameters such as passwords and keys. Please refer to Agent [installation page](https://docs.developers.symphony.com/v/v20.12/admin-guide/agent-guide/agent-2.x-and-above-installation#overview-of-the-setup-script) \(Setup Script option i\) for more information. 
* Fixed connection pool shortage issue related to an unreleased connection in the Healthcheck.

#### Agent 20.12.0

* Agent now supports new 429 Retry later replies from downstream services \(such as Symphony Back-End\) as follows: for backward-compatibility purposes, if a 429 is received by the agent, it is mapped to a 400 and the "Retry-After" header is forwarded. _Please start updating your bots to support 429 errors as we will introduce them in the future._
* Improved performance when creating message with multiple files attached.
* MessageML: Fix to support the usage of base64 image in background-image style.
* Updated dependencies to address potential security vulnerabilities.

{% hint style="info" %}
### Agent 20.12.3 - officially supported Agent for Symphony version v20.12

To download the Agent, click [here](%20https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.12.3.zip).

For a list of Agent x SBE compatibilities, click [here](agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

#### **New APIs**

No API endpoint was created in Symphony version 20.12.

#### **Updated APIs**

* [Suppress Message](https://developers.symphony.com/restapi/v20.12/reference#suppress-message) endpoint has been updated to allow Service Accounts to suppress their own message without the need of any permission, as well as Apps to suppress messages on behalf of Users with the new permission SUPPRESS\_MESSAGE \(see [OBO Authentication](../building-extension-applications-on-symphony/app-authentication/obo-authentication.md)\).
* [POST](https://developers.symphony.com/restapi/v20.12/reference#message-search-post) and [GET Message Search](https://developers.symphony.com/restapi/v20.12/reference#message-search-get) endpoints were updated to return 400 error instead of 500 when call requested to search by invalid StreamId.
* [Create Message v4](https://developers.symphony.com/restapi/v20.12/reference#create-message-v4) endpoint was updated to return 400 error instead of 500 when creating a message into a deleted room.
* [Import Message](https://developers.symphony.com/restapi/v20.12/reference#import-message-v4) endpoint was updated to return a more explicit message when trying to import a message into a deleted conversation.
* Agent was updated to return a 400 error as well as an explicit message when the backend identifies that the message size limit has been exceeded at ingestion.
* In order to be consistent with other endpoints, [Attachment](https://developers.symphony.com/restapi/v20.12/reference#attachment) 404 errors are mapped by the agent to 400.
* [Read Datafeed v5](https://developers.symphony.com/restapi/v20.12/reference#read-datafeed-v5) response now contains empty events array for changing presence status instead of an events array containing the 'null' value.

#### **Deprecated APIs**

* [Health Check v2](https://developers.symphony.com/restapi/v20.12/reference#health-check-v2) endpoint was deprecated.

### **General Updates**

* Introduction of 3 new Elements: [Date Picker](../building-bots-on-symphony/symphony-elements/available-elements/date-picker.md), [Time Picker](../building-bots-on-symphony/symphony-elements/available-elements/time-picker.md), and [Timezone Picker](../building-bots-on-symphony/symphony-elements/available-elements/timezone-picker.md). _Please go to the description of these new Elements to see their availability on the Client side, as some of them are not or only partially available in the 20.12 version of the Client 1.5, but already released in compatible versions of Client 2.0._
* Fixed display bugs of Elements: removed extra spacing at the bottom of forms, as well as more general bugs
* Fixed the issue of still getting wall post messages via the [Get Message v1](https://developers.symphony.com/restapi/v20.12/reference#get-message-v1) endpoint, although "Allow user to read wall posts" entitlement was set to No
* New [Agent Performance Tuning](agent-guide/agent-performance-tuning.md) guide available.

### Client 2.0 updates

Please look at the Client 2.0 release notes to see which features have been introduced in the new Client, such as features for Extension Apps, or eventual Elements changes.

