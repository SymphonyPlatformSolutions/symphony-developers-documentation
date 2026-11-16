---
description: >-
  Discover the latest AI capabilities and improvements in Symphony Messaging,
  including semantic search, MCP Server enhancements, and new AI Studio
  features.
cover:
  light: ../.gitbook/assets/ai-october-banner (1).png
  dark: ../.gitbook/assets/ai-studio-october-banner.png
coverY: 0
layout:
  width: default
  cover:
    visible: true
    size: full
    mask: none
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
  anchors:
    visible: true
---

# What's New in AI

### October 2026

#### Semantic search API

`API`

Find the messages you need by meaning, not just by keyword. Send a natural-language query to the semantic search API and get back the most relevant messages, even when they use different words than your query.

Apps can search on behalf of a user, using the app's permissions, so people only find what they're allowed to see.

Use it to build assistants that answer questions from conversation history, summarize what was said about a topic, or surface related discussions.

* Semantic search API

#### Semantic search on MCP

`MCP`

AI agents and other MCP clients connected to the Symphony MCP server can now search messages by meaning. Narrow the results with filters:

* **Room:** visibility, workspace, folder, unread, members and dates.
* **Message:** author, hashtag, cashtag, mention and blast.

This lets your agents find the right conversations without needing the exact words.

* MCP server tools

#### MCP support for blast

`MCP`

Reach several rooms or chats at once from your AI agents. With blast support in the Symphony MCP server, an agent can send one message to multiple streams in a single request.

* MCP server tools

#### OAuth for MCP servers

`Studio` `MCP`

Connect your agents to MCP servers that use OAuth, as well as API keys. Choose the sign-in method when you add the connection in the Connection Vault.

OAuth supports two ways of registering the connection:

* **Manual registration:** Enter the client ID and secret for your MCP server. Symphony enforces PKCE for added security.
* **Dynamic registration:** Symphony discovers the endpoints automatically, so there is less to configure.

This lets your agents use MCP servers that require OAuth, without sharing long-lived keys.

* MCP server connectors

#### Bring your own model

`Studio`

Use the language model that fits your organization. With bring your own model, you connect a model you manage yourself and use it for the agents you build in AI Studio.

* Choose the model that suits each agent.
* Keep control of the model you use and how it's managed.
* Build agents on your own model without changing how you build them in AI Studio.
* Configure an external LLM

#### Ask user question tool

`Studio`

Let your agents ask questions during a task. With the ask user question tool, an agent can pause, ask the user a question and continue once it receives an answer.

Use it when an agent needs to:

* Confirm a choice before it acts.
* Collect missing information.
* Let the user decide between options.

This makes agents more interactive and helps them complete tasks with the right input.
