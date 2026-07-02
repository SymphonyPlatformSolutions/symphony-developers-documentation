---
description: >-
  Specialized service accounts that bring LLM-powered reasoning, contextual data
  access, and tool use into Symphony's secure messaging environment.
---

# AI Agent

## AI agents

AI agents are specialized service accounts that bring LLM-powered reasoning into Symphony. They can answer questions, use Symphony chat context, and take actions on behalf of a user within the platform's security model.

AI agents work in regular rooms and in a dedicated private channel called the **AI Agent stream**.

### Types of AI agents

Symphony supports several AI agent models:

* **Built-in agent** — Symphony's built-in assistant for messaging tasks such as summaries and catch-ups.
* **Custom agents** — Agents tailored to your users, tools, and workflows. You can create them in [AI agent studio](ai-agent-studio.md) or build them with [Symphony APIs](develop-custom-ai-agent.md).
* **Community agents** — Agents published by Symphony partners or the wider Symphony ecosystem.

### How AI agents differ from bots

AI agents extend the standard bot model with user-scoped context and AI-specific behaviors.

They can:

* reason over prompts and conversation context
* use tools and workflows on behalf of a user
* stream responses as they are generated
* expose predefined prompts for repeatable tasks

### Interaction modes

AI agents support different interaction patterns depending on the task.

#### AI Agent stream

An **AI Agent stream** is a private, encrypted 1:1 conversation between a user and an AI agent. No other user can join.

Use this stream when the agent needs a private working space, personal context, or a persistent session with the user.

Because the stream is private, the agent can safely return user-specific results and perform user-specific actions there.

#### Side panel

The side panel lets a user chat with an AI agent while keeping the current conversation in view. The parent chat is passed as context to the agent.

This is useful for:

* summarizing a room
* drafting a reply from current context
* triggering workflows based on the active conversation

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-22 at 10.40.00.png" alt="AI agent side panel"><figcaption><p>The side panel keeps the current conversation in context while the user chats privately with the agent.</p></figcaption></figure>

### Context awareness

AI agents can use a user's chat context to produce grounded, source-aware answers without joining the room itself.

This allows the agent to help in internal rooms, external rooms, and direct messages while keeping the interaction private to the requesting user.

Symphony chat context can be passed to the agent in two main ways:

* implicitly through the side panel
* explicitly through prompt message injection functions

{% hint style="warning" %}
AI agents use **on-behalf-of APIs**. An agent can never access more data than the requesting user can access. Room memberships, information barriers, and sharing restrictions are enforced by design.
{% endhint %}

### Core capabilities

#### Predefined prompts

AI agents can expose predefined prompts for common tasks. These prompts give users a fast way to run proven instructions without writing them from scratch.

Use predefined prompts to:

* inject additional context into a request
* standardize complex workflows
* guide tool use across multiple steps

#### Streaming

AI agents can stream responses as they are generated. This reduces time to first output and improves the user experience for longer answers. Each update still passes through Symphony compliance controls before it is shown to the user.

#### Thinking

AI agents can return their reasoning trace in the conversation when that experience is enabled.

This helps:

* users understand why the agent responded a certain way
* designers inspect tool calls and parameters
* teams improve prompts and edge-case handling

#### Per-user enablement

An AI agent combines two Symphony assets:

* a **bot** identity, which represents the service account
* an **app**, which controls the actions the agent can perform on behalf of a user

To message an AI agent or create a new AI Agent stream, the linked app must be installed for that user. This gives administrators fine-grained deployment control. They can enable specific agents only for users who need them.

### Common use cases

AI agents are useful for tasks such as:

* summarizing long discussions and catch-ups
* drafting responses from the current chat context
* running guided workflows with tool calls and user context

### Create your first AI agent

{% hint style="warning" %}
AI Agent is an add-on to Symphony Services and may require additional licensing.

Contact [sales@symphony.com](mailto:sales@symphony.com) to enable it in your environment before you begin.
{% endhint %}

Choose the path that fits your team:

* [AI agent studio](ai-agent-studio.md) — the fastest no-code path to create, configure, and manage agents.
* [Develop custom AI Agent](develop-custom-ai-agent.md) — an API-first path for teams building custom agent logic and integrations.
