# SBE - 20.16

## SBE API changes

### **Added APIs**

* [List User Streams (Admin)](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/list-user-streams-admin) - Added new admin API to list the streams of a particular user.

### **Updated APIs**

* [Suppress Message](https://developers.symphony.com/restapi/main/messages/suppress-message): It is now possible to suppress a message in External rooms. Please note that if the counterpart pod is not yet on SBE 20.16, the message will only be suppressed on your end.
* Room endpoints: Room management endpoints now return a `groupChat` property, which is true when the room is also a group chat (an unnamed chat between more than two users). If the stream is not a group chat, then `groupChat` is either false or not present. In the Symphony client, if an end user creates a new chat with more than one other member, it creates a group chat, or opens an existing group chat with the same members if one exists. The API does not offer this capability, but it allows to create MIMs (Multiple Instant Messages) which are similar to group chats but are less flexible.  In the future, it will become possible to create group chats through the API, and MIMs will be deprecated. Below are the main differences between group chats and MIMs:&#x20;
  * Group chats are similar to rooms: Users can be added and removed. A group chat is named automatically, based on the names of the participants. A group chat can also be renamed, but in that case, it automatically becomes a room. Chat properties of group chats can't be changed. All members of a group chat are also 'owners'. Most of the time, only one group chat exists with a fixed list of participants. However it is possible to create duplicates, for example by adding or removing a participant from another group chat.&#x20;
  * MIMs are the previous version of group chats and are more similar to IMs. There can't be more than one MIM with a fixed list of participants. If a user is added or removed from a MIM, then a different MIM is opened with the new list of members, or if that MIM already exists, it opens. Group chats were introduced because they allow to bring new members into a conversation without losing the chat history, unlike MIMs.

### Fixes

* List Attachments endpoint now correctly returns attachments sent from Blast Message API
* Room owner promotion behavior for bots: When an owner leaves a room, and there is no owner remaining, the previous behavior was that the elder member of the room became the owner of the room (even if it was a service user). Now, the elder end user will be picked instead.

## Other changes

### Improved CSRF checks on backend APIs

**Important**: Starting with SBE 20.16, we are improving the Cross-Site Request Forgery (CSRF) security checks on our public backend APIs.

This change is transparent for chatbots and automations configured with service user accounts using RSA or certificate-based authentication. However, this can impact bots using end-user accounts (browser-based authentication with login/password).

Symphony does not support the use of end-user accounts for automations, and recommends using service users instead, with a RSA-based authentication.

If you have automations or chatbots that log in using an end-user account, please perform additional verifications as you validate the new SBE 20.16 in your UAT environment.

### Integration Bridge

End-of-life update for the Integration Bridge as a Symphony-hosted service

As previously notified, as of April 2022 the Integration Bridge is no longer supported by Symphony.

Starting with SBE 20.16, the Integration Bridge will also no longer be available as a Symphony-hosted component.&#x20;

Effectively, this means that legacy integrations that rely on this component (Universal Webhook, Jira, Zapier, GitHub, Salesforce, Trello) will no longer work.

Symphony proposes replacement solutions for Jira, Salesforce & Universal Webhook. Please reach out to your Symphony representative for more information.

Customers who have installed the Integration Bridge on their premises are not impacted. However, as the Integration Bridge is no longer supported, we cannot recommend using it.

<br>

