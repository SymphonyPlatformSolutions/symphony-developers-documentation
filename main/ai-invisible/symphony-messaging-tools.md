---
description: Capabilities, parameters and example prompts
---

# Symphony Messaging Tools

Use these tools to work with messages, conversations, attachments, people, presence and financial instruments in Symphony. Example prompts show one way to request an operation; replace the bracketed values with your own names, dates or identifiers. When a tool needs an ID and you give a name or email, the assistant finds the ID first with `room_search`, `search_user` or `lookup_user`.

### Start here: ask the assistant

This page describes all the Symphony Messaging tools. What your assistant can actually use depends on which tools are enabled for it, and tools and limits can change.

**If your assistant already has Symphony tools,** ask it directly. Its answer reflects what it can do today.

* **See its tools:** "List tools". A tool missing from the list is not enabled for your assistant yet.
* **Learn one tool:** "For the tool \[TOOL\_NAME], give what it does, its limits and notes, and an example prompt."
* **Check what a request will use:** "To do this: \[YOUR REQUEST], which tools would be called?"

**If you are still building your agent and no tools are enabled yet,** "List tools" will not show Symphony tools. Use the sections below to decide which tools to enable, then run "List tools" again to confirm they are available.

### 1. Reading and searching <a href="#id-1-reading-and-searching" id="id-1-reading-and-searching"></a>

Read a conversation's history, search messages by meaning across everything you can access, and find rooms by topic. Start here to locate a conversation or a message; the IDs these tools return feed the others.

<details>

<summary>list_messages</summary>

**What it does:** Reads messages from one conversation (direct message, group chat or room) in a time range. Returns the message content, sender, timestamp and message ID.

**Parameters**

* `conversationIdentifier` (required): conversation stream ID.
* `since` (optional): start date, YYYY-MM-DD. At least 1 day ago and before `until`.
* `until` (optional): end date, YYYY-MM-DD. After `since`; can only be used with `since`.
* `limit` (optional): maximum number of messages, up to 500.
* `skip` (optional): number of messages sharing the exact timestamp of `since` to skip, used to page across calls.

**Limits and notes**

* Maximum 500 messages per call. If 500 come back, more may exist in the same window.
* Maximum 7 days per call. Split longer ranges into consecutive calls.
* With no dates, it returns the last 24 hours.
* Use `skip` when messages at the boundary share the same timestamp.
* Public rooms can be read without joining; private rooms require membership.
* If only the room name is known, `room_search` is called first to get the stream ID.
* To find a topic across conversations, `search_messages_by_meaning` is faster than reading a timeline.

**Example prompts**

* "Show me what was posted in \[ROOM\_NAME] recently."
* "Show me what was posted in \[ROOM\_NAME] on \[DATE]."
* "Summarize messages in \[ROOM\_NAME] from \[DATE] to \[DATE]."

</details>

<details>

<summary>search_messages_by_meaning</summary>

**What it does:** Searches messages by meaning, not literal keywords. Searching "budget" can match messages about costs or spending. It searches every conversation you can access, or one conversation if you name it.

**Parameters**

* `query` (required): what you are looking for, in natural language.
* `conversationIdentifier` (optional): limits the search to one room or chat.
* `limit` (optional): number of results. Default 25, maximum 200.
* `skip` (optional): number of leading results to skip. Default 0.

**Limits and notes**

* Matches by concept, not by exact text or regex. Natural phrases and questions work better than AND, OR or NOT.
* Paging uses offset: for example `limit` 25 with `skip` 25 gives the next page.
* Returns only conversations you are authorised to see.
* Works across languages.
* Restricting to one conversation is faster and more relevant.

**Example prompts**

* "Find discussions about \[TOPIC] and the decisions made."
* "What did people say about \[TOPIC] in \[ROOM\_NAME]?"
* "Search all chats for mentions of \[TOPIC]."

</details>

<details>

<summary>room_search</summary>

**What it does:** Finds chat rooms by name, description or keyword. Returns each room's name, description, stream ID, settings (public or private, read-only, discoverable), member count and creation details.

**Parameters**

