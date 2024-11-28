# Installation guide

## Overview

Universal Webhook is a Symphony Managed Service (operated by Symphony in the Cloud) that allows users to receive trusted or unauthenticated incoming webhooks within Symphony rooms in various formats (Raw text, MessageML).

{% hint style="info" %}
Universal Webhook 2.0 or above is a **managed service** operated by Symphony in the cloud, and as a result is only available to **cloud customers** for now.
{% endhint %}

### Key benefits

* Always receive your events with a Symphony managed service and track functional errors as they occur thanks to a detailed Webhook History.
* Receive payload in raw text or in MessageML for complex messages.
* Action workflows from client applications or bot room members.
* Control the security level of incoming webhooks thanks to various authentication schemes.

### High-level admin flow

The Symphony administrator first needs to set up a service account that is going to be used to post the messages into the rooms. That user might already exist; in this case the private key of that service account will be needed in order to link the service account with the Universal Webhook service.

Symphony administrators can access the Symphony application called Universal Webhook. All users can access the application, but only Symphony administrators can access the setup tab in order to set up the service account to be used. The Symphony admin will need to provide the service account username and private key to successfully set up the Universal Webhook service.

### High-level user flow

Users can install the Universal Webhook extension application from the Symphony Market to create webhook URLs.

Once the application is installed, users can create webhook URLs in rooms they are owners of via the extension application chat header button. They can then use those URLs in their source applications to send messages to those rooms.

When a payload is received from the source application on a webhook URL, the Universal Webhook checks if the authentication details are correct and tries to send the message to the room corresponding to the webhook URL via the Agent.

Message authentication, delivery successes, and errors are logged in the webhook history accessible to room members (via the extension application chat header button) and the Symphony administrators via the extension application page.

## Universal Webhook setup

### Create a Symphony extension app

Your Symphony technical point of contact (Technical Account Manager, or Solutions Architect) is in a position to perform this step for you. If you do not have a point of contact or you wish to do this step yourself, follow the instructions below.



#### **Create an extension app by importing a JSON file**

1. On the Symphony Admin Portal, select the **APP MANAGEMENT** tab, then click the **Add Custom App** button.

<div align="left"><figure><img src="https://lh5.googleusercontent.com/RoLAku8ZVhbDO-8U9H3YVpscQD094SCXzwHsEdsNh7raNJEeH5LhYe6FEV-H1fs2t2bYnTlvQVmQEkfJlDoHhHdoJjIYP1sI5qC6UG3rS5AbZGn0P4j5wOTUp5K0Y4MkubQDWZ5vflWwcq7sd3Iw6g" alt=""><figcaption></figcaption></figure></div>

2. Click the **Import Application Bundle File** button.

<div align="left"><figure><img src="https://lh4.googleusercontent.com/m5SMBLCQFHfxAGpV6QxZC4OIinxJ76qish3fKFZBkpgv2gW_LYqsWlJ7Ms_DryXoqqwho6unkdUHZFev7w65loq96g8DrY-WasKWSRrSBD_jcsfbeOFYKhttLv00CVR2Pj44p-xM_ps_qsbNW3X7MA" alt=""><figcaption></figcaption></figure></div>

3. Download the file below that corresponds to your environment, and then upload it in the Admin Portal to pre-fill all the fields:

