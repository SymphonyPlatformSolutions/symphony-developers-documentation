# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.9 \(1.62\) - Agent 2.62.0**

### Swagger

The Swagger file for v20.9 \(1.62\) available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.9).

### Agent Changes

Agent 2.62.0

* Updated the messageML library in order to:
  * support the new Elements features introduced \(Expandable Card, Label and Tooltip\).
  * support new attributes `maxlength` and `minlength` in the Element Textarea.
* Added a new API for sending the same message to a list of streams: blast message \(see new APIs below\).

{% hint style="info" %}
### Agent 2.62.0 - officially supported Agent for Symphony version v20.9

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.62.0.zip).

For a list of Agent x SBE compatibilities, click [here](https://developers.symphony.com/restapi/docs/agent-compatibilities).
{% endhint %}

#### **New APIs**

The following API endpoint has been created:

* [Blast Message](https://developers.symphony.com/restapi/v20.9/reference#blast-message) to send a message to a list of streams \(room, IM, MIM\).
* [Follow User](https://developers.symphony.com/restapi/v20.9/reference#follow-user) to make a list of users to start following a specific user.
* [Unfollow User](https://developers.symphony.com/restapi/v20.9/reference#unfollow-user) to make a list of users to stop following a specific user.
* [List User Followers](https://developers.symphony.com/restapi/v20.9/reference#list-user-followers) to return the list of followers of a specific user.
* [List Users Followed](https://developers.symphony.com/restapi/v20.9/reference#list-users-followed) to return the list of users followed by a specific user.

#### **Updated APIs**

No API endpoints were updated in Symphony version 20.9.

#### **Deprecated APIs**

No API endpoints were deprecated in Symphony version 20.9.

#### **General Updates**

* Main functionalities of Extension Apps are supported in the version 20.9 in the Client 2.0.
* New features for Symphony Elements:
  * Expandable card: New Expandable card with updated display. The card can have three different states, that can be set by the developper: collapsed, expanded but cropped, fully expanded.
  * Label: allows the bot developer to set an indication to elements \(text, dropdown, person selector, checkbox, radio button\) for the user to understand better what is requested from him.
  * Tooltip: allows the bot developer to add tips regarding how to use or interact with the form/elements. It can be set at element level \(for text-field, text-area, dropdown, person selector\).
* Fixed display bug for Elements Buttons with long texts
* Fixed display of the placeholder for Elements Dropdown
* Fixed display bug for Cards
* Java SDK is now supporting the new Datafeed v2 functionality
* Extension APIs: Fixed missing refresh when module is popped out.

