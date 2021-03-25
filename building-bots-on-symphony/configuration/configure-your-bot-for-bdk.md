---
description: Bot Configuration guide for using the BDK and CLI Tool
---

# Configure your Bot for BDK

## Configure your Bot for BDK

This page is a configuration guide specific to using the Symphony BDK and the BDK CLI Tool.

### Prerequisites

* Node.JS
* Java 8
* Maven 3
* Git

#### Install the BDK CLI

```bash
$ npm install -g symphony-bdk-cli
```

#### Confirm all the dependencies are met:

```bash
$ symphony-bdk-cli --check-dependencies
```

### 1.  Generate your Bot

To generate a new bot project, enter the following:

```bash
$ symphony-bdk-cli --bot
```

This will prompt with you a number of questions about your bot and Pod configuration. Type in your bot's metadata, use arrows to scroll, and press enter to move on to the next prompt:

```text
✔ All Dependencies are met!
Setting up a new Bot application
Please answer the following questions
? What's the bot project name? (required) demo-bot2
? What's the bot username? (required) demobot2
? What's the bot email address? (required) demobot2@symphony.com
? What's the base package? (required) com.symphony.documentation
? do you have an existing extension app?, if so what is the application ID declared in Symphony? 
? Please Provide the Symphony Pod address this bot will serve develop2.symphony.com

⠋ Generating bot RSA keys
Generating RSA private key, 4096 bit long modulus
.............................++
............................................................++
✔ Keys generated.
✔ Ran install dependencies
Project ready DONE
********************************************************************************************
Please find below the bot public key, it must be added to the bot user account
please visit: https://developers.symphony.com/restapi/docs/rsa-bot-authentication-workflow to learn more.
********************************************************************************************
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzpiQJwzqUusEcAWqLKyM
lo8qZXUHhuT6kmb1UgSMxkZ9LZI7I1qfCD2v3HlBNj1fiTJkR08meCy//04DruBN
jiBbQTfJzryB+5xpu3RvUrhVhqRM8YsQHU/zo82q+XBe0LZa1E0OtH/Pc1B1HVvr
oOMFuSZJSwq4mB/eWz0gV+lK9FFS5crwFXZk7gfhIACcW4SCVKpj7iyu66iO/4ed
TqNwMsyiMY4XEFkfIlBy+nbdf3ciGG8e8JxeSlI5sU33u6IQ8JdFHslR1pN5vj++
3omwuSWPvsfixdEEq2HILKuYgX6jrwgWFLRbOs2WB7rP7O1R3RaoxeOU+N68ORSy
jALEaLppq+ephIajMgzNJJzmvFnoWrvfj+YuS6wn+6FWgSs6Mop+KoJaRo+94r4B
UQTe+nZDXASB1V0wSIXyohlwdrrAE+4F+UXzOybVAEaA6wxgWhTtWDJX9jrBM4Df
IaLg/Gn9qCwb3tUDSkRxKmSsLpbdNW7zmdm/JEYQfdoysiyb4/Nrt6DX+PYue7IP
xJ77TIQnl3SvmSeLqJSH65d76hf1f4Ld07cgGXZTVW+1LeDi2dIS01n40aAfyKNx
OZrGTfbHusNQFjy3UBmu8r2EaETbyCfUUmcye6Hqy3jKZ13ylvXr1AH4kRVG4TGs
cYtyBTslVQ5nUvIYPqPfrKECAwEAAQ==
-----END PUBLIC KEY-----
```

{% hint style="info" %}
Leave the answer to the application ID question blank and press enter to skip
{% endhint %}

Upon completion, the BDK CLI tool has created a public/private RSA key pair, a configuration and requirements file, as well as some default commands/datafeed event listeners.

### 2. Configure your Bot

Once you have your generated bot scaffold, the next step is to configure your bot user.

Ensure that your pod admin has created a corresponding service account on the admin portal of your Symphony Pod. Additionally, you must upload the generated RSA public key for the service account created.

Copy the entire contents of this RSA public key including the dashes on either side, and hand it to your pod admin and request for it to be saved against the respective service account you will be using.

{% hint style="info" %}
Note: The bot username and bot email address entered to the CLI tool must match exactly the Basic Information shown in the Pod above.
{% endhint %}

![](../../.gitbook/assets/screen-shot-2020-07-11-at-6.07.09-pm%20%282%29.png)

Open your generated bot code in your favorite Java IDE and navigate to the `bot-config.json` file:

```text
{
  "sessionAuthHost": "develop2.symphony.com",
  "sessionAuthPort": 443,
  "keyAuthHost": "develop2.symphony.com",
  "keyAuthPort": 443,
  "podHost": "develop2.symphony.com",
  "podPort": 443,
  "agentHost": "develop2.symphony.com",
  "agentPort": 443,
  "appId": "",
  "appPrivateKeyPath": "certs/",
  "appPrivateKeyName": "demobot2_privatekey.pkcs8",
  "botPrivateKeyPath": "certs/",
  "botPrivateKeyName": "demobot2_privatekey.pkcs8",
  "botUsername": "demobot2",
  "authTokenRefreshPeriod": "30",
  "authenticationFilterUrlPattern": "/secure/",
  "showFirehoseErrors": false,
  "connectionTimeout": 45000,
  "botEmailAddress": "demobot2@symphony.com"
}
```

Confirm that the `sessionAuthHost`, `keyAuthHost`, and `agentHost` matches the correct Pod, Key Manager, and Agent endpoints respectfully. Again, confirm that the `botUsername`, and `botEmailAddress` matches the information entered in the admin portal on the Pod.

### 3.  Build Your Bot

Now that you have generated and configured your Bot, move onto one of our BDK tutorials:

{% page-ref page="../tutorials/bdk/" %}

