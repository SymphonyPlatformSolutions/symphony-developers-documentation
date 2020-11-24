# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.6 \(1.60\) - Agent 2.60.1**

#### Swagger

The Swagger file for v20.6 \(1.60\) available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.6).

#### Agent Changes

* Agent 2.60.0:
  * Support of Regular Expression filtering on Elements for the Text Field and Text Area Elements.
  * Improved velocity of Agent APIs responses.
  * Fixed an issue when replying to messages containing tables.
  * Fixed an issue when sending attachments using the Create Message \(V2 and V3\) API endpoints, where it was not possible to then download the attachment in the Client.
  * Changes to the [Health Check Extended v3](https://developers.symphony.com/restapi/v20.6/reference#authentication) API endpoint in order to return the Agent status as `UP` when the `ceservice` or `agentservice` users are not configured in the Agent configuration file \(agent.yml\).
  * [Download Attachment](https://developers.symphony.com/restapi/v20.6/reference#attachment): Properly return a 404 error code when trying to download an attachment for a non existent message or invalid file id.
* Agent 2.60.1:
  * Fixed an issue when mentioning external users with their email \(`<mention />` in messageML\)
  * FIxed a DLP issue returning 400 for a blocked message instead of expected 451
  * Removed a duplicated definition in swagger
  * Moved v3 healthcheck API specifications to Swagger specs
  * Moved Datafeed v2 API specifications to Swagger specs
  * Updated the agent image for multi-tenancy project
  * Updated the messageml library version
  * Check if agent or CE service user is configured before testing health check

{% hint style="info" %}
### Agent 2.60.1 - officially supported Agent for Symphony version v20.6

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.60.1.zip).

For a list of Agent x SBE compatibilities, click [here](https://developers.symphony.com/restapi/docs/agent-compatibilities).
{% endhint %}

**New APIs**

No new API endpoints were released in Symphony version 20.6.

#### **Updated APIs**

The following API endpoints were updated:

* [User Lookup](https://developers.symphony.com/restapi/v20.6/reference#users-lookup-v3): added the new `active` parameter to filter inactive users.
* [Update User Avatar](https://developers.symphony.com/restapi/v20.6/reference#update-user-avatar): A user can now update his own avatar, without having the ACCESS\_USER\_PROVISIONING\_API privilege.
* [User Features](https://developers.symphony.com/restapi/v20.6/reference#features) now consistently orders alphabetically the returned user entitlements

#### **Deprecated APIs**

No APIs were deprecated in Symphony version 20.6.

#### **General Updates**

* Symphony Elements:
  * [Available Elements](../building-bots-on-symphony/symphony-elements/available-elements/): added information about using Elements with cards.
  * Text Field, Text Area and Masked Text Field: added the new `pattern` and `pattern-error-message`attributes. Also, the gif images have been updated in order to show the new design of the error messages.
  * Buttons: added the new `class` attribute which allows bot developers to use the new palette of colors `primary`, `secondary`, `tertiary` and `destructive`. The classes `primary-destructive` and `secondary-destructive` are however deprecated.
  * [Regular Expressions - Regex](../building-bots-on-symphony/symphony-elements/regular-expressions-regex.md): added regular expression filtering for Elements Text Field and Text Area so that the text submitted by the user is validated in the Client
  * Minor fix on Elements \(formreplies rendered after bookmark\).

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

