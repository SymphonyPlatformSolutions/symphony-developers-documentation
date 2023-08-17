# SBE - 20.13

## SBE API changes

### **New APIs**

* [Update Message](https://developers.symphony.com/restapi/reference/update-message-v4) endpoint (Beta) has been introduced to be able to update an existing message. For more information, please read the [endpoint documentation](https://developers.symphony.com/restapi/reference/update-message-v4). This feature also requires Agent 20.13.2+.
* [UpdateIM](https://developers.symphony.com/restapi/reference/update-im) endpoint now allows Bots to pin and unpin messages in IMs. Please note they can do so in chat rooms using the updated Update Room endpoint.
* [Update User Apps](https://developers.symphony.com/restapi/reference/partial-update-user-apps) endpoint: It is now possible to modify the list of apps a user is entitled to, without having to specify the complete list of apps (partial update).

### **Updated APIs**

* [Update Room](https://developers.symphony.com/restapi/reference/update-room-v3) endpoint now allows bots to pin and unpin messages in chat rooms.
* [Search Users](https://developers.symphony.com/restapi/reference/search-users): It is now possible to filter users by their accountType (NORMAL for end users, SYSTEM for bots/service users and SDL for Symphony Distribution Lists, meaning User Groups).

### **Deprecated APIs**

No SBE API endpoint was deprecated in Symphony version 20.13.
