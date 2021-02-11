# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.9 \(1.62\) - Agent 2.62.3**

### Swagger

The Swagger file for v20.9 \(1.62\) available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.9).

### Agent Changes

#### Agent 2.62.0

* Support of new Elements features \(Expandable Card, Label and Tooltip\): see the General Updates section below
* Added a new API for sending the same message to a list of streams: Blast message \(see new APIs below\).
* Removed a duplicated definition in swagger and moved some endpoints definition to the right swagger repository \(see swagger link above\)
* Upgrade of library dependencies

#### Agent 2.62.1

* Fixed Docker image of the agent
* Upgrade for library dependencies

#### Agent 2.62.2

* Removed the stack trace logging if log level is not set to "debug"
* Increased the size of Ephemeral Diffie-Hellman Keys to 2048 by default

#### Agent 2.62.3

* Fixed some vulnerable dependencies \(including upgrades of jackson and httpclient\)

{% hint style="info" %}
### Agent 2.62.3 - officially supported Agent for Symphony version v20.9

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.62.3.zip).

For a list of Agent x SBE compatibilities, click [here](agent-guide/sbe-x-agent-compatibility-matrix.md).
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

* Main functionalities of Extension Applications are supported in the version 20.9 in the Client 2.0.
* New features for Symphony Elements:
  * Expandable card: new Expandable card with updated display. The card can have three different states, that can be set by the developer: collapsed, expanded but cropped, fully expanded. _See how to use the `expandable-card` tag in_ [_Message Format - MessageML_](../building-bots-on-symphony/messages/overview-of-messageml/message-format-messageml.md)_._
  * Label: it is now possible to set a Label associated with an element \(text-field, masked text-field, textarea, dropdown, person selector\) so the user can understand better the field meaning. This way the placeholder can focus on providing a hint of the expected format. _See more details on how to use it in the documentation for specific elements supporting the `label` attribute under the_ [_Available Elements_](../building-bots-on-symphony/symphony-elements/available-elements/) _section._
  * Tooltip: it is now possible to add a hint associated with an element \(for text-field, masked text-field, textarea, dropdown, person selector\) to provide more detailed information to the user on the meaning or expected value of an Element. _See more details on how to use it in the documentation for specific elements supporting the `title` attribute under the_ [_Available Elements_](../building-bots-on-symphony/symphony-elements/available-elements/) _section._
* Fixed display bug for Elements Buttons with a long text
* Fixed display of the placeholder for Elements Dropdown
* Fixed display bug for Cards
* Fixed display when Elements are focused in Client 2.0
* Java and Python SDK are now supporting the new Datafeed v2 functionality
* Extension APIs: Fixed missing refresh when a module is popped out
* Extension APIs: Fixed permission to allow again Applications to propose download of files to the end users

