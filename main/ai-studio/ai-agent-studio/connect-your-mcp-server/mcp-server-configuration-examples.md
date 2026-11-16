---
description: >-
  Provider-specific MCP configuration examples for Symphony Connection Vault,
  covering Atlassian, PagerDuty, Splunk Cloud, Google Workspace, GitHub and
  Symphony Internal MCP Server
---

# MCP server configuration examples

## Atlassian (Jira and Confluence / Rovo MCP)

Atlassian supports API Key authentication and OAuth user authentication through DCR.

**Compatibility:** The Rovo MCP connector requires Atlassian Cloud. Jira Data Center (on-premises) is not supported by this connector. Customers running Jira Data Center must use an alternative integration approach.

### **Option A: API Key / Basic Auth (shared connection)**

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** API Key / Personal Access Token
* **Base URL:** `https://mcp.atlassian.com/v1/mcp`
* **Properties:** `authorization: Basic`
* **Secret:** Base64-encoded string in the format `email:api_token`

### **Option B: OAuth 2.0 with DCR (user connection)**

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** OAuth
* **Client Registration Mode:** DYNAMIC
* **Base URL:** `https://mcp.atlassian.com/v1/mcp/authv2`
* **Scopes:** `read:me`, `read:content:confluence`, `read:page:confluence`, `read:issue:jira`, `write:issue:jira` and `offline_access`
*   **Allowed domains (Atlassian Organization Admin prerequisite):**

    Before users can connect to the Rovo MCP Server, an Atlassian Organization Admin must configure the allowed domains in Atlassian.

    In `admin.atlassian.com`, navigate to **Apps > Rovo MCP server** and add the Symphony domain:

    `https://<YOUR_SYMPHONY_DOMAIN>/**`

    For example:

    * Pod URL: `https://<company>.symphony.com/**`
    * Custom vanity domain: `https://<your-custom-domain>/**`

    Use the domain through which users access Symphony AI Studio. This configuration must be completed by the Atlassian Organization Admin before users can establish their OAuth connection.

## PagerDuty

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** OAuth
* **Application Type:** Classic User (three-legged user access), not Scoped OAuth
* **Base URL:** `https://mcp.pagerduty.com/mcp`

#### OAuth Configuration

PagerDuty supports OAuth endpoint discovery. When discovery is configured and working, the Authorization URL and Access Token URL do not need to be manually specified.

**Regional endpoints:** PagerDuty uses region-specific endpoints. European customer accounts must use the EU endpoints. Using the global US endpoints for European accounts may result in authentication failures.

* **EU endpoint:** `https://app.eu.pagerduty.com`
* **Global US endpoint:** `https://app.pagerduty.com`
* **Scopes:** Select the required scopes for incidents, services, users, or schedules. Do not include `openid`, as PagerDuty rejects it.
* **Callback URI:** `https://<YOUR_SYMPHONY_DOMAIN>/ai/studio/api/v1/oauth/callback`

## Splunk Cloud

Splunk Cloud MCP Server supports the OAuth 2.0 Authorization Code Flow with user authorization. The direct MCP endpoint is exposed through the Splunk management port (default `8089`) at `/services/mcp`. Standard RFC 8414 `.well-known` discovery may fail because Splunk exposes its OIDC configuration at `/.well-known/openid-configuration` and may require explicit port configuration.

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** OAuth (Authorization Code)
* **Registration Mode:** MANUAL
* **Client ID:** The registered OAuth client ID
* **Client Secret:** The explicit OAuth client secret. Do not use an API token such as one beginning with `mAIR_`.
* **Base URL:** `https://<customer-instance>.splunkcloud.com:8089/services/mcp`
* **Authorization URL:** `https://<customer-instance>.splunkcloud.com/oauth2/v1/authorize` (port 443)
* **Access Token URL:** `https://<customer-instance>.splunkcloud.com:8089/oauth2/v1/token` (port 8089)
* **Callback URI:** `https://<YOUR_SYMPHONY_DOMAIN>/ai/studio/api/v1/oauth/callback`
* **Scopes:** `openid` and `offline_access`

**Note:** The Base URL above applies to the direct MCP endpoint. Customers must ensure that access to port 8089 is permitted on their Splunk Cloud instance. The endpoint may vary depending on the deployment configuration.

Since the registration mode is `MANUAL`, customers must register the Callback URI above when configuring their OAuth client in Splunk Cloud.

#### Network and IP Allowlisting (Port 8089)

IP allowlisting is only required if the customer's Splunk Cloud instance restricts incoming REST API traffic on port 8089 by source IP address. If IP allowlisting is not enforced, this configuration step can be skipped.

Symphony egress NAT IP addresses vary depending on the deployment environment, including the pod or dedicated SDU hosting the customer.

If the customer's Splunk administrator requires IP allowlisting, contact Symphony Support to obtain the applicable egress NAT IP addresses for the customer's specific deployment environment.

## Google Workspace (Drive and Gmail)

**Prerequisites**

Since the OAuth Registration Mode is `MANUAL`, customers must complete the following steps before configuring the integration:

1. **Google Cloud project and OAuth consent screen:** Create and configure their own Google Cloud project and OAuth consent screen, including registering the OAuth client credentials required by Symphony.
2. **Google Workspace administrator allowlisting:** The Google Workspace administrator must allowlist the OAuth application under **Security > API controls** in Google Admin Console.

The application must be allowlisted to authorize the required Google Drive and Gmail scopes. Otherwise, Google Workspace may block OAuth token issuance or prevent users from granting the requested permissions.

**OAuth Configuration**

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** OAuth
* **Registration Mode:** MANUAL
* **Base URL:** `https://workspacemcp.googleapis.com/mcp/v1`
* **Authorization URL:** `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline`
* **Access Token URL:** `https://oauth2.googleapis.com/token`
* **Callback URI:** `https://<YOUR_SYMPHONY_DOMAIN>/ai/studio/api/v1/oauth/callback`

**Important:** Since the registration mode is `MANUAL`, customers must register the Callback URI above as the redirect URI in their Google Cloud Console OAuth client credentials.

Do not add `offline_access` to the scopes list, as Google returns an `invalid_scope` error. Request offline access using `access_type=offline` in the authorization URL instead.

## GitHub

* **Type / Sub-type:** MCP Server / MCP
* **Authentication:** OAuth
* **Registration Mode:** MANUAL
* **Base URL:** `https://api.githubcopilot.com/mcp/`
* **Authorization URL:** `https://github.com/login/oauth/authorize`
* **Access Token URL:** `https://github.com/login/oauth/access_token`
* **Callback URI:** `https://<YOUR_SYMPHONY_DOMAIN>/ai/studio/api/v1/oauth/callback`

Configure the registered OAuth client credentials and any additional required settings according to the GitHub integration and current Symphony implementation.

#### GitHub Enterprise Server (GHES)

The configuration above assumes public GitHub (`github.com`).

For customers using GitHub Enterprise Server (GHES) hosted on-premises, the authorization and access token URLs must be configured to point to the customer's GitHub Enterprise instance.

For example:

* **Authorization URL:** `https://github.<company>.com/login/oauth/authorize`
* **Access Token URL:** `https://github.<company>.com/login/oauth/access_token`

The exact URLs may vary depending on the customer's GHES configuration.

Additionally, customers hosting GHES internally must ensure that Symphony pod egress IP addresses are allowlisted in their corporate firewall to allow connectivity to the GitHub Enterprise instance.

**Note:** Confirm the required OAuth endpoints and network connectivity with the customer's GHES administrator.
