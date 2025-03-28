---
description: Guide for creating a bot user in the admin portal
---

# Creating a Service Account

{% hint style="warning" %}
Please note the below steps can only be performed by a Symphony Messaging Pod Administrator as only they will have the necessary administrator privileges to access the Admin Portal. Please do not attempt this if you are not a Pod Administrator and reach out to your internal IT Helpdesk if you are unsure who your Symphony Messaging Pod Administrator is.
{% endhint %}

{% hint style="info" %}
If you are attempting to use the **Developer Sandbox** at [develop2.symphony.com](https://develop2.symphony.com), this section is not relevant for you. Please register for an account at the **Developer Center** at [developers.symphony.com](https://developers.symphony.com) and click on the request link in the welcome email to obtain your sandbox credentials.
{% endhint %}

In order to create a bot and begin your development journey, you must first create a bot user, also known as a service account. You can only do this yourself if you are a pod administrator on your Symphony Messaging pod. Otherwise, please seek assistance from your pod administrator or your internal IT Service Desk if you are unsure who to contact.

## Create a Bot User

### 1. Navigate to your Symphony Messaging Admin Portal for your Pod

For example, https://mycompany.symphony.com/?admin[^1]

### 2. Select Create an Account in the left navigation pane

<div align="left"><figure><img src="../../.gitbook/assets/image (44).png" alt=""><figcaption></figcaption></figure></div>

### 3. Select the Service Account tab

<div align="left"><figure><img src="../../.gitbook/assets/image (57).png" alt=""><figcaption></figcaption></figure></div>

### 4. Fill in your bot information

The bot username here has to match the username supplied by a bot configuration file exactly.

<div align="left"><figure><img src="../../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure></div>

### 5. Fill in the RSA Public Key

Paste the entire contents of the _public key_ in the **Authentication** section.\
This _public key_ has to match the _private key_ supplied by a bot.\
If you are unsure how to generate an RSA key pair, use the [Symphony Messaging Generator](../../dev-tools/generator.md).

<div align="left"><figure><img src="../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure></div>

### 6. Set roles and entitlements

Enable the required roles that your bot requires.

<div align="left" data-full-width="false"><figure><img src="../../.gitbook/assets/image (45).png" alt=""><figcaption></figcaption></figure></div>

Enable the required entitlements that your bot requires.

<div align="left"><figure><img src="../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure></div>

{% hint style="info" %}
Navigate to [Bot Permissions](../overview-of-rest-api/bot-permissions.md) for a full list of bot roles and privileges.
{% endhint %}

### 7. Confirm Bot Creation

![](<../../.gitbook/assets/image (50).png>)

[^1]: This is an example address. Your company's pod might be located on a custom domain, in which case simply append **/?admin** behind your pod address to access the Admin Console.
