---
description: >-
  Specialized service accounts that bring LLM-powered reasoning, contextual  
  data access, and tool use into Symphony's secure messaging environment.
---

# AI Agent

## Symphony's AI agent

An **AI agent** is a specialized service account designed to expose AI-powered applications to end users. Unlike a standard bot, an AI agent is often backed by a Large Language Model (LLM) and can reason, access contextual data, and take actions on behalf of the user — all within the boundaries of the platform's security model.

Within Symphony, AI agents can be accessed not only in regular internal and external rooms, but also on a specific secure channel: the **AI Agent stream**.

## Type of agents <a href="#types-of-ai-agents" id="types-of-ai-agents"></a>

Many different kinds of AI agents can be created accessed via Symphony:

* **Built-in agent** — Symphony's built-in agent that can help any user with daily messaging activities such as summaries and catchups.
* **Your agents** — Agents customized to your users' needs with access to your tools. They can be created and managed seamlessly through Symphony's AI Agent Studio, or built using Symphony's APIs.
* **Community agents** — Agents built by Symphony partners or the Symphony community, discoverable via Symphony's directory.

## Capabilities

Unlike regular bots, AI agents benefit from capabilities that allows to provide&#x20;

### AI Agent stream

In addition to standard rooms, an AI agent can interact with users in a dedicated **AI Agent stream** — a strictly private, encrypted space between the user and the AI agent. No other user can join, enforcing confidentiality. The stream can also act as a **user persistent session context**, allowing the agent and users to maintain conversation history.

Because the AI Agent stream is strictly a 1-1 room between the user and the agent, the AI can safely use it to disclose user-specific information or perform actions on behalf of the user, as only the user themselves has visibility into the conversation.

### Agent side pannel

Agent side pannel allows to open a chat with an AI agent while implicitely gives to the AI agent as context the parent chat. This gives the user the possibility to prompt the AI agent and trigger workflows, summaries, recap based on what's being discussed in the parent conversation.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-22 at 10.40.00.png" alt=""><figcaption></figcaption></figure>

### User's chat context awareness

One of the most powerful features of Symphony AI agents is their ability to access a user's conversation history to provide grounded, source-traceable answers without participating to the room itself. AI Agents can help users in their external, ims conversations without participating to the conversation.

{% hint style="warning" %}
AI Agents are using **on-behalf-of APIs** ensuring that access to user data is **strictly bounded**: an agent can never access more data than the user themselves can see. Room memberships, information barriers, and sharing restrictions are all enforced by design.
{% endhint %}

Symphony chat context can be injected directly in user prompts via multiple ways:

* Implicetely via AI side pannel
* In the AI agent prompts via message injection functions&#x20;

### Predefined prompts

AI agents can expose to users predefined prompts. This gives to users an easy way to trigger sophisticated prompts that were defined and battle tested by others to accomplish a given goal.

Those predefined prompts can be used in many different ways, for example injecting on-the-fly extra context to a user query, or trigger a repeatable workflow composed of multiple tasks / tools to call that the AI agent has to follow.

### Streaming

To streamline the user experience, AI agents are able to send a specific type of message update allowing to stream the LLM answer, and not wait for the last token generated to start answering the user. This gives both the gurantee that every update goes though all compliance checks, and that the user is not waiting too much on a blank screen before receiving answer to his query.

### Thinking

AI Agent can also send back their thinking process in the room. Surfacing and capturing the thinking can help users and agent designers to understand why an AI agent took certain actions, what was the AI agent reasonning and which tools were called with which parameters.&#x20;

When managing AI agents, this information helps the agent designer to better manage edge cases by customizing prompts or tools being used.

### Per user enablement

AI Agents are a combination of two different Symphony's assets:

* The **bot** part, representing the AI agent's identity with service account
* The **apps** part, represented by an app linked to the previous service account that also controls which actions the AI agents will be able to do on-behalf-of the user

One communication control unique to AI agent and AI agent streams is that for a user to be able to send a message, or create a new AI agent stream the AI agent apps must be installed for the requesting user. This control gives the ability to admin teams to adopt a very fine grained deployment strategy where specific AI agents with access to specific tools, are only deployed to the user who needs it.

## Create my first AI agents

{% hint style="warning" %}
Symphony's AI Agent is an add-on to Symphony Services. It is subject to additional charges.

Contact Symphony's support team at [sales@symphony.com](mailto:sales@symphony.com) to enable the service in your environment before you start using it.
{% endhint %}

You can create first AI agent via two different ways:

* [ai-agent-studio.md](ai-agent-studio.md "mention") is the fastest path to create your first agent. It offers a no-code solution to create and customize multiple agents, configure their prompts, access your tools & apis and either use Symphony's provided AI model or connect to yours.
* [develop-custom-ai-agent.md](develop-custom-ai-agent.md "mention") offers a code first approach to develop AI agents leveraging Symphony's API.







