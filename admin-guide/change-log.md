# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

## **Symphony 20.12 - Agent 20.12.0**

### Swagger

The Swagger file for v20.12 available [here](%20https://github.com/symphonyoss/symphony-api-spec/tree/20.12).

### Agent Changes

#### Agent 20.12.0

* With API Gateway v2 being rolled out, Agent now supports new 429 Retry later replies:
  * For all endpoints, if a 429 is received by the agent, it is mapped to a 400 and the "Retry-After" header is forwarded
  * For importing or retrieving multiple messages, then Agent has implemented a retry mechanism
* Improved performance when creating message with multiple files attached
* Fix to support the usage of base64 image in background-image style
* Fixed some security vulnerabilities

{% hint style="info" %}
### Agent 20.12.0 - officially supported Agent for Symphony version v20.12

To download the Agent, click [here](%20https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.12.0.zip).

For a list of Agent x SBE compatibilities, click [here](agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

#### **New APIs**

No API endpoint was created in Symphony version 20.12.

#### **Updated APIs**

* [Suppress Message](https://developers.symphony.com/restapi/v20.12/reference#suppress-message) endpoint has been updated to allow Service Accounts to suppress their own message without the need of any permission, as well as Apps to suppress messages on behalf of Users with the new permission SUPPRESS\_MESSAGE \(see [OBO Authentication](../building-extension-applications-on-symphony/app-authentication/obo-authentication.md)\).
* [POST](https://developers.symphony.com/restapi/v20.12/reference#message-search-post) and [GET Message Search](https://developers.symphony.com/restapi/v20.12/reference#message-search-get) endpoints were updated to return 400 error instead of 500 when call requested to search by invalid StreamId.
* [Create Message v4](https://developers.symphony.com/restapi/v20.12/reference#create-message-v4) endpoint was updated to return 400 error instead of 500 when creating a message into a deleted room.
* [Import Message](https://developers.symphony.com/restapi/v20.12/reference#import-message-v4) endpoint was updated to return a more explicit message when trying to import a message into a deleted conversation
* Agent was updated to return a 400 error as well as an explicit message when the backend identifies that the message size limit has been exceeded at ingestion.
* [Read Datafeed v5](https://developers.symphony.com/restapi/v20.12/reference#read-datafeed-v5) response now contains empty events array for changing presence status instead of an events array containing the 'null' value

#### **Deprecated APIs**

* [Health Check v2](https://developers.symphony.com/restapi/v20.12/reference#health-check-v2) endpoint was deprecated.

### **General Updates**

* Introduction of 3 new Elements: [Date Picker](../building-bots-on-symphony/symphony-elements/available-elements/date-picker.md), [Time Picker](../building-bots-on-symphony/symphony-elements/available-elements/time-picker.md), and [Timezone Picker](../building-bots-on-symphony/symphony-elements/available-elements/timezone-picker.md). _Please go to the description of these new Elements to see their availability on the Client side, as some of them are not or only partially available in the 20.12 version of the Client 1.5, but already released in compatible versions of Client 2.0._
* Elements formReplies are now processed via DLP in both Client 1.5 and 2.0.
* Client 1.5: Fixed display bugs of Elements: removed extra spacing at the bottom of forms, as well as more general bugs
* Fixed the issue of still getting wall post messages via the [Get Message v1](https://developers.symphony.com/restapi/v20.12/reference#get-message-v1) endpoint, although "Allow user to read wall posts" entitlement was set to No

### Client 2.0 updates

Please look at the Client 2.0 release notes to see which features have been introduced in the new Client, such as features for Extension Apps, or eventual Elements changes.

