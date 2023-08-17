# Configuration

The Symphony Generator creates a basic configuration file that assumes a fully cloud-hosted Symphony pod architecture. In this scenario, the pod, key manager and agent are all hosted on the same domain e.g. `develop2.symphony.com`. If your pod architecture is different and you have other connectivity requirements like a network proxy, you will need to add those options to your configuration file.

{% hint style="info" %}
If you are using the BDK for Java's Spring Starter, the BDK configuration is embedded within Spring's configuration file under the bdk section
{% endhint %}

{% tabs %}
{% tab title="Basic Configuration File" %}
```yaml
host: develop2.symphony.com
bot:
  username: bdk-bot
  privateKey:
    path: rsa/privatekey.pem
```
{% endtab %}

{% tab title="Basic Configuration File (Spring)" %}
```yaml
bdk:
  host: develop2.symphony.com
  bot:
    username: bdk-bot
    privateKey:
      path: rsa/privatekey.pem
```
{% endtab %}
{% endtabs %}

## Basic Configuration Structure

| Property                                                                 | Description                                                                                                       |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `host`                                                                   | Global hostname                                                                                                   |
| `port`                                                                   | Global port                                                                                                       |
| `scheme`                                                                 | `https` or `http`                                                                                                 |
| `context`                                                                | Context path (e.g. /abc)                                                                                          |
| <p><code>pod</code><br><code>agent</code><br><code>keyManager</code></p> | Contains component details including `host`, `port`, `scheme`, `context` and `proxy` attributes                   |
| `bot`                                                                    | contains bot metadata including `username`, `privateKeyPath`, `certificatePath` and`certificatePassword`          |
| `app`                                                                    | contains extension app metadata including `appId`, `privateKeyPath`, `certificatePath`, and `certificatePassword` |
| `ssl`                                                                    | contains `trustStore` and `trustStore` password for SSL communication                                             |

## Datafeed Configuration Structure

| Property     | Description                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `version`    | version of the datafeed service to be used.  By default, the bot will use the datafeed v2 service.                                                           |
| `idFilePath` | the path to the file which will be used to persist a created datafeed id in case the datafeed service v1 is used                                             |
| `retry`      | the specific retry configuration can be used to override the global retry configuration.  If no retry configuration is defined, the global one will be used. |

## Retry Configuration Structure

<table data-header-hidden><thead><tr><th width="469">Property</th><th>Description</th></tr></thead><tbody><tr><td>Property</td><td>Description</td></tr><tr><td><code>maxAttempts</code></td><td>maximum number of retry attempts that a bot is able to make</td></tr><tr><td><code>multiplier</code></td><td>after each attempt, the interval between two attempts will be multiplied by this factor</td></tr><tr><td><code>initialIntervalMillis</code></td><td>the initial interval between two attempts</td></tr><tr><td><code>maxIntervalMillis</code></td><td>the limit of interval between two attempts.  For example, if the current interval is 1000 ms, multiplier is 2.0 and the <code>maxIntervalMillis</code> is 1500 ms, then the interval for the next retry will be 1500 ms.</td></tr></tbody></table>

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
