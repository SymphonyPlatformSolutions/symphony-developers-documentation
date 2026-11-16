---
description: >-
  Add your own LLM provider and models to AI Studio, then select them for your
  AI agents.
---

# Connect your AI provider

## Overview

AI Studio includes a default provider managed by Symphony. If you want your agents to use a different model, such as one from your own cloud account or API subscription, you can connect that provider yourself.

Setting this up involves three objects:

{% stepper %}
{% step %}
### **Provider**

The connection to the LLM service. It holds the service’s address and how Symphony signs in to it.
{% endstep %}

{% step %}
### **Model**

A specific model offered by that provider, such as `gpt-4o` or a Gemini model. You register each model you want to use.
{% endstep %}

{% step %}
### **Agent**

An AI agent that uses one provider and one model.
{% endstep %}
{% endstepper %}

You create the provider once, add one or more models to it, then select the model in any agent.

## Authentication method

The authentication method you select depends on how the provider lets you access it.

| Authentication method | How sign in works                                                                                                                                         | Choose it when                                                                               | What you provide                                                       | What Symphony provides            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| **API Key**           | You give Symphony a secret key that the provider issued to you.                                                                                           | The provider gives you a key or token.                                                       | The key (API Key / Secret)                                             | N/A                               |
| **Cloud Identity**    | Symphony gives you a service account. You grant it access in your own cloud account and AI Studio uses it to call your models. No secret key is required. | The provider is a cloud platform that supports service-account access, such as Google Cloud. | Cloud-specific fields. For Google Cloud: your project ID and location. | The service account to authorize. |

## Supported platforms

Select the platform in the **AI Platform** list. Symphony fills in the Base API URL for you.

