# Overview of Pod API

## Symphony Pod APIs ![](../../.gitbook/assets/pod_bg.png) 

The Symphony Pod API is used to build tools in order to manage and administer Symphony for your organization.  The following guide includes API collections that exist on the Pod:

## Session Authenticate API ![](../../.gitbook/assets/api_bg.png) 

In order to access Pod API endpoints, Bots must be authenticated on the Pod.  To do so, a Bot must call the Session Authenticate endpoint: [https://developers.symphony.com/restapi/reference\#rsa-session-authenticate](https://developers.symphony.com/restapi/reference#rsa-session-authenticate)

If successful, the Pod API returns a Session Token which is valid for up to two weeks.  This Session Token must be passed along with every subsequent Pod API request.  You can read more about Authentication and Session Token management here:

{% page-ref page="../authentication/" %}

## Users API ![](../../.gitbook/assets/api_bg.png) 

The Users API is used to query and manage users on the Pod. The Users API can be leveraged to do the following:

* Search users
* List all users
* Create users
* Update user information
* List user features
* Add/Remove user roles
* List user roles
* List user audit trail

The full list of Users API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Streams API ![](../../.gitbook/assets/api_bg.png) 

The Streams API is used to create and de-activate IMs, MIMs, chatrooms, and also manage room membership.  The Streams API can be leveraged to do the following:

* Create IM or MIM
* Create chatrooms
* Search for rooms
* Get room info
* Deactivate room
* List room members
* Add/Remove room members
* Promote/Demote user to room owner

The full list of Streams API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Connections API ![](../../.gitbook/assets/api_bg.png) 

The Connections API is used to manage user connections.  The Connections API can be leveraged to do the following:

* Get connection
* List connections
* Create connections
* Accept connection
* Reject connection
* Remove connection

The full list of Connections API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Presence API ![](../../.gitbook/assets/api_bg.png) 

The Presence API is used to get or set a presence status for given user or create a presence feed for your company pod.  The Presence API can be leveraged to do the following:

* Get/Set user presence
* Get all users presence
* Register presence interest
* Create presence feed
* Read presence feed
* Delete presence feed

The full list of Presence API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## 

