# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.7 \(1.61\) - Agent 2.61.2**

#### Swagger

The Swagger file for v20.7 \(1.61\) available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.7).

#### Agent Changes

* Agent 2.61.0
  * Fixed issues in the conversion of the emoji shortcode from messageML to presentationML.
  * Improved the [Health Check Extended v3](https://developers.symphony.com/v20.7/restapi/reference#health-check-extended-v3) API endpoint to return the authType field, showing if the Agent authentication is configured to use RSA or Certificate.
  * [Message Create v4](https://developers.symphony.com/restapi/v20.7/reference#create-message-v4): Fixed issue when sending a message that mentions an external user by his/her email.
  * Properly return a 451 error code when a message sent is blocked by DLP \(Data Loss Prevention\) instead of returning a 400 error code.
  * More secured way to provide Authentication credentials for the Agent: RSA private key for the agentservice user and ceservice user can be passed through VM parameters. For more information, refer to [Agent 2.X and above Installation](agent-guide/agent-2.x-and-above-installation.md).
* Agent 2.61.1
  * Fix backward compatibility bug for Elements buttons \(Deprecated `primary-destructive` and `secondary-destructive` classes are now mapped to `primary` and `secondary`\)
* Agent 2.61.2
  * Removed a duplicated definition in swagger
  * Fixed some bugs

{% hint style="info" %}
### Agent 2.61.2 - officially supported Agent for Symphony version v20.7

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.61.2.zip).

For a list of Agent x SBE compatibilities, click [here](https://developers.symphony.com/restapi/docs/agent-compatibilities).
{% endhint %}

\*\*\*\*

#### **New APIs**

The following API endpoint has been created:

* [Suspend User Account](https://developers.symphony.com/restapi/v20.7/reference#suspend-user-v1)

#### **Updated APIs**

The following API endpoints were updated:

* [Stream Info](https://developers.symphony.com/restapi/reference#stream-info-v2) is now OBO enabled
* The behaviour of two endpoints has been changed. In order to avoid a breaking change, we have implemented a pod setting which will allow an admin user to activate this new behaviour. For more information, please contact your Technical Account Manager, Solutions Architect or the Technical Support Team.
  * [Update Application Entitlements](https://developers.symphony.com/restapi/v20.7/reference#update-application-entitlements): override user specific settings when global settings are updated for a given pod and a given application.
  * [Update User Apps](https://developers.symphony.com/restapi/v20.7/reference#update-user-apps) now allows partial updates.

#### **Deprecated APIs**

No API endpoints were deprecated in Symphony version 20.7.

#### **General Updates**

* Symphony Elements:
  * [Available Components](../building-bots-on-symphony/symphony-elements/available-elements/): added information about using Elements with cards.
  * Embedded Chat Modules \(ECM\) now supports Elements

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

