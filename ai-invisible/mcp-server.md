---
description: >-
  Automate Symphony Messaging tasks, notify teammates, and use Symphony
  Messaging chat as context in Claude, Gemini or any other MCP client.
---

# MCP Server

### Overview and capabilities

Symphony's MCP server connects Symphony Messaging to MCP-compatible AI clients.

You can automate tasks and notify teammates directly from an AI assistant or use Symphony Messaging conversations as context for prompts in Claude, Gemini or any other MCP client.

It gives AI clients a standard way to discover tools, inspect inputs, and run actions in Symphony Messaging, reducing custom integration work and making tool-driven workflows easier to build, test, and govern.

### Security, premissions and data governance

Symphony's MCP server is built on Symphony applications and on-behalf-of (OBO) permissions.

It follows the same security model as authenticated apps in Symphony Messaging. For context, see [Planning Your App](../ext-apps/planning-your-app.md), [App Authentication](../ext-apps/app-authentication/), and [OBO Authentication](../ext-apps/app-authentication/obo-authentication.md).

Each user gets a dedicated OBO session when they use the server.

This gives organizations strong control and traceability:

* Users never access more data than they can already access in Symphony Messaging.
* Room membership, history sharing, and information barriers are enforced by default.
* Actions such as room creation or message sending are recorded in audit trail and content export as actions performed by the MCP server on behalf of the user.

This ensures the assistant remains aligned with existing permission boundaries within Symphony Messaging, and provides Admins with an extra control layer through application permissions.

Admins can use app permissions as an overlay to restrict which MCP actions are available. For example, they can allow read-only workflows and block authoring actions such as sending messages or creating rooms.

### Service activation

Symphony's MCP server must be enabled before you can use it.

{% hint style="warning" %}
Symphony's MCP server is an add-on to Symphony Services. It is subject to additional charges.

Contact the [Symphony team](https://symphony.com/contact/) to enable the service in your environment before you can start using it.
{% endhint %}

Once the service is enabled, you can connect MCP server to any MCP-compatible AI client, including Claude, ChatGPT, Mistral, and other AI agents that support MCP protocol.

### Connect with Symphony's MCP

Symphony's MCP server is a remote server that you can start using immediately with zero deployment required. Connect your MCP client, complete the authorization flow, and start prompting.

The MCP server is exposed through your tenant-specific URL, for example _`https://xxx.symphony.com/mcp-server/mcp`_.&#x20;

A dedicated setup guide will soon be available for each MCP client. Don't hesitate to contact the Symphony's support team at _support@symphony.com_ if you need help for your first setup.

### Tool reference

#### `add_user_to_room`

Adds a new member to an existing room.

#### `create_im`

Creates a new 1:1 chat with a user.

If a 1:1 chat already exists between the caller and the user, the tool returns the existing conversation.

#### `create_room_with_user`

Creates a new room and adds the user to it.

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