| Platform in AI Studio | Authentication            | What you need                                                                                                                    |
| --------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Google VertexAI\*     | Cloud Identity            | Google Cloud project ID and location. See [Gemini platform](https://cloud.google.com/products/gemini-enterprise-agent-platform). |
| Google GenAI          | API Key or Cloud Identity | An API key, or a Google Cloud project and location. See [Gemini API](https://ai.google.dev/gemini-api/docs).                     |
| OpenAI                | API Key                   | An [OpenAI API key](https://platform.openai.com/api-keys). Also works for any OpenAI-compatible service.                         |
| Anthropic             | API Key                   | An API key from [Anthropic](https://www.anthropic.com/).                                                                         |

\*The AI Platform list still uses the `Google VertexAI` label. This is Google’s [Gemini platform](https://cloud.google.com/products/gemini-enterprise-agent-platform).

## Prerequisites

**You need:**

* You need the **Connector Manager** role to access the **Admin** button in the top-right corner of AI Studio.
* Credentials for your authentication method: an API key, or a Google Cloud project ID and location.
* The exact ID of the model you want to use. Find it in the provider’s model documentation.

{% hint style="info" %}
This guide uses AI Studio to create a provider.

You can also create a provider in the Symphony Messaging Admin Portal under **Company Settings** > **Connection Vault** > select **Create New Connector** and the **Type**: **AI Provider**.
{% endhint %}

## Provider settings

Open **AI Studio > Provider Management > Add Provider**.

<table><thead><tr><th>Section</th><th>Field</th><th>What to enter</th></tr></thead><tbody><tr><td rowspan="2"><strong>General Information</strong></td><td>AI Platform</td><td>The service you are connecting.</td></tr><tr><td>Base API URL</td><td>Filled in automatically when you choose the platform. Change it only for an OpenAI-compatible service at a different address.</td></tr><tr><td rowspan="3"><strong>Security &#x26; Auth</strong></td><td>Authentication Method</td><td>API Key or Cloud Identity.</td></tr><tr><td>API Key / Secret</td><td>API Key only. Your key.</td></tr><tr><td>Google Cloud Project, Location</td><td>Cloud Identity with Google only.</td></tr><tr><td rowspan="2"><strong>Branding &#x26; Display</strong></td><td>Display Name</td><td>Required. The name people see. It can’t be changed after you create the provider.</td></tr><tr><td>Documentation Link, Icon URL, Dark Icon, Description</td><td>Optional. Description is limited to 300 characters.</td></tr></tbody></table>

## Model settings

On the provider card, select **Models** > **Add Model**.

| Field                  | What to enter                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model ID**           | Required. The exact identifier the provider uses in its API. A wrong ID is the most common cause of a model that doesn’t respond.                                |
| **Display Name**       | Required. The label people see across the platform.                                                                                                              |
| **Documentation Link** | Optional. Link to the provider's documentation for configuration and troubleshooting guidance.                                                                   |
| **Default Model**      | Optional. Makes this the default model when the provider is selected.                                                                                            |
| **Extended Thinking**  | Optional. Lets the model reason before answering. When enabled, the default Thinking Level is automatically created. You can add additional **Thinking Levels**. |

## Provider, model and agent setup

{% stepper %}
{% step %}
### **Create the provider.**

Fill in the provider settings above, then select **Create Provider**.
{% endstep %}

{% step %}
### **Add a model.**

On the provider card, select **Models > Add Model**, fill in the model settings, then select **Add Model**. Confirm it appears in the list.
{% endstep %}

{% step %}
### **Assign the model to an agent.**

Create or open an agent, go to the **Model** section, choose your provider and model, then save. Optionally, adjust the **Creativity level** (the default is **0.7**).
{% endstep %}

{% step %}
### **Test your agent.**

Open a chat with the agent, send a message and confirm it answers.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
New or updated connections can take several minutes to appear in AI Studio.
{% endhint %}

## Examples

#### **Example 1: Google Gemini platform (Cloud Identity)**

| Field                 | Value                    |
| --------------------- | ------------------------ |
| AI Platform           | Google VertexAI          |
| Base API URL          | Filled in automatically  |
| Authentication Method | Cloud Identity           |
| Google Cloud Project  | Your project ID          |
| Location              | Your project location    |
| Display Name          | `Google Gemini platform` |

{% hint style="info" %}
Cloud Identity uses the pod's service account, so there is no secret to enter.
{% endhint %}

<details>

<summary>Step 1. Create the provider.</summary>

#### Step 1. Create the provider



1. In **AI Studio**, open **Provider Management** and select **Add Provider**.
2. **AI Platform:** Google VertexAI
3. **Base API URL:** `https://us-central1-aiplatform.googleapis.com/v1` (filled in automatically when you select Google VertexAI)
4. **Authentication Method:** Cloud Identity

<figure><img src="../../../.gitbook/assets/image (123).png" alt="" width="500"><figcaption></figcaption></figure>

5. **Google Cloud Project:** your project ID
6. **Location**: your project location

<figure><img src="../../../.gitbook/assets/image (124).png" alt="" width="500"><figcaption></figcaption></figure>

7. Scroll down, enter a **Display Name** (for example Google Vertex AI Provider), then select **Create Provider**.

{% hint style="warning" %}
The name can't be changed after the provider is created. If you need to change it later, you'll have to delete and recreate the provider.
{% endhint %}

</details>

<details>

<summary>Step 2. Add a model.</summary>

#### Step 2. Add a model



1. In **Provider Management**, find your **new provider**. It shows 0 models.

<figure><img src="../../../.gitbook/assets/image (126).png" alt="" width="556"><figcaption></figcaption></figure>

2. Select **Models**, then **Add Model.**

<figure><img src="../../../.gitbook/assets/image (127).png" alt="" width="563"><figcaption></figcaption></figure>

3. **Model ID:** gemini-3.1-pro-preview
4. **Display Name:** Gemini 3.1 Pro Preview

<figure><img src="../../../.gitbook/assets/image (131).png" alt="" width="549"><figcaption></figcaption></figure>

5. Select **Add Model**. The model now shows in the list.

<figure><img src="../../../.gitbook/assets/image (132).png" alt="" width="563"><figcaption></figcaption></figure>

6. (Optional) Switch on **Extended Thinking** to let the model reason before it answers and add one level named THINKING\_LEVEL\_UNSPECIFIED / Default.

</details>

<details>

<summary>Step 3. Assign the model to an agent.</summary>

#### Step 3. Assign the model to an agent

1. Create or open an agent and go to the **Model section**.
2. Choose your **provider** and your model, then save.

<figure><img src="../../../.gitbook/assets/image (133).png" alt="" width="563"><figcaption></figcaption></figure>

</details>

<details>

<summary>Step 4. Test.</summary>

#### Step 4. Test

Open a chat with the agent, send a message and check that it answers.

</details>

#### Example 2: OpenAI (API key)

{% hint style="info" %}
The same steps work for any OpenAI-compatible service. Change the Base API URL and the key.
{% endhint %}

| Field                 | Value                                                       |
| --------------------- | ----------------------------------------------------------- |
| AI Platform           | OpenAI                                                      |
| Base API URL          | Filled in automatically                                     |
| Authentication Method | API Key                                                     |
| API Key / Secret      | Your [OpenAI API key](https://platform.openai.com/api-keys) |
| Display Name          | `OpenAI`                                                    |

<details>

<summary>Step 1. Create the provider.</summary>

#### Step 1. Create the provider

1\.     In AI Studi&#x6F;**,** open **Provider Management** and select **Add Provider**.

2\.    **AI Platform:** OpenAI

3\.    **Base API URL:** `https://api.openai.com/v1` (filled in automatically when you select OpenAI).

4\.     **Authentication Method:** API Key

<figure><img src="../../../.gitbook/assets/image (134).png" alt=""><figcaption></figcaption></figure>

5\.     **API Key / Secret:** Paste your key.

<figure><img src="../../../.gitbook/assets/image (135).png" alt="" width="563"><figcaption></figcaption></figure>

6\.     Under Branding & Display, enter a **Display Name.** The rest of the fields are optional.

7\.     Select **Create Provider**.

<figure><img src="../../../.gitbook/assets/image (136).png" alt="" width="563"><figcaption></figcaption></figure>

</details>

<details>

<summary>Step 2. Add a model.</summary>

#### Step 2. Add a model

1\.     In **Provider Management**, select **Models** on your provider, then **Add Model**.

2\.     **Model ID:** Enter the exact ID from OpenAI's model list.

{% hint style="info" %}
The screenshot uses a sample ID. Make sure to use the real one.
{% endhint %}

3\.     **Display Name:** Enter any readable name.

4\.     Select **Add Model**.

<figure><img src="../../../.gitbook/assets/image (137).png" alt="" width="550"><figcaption></figcaption></figure>

The model now shows in the list.

<figure><img src="../../../.gitbook/assets/image (138).png" alt="" width="563"><figcaption></figcaption></figure>

</details>

<details>

<summary>Step 3. Assign the model to an agent.</summary>

#### Step 3. Assign the model to an agent

1\.     Create or open an agent and go to the **Model section**.

2\.     Choose your **provider** and your **model**, then select **Create**.

<figure><img src="../../../.gitbook/assets/image (139).png" alt="" width="563"><figcaption></figcaption></figure>

</details>

<details>

<summary>Step 4. Test.</summary>

#### Step 4. Test

Open a chat with the agent, send a message and check that it answers.

</details>

## Troubleshooting

<table data-header-hidden><thead><tr><th valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><strong>Problem</strong></td><td valign="top"><strong>What to check</strong></td></tr><tr><td valign="top">Provider not visible</td><td valign="top">Connection settings and Connector Manager permissions.</td></tr><tr><td valign="top">Authentication fails</td><td valign="top">API key or cloud identity, endpoint and provider permissions.</td></tr><tr><td valign="top">Model not listed</td><td valign="top">The model ID and that the model was saved.</td></tr><tr><td valign="top">Agent cannot respond</td><td valign="top">Selected provider and model, endpoint, credentials and provider quota.</td></tr><tr><td valign="top">PROVIDER_NOT_FOUND</td><td valign="top">The provider was probably removed from Connection Vault. Pick an available provider and model in the agent settings, save and test again.</td></tr></tbody></table>

{% hint style="info" %}
New or updated connections can take several minutes to appear in AI Studio.
{% endhint %}