* `query` (required): the search term or topic, for example "FX Rates" or "Compliance".

**Limits and notes**

* Searches multi-user rooms only. 1:1 chats and unnamed group chats are not returned; use `search_user` to find people.
* Public rooms are always searchable.
* Private discoverable rooms are searchable, but you need an invitation to read them.
* Private undiscoverable rooms are hidden unless you are already a member.
* Usually the first step to get the stream ID that other room tools need.

**Example prompts**

* "Find rooms related to \[PROJECT]."
* "Find active rooms about \[TOPIC] that I could join."

</details>

### 2. Sending and managing messages <a href="#id-2-sending-and-managing-messages" id="id-2-sending-and-managing-messages"></a>

Post, edit and delete messages. Editing and deleting need the message ID, which `send_message` returns or which reading and searching can find.

<details>

<summary>send_message</summary>

**What it does:** Sends a message to one conversation: a direct chat, a group chat or a room. Returns the sent message with its message ID and timestamp.

**Parameters**

* `streamIdentifier` (required): the destination conversation's stream ID.
* `message` (required): plain text, or MessageML with a root `<messageML>` element.
* `additionalData` (optional): JSON data for entities or for bots and automated services.

**Limits and notes**

* Sends to one conversation per call.
* No file attachments.
* Rich text must follow MessageML syntax: closed tags and valid attributes.
* You must be a member with posting rights. In read-only rooms, only owners can post.
* A room name or a person must first be resolved to a stream ID.
* Keep the returned message ID to edit or delete the message later.

**Example prompts**

* "Send a message to \[ROOM\_NAME] announcing that the briefing is postponed to \[TIME]."
* "Send \[PERSON] a direct message: \[MESSAGE]."

</details>

<details>

<summary>update_message</summary>

**What it does:** Edits an existing message and returns the updated message with its metadata.

**Parameters**

* `conversationIdentifier` (required): the stream ID of the conversation.
* `messageIdentifier` (required): the ID of the message to edit.
* `newMessage` (required): the replacement content, plain text or MessageML.

**Limits and notes**

* The new content fully replaces the old. Nothing is appended or patched, so send the complete text.
* Usually only your own messages can be edited, subject to your organisation's permissions.
* Both IDs must be known first; `list_messages` or `search_messages_by_meaning` finds the message ID.
* Supports the same MessageML formatting as `send_message`.

**Example prompts**

* "In \[ROOM\_NAME], change my last message to: \[NEW\_TEXT]."
* "My last message in \[ROOM\_NAME] says \[OLD\_TIME]. Update it to \[NEW\_TIME]."

</details>

<details>

<summary>remove_message</summary>

**What it does:** Deletes a message from its conversation.

**Parameters**

* `messageIdentifier` (required): the ID of the message to remove.

**Limits and notes**

* Needs only the message ID, not the conversation.
* Deletion cannot be undone in the chat.
* Usually only your own messages can be deleted; room owners and administrators may have more rights.
* Find the message ID first with `list_messages` or `search_messages_by_meaning`.

**Example prompts**

* "I sent a duplicate message in \[ROOM\_NAME]. Please delete it."
* "Delete my last message in \[ROOM\_NAME]."

</details>

### 3. Attachments <a href="#id-3-attachments" id="id-3-attachments"></a>

Check which file types are allowed, list the files shared in a conversation, and download one. List first: downloading needs the IDs that listing returns.

<details>

<summary>list_allowed_file_types</summary>

**What it does:** Returns the file extensions and types allowed as attachments on your Symphony environment.

**Parameters:** none.

**Limits and notes**

* The list follows your organisation's policy and can differ between organisations.
* Read-only: it does not upload, attach or download files.
* Best used before sharing a file, to check that its type will be accepted.

**Example prompts**

* "Which file types are allowed as attachments?"
* "Can we share .zip or .py files?"

</details>

<details>

<summary>list_attachments</summary>



**What it does:** Lists the files shared in one conversation. Returns file names, file IDs, message IDs, file sizes and upload times.

**Parameters**

