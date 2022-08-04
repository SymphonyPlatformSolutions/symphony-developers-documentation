# Configure your Bot for BDK 2.0 for Python

## 1. Generate your Bot&#x20;

### Building your Project using the Symphony Bot Generator

{% hint style="info" %}
This section requires `npm` ([Node Package Manager](https://www.npmjs.com/)) to be installed on your local machine as a prerequisite.
{% endhint %}

The Symphony Generator offers a fast way to bootstrap your Symphony BDK 2.0 project in several languages, including Python. &#x20;

For all Symphony BDK 2.0 applications, you should start with the [Symphony Bot Generator](../../developer-tools/developer-tools/symphony-bot-generator.md).   As part of the below steps we will also be installing Yeoman which is a project scaffolding framework utility.

```
$ npm i -g yo @finos/generator-symphony
$ mkdir botProject && cd botProject
$ yo @finos/symphony
```

This will prompt you with a number of questions about your bot and Pod configuration.  Type in your bot's metadata, use arrows to scroll, and press enter to move on to the next prompt:

```
$ yo @finos/symphony
  __   __     ___                 _
 \ \ / /__  / __|_  _ _ __  _ __| |_  ___ _ _ _  _
  \ V / _ \ \__ \ || | '  \| '_ \ ' \/ _ \ ' \ || |
   |_|\___/ |___/\_, |_|_|_| .__/_||_\___/_||_\_, |
                 |__/      |_|                |__/ 
	https://developers.symphony.com

Welcome to Symphony Generator v2.6.0
Application files will be generated in folder: /Users/vinay/Downloads/Development/bdk-bot
______________________________________________________________________________________________________
? Enter your pod host develop2.symphony.com
? Enter your bot username bdk-bot
? Select your type of application Bot Application
? Select your programing language Python
Generating RSA keys...
   create rsa/publickey.pem
   create rsa/privatekey.pem
   create requirements.txt
   create resources/logging.conf
   create .gitignore
   create readme.md
   create resources/all_symphony_certs.pem
   create resources/config.yaml
   create resources/gif.jinja2
   create src/__main__.py
   create src/activities.py
   create src/gif_activities.py

No change to package.json was detected. No package manager install will be executed.

You can now update the service account bdk-bot with the following public key on https://develop2.symphony.com/admin-console : 

-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEAuAVAH+B3YrA5lIiuIWqYeaNmIWG6YIp28TWkKuVMzsCEhspf2pJu
FtygcY/LDQW8enebpt+PAXq3g0HixqnHOynn9ygvXD7+0h0NeLd935RsWaLNfjtV
DbtnMuvBE13OIemS9RwpF3jCzpcSuaB2M5KdJ+RZQku9GoQZRRrT5XGPoJ3v2UqB
+t8/s4em1Pnhe6LHbgTKmpdM1RAgnBHoHWhh4ONPEX6L1NJX688toYf7bYdv/2sA
8VO+np5Ch+mIL1LDH3YtJXeBoAPmrGoGdp7ylB5teAFJ0yHStENc9nnK0eJmbGxT
gKaCOrJifjdYVpEnh7GGCzLp/KzJ+JxkfuQZZlFlNiO7rPaWKl3tqKofZggEGxEc
jOcoGtaH1A/92SD/jb37dL5vTh0BV3EAjzKag/35uyerjsNgb9QR1ciYi82TJNCK
FGh1RM04O4h4NSWl3b9HF91CN2jpty+vtGvfolg6I9kBzVpwO12z1HpjccRdwgmw
YIVbhKQc9mKqOhHfXr/BmjUDFW7YSK/4KO+P3xqL9TrFNz2uKwE339EqDlftPQqV
mgU/6ovs2Zdo5E1UpwBeuKXqsjmYkVsCDtovICYqLFMxVtj3dGy0X7LT342JXsa7
3PdQJA33LxTzH8B3dk+P/UTAIxSRiWKsjJ85WXaGMrjB+f6qOl9C5X8CAwEAAQ==
-----END RSA PUBLIC KEY-----

Your Python project has been successfully generated !
```

## 2.  Configure your Bot

Once you have your generated bot scaffold, the next step is to configure your bot user.

Ensure that your pod admin has created a corresponding service account on the admin portal of your Symphony Pod. Additionally, you must upload the generated RSA public key for the service account created.

Copy the entire contents of this RSA public key including the dashes on either side, and hand it to your pod admin and request for it to be saved against the respective service account you will be using.

{% hint style="info" %}
Note: The bot username and bot email address entered to the Symphony Bot Generator must match exactly the Basic Information shown in the Pod above.
{% endhint %}

![](<../../.gitbook/assets/screen-shot-2020-12-10-at-4.41.40-pm (1) (1).png>)

#### Create configuration file

Before implementing any code, you need to navigate to your `../resources/config.yaml` configuration file, and adjust it according to your Symphony environment.  The following configuration file is generated by default:

{% tabs %}
{% tab title="../resources/config.yaml" %}
```yaml
host: develop2.symphony.com

ssl:
  trustStore:
    path: resources/all_symphony_certs.pem

bot:
  username: bdk-bot
  privateKey:
    path: rsa/privatekey.pem
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
&#x20;Depending on your Symphony environment you may need to make, update and add additional values to your `config.yaml` file.

Click [here](https://symphony-bdk-python.finos.org/markdown/configuration.html) for more detailed documentation about BDK configuration
{% endhint %}