# BDK 2.0

## Summary

* Description
* Installation
* Configuration
* Authentication
* Datafeed Management
* Activities API
* Message + Room Management
* Messages Templating

## Description

The BDK 2.0 is the latest version of the Symphony Bot Developer Kit, a Java specific SDK that provides all of the basic support as our other SDKs including datafeed management, convenient error handling, and API bindings. With an ultra simplified configuration and authentication setup, intuitive message and room management, message templating and a new activities APIs, developing bots on Symphony has never been easier. Continue here to learn how the BDK 2.0 can help power your Symphony Bots, integration and workflow automations today!

## Installation

The easiest way to access the BDK 2.0 and build bots on top of the BDK 2.0 is through the Symphony Yeoman Generator.  

1.  **Install the Symphony Yeoman Generator:**

```text
$ npm i -g generator-symphony
```

{% hint style="info" %}
Note: If you already have the Symphony Yeoman Generator installed, upgrade it by running the following: `npm update -g generator-symphony`
{% endhint %}

    2.  **Create a new directory and navigate inside:**

```text
$ mkdir bdk-bot && cd bdk-bot
```

    3.  Run the generator:

```text
$ yo symphony 2.0
```

You should see the following:

![](../../.gitbook/assets/screen-shot-2020-09-15-at-12.48.13-pm.png)

## Configuration

Once installed, the next step is to configure your new Symphony Bot using the Yeoman Generator.  In the command line, enter the information for your Symphony environment and Bot metadata.  For example:

![](../../.gitbook/assets/screen-shot-2020-09-15-at-1.51.24-pm.png)

After pressing enter, the Yeoman Generator will generate a RSA public/private key pair and generate your bot project scaffold.  Open your generated project in your Java IDE of choice and navigate to your generated `config.yaml` file: 

{% hint style="info" %}
Note: In the generated config.yaml file, the BDK assumes your Symphony Pod, Agent, and Key Manager components are all access via the same host, port, and scheme.  
{% endhint %}

{% tabs %}
{% tab title="bdk-bot/src/main/resources/config.yaml" %}
```yaml
host: develop2.symphony.com

bot:
  username: bot-sdk-bot
  privateKeyPath: /Users/reed.feldman/bdk-bot/src/main/resources/rsa/privatekey.pem
```
{% endtab %}
{% endtabs %}

By the default this configuration file is generated, however you can customize this file to meet the specifications of your symphony environment.  The following configuration properties can be added to this `config.yaml` file: 

### Basic Configuration Structure

| Property | Description |
| :--- | :--- |
| `host` | component URL |
| `port` | component port available |
| `context` | component  context |
| `scheme` | https or http |
| `pod` | contains pod metadata including `host`, `port`, `scheme`, `context`, and `proxy` attributes |
| `bot` | contains bot metadata including `username`, `privateKeyPath`, `certificatePath`, and`certificatePassword`  |
| `app` | contains extension app metadata including `appId`, `privateKeyPath`, `certificatePath`, and `certificatePassword` |
| `ssl` | contains `trustStore` and `trustStore` password for SSL communication |

### Datafeed Configuration Structure

| Property | Description |
| :--- | :--- |
| `version` | version of the datafeed service to be used.  By default, the bot will use the datafeed v1 service. |
| `idFilePath` | the path to the file which will be used to persist a created datafeed id in case the datafeed service v1 is used |
| `retry` | the specific retry configuration can be used to override the global retry configuration.  If no retry configuration is defined, the global one will be used.   |

### Retry Configuration Structure

| Property  | Description |
| :--- | :--- |
| `maxAttempts` | maximum number of retry attempts that a bot is able to make |
| `multiplier` | after each attempt, the interval between two attempts will be multiplied by this factor |
| `initialIntervalMillis` | the initial interval between two attempts |
| `maxIntervalMillis` | the limit of interval between two attempts.  For example, if the current interval is 1000 ms, multiplier is 2.0 and the `maxIntervalMillis` is 1500 ms, then the interval for the next retry will be 1500 ms. |

