# MCP Server Connectors (API Key & OAuth)

## Overview

An MCP server gives an AI agent extra tools, such as searching a knowledge base or creating Jira tickets. Before an agent can use those tools, Symphony needs to know the server’s address and how to sign in to it. You store both once as a **connector** in Connection Vault, then attach the connector to an agent.

Setup has two parts:

* **Admin, once:** A user with the **Connector Manager** role must log in to the Admin Portal to create the connector, attach it to an agent, and verify it (steps 1 to 4).
* **Each user, OAuth only:** Connect their own account (step 5).

{% stepper %}
{% step %}
### Choose an authentication method

Check the MCP server provider’s documentation to see how it expects clients to sign in, then pick the matching row.

|                        | API key                                                                                        | OAuth                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Who makes the call** | Symphony, using one shared service identity. Everyone who uses the agent gets the same access. | Symphony, on behalf of the signed-in user. The call inherits that user’s permissions in the provider. |
| **Choose it when**     | The tools should behave the same for everyone and the provider offers a service token.         | The tools should respect each person’s own access, such as only the projects they can see.            |
| **Setup**              | A secret and an `authorization` property                                                       | Manual or Dynamic (DCR) registration                                                                  |

#### **API Key vs OAuth**

An API key is the simplest option, but it is a long-lived secret you have to store and rotate. OAuth lets access be granted through the provider’s sign-in flow instead and it can issue short-lived tokens that refresh automatically.

#### **Manual vs Dynamic**

Both are OAuth, so the sign-in flow is the same. The difference is how Symphony gets its client credentials. With Manual, you register the app and enter the credentials. With Dynamic, Symphony does the registration. If the provider supports it, Dynamic is less setup.

