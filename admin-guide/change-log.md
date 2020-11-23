# Change Log

## 

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

{% hint style="info" %}
With 20.3.1 \(previously known as 1.57\) our product release naming convention changed.

Symphony releases are now in the format: \[year \# \(last two digits\)\].\[month \#\].\[build/patch \#\].

This release is numbered 20.3.1 to indicate the year 2020; March, month 3 of the year; and build/patch number 1. Note that the year and month indicate when the release is declared ready for customers by Symphony engineering; the actual production date will vary based on a number of additional factors.

For further questions, please contact your TAM or Customer Support.
{% endhint %}

### **Symphony Release 20.3 \(1.57\) - Agent 2.57.4**

#### Swagger

The Swagger file for v20.3.1 \(1.57\) is available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.3.1).

#### Important Updates

With the upgrade to Symphony v20.3, any bot or application that utilizes Elements requires that customers have the Agent upgraded to 2.57.x, and also to confirm the SDK used to build the bot or application supports the new Elements payload. The Symphony-supported SDK versions are:

* Java SDK 1.1.1 or later
* Python SDK 1.1.0 or later
* NodeJS 1.1.1 or later

For customers who have developed their own SDK or have incorporated a third-party SDK, you must ensure that the SDK supports the modified JSON payload response. This is detailed in the Symphony API Specification located here [https://github.com/symphonyoss/symphony-api-spec/blob/20.3.1/agent/agent-api-public.yaml\#L3643](https://github.com/symphonyoss/symphony-api-spec/blob/20.3.1/agent/agent-api-public.yaml#L3643).

#### Agent Changes

* Agent 2.57.4
  * Fixed an issue that when calling the Create Message v3 API with an attachment, was not returning the attachment correctly.
  * Fixed an issue when replying to messages containing pasted tables was not working properly.
  * Changes applied to the [Health Check Extended v3](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-extended-v3) API in order to return the Agent status as UP when the `ceservice` or `agentservice` users are not configured in the Agent configuration file \(agent.yml\).
  * To avoid error messages, a validation was added to the Agent in order to check if the `ceservice` or `agentservice` accounts are configured before calling the [Health Check v2](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-v2) API.
* Agent 2.57.3
  * Fixed issues with OBO session cache.
  * Missing metrics were added to the metrics report.
  * Now it is possible to enable the Prometheus scrap endpoint. The procedure is documented in the README.md file.
* Agent 2.57.2
  * A fix was added to the Agent Health Check \(v2 and v3\) in order to ignore Datafeed v2 status.
* Agent 2.57.1
  * Some changes were added to the Agent Health Check \(v2 and v3\) in order to fix issues with the Datafeed v2.
* Agent 2.57.0
  * Fixed an issue when bots were not being able to send a message to a Corporate pod using the Agent from a Bot-home pod.
  * Fixed an issue when OBO calls were failing due to the agentservice token not being renewed.
  * Fixed an issue that when sharing articles was creating duplicate messages.
  * Fixed an issue when bots were not being able to send a message to a Corporate pod using the Agent from a Bot-home pod.
  * Fixed an issue when sending attachments with unsupported file extension was returning the 500 HTTP error.
  * Agent adjustments to use the `isFormReply` flag instead of the `chatType` in order to define if a given Social Message is a form reply.
  * Fixed an issue when sending images as attachments via the [Create Message v4](https://developers.symphony.com/restapi/v20.3/reference-link/create-message-v4) API was reducing the quality of the images.
  * Fixed an issue when calling the [create](https://developers.symphony.com/restapi/v20.3/reference-link/create-signal) and [update](https://developers.symphony.com/restapi/v20.3/reference-link/update-signal) signal APIs with a null query parameter was returning the 400 HTTP error.
  * Fixed an issue when calling the [Get Message v1](https://developers.symphony.com/restapi/v20.3/reference-link/get-message-v1) endpoint with an expired `sessionToken` was not returning the correct error message.
  * New Configurable HTTP status codes were added to the [Health Check v2](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-v2) API in order to return the 503 code instead of the 200 in case of errors.
  * Agent updated to Spring Boot 2 and Micrometer Metrics.
  * A new service to manage room access policy control setting configuration was created and added to the pod admin level. Now, a service user reading either the datafeed or firehose can receive information about join room requests. A new [Real Time Events](../building-bots-on-symphony/datafeed/real-time-events.md) event is supported both by datafeed and firehose.

{% hint style="info" %}
Agent 2.57.4 - officially supported Agent for Symphony version v20.3.x

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.57.4.zip).

For a list of Agent x SBE compatibilities, click [here](agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

#### **New Endpoints**

| New endpoint | Description |
| :--- | :--- |
| [Health Check v3](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-v3) | Returns the connectivity status of the Agent server. |
| [Health Check Extended v3](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-extended-v3) | Returns the connectivity status of the Agent services as well as users connectivity. |
| [File Malware Scanner State](https://developers.symphony.com/restapi/v20.3/reference-link/malware-scanner-state) | Retrieves the current malware scan state of a file from the pod. |
| [Update File Malware Scanner State](https://developers.symphony.com/restapi/v20.3/reference-link/update-malware-scanner-state) | Updates the file malware scan state on the pod. |
| [Malware Scanner Health](https://developers.symphony.com/restapi/v20.3/reference-link/malware-scanner-health) | API to be implemented by the customer. Symproxy uses this API to check the health of the Malware Scanner. |
| [File Malware Scanner](https://developers.symphony.com/restapi/v20.3/reference-link/file-malware-scanner) | API to be implemented by the customer. Symproxy uses this API to submit the attachment for malware scanning. |

#### **Updated Endpoints**

The following table contains updates to existing endpoints:

| Updated Endpoint | What has changed |
| :--- | :--- |
| [User Lookup v3](https://developers.symphony.com/restapi/v20.3/reference-link/users-lookup-v3) | Now the API returns the `accountType` field. Version 20.2.1 \(1.56\) and above. |
| [Search Users](https://developers.symphony.com/restapi/v20.3/reference-link/search-users) | Now the API returns the `accountType` field. Version 20.2.1 \(1.56\) and above. |
| [Create Application](https://developers.symphony.com/restapi/v20.3/reference-link/create-app) and [Create Application with an RSA Public Key](https://developers.symphony.com/restapi/v20.3/reference-link/create-application-with-an-rsa-public-key) | Now, when creating an application, it is possible to send a `notification` object which is responsible for receiving webhook callback with the pod information. It contains the following parameters: `url` and `apiKey`. Version 20.3.1 \(1.57\) and above. |
| [Update Application](https://developers.symphony.com/restapi/v20.3/reference-link/update-application) and [Update Application with an RSA Public Key](https://developers.symphony.com/restapi/v20.3/reference-link/update-application-with-an-rsa-public-key) | Now, when updating an application, it is possible to add a `notification` object which is responsible for receiving webhook callback with the pod information. It contains the following parameters: `url` and `apiKey`. Version 20.3.1 \(1.57\) and above. |

#### **Deprecated Endpoints**

No endpoints were deprecated in Symphony 20.3 \(1.57\).

#### **General Updates**

* [Symphony Elements Action](../building-bots-on-symphony/datafeed/real-time-events.md#symphony-elements-action): the event payload returned by the Datafeed has changed. The attribute `actionStream` has been removed and the `formStream` attribute has been renamed to `stream`.
* PresentationML Live Renderer Tool:
  * Fixed issues with the UI for small screens.
  * Fixed issues with buttons, checkboxes, text areas and radio buttons not being properly rendered.
* Symphony Elements:
  * Fixed an issue when sending several buttons in a form was breaking the form layout.
  * Person Selector: Removed default placeholder text.
  * Fixed an issue with elements rendering in different screen scales.
  * Symphony Elements forms can now be seen by external participants in an external chat room.
  * Improvements for Content Export and DLP \(Data Loss Protection\).
  * Now, when bots send and receive content using Symphony Elements forms, those forms and their responses are exported in Content Export.
  * Currently, in read-only rooms, non-owner users \(those with read-only permission\) can reply to Symphony Elements; however Symphony blocks the message so the bot does not receive the reply. This is to comply with the default behavior of read-only rooms. In future releases, messages with Elements will be disabled for non-owner users to avoid this situation.
* Symphony Elements in Client 2.0
  * Added support for Person Selector.
  * Updates on the Elements style.
* [Create Room v3](https://developers.symphony.com/restapi/v20.3/reference-link/create-room-v3):
  * Fixed an issue when creating rooms without sending optional parameters was returning an error.
  * Fixed an issue when creating public rooms with `viewHistory` set to false.
  * Fixed an issue when creating a public room with `discoverable` set to false was allowing users who are not members of the room to search and find the room through the UI.
* [Get Message v1](https://developers.symphony.com/restapi/v20.3/reference-link/get-message-v1): a ceservice account is now allowed to read messages via the API.
* [Share](../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/share-service.md): fixed an issue when calling the API was not returning the subtitle field.
* Added support for `directedTo`, `isFormReply` and `replyToMsgId` attributes of SocialMessages.
* Now, Metrics can be sent to the Cloud Log Harvester Service using the Micrometer framework.
* The new `MESSAGE_ACTION` event was created. This new event allows BI analysts or Product Managers to track the usage of Symphony Elements so they can measure the adoption of this feature by their customers and users. Changes applied to Client 1.5.
* The following new permissions have been created: ACCESS\_ADMIN\_API, VIEW\_PRIVILEGED\_USER\_AUDIT\_TRAIL, VIEW\_USER\_DETAIL and MANAGE\_CEP\_VISIBILITY\_GROUPS.
* Fixed an issue with the payload of the [Create Room](https://developers.symphony.com/restapi/v20.3/reference-link/create-room-v3) \(v2 and v3\) and [Room Info](https://developers.symphony.com/restapi/v20.3/reference-link/room-info-v3) \(v2 and v3\) APIs. When receiving empty, null, or non-existing keywords, it was showing `null` in the API payload instead of an empty array.

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

\*\*\*\*

