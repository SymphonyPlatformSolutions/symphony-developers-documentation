# AI agent studio

This page describes how to create your first agent using the AI agent studio. To be begin with, the following pre-requisites must have been completed:

1. Symphony enabled AI Agent studio for your tenant
2. Your admin installed the AI Agent studio for your user

## Create a new AI agent

You can start the creation of your own AI agent simply by clicking the Create agent button.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 15.14.35.png" alt=""><figcaption></figcaption></figure>

## Essential information

Essential information allows to configure the AI agent's identity in Symphony. In particular:

* **Name**: How it appears in Symphony's directory
* **Ownership:** Which users are entitled to modify this agent
* **Visibility:** If it appears or not in Symphony's market place, so that users can install the agent autonomously.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.19.32.png" alt="" width="375"><figcaption></figcaption></figure>

## AI models

**Models:** allows to configure which model is being used behind the scene by the AI agent. Off the shelf Symphony is providing access to Google Gemini's supported model.

**Creativity level:** Controls the level of randomness that will be used by the AI agent in his answes.

**Thinking:** Allow th AI agent to reason and output his reasonning in his answer

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.21.20.png" alt="" width="375"><figcaption></figcaption></figure>

_Coming soon: Connect AI Agents from Symphony's agent studio with your own AI provider, or self-hosted models._

## System instructions

System instructions are here to guide the AI agent's on how to answer and provide up-to-date and contextual information that are always true when an AI agent is interacting with a user.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 09.28.24.png" alt="" width="375"><figcaption></figcaption></figure>

Some variables are supported in the system instructions that allows to provide the best personalization capabilities so that the AI Agent knows with who the user is talking and what was the context of the user query:

* User Id, Display Name, Email, First Name and Last Name are resolved with the user information from the user discussing with an agent on an AI Agent stream.
* Room Id, Room Name are resolved with the room information from where the user request came from
* Context Room Ids is replaced with the room Ids that are passed by the user as context to the query.&#x20;

### Example&#x20;

Here an example of system prompt for a given AI agent.

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

