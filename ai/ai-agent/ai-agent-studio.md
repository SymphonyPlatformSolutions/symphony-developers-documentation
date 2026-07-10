# AI agent studio

This page describes how to create your first agent using the AI agent studio. Before you begin, the following prerequisites must be met:

1. Symphony has enabled AI Agent Studio for your tenant.
2. Your admin has installed AI Agent Studio for your user.

## Create a new AI agent

To start creating your own AI agent, click the **Create agent** button in AI Agent Studio.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 15.14.35.png" alt=""><figcaption></figcaption></figure>

## Essential information

Essential information configures the AI agent's identity in Symphony. In particular:

* **Name:** How the agent appears in Symphony's directory.
* **Ownership:** The users who are entitled to modify this agent.
* **Visibility:** Whether the agent appears in Symphony's marketplace, so that users can install it autonomously.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.19.32.png" alt="" width="375"><figcaption></figcaption></figure>

## AI models

* **Models:** Configures which model runs behind the scenes. Off the shelf, Symphony provides access to Google Gemini's supported models.
* **Creativity level:** Controls the level of randomness in the AI agent's answers (maps to the underlying model's temperature / top-p settings).
* **Thinking:** Allows the AI agent to reason step by step, and include that reasoning in its answer.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.21.20.png" alt="" width="375"><figcaption></figcaption></figure>

**Coming soon:** Connect AI agents from Agent Studio to your own AI provider or self-hosted models.

## System instructions

System instructions guide how the AI agent answers, and provide up-to-date, contextual information that always holds true when an agent is interacting with a user.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.28.24.png" alt="" width="375"><figcaption></figcaption></figure>

The following variables are supported in system instructions, giving the agent personalization context about who it's talking to and where the request came from:

<table><thead><tr><th width="171.51953125">Variable</th><th>Syntax</th><th>Resolves to</th></tr></thead><tbody><tr><td>User display name</td><td><code>#{ #tools.v1.vars.userDisplayName() }</code></td><td>Display name of the user talking to the agent</td></tr><tr><td>User email</td><td><code>#{ #tools.v1.vars.userEmail() }</code></td><td>Email of the user talking to the agent</td></tr><tr><td>User ID</td><td><code>#{ #tools.v1.vars.userId() }</code></td><td>Symphony user ID of the user talking to the agent</td></tr><tr><td>First name / Last name</td><td><code>#{ #tools.v1.vars.userFirstName() }</code> / <code>#{ #tools.v1.vars.userLastName() }</code></td><td>First/last name of the user</td></tr><tr><td>Room ID</td><td><code>#{ #tools.v1.vars.roomId() }</code></td><td>ID of the room the request came from</td></tr><tr><td>Room name</td><td><code>#{ #tools.v1.vars.roomName() }</code></td><td>Name of the room the request came from</td></tr><tr><td>Context room IDs</td><td><code>#{ #tools.v1.vars.contextRoomIds() }</code></td><td>Room IDs the user passed as context to the query</td></tr><tr><td>Context room IDs</td><td><code>#{ #tools.v1.vars.contextRoomIds().size() > 0 ? #tools.v1.vars.contextRoomIds()[0] : 'No Context Room' }</code></td><td>Parent chat when AI agent is opened from a side panel</td></tr><tr><td>Current timestamp</td><td><code>#{ #tools.v1.vars.currentTimestamp() }</code></td><td>Timestamp of the request</td></tr></tbody></table>

### Example&#x20;

Here's an example system prompt for an AI agent:

{% code overflow="wrap" %}
```md
## Identity

You are **Sample agent**, a sample agent.

---

## Current User

You are speaking with:
- **Name:** #{ #tools.v1.vars.userDisplayName() }
- **Email:** #{ #tools.v1.vars.userEmail() }
- **User ID:** #{ #tools.v1.vars.userId() }

Refer to this user in the second person ("you"). Do not repeat their name or ID back unless directly relevant.

---

## Current Context

- **Stream ID:** #{ #tools.v1.vars.roomId() }
- **Timestamp:** #{ #tools.v1.vars.currentTimestamp() }

Use the stream ID when taking actions that require a target room or conversation. Use the timestamp to ground any time-sensitive reasoning (e.g. "this morning", "yesterday").

---

## Conversation Context

You may receive additional context from other Symphony conversations the user is involved in. Treat this as background information — use it to give more relevant and informed responses.

Context room Ids : #{ #tools.v1.vars.contextRoomIds() }
```
{% endcode %}

## Permissions