An example customized configuration file is seen below:

{% tabs %}
{% tab title="config.yaml" %}
```yaml
scheme: https
host: localhost.symphony.com
port: 8443

pod:
  host: dev.symphony.com
  port: 443

agent:
  context: agent

keyManager:
  host: dev-key.symphony.com
  port: 8444

sessionAuth:
  host: dev-session.symphony.com
  port: 8444

bot:
  username: bot-name
  privateKeyPath: path/to/private-key.pem
  certificatePath: /path/to/bot-certificate.p12
  certificatePassword: changeit

ssl:
  trustStorePath: /path/to/all_symphony_certs_truststore
  trustStorePassword: changeit

app:
  appId: app-id
  privateKeyPath: path/to/private-key.pem

datafeed:
  version: v1
  retry:
    maxAttempts: 6
    initialIntervalMillis: 2000
    multiplier: 1.5
    maxIntervalMillis: 10000

retry:
  maxAttempts: 6
  initialIntervalMillis: 2000
  multiplier: 1.5
  maxIntervalMillis: 10000
```
{% endtab %}
{% endtabs %}

## Authentication

Authenticating your Bot is made simple when using the BDK 2.0.  Once you have your Bot and Symphony environment properly configured, the generated code provides an out of the box implementation for authenticating your Bot:

{% tabs %}
{% tab title="BotApplication.java" %}
```java
final SymphonyBdk bdk = new SymphonyBdk(loadFromClasspath("/config.yaml"));
```
{% endtab %}
{% endtabs %}

 By instantiating a new `SymphonyBdk` instance with your `config.yaml` file, the BDK loads in your config and authenticates your bot.  Once authenticated, your bot is ready to leverage the REST API to create rich automations and workflows on Symphony. 

{% hint style="info" %}
Note:  You must have a corresponding service or Bot account setup on your Symphony instance before authenticating.  For more information navigate to the [Creating a Bot User](../../building-bots-on-symphony/configuration/creating-a-bot-user.md) guide.
{% endhint %}

## Datafeed Management

The BDK 2.0 provides an `DatafeedService` interface that makes it easier than ever for bots to manage real-time messages and events.  The `DatafeedService` interface provides the following methods for your bot to use: 

| Method | Descriptions |
| :--- | :--- |
| `start()` | Start the bot's datafeed |
| `stop()` | Stop the bot's datafeed |
| `subscribe(RealTimeEventListener)` | Subscribe a custom event listener class.  Inside this class is where the bulk of your business logic goes.   |
| `unsubscribe(RealTimeEventListener)` | Unsubscribe from a custom event listener class. |

In order for bots to listen for incoming events and messages, bots must subscribe to a custom `RealTimeEventListener`.  This `RealTimeEventListener` class implements eventType methods \(e.g. `onMessageSent()`\) along with custom business logic inside.  

When a user sends a bot a message, the Bot will pick up the event from the datafeed and check to see if an implemented eventType method matches the eventType \(`MESSAGESENT`\) of the inbound event.  If there is a corresponding eventType method registered, the bot will execute the business logic inside of this eventType method.  Otherwise the Bot will not perform an action and will continue to listen for inbound events from the datafeed.  An example implementation is provided out of the box by the BDK 2.0:

{% tabs %}
{% tab title="BotApplication.java" %}
```java
 // subscribe to "onMessageSent" real-time event
    bdk.datafeed().subscribe(new RealTimeEventListener() {

      @Override
      public void onMessageSent(V4Initiator initiator, V4MessageSent event) {
        // on a message sent, the bot replies with "Hello, {User Display Name}!"
        bdk.messages().send(event.getMessage().getStream(), "<messageML>Hello, " + initiator.getUser().getDisplayName() + "!</messageML>");
      }
    });
```
{% endtab %}
{% endtabs %}

 For more information on the Symphony datafeed continue here:

{% page-ref page="../../building-bots-on-symphony/datafeed.md" %}