* Config for PROD environments : [https://resources.symphony.com/universalwebhook-bundle-PROD-2.0.json](https://resources.symphony.com/universalwebhook-bundle-PROD-2.0.json)
* Config for UAT environments: [https://resources.symphony.com/universalwebhook-bundle-UAT-2.0.json](https://resources.symphony.com/universalwebhook-bundle-UAT-2.0.json)

<details>

<summary>Alternatively, create an extension app manually</summary>

1. On the Symphony Admin Portal, select the **APP MANAGEMENT** tab, then click the **Add Custom App** button.
2. Fill the text fields as follows :

* **Name**: Universal Webhook 2.0
* **Publisher**: Symphony
* **Icon URL**: [https://symphony\_pod\_loopback.com/apps/universal-webhook/default/assets/app-icon-square.svg](https://symphony_pod_loopback.com/apps/universal-webhook/default/assets/app-icon-square.svg)
*   **Description**:&#x20;

    ```
    Share content and alerts from third party services in Symphony chats. 

    The Universal webhook allows you to configure webhooks for Symphony, and provides a simple way for external apps and cloud services to share content in Symphony chats. It is often used to receive notifications and messages from the web, directly in your chats. 
    Many popular services are compatible with this technology, such as Zapier, IFTTT, Jira, Jenkins, Datadog, Splunk, and more.
     
    Universal Webhook 2.0 is a managed service operated by Symphony in the cloud, and as a result is only available to cloud customers for now. It replaces the legacy service that was delivered through the Integration Bridge.
    ```
* **RSA Public key (Production environments)**:

{% code overflow="wrap" %}
```
-----BEGIN PUBLIC KEY----------BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtE1qkejJr61d1KoBfu4qgELHhiBFNl98P7kqUnVL1FIH++Ur0vtU0wnZ5q94FGqLK2RZcBqvwuYyoshQ/k3fiDY9nLdtNWw2COJjnwmVMeh36QrvQ1c/mB0CAAZd+Q3hbzPJqFYS3jXqgmZPSU7Z391eiYi3wH5Zhvs93iRIXjIR6z78VqfbieN69PmbHPkn3fSzt2B0wQZhU9CoDHeucCPUujnGi+MeSDcMelMdW2nl32cyICfA+GhUZslrDBk2hkrYXwVmJDW6L3t92SattVNbUCH3SjEjbAQAbg1TXV+3AxTt9+rGZ6EglqY4AE8qvBPqcMBkc9lBUPNfjm+BPyqPkGWRXM3tMHejQgEJ5O2w/WIHDpWMqVyT/uX6nOm4rZOEoooveHAwBUhqfoYCAVp2BCFZCHgCKbzPz9cwq6CbRpTPvn37P2GVTjKQD+O2pgu8upcnqwn1NRZph+FSK8XetHF+9Yk4nQkJIyfuSu2diuo+P32BIhTqiNtweYlcBOO+1aLWlcSa+L6AztnqO9O/Wceg5h9B5eYRAApgmmsKaQ6U5FFOX+Npay5TNoM3Hwyq5zfNNd2D5U1MQmjL1th1z3qDDVuvcNJJmu4LgJxLql8N8FtQFP4ZqoplqcoG5f+YuS6Ch4UO/skrvIoKLHBZ/LXGkJoeVgby5OSqt60CAwEAAQ==-----END PUBLIC KEY-----
```
{% endcode %}

* **RSA Public key (UAT environments):**

{% code overflow="wrap" %}
```
-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwUkX6NzMYnE1gahhgFwk1jUffd0TclcqVN0AfRuGINiRpD2FA4s4ZfVtV9kRMLzz6uiiF+0r2TYNaM5XDbqzR+imf5PzJ2sIaoxVumSKZ1oHvnu865QwVMzMfJO4xQgybjqqruyztIs1hGMoaSTjOdlED6EuEq7XcP//ssGtG8+sDretkXqeTY3mtrcRFbK/praEoZpqnde3jjoTAYf2T8hwct4IU1FAyuP/WCK24bQMXrxurMe/3Y+5nYI5dzTH9IQ3bqXLTEXQIKB34tjVq782xdl4CKO9XjY+MY4qGMqJWeIvWsLc1QNJIccASbBg8fLdsG055btNcCQTs35g7NEvJIQ5kAPLGEo8DdjXJhjuXo8kcWovXB4B1vUws5jnBUZUW9s8d3J6zyXZHHRs9nZf9YlSwxlKCYTCxybkVvYE0PUxiSXqydprjE4TQR8HzSQlgsNNz/s1fV93Kppp2wvhOWJfbxQz55c4AHDC+04Jt8YRjZQjDwHFwp9FxiaWJ3JdPsXWgdQ1J7oSHx6coCeTARNE0JBKz4hvX5FMxe/4kg7T+NPOIIafE3IV8wRqkt3miSOiCwrf5weORi/5gK7hnRvJo+FxZSXfQLxnGos0NhHyMz/wTJTg04P+rvcU2rUlexSwo6sRRwbfpmLpzoC6MGlS2BUryeNm4GaRTxsCAwEAAQ==-----END PUBLIC KEY-----
```
{% endcode %}

* **APP ID**: universal-webhook
* **Domain**: symphony\_pod\_loopback.com
* **Load URL**: [https://symphony\_pod\_loopback.com/apps/universal-webhook](https://symphony_pod_loopback.com/apps/universal-webhook)

3. These two **permissions** must be granted to the application:

* **Act as user** : Is required for the bot to access the user role in Symphony on behalf of the user (see below).
* **Business User Identity** : Provides to the app the information of which roles the user has.

</details>

The end result should look like this:

<figure><img src="../../.gitbook/assets/image (74).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (73).png" alt=""><figcaption></figcaption></figure>

### Create a Symphony service account for Universal Webhook

#### **Create a service account**

In Symphony, you must configure a service account using the Admin Portal (or via API).&#x20;

1. Select the **Create an Account** tab.
2. Select the **Service Account** tab.
3. Fill in the mandatory **Username**, **Display Name** in the Service Account form.
4. Set the **Role in Symphony** to **Individual**.&#x20;
5. Set the entitlement **Can edit profile picture** to **Yes**.
6. Select **Create**.

<div align="left"><figure><img src="../../.gitbook/assets/image (62).png" alt=""><figcaption></figcaption></figure></div>

#### **Configure the RSA authentication**

RSA is an asymmetric cryptographic system that leverages a public and private key allowing any user with the public key to generate a message that will be decrypted with the private key.&#x20;

In order to use RSA for authentication, you must generate a key pair using OpenSSL.

Once generated, **the private key must be accessible** to configure the Universal Webhook service.

Should any part of the RSA key be lost, it can be regenerated and you can update the service account with the new one.

```bash
openssl genrsa -out webhookbot_privatekey.pem 4096

openssl req -newkey rsa:4096 -x509 -key webhookbot_privatekey.pem -out         
           webhookbot_publickey.cer

openssl x509 -pubkey -noout -in webhookbot_publickey.cer >
            webhookbot_publickey.pem

cat webhookbot_publickey.pem
```

#### **Configure the service account with the RSA public key**

The public key needs to be set in the Symphony service account via the Admin Portal (or via API).

1. Copy and paste the contents of webhoo&#x6B;_\_publickey.pem._

Set your public key

<div align="left"><figure><img src="https://lh3.googleusercontent.com/YYeQ2pG49usaf79mgQxUggqU4gmCFaIN2wVUMg0Bi6Pj12VJWfjVyN8b5t_sW6R3vW8f-9TdkUEqz0T6_TyaxlliFVBK7Y4IzbRqBXW9UumBBAZLTTBkWAh9wdYlD5TROeEyGE3LnJv8Q8sbcAIlhA" alt=""><figcaption></figcaption></figure></div>

### Link the service account with the Universal Webhook service

#### **Load the Universal Webhook app in Symphony**

1. As an Admin, go the Symphony Marketplace <img src="../../.gitbook/assets/image (40).png" alt="" data-size="line"> on Symphony.
2. Enter Universal Webhook in the **Search** field to find the app you deployed in the steps above.
3. Select **Install**, then **Open** to launch the application.

<div align="left"><figure><img src="../../.gitbook/assets/image (55).png" alt=""><figcaption></figcaption></figure></div>

You will see the app landing page and the available **ADMIN** tab next to the OVERVIEW tab.

_**If the application does not appear in the Symphony Market, check the developer tools for errors. An incorrect URL or untrusted web server certificate are common errors.**_

#### **Set up the service account on the Universal Webhook service**

1. Go to the **ADMIN** tab of the Universal Webhook extension app.
2. Fill in the service account username as defined in the Symphony Admin Portal in the step [Service account creation](installation-guide.md#create-a-symphony-service-account-for-universal-webhook).
3. Fill in the Service Account **private key** generated in the step [RSA authentication configuration](installation-guide.md#configure-the-rsa-authentication).
4. Click on **UPDATE**.

<figure><img src="../../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>

* Optionally, explicitly allow unauthenticated webhooks to be created. Otherwise the only webhooks that will be processed will be the ones using a pre-configured HMAC secret or Shared secret in the header.
* Optionally, the administrator can update the Universal Webhook picture directly from the extension application by hovering on the avatar placeholder.

If the service account username and private key match what is defined on the Symphony Admin Portal (username and public key), the update will be successful and the Universal Webhook will be usable.

#### **Create and test a Webhook URL**

1. Add the Universal Webhook bot to a Symphony room (or directly open a direct chat with the Universal Webhook bot).
2. Click the **chat header button** to create a webhook URL.

<figure><img src="https://lh4.googleusercontent.com/s3Qj9_ihL50xzT7ksp0aZkAHXcfan1lhrJcATcPD_mjvQvE-imzJoZow-cMseLrg3MIdlMVGqHQnjprVYcDIWSPNcjxWh0X48bBc1b4r_TJ5wfSaexmDf-us08CEVti2a9bOjmiCq6yMg4fwIn-Uhw" alt=""><figcaption></figcaption></figure>

3. Type in the details of your webhook URL.

<figure><img src="https://lh6.googleusercontent.com/QX6RmBANhDIwzcwQ2B75a4gLJcyQEkrFKu3P3SLrw0LHALh7LlxvWTv9gH42g3pemfRUfsLLDV2_2kgEmxDCpvpB4elDM6WysEQeAM4bSsXLcOSVrE5RrkTVzZW76GzOnMv1mxLPC8khO5qwThUO0Q" alt=""><figcaption></figcaption></figure>

4. Fill in the details and click **SAVE AND ACTIVATE**.
5. **Copy** your URL to test it.

<div align="left"><figure><img src="https://lh6.googleusercontent.com/3cpiBMBMWIvq5mODdRRVuTwMfPS8fP2h-2T0-FFjZSOM6dYeLgqfntkrZk_ZaktJfROETJhDTXIX6bML9MH8PS7n2JeF1XjzP9e4G_iaTTvfQo4EekgNKBVej5NORdmXoUHyoe5leEpmxSg3t1hVIA" alt=""><figcaption></figcaption></figure></div>

If we target a messageML unauthenticated webhook, the `curl` command would be:

```
curl --location --request POST 'https://[tenant].symphony.com/universal-webhook/[id1]/[id2]/[id3]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'message=<messageML>test</messageML>'
```

If we create a raw unauthenticated webhook, that would be:

```
curl --location --request POST 'https://[tenant].symphony.com/universal-webhook/[id1]/[id2]/[id3]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'message=test'
```

Have a look at the [User guide](user-guide/) for more information.



### How to uninstall

To uninstall the Universal Webhook, please disable the configured extension app and deactivate the provisioned service user.
