# Documentation Updates

Our documentation is continually updated with new topics, and corrections or clarifications made to existing content. Check back every now and then, to see what is new!

Also, visit the [Change Log](change-log.md) to know more about the major Symphony updates.

### Documentation Changes - Release v20.3 \(1.57\)

This section contains the main changes that occurred in the v20.3.x \(1.57\) version of the documentation.

#### **New tutorial pages, overviews, and guides**

The following list shows tutorial pages, overviews, and guides that have been added to the Symphony Platform documentation:

* [SBE x Agent Compatibilities](agent-guide/sbe-x-agent-compatibility-matrix.md): page created in order to show the compatibility between the Agent and SBE versions.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](https://rest-api.symphony.com/reference) documentation.

* [Users Lookup v3](https://developers.symphony.com/restapi/v20.3/reference-link/users-lookup-v3): the `accountType` field has been added to the response sample.
* [Search Users](https://developers.symphony.com/restapi/v20.3/reference-link/search-users): the `accountType` field has been added to the response sample.
* [Create Room v3](https://developers.symphony.com/restapi/v20.3/reference-link/create-room-v3): The following note has been added: _"`viewHistory`, `discoverable` and `membersCanInvite` attributes cannot be_ false _if `public=true`._
* [Message Search - POST](https://developers.symphony.com/restapi/v20.3/reference-link/message-search-post): Added a note stating that search terms cannot contain the following reserved characters: colon :, parentheses \( \), and whitespaces.
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
* [Real Time Events](../building-bots-on-symphony/datafeed/real-time-events.md): added the _User Requested to Join Room_ event.
* [Symphony Elements Action](../building-bots-on-symphony/datafeed/real-time-events.md#symphony-elements-action): the event payload returned by the Datafeed has changed. The attribute `actionStream` has been removed and the `formStream` attribute has been renamed to `stream`.
* [Permissions](../building-bots-on-symphony/configuration/bot-permissions.md): the following list shows what has changed on the Permissions page:
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
  * [Text Fields](../building-bots-on-symphony/symphony-elements/available-elements/text-field.md): the following information has been added: "The text field cannot have children tags but it can have a default text \(initial value\) between the tags".
  * [Overview of Symphony Elements](../building-bots-on-symphony/symphony-elements/): new information related to Symphony Elements GA has been added to the Availability & known limitations section. We also added more information about the limitation with read-only rooms.

### Next Version: Symphony Release 20.4 \(1.58\)

