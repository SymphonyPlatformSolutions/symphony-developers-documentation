# Change Log

Thank you for using Symphony. This document contains essential information about the changes that occurred in the Agent and in the Public APIs of Symphony.

### **Symphony 20.5 \(1.59\) - Agent 2.59.0**

#### Swagger

The Swagger file for v20.5 \(1.59\) available [here](https://github.com/symphonyoss/symphony-api-spec/tree/20.5.1).

#### Agent Changes

* Agent 2.59.0
  * A fix was added to the Agent Health Check \(v2 and v3\) in order to ignore Datafeed v2 status.
  * Line breaks \('\n'\) are now allowed in the Text Area Element.
  * Fixed an issue with users blocked by IB policies. Now, a subscription error is shown when an API caller subscribes to a visible signal created by an IB blocked user.
  * Improvements in DLP error responses.
  * A fix was added to the Agent Health Check \(v2 and v3\) in order to ignore Datafeed v2 status.
  * Fixed issues with OBO session cache.
  * Missing metrics were added to the metrics report.

{% hint style="info" %}
### Agent 2.59.0 - officially supported Agent for Symphony version v20.5

To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.59.0.zip).

For a list of Agent x SBE compatibilities, click [here](https://developers.symphony.com/restapi/docs/agent-compatibilities).
{% endhint %}

#### **New APIs**

No APIs were released in Symphony version 20.5.

#### **Updated APIs**

No endpoints were updated in Symphony version 20.5.

#### **Deprecated APIs**

No APIs were deprecated in Symphony version 20.5.

#### **General Updates**

* With Symphony v20.5, the usage of cards with Symphony Elements became possible. For more information, refer to [Available Elements](../building-bots-on-symphony/symphony-elements/).
* Now, in read-only rooms, Symphony Elements appear disabled for non-owner users \(those with read-only permission\).
* [Import Message V4](https://developers.symphony.com/restapi/reference#import-message-v4): Fixed an issue where imported messages were showing the wrong timestamp input.
* Fixed an issue that when removing a user from a wall post stream was returning an incorrect message response.
* PresentationML Live Renderer Tool: fixed an issue that when clearing the rendering of the live preview was returning the chosen theme \(dark\) to the default status \(light\).

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

