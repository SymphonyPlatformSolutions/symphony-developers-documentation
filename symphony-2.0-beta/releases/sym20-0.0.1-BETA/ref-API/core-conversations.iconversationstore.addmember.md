<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@sym20/core-conversations](./core-conversations.md) &gt; [IConversationStore](./core-conversations.iconversationstore.md) &gt; [addMember](./core-conversations.iconversationstore.addmember.md)

## IConversationStore.addMember() method

Add a member to a conversation

The current user must be a member of the conversation to be able to add another member, and unless the `membersCanAddUsers` setting is true, the current user must also be an owner.

<b>Signature:</b>

```typescript
addMember(conversationId: ConversationId, userId: UserId, init: Partial<IMemberCreate>): Promise<IMember>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  conversationId | <code>ConversationId</code> | The conversation to add a member to |
|  userId | <code>UserId</code> | The user to add to the conversation |
|  init | <code>Partial&lt;IMemberCreate&gt;</code> | Initial settings for the member. Any setting that is not included will have default values. |

<b>Returns:</b>

`Promise<IMember>`

The member object

## Exceptions

ConversationNotFound [ConversationNotFound](./core-conversations.conversationnotfound.md)

UserNotFound [UserNotFound](./core-conversations.usernotfound.md)

UserNotEntitled [UserNotEntitled](./core-conversations.usernotentitled.md)

TooManyMembersInConversation [TooManyMembersInConversation](./core-conversations.toomanymembersinconversation.md)

InactiveMembersInConversation [InactiveMembersInConversation](./core-conversations.inactivemembersinconversation.md)

InformationBarrierViolation [InformationBarrierViolation](./core-conversations.informationbarrierviolation.md)

UserConnectionMissing [UserConnectionMissing](./core-conversations.userconnectionmissing.md)

BannedUser [BannedUser](./core-conversations.banneduser.md)

UserInactive [UserInactive](./core-conversations.userinactive.md)

ConversationInactive [ConversationInactive](./core-conversations.conversationinactive.md)

NotARoom [NotARoom](./core-conversations.notaroom.md)
