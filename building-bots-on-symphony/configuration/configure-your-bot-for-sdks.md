---
description: Bot Configuration Guide using SDKs and Symphony Generator
---

# Configure your Bot for SDKs

This page is a language-agnostic bot configuration guide for building bots using Symphony SDKs and the Symphony Bot Generator.

{% hint style="warning" %}
For example purposes, we will be generating a Java chat bot. However, the configuration steps provided can be applied to our SDKs in other languages.
{% endhint %}

The Symphony Bot Generator is a Yeoman-based code generator that generates a project scaffold for the Symphony SDKs. The generator does the following for you:

* RSA Key/Certificate creation
* Bot configuration
* Generate project structure
* Build of example projects

## Prerequisites

### Install Yeoman and the Symphony Bot Generator:

```
$ npm install -g yo generator-symphony
```

## 1.  Generate Your Bot

To launch the Symphony Bot Generator:

```
$ yo symphony
```

This will prompt you with a number of questions about your Symphony environment and bot metadata. Type in your bot's basic information metadata, and press enter to move onto the next prompt. If questions give you multiple options, use the keyboard arrows to scroll:

```
/------------------------------------------/
/        SYMPHONY GENERATOR  1.4.3         /
/    by platformsolutions@symphony.com     /
/ (c) 2020 Symphony Communication Services /
/------------------------------------------/
? What do you want to create bot
? What is the name of your project demoBot1
? What is your POD subdomain develop2
? What is your preferred programming language Java
? What is the BOT username demoBot1
? What is the BOT email address demoBot1@symphony.com
? What is your preferred encryption technology RSA - Generate New Keys
? Which template do you want to start with Request/Reply
* Generating bot Java code from Request/Reply template...
Looking for latest version of Java client library..
Latest version of Java client library is 1.3.0
generating from template Request/Reply
* Generating RSA public/private keys for BOT demoBot1...
* BOT generated successfully!!
   create pom.xml
   create src/main/java/IMListenerImpl.java
   create src/main/java/RequestReplyBot.java
   create src/main/java/RoomListenerImpl.java
   create src/main/resources/config.json
   create certificates/all_symphony_certs_truststore
```

{% hint style="info" %}
Note: In this guide, we will select 'RSA - Generate New Keys'. If you have pre-existing RSA keys or wish to use certificates, select the other options accordingly.
{% endhint %}

Upon completion, the Symphony Bot Generator has created a public/private RSA key pair, a configuration and requirements file, and also datafeed event listeners.

## 2. Configure your Bot

Once you have your generated bot scaffold, the next step is to configure your bot user:

Ensure that your pod admin has created a corresponding service account on the admin portal of your Symphony Pod. Additionally, you must upload the generated RSA public key for the service account created:

```bash
$ cd demoBot1

$ ls -l
certificates
pom.xml
rsa
src

$ cd rsa/rsa-public-demo-bot1.pem
-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEAkuSmdAtnPDYF8j5lA9q5r7Mtv1uzbAr1RR6W+WqZKOkp5BdBmEz9C9h3qBfp
SdBpowYd7DbMwcMUZZ69nxOrtjqJiTxIG/dPswiN4/I275gaFarUMkHGFqEDKMjR0gNG0oj8
dYubtHcg3w06mYrRpj1wJLWm7Vg5+/QH2cDK0qP2kGLcozHf+MMg7f0c8dBx3esdRxs3Rcwf
LrjKH0mgTC6W1l/VFu6P/+2LV/1toDg+LNtBVZH5eMimvFCH9nAd7Vge2GgHGD8HGA7mnlPk
lEovSjKCsQDxafuBL0NH2PMW7l9/kBrWj8Wh2QNwNOnTUm67euD09MR4T/1amF23f0BWjjoW
OtosWcKXh5Rye6syKY68Rj9ShzPOYC0z0FASBEfFeb4YQ7GbG0UhS4ya+HO/URCwkOkWVq2r
yb8SRPAliZn/sUYNtcDMO3CKzC0RveJsYrmHg2Hswr1333cQkqXbGI+q1ZDIw2HWENQGt/NT
qhDVL8boocTSnMSajdRLFnn1aPwp1tvSBrng01u6nqlfDxHXlVuiNWTQ8/mf41ea1X2/CGtM
Agl9PvxdKEkNXJVPdUtBm7jIqQlljheYDs0825YP59H5WmaG3jywrkAS6QDP7uYvYd4skeJH
/QBDo29BBEWeigHJurdgbFGJK9+jUt9pcvxB31GlHS3gb1MCAwEAAQ==
-----END RSA PUBLIC KEY-----
```

Copy the entire contents of this RSA public key including the dashes on either side, and hand it to your pod admin and request for it to be saved against the respective service account you will be using.

![](../../.gitbook/assets/screen-shot-2020-07-13-at-9.57.25-pm.png)

{% hint style="info" %}
Note: The bot username entered into the Bot Generator must match exactly the username on the service account as shown above
{% endhint %}

For a detailed guide on how to create a service account in the admin portal, check out this guide:

{% content-ref url="creating-a-bot-user.md" %}
[creating-a-bot-user.md](creating-a-bot-user.md)
{% endcontent-ref %}

Open your generated bot code in your favorite IDE and navigate to the `config.json` file:

{% tabs %}
{% tab title="config.json" %}
```javascript
{
    "sessionAuthHost": "develop2.symphony.com",
    "sessionAuthPort": 443,
    "keyAuthHost": "develop2.symphony.com",
    "keyAuthPort": 443,
    "podHost": "develop2.symphony.com",
    "podPort": 443,
    "agentHost": "develop2.symphony.com",
    "agentPort": 443,

    "truststorePath": "certificates/all_symphony_certs_truststore",
    "truststorePassword": "changeit",

    "botUsername": "demoBot1",
    "botEmailAddress": "demoBot1@symphony.com",

    "botPrivateKeyPath": "rsa/",
    "botPrivateKeyName": "rsa-private-demoBot1.pem",

    "botCertPath": "",
    "botCertName": "",
    "botCertPassword": "",

    "proxyURL": "",
    "proxyUsername": "",
    "proxyPassword": "",
    "keyManagerProxyURL": "",
    "keyManagerProxyUsername": "",
    "keyManagerProxyPassword": ""
}
```
{% endtab %}
{% endtabs %}

Confirm that the `sessionAuthHost`, `keyAuthHost`, and `agentHost` matches the correct Pod, Key Manager, and Agent endpoints respectfully. Additionally, confirm that the `botUsername`, and `botEmailAddress` match the information entered in the admin portal on the Pod.

The `config.json` file has other fields that offers advanced configurations for proxy servers, certificate truststores, and custom ports. If these don't apply to your Bot or environment, leave them blank.

## 3.  Build Your Bot

Now that you have generated and configured your Bot, move on to one of the SDK bot tutorials:

{% content-ref url="../../developer-tools/developer-tools/sdks/sdk/" %}
[sdk](../../developer-tools/developer-tools/sdks/sdk/)
{% endcontent-ref %}
