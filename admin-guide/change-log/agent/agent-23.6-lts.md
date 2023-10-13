# Agent - 23.6 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.6.5.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.6.5

* Fixed security vulnerabilities.

### Agent 23.6.4

* Fixed security vulnerabilities.
* Fixed Cross-Origin Resource Sharing (CORS) issue on allowed domains check.

### Agent 23.6.2

* Fixed security vulnerabilities.

### Agent 23.6.1

* Enable OBO for the [Message Update](https://developers.symphony.com/restapi/reference/update-message-v4) endpoint.
* Enable OBO for the [Blast Message](https://developers.symphony.com/restapi/reference/blast-message) endpoint.
* **Enable the datafeed bridge by default**.
  * This means that if you dont have a value set in your config file for the property `df1ToDf2Bridge`, then your bots that are still using the Datafeed v1 APIs will transparently start using the Datafeed v2 service. You can still disable this behavior by setting the `df1ToDf2Bridge` parameter to false.&#x20;
  * **Important**: If you copied over your previous Agent config file, then the bridge may still be disabled because the bridge's default value was false in previously provided config files. In order to ensure that the bridge is enabled please check that the `df1ToDf2Bridge` parameter is either absent, or set to true. It is important to start testing your bots with the bridge enabled to discover issues before the bridge is enforced in a subsequent version.&#x20;
* Fixed security vulnerabilities.
* Changes since last LTS release (23.3)
  * Added support of new crypto-packs to allow customers to migrate their HSM integrations to the latest firmwares (HSM 7). If you are interested in this new capability, please get in touch with your Symphony representative. Moving to HSM 7 has dependencies on other components than the agent.
  * Fixed `/agent/actuator` endpoints so they work even if the Agent runs with same `management.server.port` than `server.port`
