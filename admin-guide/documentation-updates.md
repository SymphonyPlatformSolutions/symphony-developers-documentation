# Documentation Updates

Our documentation is continually updated with new topics, and corrections or clarifications made to existing content. Check back every now and then, to see what is new!

Also, visit the [Change Log](change-log/) to know more about the major Symphony updates.

{% hint style="info" %}
Since November 2021, the developer portal is not divided in release versions any more and it contains latest information on a single environment. The change logs are gathered as subpages of each impacted product so that developers still have access to its history and know which features are introduced in their new version of any Symphony product impacting the developer journey.

_Please note that our REST API reference documentation is still divided into release versions, and you can navigate through these to have the adhoc endpoints request/payload rules to your deployed Agent/SBE version._
{% endhint %}

In this page, you will find the main updates/announcements of the developers portal documentation changes, as well as the historical changes corresponding to each version from our old documentation system.

## Documentation Updates

### 2022

#### **July 2022**

* [Create Message](https://developers.symphony.com/restapi/main/messages/create-message-v4) endpoint: removed a mistake in the documentation mentioning that bots were able to send a message in streams it is not part of with adhoc permissions, although it has never been supported.

#### February 2022

* Extension Apps: removed documentation of addMenuItem() method in [modules](../ext-apps/overview-of-extension-api/extension-api-services/modules-service.md) service after deprecation of client 1.5, as this method is not anymore supported in the client 2.0.

#### January 2022

* New design of the REST API reference. From now on,
  * APIs are grouped as subsections of various different topics like Messages, Streams, Datafeed, etc.
  * Each API reference will be presented on a single and separated page from the other APIs,
  * You will be able to dynamically generate code in real time and in your preferred language thanks to the **parameters presented at the bottom** of each API reference page,
  * _Please note that some links you have saved might be broken, due to the apis being referenced as pages instead of sections from the restapi doc (i.e.:_ [_https://developers.symphony.com/restapi/reference#messages-v4_](https://developers.symphony.com/restapi/reference#messages-v4) _becomes_ [_https://developers.symphony.com/restapi/main/messages/create-message-v4_](https://developers.symphony.com/restapi/main/messages/create-message-v4)_)._
  * _Please note that this new design is mainly supported on 20.13 and later versions._

### 2021

#### November 2021

* Rework of the [Messages](../bots/messages/) documentation for it to be clearer for developers. It is now divided in MessageML and PresentationML; MessageML contains the following sections: MessageML Basics, Interactive Elements Forms, Extensibility UI Actions, and Entities; each of these subsections contains the corresponding specifications and examples helping our developer community to construct messages.
* The developer portal has been updated to a single environment: it is not divided in release versions any more and the change logs are now divided by products.

### Historical general updates

* Removed the limitation of DLP scanning formReplies on the [Overview of Symphony Elements](../bots/messages/overview-of-messageml/symphony-elements-1/)
* Added the information that only PKCS8 format is allowed for the key of the [UserKeyRequest Object](https://developers.symphony.com/restapi/main/user-management/userkeyrequest-object)
* New [Agent Performance Tuning](agent-guide/agent-performance-tuning.md) guide available.
* Added limitations on the [Overview of Symphony Elements](../bots/messages/overview-of-messageml/symphony-elements-1/):
  * The form is reset when the page is refreshed and the enduser is able to send a new reply.
  * New Elements features are generally not supported by pods running an older client version than the one where they have been introduced (i.e. for XPod use cases)
* Added a section "Versions and Compatibility" on each [Available Element](../bots/messages/overview-of-messageml/symphony-elements-1/) documentation, which gathers the versions in which main features of the considered Element were introduced, and which outcome can be expected from it in previous Client version, for the purpose of using it in XPod use-cases for example.
* Updated `<ul>` and `<ol>` tags documentation under [Message Format - MessageML](../bots/messages/overview-of-messageml/messageml-basic-format-tags/content-grouping.md)
* Added a description of Datafeed 2.0 (versus its previous version Datafeed 1.0) and its support in the agent. See [Introduction to datafeed](https://developers.symphony.com/restapi/main/datafeed)
* [Agent 2.X and above installation](agent-guide/agent-2.x-and-above-installation.md) has been updated to fix the threaddump endpoint path
* API Reference updates:
  * [Stream Members](https://developers.symphony.com/restapi/v20.9/reference#stream-members) - updates for example and xPod use case
  * [Create Company Certificate](https://developers.symphony.com/restapi/v20.9/reference#create-company-certificate) - example for 200 payload updated
  * [SBE x Agent compatibility matrix](agent-guide/sbe-x-agent-compatibility-matrix.md) is now mentioned and linked for all agent endpoints from the API reference for more clarity
  * [Create Protocol](https://developers.symphony.com/restapi/v20.9/reference#create-protocol) - example for 200 payload updated
  * [V3 Message Violations](https://developers.symphony.com/restapi/v20.9/reference#v3-message-violations) - example for 200 payload updated
  * [Update Room v3](https://developers.symphony.com/restapi/v20.9/reference#update-room-v3) - attributes information panel were updated
  * [Create Message v4](https://developers.symphony.com/restapi/reference#create-message-v4) - updated attachment limits
  * Updated the [User Attributes](https://developers.symphony.com/restapi/reference#user-attributes) Object and therefore its impacts on the endpoints [Create User v2](https://developers.symphony.com/restapi/reference#create-user-v2) / [Update User v2](https://developers.symphony.com/restapi/reference#update-user-v2) / [Search Users](https://developers.symphony.com/restapi/reference#search-users)
  * The endpoint [Subscribers](https://developers.symphony.com/restapi/reference#subscribers) documentation has been updated to highlight both default and maximum values for the parameter "limit"

## Historical Documentation Changes

### Changes introduced in 20.12

This section contains the main changes that occurred in the v20.12 version of the documentation.

#### **New tutorial pages, overviews, and guides**

No tutorial pages, overviews, nor guides have been added to the Symphony Platform documentation for v20.12.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/v20.10/reference) documentation to include the changes according to the [Change Log](change-log/):

* Updated:&#x20;
  * [Suppress Message](https://developers.symphony.com/restapi/v20.12/reference#suppress-message) endpoint
  * [POST](https://developers.symphony.com/restapi/v20.12/reference#message-search-post) and [GET Message Search](https://developers.symphony.com/restapi/v20.12/reference#message-search-get) endpoints
* Deprecated:
  * [Health Check v2](https://developers.symphony.com/restapi/v20.12/reference#health-check-v2) endpoint was deprecated.
  * Firehose v2 endpoints were removed.

#### Other Changes

* Updated Extension App Documentation to add the specification of adding default value to the [share service](../ext-apps/overview-of-extension-api/extension-api-services/share-service.md)
* Updated [MessageML Format](../bots/messages/overview-of-messageml/) to highlight the message size limit
* Added the documentation of three new Elements: [Date Picker](../bots/messages/overview-of-messageml/symphony-elements-1/date-picker.md), [Time Picker](../bots/messages/overview-of-messageml/symphony-elements-1/time-picker.md), and [Timezone Picker](../bots/messages/overview-of-messageml/symphony-elements-1/timezone-picker.md)

### Changes introduced in 20.10



This section contains the main changes that occurred in the v20.10 version of the documentation.

#### **New tutorial pages, overviews, and guides**

No tutorial pages, overviews, nor guides have been added to the Symphony Platform documentation for v20.10.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/v20.10/reference) documentation.

* [Get Message IDs by Timestamp](https://developers.symphony.com/restapi/v20.10/reference#get-message-ids-by-timestamp) has been moved to deprecated endpoints starting with version 20.10.

#### Other Changes

* Updated Extension App Documentation to add the specification for openIM in the [UI Service](../ext-apps/overview-of-extension-api/extension-api-services/ui-service/)
* Updated element count limitation (increased up to 50) for [Checkbox](../bots/messages/overview-of-messageml/symphony-elements-1/checkbox.md) and [Radio Button](../bots/messages/overview-of-messageml/symphony-elements-1/radio-button.md)

### Changes introduced in 20.9 (1.62)

This section contains the main changes that occurred in the v20.9 version of the documentation.

#### **New tutorial pages, overviews, and guides**

No tutorial pages, overviews, nor guides have been added to the Symphony Platform documentation for v20.9.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/v20.9/reference) documentation.

* [Blast Message](https://developers.symphony.com/restapi/v20.9/reference#blast-message) - added
* [Follow User](https://developers.symphony.com/restapi/v20.9/reference#follow-user) - added
* [Unfollow User](https://developers.symphony.com/restapi/v20.9/reference#unfollow-user) - added
* [List User Followers](https://developers.symphony.com/restapi/v20.9/reference#list-user-followers) - added
* [List Users Followed](https://developers.symphony.com/restapi/v20.9/reference#list-users-followed) - added
* [User Attributes](https://developers.symphony.com/restapi/reference#user-attributes) Object - some attributes were added (impacts on the endpoints [Create User v2](https://developers.symphony.com/restapi/reference#create-user-v2) / [Update User v2](https://developers.symphony.com/restapi/reference#update-user-v2) / [Search Users](https://developers.symphony.com/restapi/reference#search-users))

#### Other Changes

* Updated [Overview of Symphony Elements](../bots/messages/overview-of-messageml/symphony-elements-1/) documentation for the examples to use Client 2.0 rendering instead of Client 1.5.
* Updated [Text Field](../bots/messages/overview-of-messageml/symphony-elements-1/text-field.md), [Masked Text Field](../bots/messages/overview-of-messageml/symphony-elements-1/masked-text-field.md), [Text Area](../bots/messages/overview-of-messageml/symphony-elements-1/text-area.md), [Person Selector](../bots/messages/overview-of-messageml/symphony-elements-1/person-selector.md), and [Dropdown Menu](../bots/messages/overview-of-messageml/symphony-elements-1/dropdown-menu.md) documentation in order to guide on how to use `label` and `title` attributes.
* Updated [MessageML Format](../bots/messages/overview-of-messageml/messageml-basic-format-tags/content-grouping.md) guide on how to use the `expandable-card` tag in messageML.

### Changes introduced in 20.7 (1.61)

This section contains the main changes that occurred in the v20.7 version of the documentation.

#### **New tutorial pages, overviews, and guides**

No tutorial pages, overviews, nor guides have been added to the Symphony Platform documentation for v20.7.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/reference) documentation.

* [Users Lookup](https://developers.symphony.com/restapi/v20.7/reference#users-lookup-v3) and [Search Users](https://developers.symphony.com/restapi/v20.7/reference#search-users) documentation have been updated to add a note regarding information not returned in case of cross-pod search.
* [Read Messages/Events Stream](https://developers.symphony.com/restapi/v20.7/reference#read-messagesevents-stream-v4) under Datafeed: added a note regarding the use of emojis' shortcode.
* [Suspend User Account](https://developers.symphony.com/restapi/v20.7/reference#suspend-user-v1): documentation has been added for this new endpoint.

#### **General updates**

There was no other page update for v20.7.

### Changes introduced in 20.6 (1.60)

#### **General updates**

The following list shows the pages that have been updated:

* Symphony Elements:
  * Elements: added information about using Elements with cards.
  * Text Field, Text Area and Masked Text Field: added the new `pattern` and `pattern-error-message`attributes. Also, the gif images have been updated in order to show the new design of the error messages.
  * Buttons: added the new `class` attribute which allows bot developers to use the new palette of colors `primary`, `secondary`, `tertiary` and `destructive`. The classes `primary-destructive` and `secondary-destructive` are however deprecated.
  * [Regular Expressions - Regex](../bots/messages/overview-of-messageml/symphony-elements-1/regular-expressions-regex.md): new page added in order to help bot developers to securely validate input data. This page describes what a regular expression is (shortened as regex) and how to add the validation to Symphony Elements.

#### **API References**

Updates on our [API Reference](https://rest-api.symphony.com/reference) documentation.

* [Update User Avatar](https://developers.symphony.com/restapi/v20.6/reference#update-user-avatar): added a note stating that this API allows the current user also to update its own avatar.
* [User Lookup](https://developers.symphony.com/restapi/v20.6/reference#users-lookup-v3): added the new `active` parameter.
* [Demote Owner](https://developers.symphony.com/restapi/v20.6/reference#demote-owner): changed the API payload sample.
* [Datafeed 2.0](https://developers.symphony.com/restapi/v20.6/reference#introduction-to-datafeed-1): added documentation regarding Datafeed 2.0 including a small introduction and the endpoints added in the agent to support it.

### Changes introduced in 20.5 (1.59)

This section contains the main changes that occurred in the v20.5 version of the documentation.

#### **General updates**

The following list shows the pages that have been updated:

* Line breaks ('\n') are now allowed in the [Text Area](../bots/messages/overview-of-messageml/symphony-elements-1/text-area.md) Element.
* The [Change Log](change-log/) page has been moved from the REST API Guide to the Developer Guide.
* The Documentation Updates page has been moved from the REST API Guide to the Developer Guide.
* The [RSA Bot Authentication Workflow](../bots/authentication/rsa-authentication.md) page has been moved from the REST API Guide to the Developer Guide.
* The [Bot Authentication Workflow](../bots/authentication/certificate-authentication.md) page has been moved from the REST API Guide to the Developer Guide.
* PresentationML Live Renderer Tool: fixed an issue that when clearing the rendering of the live preview was returning the chosen theme (dark) to the default status (light).

### Changes introduced in 20.4 (1.58)

This section contains the main changes that occurred in the v20.4 version of the documentation.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/reference) documentation.

* [Share v3](https://developers.symphony.com/restapi/v20.4/reference-link/share-v3): the description of the `publishDate` field now states that the article publish date in unix timestamp is in seconds.
* [Users Lookup v3](https://developers.symphony.com/restapi/v20.4/reference-link/users-lookup-v3): added a note saying that the `department` and `location` fields are returned only if the user is an internal user of the current pod.
* [List IB Groups](https://developers.symphony.com/restapi/v20.4/reference-link/list-ib-groups): added a note showing that the API returns only IB Groups that have at least one policy associated with it.
* [Message Metadata](https://developers.symphony.com/restapi/v20.4/reference-link/message-metadata-relationship): now the endpoint does not show null fields returned in the response sample.

#### **General updates**

The following list shows the pages that have been updated:

* [Symphony Elements - Buttons](../bots/messages/overview-of-messageml/symphony-elements-1/buttons/): the description of the `type` attribute has changed. Now, it says that the reset button resets the form-data to its initial values.
* [Suppress Message](https://developers.symphony.com/restapi/v20.4/reference-link/suppress-message): Added suppressed message examples.
* [PresentationML Live Renderer Too](https://renderer-tool.app.symphony.com/)l: corrections performed on the rendering of cards and in the live preview.

### Changes introduced in 20.3 (1.57)

This section contains the main changes that occurred in the v20.3.x (1.57) version of the documentation.

#### **New tutorial pages, overviews, and guides**

The following list shows tutorial pages, overviews, and guides that have been added to the Symphony Platform documentation:

* [SBE x Agent Compatibilities](agent-guide/sbe-x-agent-compatibility-matrix.md): page created in order to show the compatibility between the Agent and SBE versions.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/reference) documentation.

* [Users Lookup v3](https://developers.symphony.com/restapi/v20.3/reference-link/users-lookup-v3): the `accountType` field has been added to the response sample.
* [Search Users](https://developers.symphony.com/restapi/v20.3/reference-link/search-users): the `accountType` field has been added to the response sample.
* [Create Room v3](https://developers.symphony.com/restapi/v20.3/reference-link/create-room-v3): The following note has been added: _"`viewHistory`, `discoverable` and `membersCanInvite` attributes cannot be_ false _if `public=true`._
* [Message Search - POST](https://developers.symphony.com/restapi/v20.3/reference-link/message-search-post): Added a note stating that search terms cannot contain the following reserved characters: colon :, parentheses ( ), and whitespaces.
* [Message Search - GET](https://developers.symphony.com/restapi/v20.3/reference-link/message-search-get): The following information has been added to the `text` argument: _Multi-word search is allowed. Syntax: text:"Hello world"_.
* [Health Check v3](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-v3) and [Health Check Extended v3](https://developers.symphony.com/restapi/v20.3/reference-link/health-check-extended-v3): New endpoints.
* [Create Application](https://developers.symphony.com/restapi/v20.3/reference-link/create-app), [Create Application with an RSA Public Key](https://developers.symphony.com/restapi/v20.3/reference-link/create-application-with-an-rsa-public-key), [Update Application](https://developers.symphony.com/restapi/v20.3/reference-link/update-application) and [Update Application with an RSA Public Key](https://developers.symphony.com/restapi/v20.3/reference-link/update-application-with-an-rsa-public-key): The `notification` object has been added to the APIs.
* [Create Connection](https://developers.symphony.com/restapi/v20.3/reference-link/create-connection): The following information has been added to the API page: "Only one connection request is allowed between two users. When this limit is exceeded, no more connections requests are allowed. A new connection request will be allowed only if the user that received the connection request declines it."
* [Add Member](https://developers.symphony.com/restapi/v20.3/reference-link/add-member): The following recommendation has been added: "For rooms with more than 500 users, members should be added/deleted 1 member every "3 seconds" to allow key management functions time to process."
* [Search Rooms v3](https://developers.symphony.com/restapi/v20.3/reference-link/search-rooms-v3):
  * The description of the `active` and `private` body parameters has changed.
  * The `multilateralRoom` parameter has been added to the response sample.
* [Malware Scanner APIs](https://developers.symphony.com/restapi/v20.3/reference-link/malware-scanner-apis): The following APIs have been added:
  * [File Malware Scanner State](https://developers.symphony.com/restapi/v20.3/reference-link/malware-scanner-state).
  * [Update File Malware Scanner State](https://developers.symphony.com/restapi/v20.3/reference-link/update-malware-scanner-state).
* [Customer Malware Scanner APIs](https://developers.symphony.com/restapi/v20.3/reference-link/customer-malware-scanner-apis): The following APIs have been added:
  * [Malware Scanner Health](https://developers.symphony.com/restapi/v20.3/reference-link/malware-scanner-health).
  * [File Malware Scanner](https://developers.symphony.com/restapi/v20.3/reference-link/file-malware-scanner).
* [Suppress Message](https://developers.symphony.com/restapi/v20.3/reference-link/suppress-message): Added suppressed message examples.

#### **General updates**

The following list shows the pages that have been updated:

* [Agent 2.X and above Installation](agent-guide/agent-2.x-and-above-installation.md):
  * The **Enforce TLS 1.2** option has been added to the **Modify Startup Script Configuration**.
  * Added a table containing flags showing the available actuator endpoints for the Agent application.
* [Real Time Events](../bots/datafeed/real-time-events.md): added the _User Requested to Join Room_ event.
* [Symphony Elements Action](../bots/datafeed/real-time-events.md#symphony-elements-action): the event payload returned by the Datafeed has changed. The attribute `actionStream` has been removed and the `formStream` attribute has been renamed to `stream`.
* [Permissions](../bots/overview-of-rest-api/bot-permissions.md): the following list shows what has changed on the Permissions page:
  * The ACCESS\_ADMIN\_API and the VIEW\_PRIVILEGED\_USER\_AUDIT\_TRAIL privileges have been added to the Audit Trail Management role.
  * The Cep Visibility Group Management role with the MANAGE\_CEP\_VISIBILITY\_GROUPS permission has been added to the page.
  * The VIEW\_USER\_DETAIL privilege has been added to the following roles:
    * Administrator
    * Compliance Officer
    * Content Management
    * EF Policy Management
    * Key Manager
    * L1 Support
    * L2 Support
    * Scope Management
    * Super Administrator
    * Super Compliance Officer
    * Symphony Admin
    * User Provisioning
* Symphony Elements
  * [Text Fields](../bots/messages/overview-of-messageml/symphony-elements-1/text-field.md): the following information has been added: "The text field cannot have children tags but it can have a default text (initial value) between the tags".
  * [Overview of Symphony Elements](../bots/messages/overview-of-messageml/symphony-elements-1/): new information related to Symphony Elements GA has been added to the Availability & known limitations section. We also added more information about the limitation with read-only rooms.