* `conversationIdentifier` (required): the conversation's stream ID.
* `since` (optional): start time as a full date-time, for example 2026-11-01T00:00:00Z.
* `to` (optional): end time as a full date-time.
* `limit` (optional): number of files. Default 50, maximum 100.
* `sortDirection` (optional): ASC (default) or DESC, by time.

**Limits and notes**

* Works on one conversation at a time; it cannot search all conversations.
* Max 100 files per call.
* Dates must be full ISO 8601 date-times, not just YYYY-MM-DD.
* Metadata only: it does not return file content. Use `download_attachment` for that.

**Example prompts**

* "List all files shared in \[ROOM\_NAME] since \[DATE], newest first."
* "Show the attachments shared in this chat since yesterday."

</details>

<details>

<summary>download_attachment</summary>

**What it does:** Downloads one attachment from a conversation. The file content is returned as base64.

**Parameters**

* `messageIdentifier` (required): the ID of the message that contains the file.
* `fileIdentifier` (required): the ID of the file.

**Limits and notes**

* Both IDs come from `list_attachments` or from message metadata.
* Plain text and CSV files can be read directly.
* Spreadsheets, complex PDFs and images are not parsed: there is no built-in text extraction or OCR.
* The platform allows files up to 25 MB, but about 1 to 2 MB is the practical limit for reading a file.

**Example prompts**

* "Download the CSV file shared in \[ROOM\_NAME] and summarise it."
* "Retrieve the file \[FILE\_NAME] sent in \[ROOM\_NAME]."

</details>

### 4. Chats <a href="#id-4-rooms-and-chats" id="id-4-rooms-and-chats"></a>

Open direct messages, create chats, and manage their members, settings and pinned message. A direct message is a chat between exactly two people, and cannot be changed; use group chats for more than two members, or chat rooms for a larger number of members and if new members need to be added.

<details>

<summary>create_chat</summary>

**What it does:** Opens a direct 1:1 chat with another user. If you already have one, the existing chat is returned and no duplicate is created.

**Parameters**

* `userIdentifier` (required): the other user's numeric Symphony user ID.

**Limits and notes**

* A direct chat has exactly two people and cannot be changed. For more people, use a room.
* Safe to call repeatedly: it returns the same chat and keeps the history.
* Accepts only a numeric ID. If you have a name or email, `search_user` or `lookup_user` finds the ID first.
* If a search returns several people, choose the right one before creating the chat.
* Chats with external users depend on connection approvals and compliance rules.

**Example prompts**

* "Open a direct chat with \[PERSON]."
* "Open a 1:1 chat with \[PERSON] so we can review \[TOPIC]."

</details>

<details>

<summary>create_room_with_user</summary>

**What it does:** Creates a new room. You become its owner. You can add one other user at creation.

**Parameters**

* `name` (required): the room name.
* `userId` (optional): numeric ID of one user to add. Without it, only you are added.
* `description` (optional): the room's purpose.
* `publicRoom` (optional): true for a public room, false for private. Default false.
* `discoverable` (optional): whether the room can be found in room search. Default true.
* `readOnly` (optional): if true, only owners can post. Default false.
* `membersCanInvite` (optional): whether members can invite others. Default true.
* `newMembersCanViewHistory` (optional): whether new members see earlier messages. Default true.
* `keywords` (optional): key-value tags, for example department: FX.

**Limits and notes**

* Only one user can be added at creation. Add the others with `add_user_to_room`.
* Public or private is fixed at creation and cannot be changed later.
* The creator becomes an owner and can edit settings, pin messages and manage members.
* `userId` must be numeric; use `search_user` or `lookup_user` to find it.
* Compliance rules or information barriers may prevent adding some users.

**Example prompts**

* "Create a private room called \[ROOM\_NAME] with the description \[DESCRIPTION] and add \[PERSON]."
* "Create a room called \[ROOM\_NAME], tag it \[KEY]: \[VALUE], and let new members see the history."

</details>

<details>

<summary>add_user_to_room</summary>

**What it does:** Adds one user to an existing room.

**Parameters**

