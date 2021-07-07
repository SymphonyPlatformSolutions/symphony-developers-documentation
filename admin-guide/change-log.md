# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.10 - Agent 20.10.1**

### Swagger

The Swagger file for v20.10 available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.10).

### Agent Changes

#### Agent 20.10.0

* The Agent will return a direct error when trying to send a message larger than the max message length. Please keep in mind that other errors related to message size limits such as the number of Search tokens to be indexed will continue to be returned indirectly through the datafeed.
* Agent compatibility with OpenJDK 1.8 262 has been verified 
* Fixed security vulnerabilities in the Agent
* Removed logging of Agent properties at startup
* Removed the stack trace logging if log level is not set to "debug"
* Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default

#### Agent 20.10.1

* Fixed some vulnerable dependencies

{% hint style="info" %}
### Agent 20.10.1 - officially supported Agent for Symphony version v20.10

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.10.1.zip).

For a list of Agent x SBE compatibilities, click [here](agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

#### **New APIs**

No API endpoints were created in Symphony version 20.10.

#### **Updated APIs**

The behavior of some API endpoints has been changed to ignore unexpected parameters. Please keep in mind that unexpected parameters are not officially supported and may result in an error in a future version.

#### **Deprecated APIs**

* [Get Message IDs by Timestamp](%20https://developers.symphony.com/restapi/v20.10/reference#get-message-ids-by-timestamp) is deprecated starting with version 20.10. Please reach out to your Technical Account Manager or Solution Architect for more information.

#### **General Updates**

* Client 2.0: Fixed display bug of Elements in Dark theme. Dark theme is not yet fully supported.
* Client 2.0: Fixed display bug of Elements in Condensed mode. Condensed mode is not supported.
* Client 2.0: Fixed display bug of Elements Text area \(incorrect font\).
* Fixed display bug of Elements Tooltip \(incorrect font & font color\).
* Elements Text area: Fixed missing default value when a label is also set.
* Elements Checkboxes and Radio buttons: The limit of number of Elements in a form has been increased to 50. Please note that this limit has been set as a safeguard to avoid reaching the limit of the message total number of characters.
* Fixed security vulnerabilities in message rendering libraries
* Starting with Symphony v20.10, some “built in” applications of the Marketplace will also be modifiable directly in the Admin Portal. Please reach out to your Technical Account Manager for more information.
* Extension Applications:
  * Improved support of Client 2.0 \(retrieve user entitlements, support of theme changed event, support of app in last active popped out workspace, support of developper mode, support of Module service open link, focus, and redirect methods\)
  * Added an openIM functionality in the [UI Service](../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/ui-service/). Please note that the focus on the message which id has been transmitted with the service is only working in the Client 2.0.

