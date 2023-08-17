# Overview of Pod API

## Symphony Pod APIs <img src="../../.gitbook/assets/Symphony Pod.png" alt="" data-size="line">

The Symphony Pod API is used to build tools in order to manage and administer Symphony for your organization. The following guide includes API collections that exist on the Pod:

## Session Authenticate API <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

In order to access Pod API endpoints, bots must be authenticated with the Pod. To do so, a Bot must call the [Session Authenticate endpoint](https://developers.symphony.com/restapi/reference#rsa-session-authenticate).

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

The full list of Users API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#search-users](https://developers.symphony.com/restapi/reference#search-users)

## Stream APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Stream APIs create and manage IMs, MIMs and chat rooms. These APIs can be used to do the following:

* Create IM or MIM
* Create chatrooms
* Search for rooms
* Get room info
* Deactivate room
* List room members
* Add/Remove room members
* Promote/Demote user to room owner

The full list of Streams API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#create-im-or-mim](https://developers.symphony.com/restapi/reference#create-im-or-mim)

## Connection APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Connection APIs manage user connections. These APIs can be used to do the following:

* Get connection
* List connections
* Create connections
* Accept connection
* Reject connection
* Remove connection

The full list of Connections API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#get-connection](https://developers.symphony.com/restapi/reference#get-connection)

## Presence APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Presence APIs manage presence status for users. These APIs can be used to do the following:

* Get/Set user presence
* Get all users presence
* Register presence interest
* Create presence feed
* Read presence feed
* Delete presence feed

The full list of Presence API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#get-presence](https://developers.symphony.com/restapi/reference#get-presence)