OAuth 2.1 is used, so [PKCE (S256)](https://datatracker.ietf.org/doc/html/rfc7636) is always enforced. You don’t need to configure it.
{% endstep %}

{% step %}
### Create the connector

1. Log in to the Symphony Messaging Admin Portal as a **Connector Manager**.
2. Go to **Company Settings** > **Connection Vault**.
3. Select **New Connector** and complete the following fields:

| Field             | Value                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name              | Enter a unique connector name.                                                                                                                                                                                                                                                                                                                                                            |
| Type              | Select `MCP Server`.                                                                                                                                                                                                                                                                                                                                                                      |
| Sub-type          | Select `MCP (custom)`.                                                                                                                                                                                                                                                                                                                                                                    |
| Authentication    | <p>Select the authentication method required by your MCP server:  <code>API Key</code> or <code>OAuth</code>, see <a href="./#id-1.-choose-an-authentication-method">step 1</a> above. </p><div data-gb-custom-block data-tag="hint" data-style="warning" class="hint hint-warning"><p><strong>This selection is configured once, at the moment of connector creation.</strong></p></div> |
| Readers (by role) | Select `AI Agent`.                                                                                                                                                                                                                                                                                                                                                                        |
| Base URL          | Enter the MCP server endpoint.                                                                                                                                                                                                                                                                                                                                                            |

#### **Custom properties**

**Properties** are key/value pairs that control how Symphony authenticates. Add only the ones your setup needs.

| Property        | Used with      | What it does                                                            | Value                                 |
| --------------- | -------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| `authorization` | API Key        | The prefix Symphony puts before your secret in the Authorization header | See _Values for authorization_ below. |
| `oauthType`     | OAuth          | Selects Dynamic registration                                            | `DCR`                                 |
| `icon`          | Any (optional) | An icon URL shown for the connector in AI Studio                        | A full image URL                      |

**Values for `authorization`**

The `authorization` property sets the authentication scheme, which is the word that comes before your secret in the `Authorization` header. Symphony supports any value, so you can match whatever format your provider requires. The usual values are:

* `Bearer`: for API tokens. This is the most common.
* `Basic`: for a Base64-encoded `username:password` or `email:api_token` pair.
* Custom: any other value your provider requires.

<figure><img src="../../.gitbook/assets/image (102).png" alt="" width="563"><figcaption></figcaption></figure>

<details>

<summary><strong>Option A: API Key</strong></summary>

1. Set **Authentication** to **API Key**.
2. Enter the key or token in the **Secret** field.
3. Add the `authorization` property with the value your provider requires (see the table above).
4. Optional: add an `icon` property.

For Atlassian Basic authentication, Base64-encode `email:api_token` first, then enter the result as the secret.

<figure><img src="../../.gitbook/assets/image (112).png" alt="" width="563"><figcaption></figcaption></figure>

</details>

<details>

<summary><strong>Option B: OAuth, Manual</strong></summary>

Use this when the provider gave you a Client ID and Client Secret.

1. Set **Authentication** to **OAuth** and the registration mode to **Manual**.
2. Enter the **Client ID** and **Client Secret**.
3.  **Register the Symphony callback URI** in the provider's application or OAuth client configuration:

    `https://<YOUR_SYMPHONY_DOMAIN>/ai/studio/api/v1/oauth/callback`

    The provider must use this URI as the redirect URI for the OAuth application.
4. Enter the **Authorization URL** and **Access Token URL**, or use endpoint discovery if the provider supports it.
5. Enter the required **scopes**.

</details>

<details>

<summary><strong>Option C: OAuth, Dynamic (DCR)</strong></summary>

Use this when the provider supports Dynamic Client Registration.

1. Set **Authentication** to **OAuth** and the registration mode to **Dynamic**.
2. Add the `oauthType` property with the value `DCR`.
3. Enter the MCP server **Base URL**.
4. Add any provider-specific properties.

<figure><img src="../../.gitbook/assets/image (111).png" alt="" width="563"><figcaption></figcaption></figure>

</details>
{% endstep %}

{% step %}
### Attach the MCP Server to an agent

1. Open the agent in **AI Agent Studio**.

<figure><img src="../../.gitbook/assets/image (101).png" alt=""><figcaption></figcaption></figure>

2. Go to **MCP Server** > **Add MCP Server**.
3. Select the MCP Servers you want.
4. Save the agent.
{% endstep %}

{% step %}
### Verify the connection

How you verify the connection depends on the authentication type. Either way, a **Connector Manager** configures the connector in **Admin Portal** > **Connection Vault**. What happens next differs.

|                   | **API key**                                    | **OAuth (Manual and Dynamic)**                                                                                          |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Configured by** | A Connector Manager, in Connection Vault       | A Connector Manager, in Connection Vault                                                                                |
| **Who connects**  | No one. The connector is global and read-only. | Each user connects their own account.                                                                                   |
| **Where**         | Nothing to do                                  | In Symphony, open the agent's application window (titled “**Agent Configuration**”), then go to the Authentication tab. |

Confirm the connection for your type:

* **API Key connectors:** Check that the connector shows as connected.

<figure><img src="../../.gitbook/assets/image (119).png" alt="" width="563"><figcaption></figcaption></figure>

* **All OAuth connectors:** Connect in **Agent Configuration** > **Application**.

<figure><img src="../../.gitbook/assets/image (115).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (116).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (117).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (118).png" alt="" width="563"><figcaption></figcaption></figure>

* Check that the expected MCP tools are available.
* Verify the Authorization header format for API Key connectors.

{% hint style="info" %}
A new connector may take up to 5 minutes to appear in AI Studio. Configuration updates may take up to 10 minutes to take effect.
{% endhint %}
{% endstep %}

{% step %}
### Troubleshooting

| Issue                     | What to check                                      |
| ------------------------- | -------------------------------------------------- |
| Connector not visible     | Reader permissions and configuration delay         |
| `401 Unauthorized`        | Secret, authorization format, or OAuth credentials |
| `403 Forbidden`           | Token permissions and scopes                       |
| No tools available        | Base URL, endpoint path and server availability    |
| OAuth authorization fails | Client registration, redirect domain and scopes    |


{% endstep %}
{% endstepper %}

