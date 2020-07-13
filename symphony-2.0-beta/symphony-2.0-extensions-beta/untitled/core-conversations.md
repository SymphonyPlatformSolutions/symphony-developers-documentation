# core-conversations

[Home](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/index.md) &gt; [@sym20/core-conversations](core-conversations.md)

## core-conversations package

## Classes

| Class | Description |
| :--- | :--- |
| [AlreadyAMember](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.alreadyamember.md) | The request could not be handled because the acting user is already a member of the conversation. |
| [ApplicationError](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.applicationerror.md) |  |
| [BannedUser](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.banneduser.md) | The member is banned from the conversation and couldn't be added to it. |
| [ConversationInactive](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.conversationinactive.md) | The member set cannot be modified in an inactive conversation. |
| [ConversationNotFound](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.conversationnotfound.md) | The requested conversation was not found, or it is not available to the acting user. |
| [InactiveMembersInConversation](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.inactivemembersinconversation.md) | At least one of the specified users is inactive and cannot be added to the conversation. |
| [InformationBarrierViolation](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.informationbarrierviolation.md) | TODO/ describe what this means. |
| [MemberNotFound](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.membernotfound.md) | The requested user is not a member of the conversation. |
| [NoOwnerInConversation](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.noownerinconversation.md) | Carrying out the request would leave the conversation without an owner, which is forbidden. |
| [NotAPrivateRoom](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.notaprivateroom.md) | The request is only valid for a private conversation of type `room` and the involved conversation is of another type, or is public. |
| [NotARoom](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.notaroom.md) | The request is only valid for a conversation of type `room` and involved a conversation of another type. |
| [RoomNameCannotBeSpecified](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.roomnamecannotbespecified.md) | The room cannot have a name, but one was given. |
| [RoomNameMissing](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.roomnamemissing.md) | The room cannot have a name, but one was given. |
| [RoomNameNotUnique](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.roomnamenotunique.md) | The name given to the room is not unique, or it is too similar to an already existing name. |
| [RoomNameTooLong](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.roomnametoolong.md) | The name given to the room is too long. |
| [TooManyMembersInConversation](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.toomanymembersinconversation.md) | The request resulted in a simplified room with more than 8 members including the owner, which is forbidden. Change the conversation into a regular room to allow more members. |
| [UserConnectionMissing](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.userconnectionmissing.md) | TODO/ describe what this means. |
| [UserInactive](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.userinactive.md) | The request couldn't be handled because the user involved is inactive. |
| [UserNotEntitled](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.usernotentitled.md) | The request was rejected due to the acting user not being entitled to carry it out. |
| [UserNotFound](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.usernotfound.md) | The requested user was not found. |

## Interfaces

| Interface | Description |
| :--- | :--- |
| [IConversationIM](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iconversationim.md) | A direct message conversation \(also known as IM\) is an unnamed informal private conversation between two users. |
| [IConversationRoom](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iconversationroom.md) | A room is a named conversation with an unlimited amount of members. Rooms has a wide variety of configuration options to control its behaviour. |
| [IConversationStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iconversationstore.md) |  |
| [IMember](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.imember.md) | A participant in a conversation. It includes just some basic user information needed to display user information in non-user views. The user ID can be used to fetch more information about the user via the user service. |
| [IMemberCreate](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.imembercreate.md) | Request body used to add a member to a conversation. |
| [IMemberUpdate](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.imemberupdate.md) | Request body used to add a member to a conversation. |
| [IReceivedJoinRequest](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.ireceivedjoinrequest.md) | A request to join a conversation made by a user. The existance of an instance implies that the request is pending and that the acting user is eligible to accept or ignore it. |
| [IReceivedJoinRequestStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.ireceivedjoinrequeststore.md) | This is a store that contains all join requests that other users have sent, requesting to join conversations where the current user is an owner.A join request can be accepted by adding the requesting user as a member in the conversaion.When a join request is accepted by any eligible receiver, or explicitly ignored by the current user, the request is removed from this collection. |
| [IRoomSettingsCreate](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iroomsettingscreate.md) | Settings configuration used when creating a room. Properties that are not specified will be set to default values. TODO: specify default values. |
| [IRoomSettingsUpdate](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iroomsettingsupdate.md) | Settings configuration used when updating a room. Only properties that are specified will be updated, the rest will be untouched. All specified properties will replace the previous value unless the property describes a different behaviour. |
| [ISentJoinRequest](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.isentjoinrequest.md) | A request by the acting user to become a member of a conversation. The existance of an instance implies that the request is still pending. |
| [ISentJoinRequestStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.isentjoinrequeststore.md) | This is a store that contains all pending join requests where the current user has requested to join various conversations. |

## Namespaces

| Namespace | Description |
| :--- | :--- |
| [IConversationStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iconversationstore.md) |  |
| [IReceivedJoinRequestStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.ireceivedjoinrequeststore.md) |  |
| [ISentJoinRequestStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.isentjoinrequeststore.md) |  |

## Variables

| Variable | Description |
| :--- | :--- |
| [ConversationType](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.conversationtype.md) |  |

## Type Aliases

| Type Alias | Description |
| :--- | :--- |
| [ConversationId](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.conversationid.md) |  |
| [ConversationType](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.conversationtype.md) | Available types of conversation: \* `IM` - A private direct message conversation. \* `ROOM` - A fully configurable named room. |
| [IConversation](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.iconversation.md) | A conversation is a group of users sharing messages. These users are said to be members of the conversation. |
| [JoinRequestId](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.joinrequestid.md) |  |
| [Timestamp](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.timestamp.md) |  |
| [UserId](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-conversations.userid.md) |  |

