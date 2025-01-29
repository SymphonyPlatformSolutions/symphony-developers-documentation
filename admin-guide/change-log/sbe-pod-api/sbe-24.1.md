---
description: DRAFT
---

# SBE - 24.1

## SBE API changes

### **Added APIs**

* [Get Manifest](https://developers.symphony.com/restapi/main/user-management/user-manifest) & [Update Manifest](https://developers.symphony.com/restapi/main/user-management/update-user-manifest): Chat bots can now provide a manifest that describes the commands they support. Users interacting with these bots will then benefit from an autocomplete menu when they type "/" in the chat text editor, to help them discover the supported functionalities, and the format of the commands.&#x20;
  * **Important**: This feature has a dependency on an upcoming **Symphony Client** release version. Please watch the Symphony Client release notes to know when the feature will be available to you.

### **Updated APIs**

* No APIs have been updated.

### Deprecated APIs

* The Presence feed API endpoints are deprecated ([Create Presence Feed](https://developers.symphony.com/restapi/main/presence/create-presence-feed), [Read Presence Feed](https://developers.symphony.com/restapi/main/presence/read-presence-feed), [Delete Presence Feed](https://developers.symphony.com/restapi/main/presence/delete-presence-feed)). Other [endpoints ](https://developers.symphony.com/restapi/main/presence)are available to retrieve the presence of a user or list of users.

### Fixes

* N/A

## Other changes

* Message size limits. The number of entities (tags or mentions) allowed in a single message has been increased from 40 to 80.
