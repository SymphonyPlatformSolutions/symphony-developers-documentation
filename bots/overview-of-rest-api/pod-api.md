# Overview of Pod API

## Symphony Messaging Pod APIs <img src="../../.gitbook/assets/Symphony Pod.png" alt="" data-size="line">

The Symphony Messaging Pod API is used to build tools in order to manage and administer Symphony Messaging for your organization. The following guide includes API collections that exist on the Pod:

## Session Authenticate API <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

In order to access Pod API endpoints, bots must be authenticated with the Pod. To do so, a Bot must call the [Session Authenticate endpoint](https://developers.symphony.com/restapi/main/bot-authentication/rsa-session-authenticate).

If successful, the Pod API returns a Session Token which is valid for up to two weeks. This Session Token must be passed along with every subsequent Pod API request. You can read more about Authentication and Token management here:

{% content-ref url="../authentication/" %}
[authentication](../authentication/)
{% endcontent-ref %}

## User APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The User APIs query and manage users on the Pod. These APIs can be used to do the following:

* Search users
* List all users
* Create users
* Update user information
* List user features
* Add/Remove user roles
* List user roles
* List user audit trail

The full list of Users API endpoints and their corresponding reference guide can be found at [https://developers.symphony.com/restapi/main/users](https://developers.symphony.com/restapi/main/users) and [https://developers.symphony.com/restapi/main/user-management](https://developers.symphony.com/restapi/main/user-management).

## Stream APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Stream APIs create and manage IMs and chat rooms. These APIs can be used to do the following:

* Create IM
* Create chatrooms
* Search for rooms
* Get room info
* Deactivate room
* List room members
* Add/Remove room members
* Promote/Demote user to room owner

The full list of Streams API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/main/streams-conversations](https://developers.symphony.com/restapi/main/streams-conversations)

## Connection APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Connection APIs manage user connections. These APIs can be used to do the following:

* Get connection
* List connections
* Create connections
* Accept connection
* Reject connection
* Remove connection

The full list of Connections API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/main/connections](https://developers.symphony.com/restapi/main/connections)

## Presence APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Presence APIs manage presence status for users. These APIs can be used to do the following:

* Get/Set user presence
* Get all users presence
* Register presence interest
* Create presence feed
* Read presence feed
* Delete presence feed

The full list of Presence API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/main/presence](https://developers.symphony.com/restapi/main/presence)
