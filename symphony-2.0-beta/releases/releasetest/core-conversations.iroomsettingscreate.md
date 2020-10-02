<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@sym20/core-conversations](./core-conversations.md) &gt; [IRoomSettingsCreate](./core-conversations.iroomsettingscreate.md)

## IRoomSettingsCreate interface

Settings configuration used when creating a room. Properties that are not specified will be set to default values. TODO: specify default values.

<b>Signature:</b>

```typescript
export interface IRoomSettingsCreate 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [copyProtected](./core-conversations.iroomsettingscreate.copyprotected.md) | <code>boolean</code> | TODO |
|  [discoverable](./core-conversations.iroomsettingscreate.discoverable.md) | <code>boolean</code> | How the room is handled in search results. \* <code>true</code> - The room is always included in search results. \* <code>false</code> - The room is only included in search results for its members. |
|  [external](./core-conversations.iroomsettingscreate.external.md) | <code>boolean</code> | TODO |
|  [membersCanAddUsers](./core-conversations.iroomsettingscreate.memberscanaddusers.md) | <code>boolean</code> | Determines who can add members and accept/deny join requests to the room. \* <code>true</code> - All members of the room can add members and accept/deny join requests. \* <code>false</code> - Only owners of the room can add members and accept/deny join requests. |
|  [public](./core-conversations.iroomsettingscreate.public.md) | <code>boolean</code> |  |
|  [readOnly](./core-conversations.iroomsettingscreate.readonly.md) | <code>boolean</code> | Determines who can send messages in the room. \* <code>true</code> - Only owners of the room can send messages. \* <code>false</code> - All members of the room can send messages. |
|  [simplified](./core-conversations.iroomsettingscreate.simplified.md) | <code>boolean</code> | Whether the room supports a simplified UI view. A client is supposed to show a simplified conversation with less options to change settings, and a simplified view for creating conversations can be shown where the user has to enter only the other members to add. If the room is simplified it has a few effects on the room<!-- -->'<!-- -->s behaviour: - The room can have a maximum of eight members. - All members of the room is by default an owner of it. - If the room<!-- -->'<!-- -->s name is set, the room is turned into a non-simplified room. |
|  [viewHistory](./core-conversations.iroomsettingscreate.viewhistory.md) | <code>boolean</code> | How the conversation history is handled when new members are added. \* <code>true</code> - The conversation history is available to newly added members. \* <code>false</code> - A member will not be able to see any conversation messages prior to the point in time of the join. |
