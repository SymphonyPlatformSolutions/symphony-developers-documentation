# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### Symphony Release 20.4 \(1.58\) - Agent 2.58.1

#### Swagger

The Swagger file for v20.4.1 \(1.58\) is available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.4.1).

#### Agent Changes

* Agent 2.58.1
  * A fix was added to the Agent Health Check \(v2 and v3\) in order to ignore Datafeed v2 status.
* Agent 2.58.0
  * Fixed an issue when sending an article with the Share v3 API was showing the wrong notification format.
  * Fixed an issue with users blocked by IB policies. Now, a subscription error is shown when an API caller subscribes to a visible signal created by an IB blocked user.
  * The messageML has been improved so that linebreaks are accepted in Text Area Elements.

{% hint style="info" %}
### Agent 2.58.1 - officially supported Agent for Symphony version v20.4

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.58.1.zip).

For a list of Agent x SBE compatibilities, click [here](https://developers.symphony.com/restapi/docs/agent-compatibilities).
{% endhint %}

#### **Updated APIs**

The following table contains updates to existing APIs:

| Updated endpoint | What has changed |
| :--- | :--- |
| [Users Lookup v3](https://developers.symphony.com/restapi/reference#users-lookup-v3) | New field added: the `department` field has been added to the API response. Behavior change: now, the endpoint returns the `department` and the `location` fields only if the user is an internal user of the current pod. _**Documentation under development.**_ |

#### **General Updates**

* [Import Message](https://developers.symphony.com/restapi/reference#import-message-v4): fixed an issue when importing a message that contains DLP violations was not returning the diagnostic message.
* Client 2.0:
  * Fixed an issue where tables sent by the [Create Message v4](https://developers.symphony.com/restapi/reference#create-message-v4) API was not being displayed in conversation views.
  * Fixed an issue when sending an invalid emoji via API was returning a random emoji instead of displaying the emoji error.
* Fixed an issue when invoking the [Share](../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/share-service.md) API without setting the `publishedDate` attribute was showing a random date.
* Fixed inconsistencies with the returned response body of DLP APIs.
* \[PresentationML Live Renderer Tool\[\([https://renderer-tool.app.symphony.com/](https://renderer-tool.app.symphony.com/)\): corrections performed on the rendering of cards and in the live preview.
* Fixed an issue with the rendering of tables within modals of forward and reply messages when using the Dark Mode theme.
* Symphony Elements:
  * Fixed an issue that was allowing the copy of the content of `copyProtected` messages.
  * [Person Selector](../building-bots-on-symphony/symphony-elements/available-elements/person-selector.md) : Fixed an issue where the person avatar was not being displayed on Safari \(iOS application\).
  * [Buttons](../building-bots-on-symphony/symphony-elements/available-elements/buttons.md): The behavior of the reset button has changed. Now, the reset button function is to return all the form data to its initial value.

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

### **Next Version: Symphony 20.5 \(1.59\)**

