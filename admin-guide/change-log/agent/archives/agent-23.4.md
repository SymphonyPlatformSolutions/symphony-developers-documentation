# Agent - 23.4

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.4.1.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.4.1

* Added support of new crypto-packs to allow customers to migrate their HSM integrations to the latest firmwares (HSM 7). If you are interested in this new capability, please get in touch with your Symphony representative. Moving to HSM 7 has dependencies on other components than the agent.
* Fixed `/agent/actuator` endpoints so they work even if the Agent runs with same `management.server.port` than `server.port`
* Fixed security vulnerabilities.
