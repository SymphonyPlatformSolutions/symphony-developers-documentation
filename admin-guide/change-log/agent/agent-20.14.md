---
description: >-
  This page describes the change log of the 20.14 patch updates of the Agent
  service
---

# Agent - 20.14

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-20.14.2.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 20.14.2

* Message Update:
  * It is now possible to choose whether to update a message **silently** _(no notification for the user, no unread status)_, or instead to send the update as **unread,** particularly useful for **important** updates. In that later case, the user will view this update just as he would have viewed a new message _(unread chat status, notification, mention, activity feed, etc.)._ Please refer to [Update Message](https://developers.symphony.com/restapi/v20.14/reference/update-message-v4) for more information.
  * Dependencies: Please note that this feature has dependencies on both **SBE 20.14** and a future **Client 2.0 release** (not communicated yet): this means that the feature is not necessarily available to you as soon as you install this agent version.
  * Following these changes, the Message Update API will be in General Availability (GA).
* Import message: It now possible to attach files when importing a message. See [Import Message](https://developers.symphony.com/restapi/v20.14/reference/import-message-v4) for more information.
* DLP: Improved scan of messages sent through the Agent to better support PresentationML / MessageML features.
* MessageML: Add support of the `language` attribute to the `<code>` tag, to adapt to each language specific display rules & syntax highlighting. See [Code](https://docs.developers.symphony.com/building-bots-on-symphony/messages/overview-of-messageml/messageml-basic-format-tags/text-level-formatting-and-semantics#tags) for more information.
* Elements: Add support for the selection of multiples items in the `Dropdown Menu` element. See [Dropdown Menu](https://docs.developers.symphony.com/building-bots-on-symphony/messages/overview-of-messageml/symphony-elements-1/dropdown-menu#attributes) for more information.
* Spring boot has been updated to version 2.6.4.





## **Deprecation Notice**

### **APIs**

* Datafeed v1: We plan to stop the support of Datafeed v1 service in the future. Please consider migrating your Bots to Datafeed v2 APIs, documented [here](https://developers.symphony.com/restapi/v20.14/reference/create-datafeed-v5).&#x20;
  * In the future, the current Datafeed v1 APIs will transparently use the Datafeed v2 service to facilitate this transition period thanks to a bridge. This bridge will be introduced in the subsequent Agent release, May 2022.
  * However, migrating your bots to use the Datafeed v2 APIs is the only way to benefit from the improved reliability of the new Datafeed v2 service, which is more resilient to network issues and facilitates load balancing. You can benefit from a seamless migration to Datafeed v2 by leveraging the BDK in [Java](https://symphony-bdk-java.finos.org) and in [Python](https://symphony-bdk-python.finos.org).
  * More information are available for the [deprecation timeline and the introduction of the bridge](https://docs.developers.symphony.com/building-bots-on-symphony/datafeed) as well as the [benefits of Datafeed v2](https://developers.symphony.com/restapi/v20.14/reference/datafeed).&#x20;