* `conversationIdentifier` (required): the room's stream ID.
* `userIdentifier` (required): the user's numeric Symphony ID.

**Limits and notes**

* One user per call. Call it again for each extra person.
* You need permission to invite. In private rooms, or where invitations are disabled, only owners can add people.
* Needs IDs, not names or emails: `room_search` gives the room ID, `search_user` or `lookup_user` the user ID.
* Works on rooms only, not on 1:1 chats.
* Adding external users or people across information barriers may fail under compliance rules.

**Example prompts**

* "Add \[PERSON] to \[ROOM\_NAME]."

</details>

<details>

<summary>remove_user_from_room</summary>

**What it does:** Removes one user from an existing room.

**Parameters**

* `conversationIdentifier` (required): the room's stream ID.
* `userIdentifier` (required): the numeric Symphony ID of the person to remove.

**Limits and notes**

* Room owners or administrators only; standard members cannot remove others.
* One user per call.
* Works on rooms only, not on 1:1 chats.
* The removed user loses access to new messages immediately. Access to earlier history depends on the room's settings and your organisation's policy.

**Example prompts**

* "Remove \[PERSON] from \[ROOM\_NAME]."

</details>

<details>

<summary>list_room_members</summary>

**What it does:** Lists the members of a room. Returns each member's identity and user ID, join date, and whether they are an owner or a standard member.

**Parameters**

* `conversationIdentifier` (required): the room's stream ID.

**Limits and notes**

* Needs the stream ID, not the room name. Use `room_search` if you only know the name.
* You generally need to be a member, or have administrative rights, to see a private room's members.
* The full list is returned at once, so very large rooms produce a long result. For a head count, use the member count from `room_search`.
* Useful to check who the owners are before changing room settings.

**Example prompts**

* "Who are the members of \[ROOM\_NAME], and who owns it?"
* "When did \[PERSON] join \[ROOM\_NAME]?"

</details>

<details>

<summary>update_room</summary>

**What it does:** Changes a room's settings and pinned message. Returns the updated room details.

**Parameters**

* `conversationIdentifier` (required): the room's stream ID.
* `name`, `description` (optional): new name and description.
* `discoverable` (optional): whether the room can be found in room search.
* `readOnly` (optional): if true, only owners can post.
* `membersCanInvite` (optional): whether members can invite others.
* `newMembersCanViewHistory` (optional): whether new members see earlier messages.
* `keywords` (optional): key-value tags.
* `pinnedMessageIdentifier` (optional): the ID of a message to pin at the top of the room.
* `unpinMessage` (optional): true to remove the pinned message.

**Limits and notes**

* Send only the fields you want to change; the others stay as they are.
* Room owners or administrators only.
* Public or private cannot be changed after creation.
* Needs the stream ID; `room_search` finds it from the name.

**Example prompts**

* "Rename \[ROOM\_NAME] to \[NEW\_NAME]."
* "Make \[ROOM\_NAME] read-only and update its description to \[DESCRIPTION]."
* "Pin my message \[MESSAGE\_TEXT] in \[ROOM\_NAME]."

</details>

### 5. People and presence <a href="#id-5-people-and-presence" id="id-5-people-and-presence"></a>

Find people, bots and user groups, look them up by email or ID, see your own profile, and read or set availability. These tools also return the user IDs that other tools need.

<details>

<summary>search_user</summary>

**What it does:** Searches the Symphony directory for people, bots and distribution lists. Returns the matching profiles, including each numeric user ID.

**Parameters (all optional)**

* `query`: text matched against first name, last name, display name and email. Partial matches work.
* `company`, `location`, `title`: filters, for example "London" or "FX Trader".
* `marketCoverage`: filter by market area, for example EMEA, APAC or Americas.
* `responsibility`: filter by desk or function.
* `local`: if true, only people in your own organisation.
* `accountTypes`: NORMAL (people), SYSTEM (bots) or SDL (distribution lists).

**Limits and notes**

* Built for discovery. If you already have an exact email or ID, `lookup_user` is faster.
* Common names return several people; check company, title or email before acting.
* External contacts appear only if directory sharing is enabled and they have not opted out.
* Set `accountTypes` to NORMAL to get people only.

