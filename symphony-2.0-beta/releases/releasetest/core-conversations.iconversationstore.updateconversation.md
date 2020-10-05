<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@sym20/core-conversations](./core-conversations.md) &gt; [IConversationStore](./core-conversations.iconversationstore.md) &gt; [updateConversation](./core-conversations.iconversationstore.updateconversation.md)

## IConversationStore.updateConversation() method

Update the settings of a conversation.

<b>Signature:</b>

```typescript
updateConversation(conversationId: ConversationId, settings: Partial<IRoomSettingsUpdate>): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  conversationId | <code>ConversationId</code> | The conversation to update |
|  settings | <code>Partial&lt;IRoomSettingsUpdate&gt;</code> | New settings for the conversation. Any settings not included will not be updated. |

<b>Returns:</b>

`Promise<void>`

## Exceptions

ConversationNotFound [ConversationNotFound](./core-conversations.conversationnotfound.md)

RoomNameNotUnique [RoomNameNotUnique](./core-conversations.roomnamenotunique.md)

RoomNameTooLong [RoomNameTooLong](./core-conversations.roomnametoolong.md)

RoomNameCannotBeSpecified [RoomNameCannotBeSpecified](./core-conversations.roomnamecannotbespecified.md)

TooManyMembersInConversation [TooManyMembersInConversation](./core-conversations.toomanymembersinconversation.md)

UserNotEntitled [UserNotEntitled](./core-conversations.usernotentitled.md)
