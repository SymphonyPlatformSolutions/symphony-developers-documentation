# Change Log

## Main Symphony 1.55 release - Agent 2.55.21

### **New Features**

* **Symphony Elements** - released in 1.55.3

Symphony Elements is a collection of [interactive elements](../building-bots-on-symphony/symphony-elements/available-elements/) that can be sent within messages to facilitate the communication with Symphony users. Through interactive content, users can reply to messages in an entertaining and easy way.

Through the use of the elements, bots can send messages that contain forms with text fields, dropdown menus, person selectors, buttons and more! For more information, refer to [Symphony Elements](../building-bots-on-symphony/symphony-elements/).

### **Swagger**

The Swagger file for v1.55 of Symphony's REST API is available [here](https://github.com/symphonyoss/symphony-api-spec/tree/rc-current-r55).

### **Agent Changes**

* Agent 2.55.21
  * Fixed an issue when sending attachments using the Create Message V3 API, was not allowing the UI to download the attachment.
  * Fixed an issue when replying to a message containing a table was not working properly.
* Agent 2.55.20
  * Fixed issues with OBO session cache.
  * Agent improvements in order to get sessions for different user ids without compromising performance when running multiple bots.
* Agent 2.55.19
  * Added support for OpenJDK 8-242.
  * The Tomcat Embed Core has been upgraded to version 8.5.51 due to a reported security vulnerability.
* Agent 2.55.18
  * Fixed an issue when bots were not being able to send a message to a Corporate pod using the Agent from a Bot-home pod.
* Agent 2.55.17
  * Handling of an unauthorized exception from _SymphonyClient_ on app session calls.
* Agent 2.55.16
  * Message endpoints now return the `sid` \(session id\) field. This new field represents the id of the session that was used to generate a message.
* Agent 2.55.15
  * Fixed distortion on the preview of small attached images.
  * POST '/v1/message/search' endpoint: fixed swagger file.
* Agent 2.55.14
  * Fixed V2MessageGet endpoint to properly return the message attachments.
  * Now returning urlSafe threadId on Elements datafeed payload.
* Agent 2.55.13
  * The Spring Security has been re-added to the Agent so actuator endpoints can use basic HTTP authentication.
  * `agent.yaml` file: the `certAuth` was updated to properly use the default values.
  * Improved caching mechanism for sessions.
  * Reduction on the number of requests made for the key manager.
  * Fixed issues with compatibility on specific proxy configurations.
  * The `agent.limits.oboSessionCache.size` and `agent.limits.oboSessionCache.ttl` properties have been removed.
* Agent 2.55.12
  * Added the `agent.features.elements.enabled` setting that indicates if Symphony Elements are enabled to be sent via the Agent Messaging APIs.
  * The circuit breaker configuration is no longer available.
  * Added the Logging Rotation configuration.
* Agent 2.55.3
  * Fixed an issue when searching for messages using `agent/v1/message/search?query=hashtag:<hashtag>` was not returning results if capital letters were used in the hashtag.
* Agent 2.55.0
  * Added DLP support when updating signals.
* Agent 2.54.4
  * Agent improvements on filtering logs by utilities.
  * Fixed the error "Failed to retrieve the entity key" that was being displayed when installing the new Agent.
  * Fixed an issue when executing the Agent without a running Firehose instance was returning an error.

{% hint style="info" %}
### Agent 2.55.21 - officially supported Agent for Symphony version 1.55.x

[Download](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-2.55.21.zip)
{% endhint %}

### **New Endpoints**

| New endpoint | Description |
| :--- | :--- |
| [Unassign User Disclaimer](https://developers.symphony.com/restapi/v1.55/reference-link/unassign-user-disclaimer) | Unassigns a disclaimer from a user. Released in 1.55.2 |
| [List User Groups](https://developers.symphony.com/restapi/v1.55/reference-link/list-user-groups) | List user groups matching a set of filters. Released in 1.55.3 |
| [Get a User Group](https://developers.symphony.com/restapi/v1.55/reference-link/get-a-user-group) | Returns a user group. Released in 1.55.3 |
| [Create a User Group](https://developers.symphony.com/restapi/v1.55/reference-link/create-a-user-group) | Creates a user group. Released in 1.55.3 |
| [Update a User Group](https://developers.symphony.com/restapi/v1.55/reference-link/update-a-user-group) | Updates a user group information Released in 1.55.3 |
| [List Assignments](https://developers.symphony.com/restapi/v1.55/reference-link/list-assignments) | List assignments of a group Released in 1.55.3 |
| [List Group Assignments](https://developers.symphony.com/restapi/v1.55/reference-link/list-group-assigments) | Lists group assignments for a user. Released in 1.55.3 |
| [Update a Group](https://developers.symphony.com/restapi/v1.55/reference-link/update-a-group) | Assigns or updates the assignment of a user to a group. Released in 1.55.3 |
| [List Memberships](https://developers.symphony.com/restapi/v1.55/reference-link/list-memberships) | List memberships of a group. Released in 1.55.3 |
| [List Group Memberships](https://developers.symphony.com/restapi/v1.55/reference-link/list-group-memberships) | Filters and lists group memberships for a user. Released in 1.55.3 |
| [Add Group Memberships](https://developers.symphony.com/restapi/v1.55/reference-link/add-group-memberships) | Add multiple members to a group. Released in 1.55.3 |
| [Update a User Membership](https://developers.symphony.com/restapi/v1.55/reference-link/update-a-user-membership) | Add or update a user's membership within a group. Released in 1.55.3 |

### **Updated Endpoints**

The following table contains updates to existing endpoints:

| Updated Endpoint | What has changed |
| :--- | :--- |
| [Get User v2](https://developers.symphony.com/restapi/v1.55/reference-link/get-user-v2) | Now returning the user deactivated date. Available from 1.55.2 version onwards. |
| [Messages](https://developers.symphony.com/restapi/v1.55/reference-link/messages-v4) | Now returning the session id: `sid`. Available from 1.55.0 version onwards. |
| [Create Message v4](https://developers.symphony.com/restapi/v1.55/reference-link/create-message-v4) | Now returning the session id: `sid`. Available from 1.55.0 version onwards. |
| [Message Search - POST](https://developers.symphony.com/restapi/v1.55/reference-link/message-search-post) | Now returning the session id: `sid`. Available from 1.55.0 version onwards. |
| [Message Search - GET](https://developers.symphony.com/restapi/v1.55/reference-link/message-search-get) | Now returning the session id: `sid`. Available from 1.55.0 version onwards. |
| [Read Messages/Events Stream](https://developers.symphony.com/restapi/v1.55/reference-link/read-messagesevents-stream-v4) | Now returning the session id: `sid`. Available from 1.55.0 version onwards. |
| [Users Lookup v3](https://developers.symphony.com/restapi/v1.55/reference-link/users-lookup-v3) | Now, the endpoint returns the 204 code instead of the 500 error when searching for users by `username` returns no users. Available from 1.55.0 version onwards. |

### **Deprecated Endpoints**

No endpoints were deprecated in 1.55. For a complete list of Agent deprecated endpoints, refer to [Deprecated endpoints](agent-guide/agent-deprecated-endpoints.md).

### **General Updates**

* Fixed an issue when sending messages containing forbidden words and characters were not being blocked by DLP policies.
* 1.55.3 version - the JWT that applications using Symphony Application Authentication use, included a minor change in its API. For more information, refer to [Obtaining User identity](../building-extension-applications-on-symphony/app-authentication/#5-obtain-user-identity) for details on this change.

#### **Documentation Changes**

For more information, refer to [Documentation Updates](documentation-updates.md).