Permissions allows to control which actions the AI agent will be able to handle on-behalf-of the user. You can refer to [API Endpoints for Apps](https://app.gitbook.com/s/909t04Fk8FiEI7fBcmlw/main/apps-on-behalf-of-obo/obo-enabled-endpoints "mention")  to list all existing permissions.

{% hint style="info" %}
To allow an AI agent to work with a user's specific chat context it must be granted with at least with the following permissions:

* Act as user
* Get user messages
* Get Basic User Info
* Get Extended User Info&#x20;
{% endhint %}

## Symphony tools

Agent Studio supports out of the box different tools that allows to augment your AI agents with more sophisticated capabilities.

### TradingView

Allows an AI agent to natively send tradingView graph as inline message in Symphony. It can look for valid Trading View ticker based on the user query and return the appropriate graph. The following types of graphs are supported:

1. [Advanced Real-Time Chart Widget](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/)
2. [Symbol Overview Widget](https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/)
3. [Mini Chart Widget](https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/)
4. [Market Overview Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%255D%257D)
5. [Market Summary Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%255D%257D)
6. [Stock Market Widget](https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/?options=%257B%2522symbolSectors%2522%253A%255B%257B%2522sectionName%2522%253A%2522Indices%2522%252C%2522symbols%2522%253A%255B%2522FOREXCOM%253ASPXUSD%2522%252C%2522FOREXCOM%253ANSXUSD%2522%252C%2522FOREXCOM%253ADJI%2522%252C%2522FOREXCOM%253AUKXGBP%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Stocks%2522%252C%2522symbols%2522%253A%255B%2522NASDAQ%253AAAPL%2522%252C%2522NASDAQ%253AADBE%2522%252C%2522NASDAQ%253ANVDA%2522%252C%2522NASDAQ%253ATSLA%2522%255D%257D%252C%257B%2522sectionName%2522%253A%2522Crypto%2522%252C%2522symbols%2522%253A%255B%2522BITSTAMP%253ABTCUSD%2522%252C%2522BITSTAMP%253AETHUSD%2522%252C%2522CRYPTO%253AXRPUSD%2522%255D%257D%255D%257D)

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 14.32.28.png" alt=""><figcaption></figcaption></figure>

### Charting

Symphony charting tool allows the AI agent to send a chart in a Symphony room. The following chart are supported:

* Bar chart
* Line chart
* Multi-line chart
* Pie chart
* Bubble chart

This tool is very convenient to render financial data in combination with any custom data sources that can be integrated via custom MCP servers.

<figure><img src="../../.gitbook/assets/Screenshot 2026-06-30 at 17.11.13.png" alt=""><figcaption></figcaption></figure>

### Webfetch & Websearch

Webfetch and websearch are standards tools allowing the AI agent to fetch information from the web.

### Messaging (coming soon)&#x20;

Symphony messaging tools allows the AI agent to leverage [mcp-server.md](../mcp-server.md "mention") to retrieve any Symphony's specific information, sends messages or create rooms.&#x20;

{% hint style="info" %}
All actions done via this tool, will be done by the AI agent on-behalf of the user inheriting from the permissions that are set for the AI agent.
{% endhint %}

## MCP servers

Additional MCP servers can be added to AI Studio and configured for use by a given agent. Currently, AI Studio only supports remote MCP servers authenticated via non-personal API key tokens.

### Add a non personal MCP server

First a tenant administrator granted with the **Connector manager** role will need to create a new connection in Symphony admin portal.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.30.36.png" alt=""><figcaption></figcaption></figure>

A new connector must be created that will contain all infomration required to connect to a remote MCP server via API key.

* **Type:** Must be set to MCP server, sub-type can be set as custom.
* **Readers (by role):** Set it to AI agent if you want any AI agent able to use this MCP server
* **Readers (by user):** Set it to some specific AI agents if you want only a subset of AI agents to be able to use this MCP server.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.34.05.png" alt=""><figcaption></figcaption></figure>

Some key value properties can be added to customize the connector behaviour.

<table><thead><tr><th width="98.4384765625">Key</th><th width="332.56640625">Description</th><th width="412.45703125">Value example</th></tr></thead><tbody><tr><td>icon</td><td>Icon used for the MCP server.</td><td><a href="https://www.svgrepo.com/show/261931/radar.svg">https://www.svgrepo.com/show/261931/radar.svg</a></td></tr></tbody></table>

Then, MCP servers can be enabled per AI agent on the studio via the MCP server pannel.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 10.44.07.png" alt=""><figcaption></figcaption></figure>

## Predefined prompts

Predefined prompts allows AI agent designer to easily create repeatable workflows that can be easily discovered and triggered by the AI agent user. Predefined prompts support variables so that users can pass a set of inputs to the prompt. Symphony's variables can be also used in predefined prompts.

Predefined prompt can be combined with Symphony's chat context. When a given chat context is passed to the AI agent and a predefined prompt, both are resolved and sent to the AI model.

This predefined prompt are accessible by the user directly mentionning the AI agent in the AI agent room:

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 15.52.09.png" alt="" width="375"><figcaption></figcaption></figure>

When the prompt template expect some variables, a Symphony form will be automatically sent back to the user before starting the processing.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-01 at 15.52.50.png" alt="" width="280"><figcaption></figcaption></figure>



### Example

In this example an AI agent will be created that is able to ask two numbers that must be sumed.

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-02 at 17.15.29.png" alt=""><figcaption></figcaption></figure>

To achieve this, the following prompt template can be defined:

<figure><img src="../../.gitbook/assets/Screenshot 2026-07-02 at 17.17.44.png" alt="" width="375"><figcaption></figcaption></figure>

and a predefined prompt instrumented with the previous variables. For example:

{% code overflow="wrap" %}
```
Add the two numbers {a} and {B}, then send a message containing only the result in this exact format:
A + B = result
Example:
Input: A = 3, B = 7
Output: 3 + 7 = 10
```
{% endcode %}



