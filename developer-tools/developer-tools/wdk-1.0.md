# WDK 1.0

### Summary

* [Description](wdk-1.0.md#description)
* [Installation](wdk-1.0.md#installation)
* [Configuration](wdk-1.0.md#configuration)
* [Authentication](wdk-1.0.md#authentication)
* [Running your bot](wdk-1.0.md#running-your-bot)
* [Orchestrating Workflows](wdk-1.0.md#orchestrating-workflows-with-wdk-1.0)
* [Activities & Events](wdk-1.0.md#activities-and-events)

### Description

The Workflow Developer Kit - WDK 1.0 is our low-code developer toolkit which developers can use to build workflow based bots on Symphony.  To accelerate the development of bots, the WDK, built on top of the BDK takes it one step further by enabling developers to create applications without writing code.&#x20;

#### SWADL&#x20;

The Symphony Workflow Automation Definition Language or SWADL for short is the format used to write workflows.  Workflows are written in a declarative manner, giving access to most of the Symphony APIs to react on events and perform actions as common as sending messages to users. &#x20;

Workflows are then executed by a generic bot that runs a workflow execution engine.  As a workflow developer, you simply write workflows in SWADL files and provide them to the bot for execution.

Continue here to learn how WDK 1.0 can help power your Symphony bots and integrations today!

* The WDK 1.0 Github repo can be found here: [https://github.com/finos/symphony-wdk](https://github.com/finos/symphony-wdk)
* The WDK 1.0 Certification course can be found here: [https://learn.symphony.com/bundles/workflow-developer-certification](https://learn.symphony.com/bundles/workflow-developer-certification)

### Installation

The easiest way to access WDK 1.0 and build workflow bots on top of the WDK is through the Symphony Bot Generator.

1. **Install the Symphony Bot Generator:**

```
$ npm i -g @finos/generator-symphony
```

{% hint style="info" %}
Note: If you already have the Symphony Bot Generator installed, upgrade it by running the following: `npm update -g` @finos/generator-symphony
{% endhint %}

1. **Create a new directory and navigate inside:**

```
$ mkdir wdk-bot && cd wdk-bot
```

&#x20;   2\.  **Run the generator:**

```
$ yo @finos/symphony
```

**You should see the following:**

![](<../../.gitbook/assets/Screenshot 2022-08-09 at 12.26.07 pm.png>)

### Configuration

Once installed, the next step is to configure your new Symphony workflow bot using the Symphony Bot Generator. In the command line, enter the information for your Symphony environment and bot metadata.  ****  For example:

![](<../../.gitbook/assets/Screenshot 2022-08-09 at 12.28.16 pm.png>)

After pressing enter, the Symphony Bot Generator will generate a RSA public/private key pair and generate your workflow bot project scaffold. Open your generated project in your IDE of choice and navigate to the generated `application.yaml` file:

{% hint style="info" %}
Note: In the generated `config.yaml` file, the WDK assumes that your Symphony Pod, Agent, and Key Manager components are all accessible via the same host, port, and scheme.
{% endhint %}

The workflow bot is a Java application built with the [BDK Spring Boot integration](https://symphony-bdk-java.finos.org/spring-boot/core-starter.html). As the Spring Boot integration of the BDK is used, most of the [principles](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config) from the framework applies here.

#### Workflow bot specific configuration

The path to the folder containing SWADL files to load on startup and to watch for changes. Defaults to `./workflows`, relative to the working directory when starting the bot.

#### BDK specific configuration

Symphony backend URL and credentials are configured as any bot.  The BDK configuration is under the `bdk` key.

{% tabs %}
{% tab title="wdk-bot/application.yaml" %}
```yaml
# For more information, please refer to deployment documentation: https://github.com/finos/symphony-wdk/blob/master/docs/deployment.md
bdk:
  host: develop2.symphony.com
  bot:
    username: wdk-bot
    privateKey:
      path: rsa/privatekey.pem
```
{% endtab %}
{% endtabs %}

By default this configuration file is generated, however you can customize this file to meet the specifications of your symphony environment. The following configuration properties can be added to this `application.yaml` file:

#### Basic Configuration Structure

| Property  | Description                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| `host`    | component URL                                                                                                     |
| `port`    | component port available                                                                                          |
| `context` | component  context                                                                                                |
| `scheme`  | https or http                                                                                                     |
| `pod`     | contains pod metadata including `host`, `port`, `scheme`, `context`, and `proxy` attributes                       |
| `bot`     | contains bot metadata including `username`, `privateKeyPath`, `certificatePath`, and`certificatePassword`         |
| `app`     | contains extension app metadata including `appId`, `privateKeyPath`, `certificatePath`, and `certificatePassword` |
| `ssl`     | contains `trustStore` and `trustStore` password for SSL communication                                             |

#### Datafeed Configuration Structure

| Property     | Description                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `version`    | version of the datafeed service to be used.  By default, the bot will use the datafeed v2 service.                                                           |
| `idFilePath` | the path to the file which will be used to persist a created datafeed id in case the datafeed service v1 is used                                             |
| `retry`      | the specific retry configuration can be used to override the global retry configuration.  If no retry configuration is defined, the global one will be used. |

#### Retry Configuration Structure

| Property                | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxAttempts`           | maximum number of retry attempts that a bot is able to make                                                                                                                                                   |
| `multiplier`            | after each attempt, the interval between two attempts will be multiplied by this factor                                                                                                                       |
| `initialIntervalMillis` | the initial interval between two attempts                                                                                                                                                                     |
| `maxIntervalMillis`     | the limit of interval between two attempts.  For example, if the current interval is 1000 ms, multiplier is 2.0 and the `maxIntervalMillis` is 1500 ms, then the interval for the next retry will be 1500 ms. |

An example customized configuration file is seen below:

{% tabs %}
{% tab title="wdk-bot/application.yaml" %}
```yaml
# For more information, please refer to deployment documentation: https://github.com/finos/symphony-wdk/blob/master/docs/deployment.md
bdk:
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
    username: wdk-bot
    privateKey:
      path: rsa/privatekey.pem
    privateKeyPath: path/to/private-key.pem
    certificatePath: /path/to/bot-certificate.p12
    certificatePassword: changeit

  ssl:
    trustStorePath: /path/to/all_symphony_certs_truststore
    trustStorePassword: changeit

  app:
    appId: app-id
    privateKey:
      path: path/to/private-key.pem

  datafeed:
    version: v2
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

### Authentication

Authenticating your bot is made simple when using the WDK 1.0. Once you have your bot and Symphony environment properly configured, the `workflow-bot-app.jar` provides an out of the box implementation for authenticating your bot.  You just need to ensure your `application.yaml` exists in the root folder.  The WDK loads in your config and authenticates your workflow bot. Once authenticated, your bot is ready to leverage the REST APIs in order to create rich automations and workflows on Symphony.

{% hint style="info" %}
Note: You must have a corresponding service or bot account setup on your Symphony instance before authenticating. For more information navigate to the [Creating a Bot User](../../building-bots-on-symphony/configuration/creating-a-bot-user.md) guide.
{% endhint %}

#### OBO Authentication

WDK 1.0 also supports OBO (On-Behalf-Of) pattern of authentication, allowing an authenticated bot + extension application to perform operations on behalf of a given user. The WDK's implementation makes it easy to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs and MIMs with other users
* Send messages and attachments
* Set the context user's own presence

To leverage an OBO based workflow, simply include the `app` credentials to be used for authenticating your OBO Session within your `application.yaml`.  Once authenticated your workflow bot can perform any of the OBO workflows listed above:

{% tabs %}
{% tab title="wdk-bot/application.yaml" %}
```yaml
host: develop2.symphony.com
# For more information, please refer to deployment documentation: https://github.com/finos/symphony-wdk/blob/master/docs/deployment.md
bdk:
  host: develop2.symphony.com
  bot:
    username: wdk-bot
    privateKey:
      path: rsa/privatekey.pem
# For OBO authentication 
  app:
    appId: app-id
    privateKey:
      path: path/to/private-key.pem
```
{% endtab %}
{% endtabs %}

### Running your bot

The generator creates for you the configuration file of the bot, along with its credentials. As the workflow bot is made using Java you will need a JRE to run it.

Running the bot is as simple as:

```
$ java -jar workflow-bot-app.jar
```

We also provide a sample Dockerfile as an alternative, in that case the image can be built and executed with:

```
$ docker build -t workflow-bot .
$ docker run -ti workflow-bot
```

{% hint style="info" %}
The generated workflow project includes a sample workflow which is placed in the `workflows/` folder.  It is automatically deployed and will be re-deployed on changes.
{% endhint %}

### Orchestrating Workflows

#### Workflows

A Symphony workflow can be thought of as a sequence of operations or a repeatable pattern of activities that are organized together in order to transform data, provide a service, or process information. Each of these operations or activities may be completed by a single user, shared between a bot and a user, or shared between multiple actors including bots, users, and even third party systems.

The generated workflow bot comes with a sample workflow which is shown below:

{% tabs %}
{% tab title="wdk-bot/workflows/ping.swadl.yaml" %}
```yaml
activities:
  - send-message:
      id: pingPong
        on:
          message-received:
            content: /ping
      content: "Pong"
```
{% endtab %}
{% endtabs %}

Now in any conversations the workflow bot is part of, if the message `/ping` is sent, the bot will reply with `Pong`. Each received `ping` message creates a workflow instance and executes the `pingPong` activity.

You can find more example workflows [here](https://github.com/finos/symphony-wdk/tree/master/docs/examples), and our [Symphony WDK Gallery](https://github.com/finos/symphony-wdk-gallery).&#x20;

### Activities & Events

#### Activities

Activities are the building blocks of workflows, the actions to be performed. For instance the most commonly used activity for a bot interacting with end-users is probably the `send-message` activity.

An activity usually takes some inputs, for instance the `send-message` activity will take the content of the message as an input.  Depending on the performed action it can generate [outputs](https://github.com/finos/symphony-wdk/blob/master/docs/concepts.md#outputs) such as the sent message for the `send-message` activity. Activities also have common properties such as an `id` which will be useful to reference it elsewhere in the workflow (to access the activity's outputs for instance).

In a workflow, activities are often defined sequentially, one after another. Once an activity completes, the next one is executed.  As a workflow developer you might want to implement your own logic and reuse it in workflows.  The WDK also supports the creation of your own [Custom activities](https://github.com/finos/symphony-wdk/blob/master/docs/custom-activities.md).

#### Events

A workflow requires at least one starting event, used to create a workflow instance from a deployed workflow and to start executing activities. This means the first activity of a workflow must define at least one event.

Workflow activities are executed sequentially by default meaning the default event (if no others are defined) for an activity is the `activity-completed` one with completed activity id being the activity declared before.

{% tabs %}
{% tab title="wdk-bot/workflows/hello.swadl.yaml" %}
```yaml
id: hello-bye-workflow
activities:
  - send-message:
      id: sendHello
      on:
        message-received:
          content: /hello
      content: "Hello"
  - send-message:
      id: sendBye
      content: "Bye"
```
{% endtab %}
{% endtabs %}

In the example above, `sendHello` is executed first when a _/hello_ message is sent, then `sendBye`.

Intermediate events can be defined too, for instance for a workflow when the user has to provide multiple inputs to move through the activities or if the workflow sent a form and is waiting for a reply.

{% tabs %}
{% tab title="wdk-bot/workflows/hello2.swadl.yaml" %}
```yaml
id: hello-bye2-workflow
activities:
  - send-message:
      id: sendHello
      on:
        message-received:
          content: /hello
      content: "Hello"
  - send-message:
      id: sendBye
      on:
        message-received:
          content: /bye
      content: "Bye"
```
{% endtab %}
{% endtabs %}

In the example above, `sendHello` is executed first when a _/hello_ message is sent, then the workflow waits for another message (_/bye_) to execute `sendBye`.

Most of the events a workflow will react on are datafeed events such as message received, user joined room, connection requested.  The workflow bot is listening for any datafeed events its service account can receive and then dispatch them to the appropriate workflows.  Other Event types can be found [here](https://github.com/finos/symphony-wdk/blob/master/docs/concepts.md#events).