Permissions control which actions the AI agent can take on behalf of the user. See  [API Endpoints for Apps](https://app.gitbook.com/s/909t04Fk8FiEI7fBcmlw/main/apps-on-behalf-of-obo/obo-enabled-endpoints "mention")  for the full list of available permissions.

{% hint style="info" %}
To allow an AI agent to work with a user's specific chat context it must be granted with at least the following permissions:

* Act as user
* Get user messages
* Get Basic User Info
* Get Extended User Info&#x20;
{% endhint %}

## Symphony tools

Agent Studio supports several tools out of the box that augment your AI agents with more sophisticated capabilities.

### TradingView

Lets an AI agent natively send a TradingView graph as an inline message in Symphony Messaging. The agent looks for a valid TradingView ticker based on the user's query and returns the appropriate graph. Supported graph types:

1. [Advanced Real-Time Chart Widget](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/)
2. [Symbol Overview Widget](https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/)
3. [Mini Chart Widget](https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/)
4. [Market Overview Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%255D%257D)
5. [Market Summary Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%255D%257D)
6. [Stock Market Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%255D%257D)

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 14.32.28.png" alt=""><figcaption></figcaption></figure>

### Charting

The Symphony charting tool lets the AI agent send charts directly in a Symphony Messaging chat room. Supported chart types:

* Bar chart
* Line chart
* Multi-line chart
* Pie chart
* Bubble chart

This tool is especially useful for rendering financial data in combination with custom data sources integrated via custom MCP servers.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 17.11.13.png" alt=""><figcaption></figcaption></figure>

### Webfetch & Websearch

Standard tools that let the AI agent fetch information from the web.

### Messaging (coming soon)&#x20;

Lets the AI agent use Symphony's MCP server to retrieve Symphony-specific information, send messages, or create chat rooms.

{% hint style="info" %}
All actions performed via this tool are done by the AI agent on behalf of the user, inheriting the permissions set for the agent.
{% endhint %}

## MCP servers

You can add and configure additional MCP servers for use by a given agent. AI Studio currently supports **remote MCP servers authenticated via non-personal API key tokens only** (OAuth and personal-token authentication are not yet supported).

### Add a non personal MCP server

First, a tenant administrator with the **Connector manager** role must create a new connection in the Symphony Messaging Admin Portal.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.30.36.png" alt=""><figcaption></figcaption></figure>

Create a new connector containing everything needed to connect to the remote MCP server via API key:

* **Type:** Must be set to MCP server; sub-type can be set to custom.
* **Readers (by role):** Set to "AI agent" if any AI agent should be able to use this MCP server.
* **Readers (by user):** Set to specific AI agents if only a subset of agents should have access.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.34.05.png" alt=""><figcaption></figcaption></figure>

Some key value properties can be added to customize the connector behavior.

<table><thead><tr><th width="98.4384765625">Key</th><th width="332.56640625">Description</th><th width="412.45703125">Value example</th></tr></thead><tbody><tr><td>icon</td><td>Icon used for the MCP server.</td><td><a href="https://www.svgrepo.com/show/261931/radar.svg">https://www.svgrepo.com/show/261931/radar.svg</a></td></tr></tbody></table>

Once created, MCP servers can be enabled per AI agent on the studio via the MCP server panel.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.44.07.png" alt=""><figcaption></figcaption></figure>

## Predefined prompts

Predefined prompts let agent designers create repeatable workflows that users can easily discover and trigger. Predefined prompts support variables, so users can pass inputs to the prompt; Symphony's system variables (see the table above) can also be used inside predefined prompts.

Predefined prompts can be combined with the Symphony Messaging chat context: when both a chat context and a predefined prompt are passed to the agent, both are resolved and sent to the AI model together.

Users access predefined prompts by mentioning the AI agent directly in the AI agent room:

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 15.52.09.png" alt="" width="375"><figcaption></figcaption></figure>

When a prompt template expects variables, Symphony Messaging automatically sends the user a form to fill in before processing starts.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 15.52.50.png" alt="" width="280"><figcaption></figcaption></figure>



### Example

This example creates an AI agent that adds two numbers.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-02 at 17.15.29.png" alt=""><figcaption></figcaption></figure>

Prompt template definition:

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-02 at 17.17.44.png" alt="" width="375"><figcaption></figcaption></figure>

Predefined prompt using the variables above:

{% code overflow="wrap" %}
```
Add the two numbers {a} and {B}, then send a message containing only the result in this exact format:
A + B = result
Example:
Input: A = 3, B = 7
Output: 3 + 7 = 10
```
{% endcode %}