**Example prompts**

* "Find \[PERSON] in the Symphony directory."
* "Find \[PERSON], an \[TITLE] in \[CITY] at \[COMPANY]."

</details>

<details>

<summary>lookup_user</summary>

**What it does:** Returns profile details for users you already identify exactly: display name, user ID, email, company and account status.

**Parameters**

* `userEmails` (optional): a list of exact email addresses.
* `userIdentifiers` (optional): a list of numeric user IDs.
* `active` (optional): limit to active accounts.
* `local` (optional): limit to your own organisation.

**Limits and notes**

* Give emails or IDs, never both in one call.
* Up to 100 per call; split larger lists.
* Exact matches only: no partial text, wildcards or typos.
* If `local` is true, external users are excluded.
* Well suited to turning a list of emails into IDs, for example to add people to a room.

**Example prompts**

* "Look up the user with email \[EMAIL]."
* "Look up \[EMAIL] and \[EMAIL], active accounts only."

</details>

<details>

<summary>who_am_i</summary>

**What it does:** Returns your own profile: name, numeric user ID, email, title, department, company, location and account type.

**Parameters:** none.

**Limits and notes**

* Read-only.
* Shows your identity as configured in your organisation's directory.
* Useful when another tool needs your own user ID.

**Example prompts**

* "Show my Symphony profile details."
* "What is my email address and user ID?"

</details>

<details>

<summary>see_user_presence</summary>

**What it does:** Shows another user's current status: available, busy, in a meeting, be right back, out of office or offline.

**Parameters**

* `userIdentifier` (required): the user's numeric Symphony ID.
* `externalUser` (optional): true if the user is at another organisation. Default false.

**Limits and notes**

* Needs the numeric ID; `search_user` or `lookup_user` finds it from a name or email.
* For someone at another organisation, mark them as external.
* External users need an established connection between the two organisations. Without one they may appear offline.
* The status is a snapshot at the moment of the call.

**Example prompts**

* "Is \[PERSON] available right now?"
* "Is \[PERSON] at \[EXTERNAL\_COMPANY] online?"

</details>

<details>

<summary>change_my_presence</summary>

**What it does:** Sets your own presence status and returns the status that was applied.

**Parameters**

* `presenceStatus` (required): one of AVAILABLE, BUSY, BE\_RIGHT\_BACK, IN\_A\_MEETING, OUT\_OF\_OFFICE.

**Limits and notes**

* Changes your own status only, not anyone else's.
* Only these five values are accepted; free text such as "lunch" is not.
* Calendar sync or inactivity timers may change the status again later.

**Example prompts**

* "Set my status to be right back."
* "Set my status to in a meeting."

</details>

### 6. Financial instruments <a href="#id-6-financial-instruments" id="id-6-financial-instruments"></a>

Find a financial instrument by ticker or name, then get its full reference details. Search first: the details tool needs the identifier that search returns.

<details>

<summary>search_financial_instruments</summary>

**What it does:** Finds financial instruments, such as equities, bonds, indices, FX pairs and ETFs, by ticker, company name or standard identifier. Returns summary details and each match's instrument identifier.

**Parameters**

* `query` (required): a ticker such as AAPL, or a company name.

**Limits and notes**

* The first step before `get_financial_instrument_details`.
* A name or ticker can match listings on several exchanges. Check the exchange and security type.
* Not case sensitive.

**Example prompts**

* "Search for the financial instrument \[TICKER]."
* "Find the instrument for \[COMPANY]."

</details>

<details>

<summary>get_financial_instrument_details</summary>

**What it does:** Returns full reference details of one instrument, such as asset class, exchange, currency, issuer and market identifiers.

**Parameters**

* `financialInstrumentIdentifier` (required): the instrument's identifier from `search_financial_instruments`.

**Limits and notes**

* Cannot be called with a plain ticker or company name; run `search_financial_instruments` first.
* The depth of data depends on your organisation's market data licences.

**Example prompts**

* "Search for \[COMPANY] and show me its full instrument details."

</details>
