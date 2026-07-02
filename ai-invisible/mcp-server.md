---
description: >-
  Automate Symphony tasks, notify teammates, and use Symphony chat as context in
  Claude, ChatGPT, and other MCP-compatible AI agents.
---

# MCP Server

Symphony's MCP server connects Symphony Messaging to MCP-compatible AI clients.

It lets you automate tasks and notify teammates directly from an AI assistant.

It also lets you use Symphony conversations as context for prompts in Claude, ChatGPT, Mistral, and other MCP-compatible AI agents.

It gives AI clients a standard way to discover tools, inspect inputs, and run actions in Symphony. This reduces custom integration work and makes tool-driven workflows easier to build, test, and govern.

### Why use Symphony's MCP server

Symphony's MCP server is built on Symphony applications and on-behalf-of permissions.

It follows the same security model as authenticated apps in Symphony. For background, see [Planning Your App](../ext-apps/planning-your-app.md), [App Authentication](../ext-apps/app-authentication/), and [OBO Authentication](../ext-apps/app-authentication/obo-authentication.md).

Each user gets a dedicated on-behalf-of session when they use the server.

This gives you strong control and traceability:

* users never access more data than they can already access in Symphony
* room membership, history sharing, and information barriers are enforced by default
* actions such as room creation or message sending are recorded in audit trail and content export as actions performed by the MCP server on behalf of the user

This keeps the assistant aligned with Symphony's existing permission boundaries.

Admins also get an extra control layer through application permissions.

They can use app permissions as an overlay to restrict which MCP actions are available. For example, they can allow read-only workflows and block authoring actions such as sending messages or creating rooms.

### Installation

Symphony's MCP server must be enabled before you can use it.

{% hint style="warning" %}
Symphony's MCP server is an add-on to Symphony Services. It is subject to additional charges.

Contact Symphony's support team at [sales@symphony.com](mailto:sales@symphony.com) to enable the service in your environment before you start using it.
{% endhint %}

Once the service is enabled, you can connect it to any MCP-compatible AI client.

This includes Claude, ChatGPT, Mistral, and other AI agents that support MCP protocol.

### Connect with Symphony's MCP

Symphony is a remote MCP server. You do not need to deploy anything to start using it. The MCP server is exposed through your tenant specific URL like `https://xxx.symphony.com/mcp-server/mcp`. You only need to connect your MCP client, complete the authorization flow, and start prompting.

A dedicated setup guide for each MCP client is coming soon. For your first setup, contact Symphony's support team if you need help.

### Tool reference

#### `add_user_to_room`

Adds a new member to an existing room.

#### `create_im`

Creates a new instant message conversation with a user.

If an IM already exists between the caller and that user, the tool returns the existing conversation.

#### `create_room_with_user`

Creates a new Symphony room and adds a user to it.

#### `download_attachment`

Downloads an attachment from a conversation.

It returns the file content as base64.

#### `list_allowed_file_types`

Lists the file types allowed for attachments.

#### `list_attachments`

Lists attachments in a conversation.

#### `list_messages`

Returns messages and message metadata for a conversation.

By default, it retrieves one day of history. The maximum period is seven days.

#### `room_search`

Searches for rooms that match a query or topic.

#### `search_user`

Searches the Symphony directory for users.

Use this tool when you need to find people, bots, or distribution lists.

#### `send_message`

Sends a message to a conversation identified by its stream.

If the message is sent successfully, the response includes message metadata such as its identifier and timestamp.

#### `who_am_i`

Returns the identity of the current user.

This includes details such as full name, email address, and title.
