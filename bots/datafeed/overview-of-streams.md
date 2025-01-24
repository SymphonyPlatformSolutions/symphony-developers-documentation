# Overview of Streams

A Stream is like a container for messages exchanged between two or more users via a given 1 to 1 chat (IM) or chat room.

Each Stream has a unique ID also known as a _Conversation ID_, that is returned when the IM or chat room is created using the [Create Instant Message](https://developers.symphony.com/restapi/main/streams-conversations/im-mim-endpoints/create-im-or-mim), [Create Non-inclusive Instance Message](https://developers.symphony.com/restapi/main/streams-conversations/im-mim-endpoints/create-im-or-mim-admin), and [Create Room v3](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/create-room-v3) endpoints respectively. This ID can then be used in subsequent endpoints to perform operations on the IM or chat room.

On the Symphony web or desktop client, this ID can be found by clicking on the timestamp of any message in the conversation. This will open the **Message Status** module, where the **Conversation ID** can be found, as shown in the following picture.

![](https://files.readme.io/736890e-conversation_id.jpg)

The Conversation ID in the Symphony Web Client is in Standard Base64 encoding and need to be converted to be URLSafe. Conversation IDs returned in API responses are already URLSafe Base64 encoding.

{% hint style="info" %}
### URLSafe Base64 Conversion

To obtain the URLSafe Base64 Conversation ID:

* Replace forward slashes / with underscores \_&#x20;
* Replace pluses + with minuses -&#x20;
* Ignore any trailing equal signs =&#x20;

For example, the URLSafe Base64 encoding of`lX1hwfmQ+AK/k/a/BB0y2n///q2+0KfbdA==` converts to `lX1hwfmQ-AK_k_a_BB0y2n___q2-0KfbdA`.
{% endhint %}

The following list shows the existing endpoints:

[Create IM](https://developers.symphony.com/restapi/main/streams-conversations/im-mim-endpoints/create-im-or-mim)\
[Create IM non-inclusive](https://developers.symphony.com/restapi/main/streams-conversations/im-mim-endpoints/create-im-or-mim-admin)\
[Create Room v3](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/create-room-v3)\
[Update Room v3](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/update-room-v3)\
[Room Info v3](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/room-info-v3)\
[De/Re-activate Room](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/de-or-re-activate-room)\
[Room Members](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/room-members)\
[Add Member](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/add-member)\
[Share](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/share-v3)\
[Remove Member](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/remove-member)\
[Promote Owner](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/promote-owner)\
[Demote Owner](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/demote-owner)\
[Search Rooms v3](https://developers.symphony.com/restapi/main/streams-conversations/room-endpoints/search-rooms-v3)\
[List User Streams](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/list-user-streams)\
[Stream Info v2](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/stream-info-v2)\
[List Streams for Enterprise v2](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/list-streams-for-enterprise-v2)\
[Stream Members](https://developers.symphony.com/restapi/main/streams-conversations/all-streams-endpoints/stream-members)
