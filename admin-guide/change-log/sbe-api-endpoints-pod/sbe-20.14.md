# SBE - 20.14

## SBE API changes

### **Updated APIs**

* [Update Room](https://developers.symphony.com/restapi/reference/update-room-v3) & [Update IM](https://developers.symphony.com/restapi/reference/update-im) endpoint now allows bots to pin and unpin messages in **External** chats.
* [Room Members](https://developers.symphony.com/restapi/reference/room-members) endpoint now specifies if a user has been added into a room through a Group (addedThroughGroups).
* [Stream Info](https://developers.symphony.com/restapi/reference/stream-info-v2) endpoint now provides more information on Groups that are present in the room, through the groups attribute.
* [Create Room](https://developers.symphony.com/restapi/reference/create-room-v3) endpoint now allows to create External chat rooms with View history enabled, if the pod entitlement canCreateExternalRoomSharedHistory is enabled.
* [Update Message](https://developers.symphony.com/restapi/reference/update-message-v4) endpoint now supports a `silent` parameter (default: true). This parameter is not supported yet but will in a subsequent version allow to update a message that will be seen as 'unread'. Currently all updates are seen as already read.
* [Get User](https://developers.symphony.com/restapi/reference/get-user-v2), [List Users](https://developers.symphony.com/restapi/reference/list-users-v2), [Create User](https://developers.symphony.com/restapi/reference/create-user-v2) & Update User now return in addition of the status of the user (Enabled or Disabled) the **suspension status**.

### **Deprecated APIs**

* [Authenticate App (Cert)](https://developers.symphony.com/restapi/reference/application-authenticate) is deprecated. Only RSA authentication will be supported moving forward for extension applications.
