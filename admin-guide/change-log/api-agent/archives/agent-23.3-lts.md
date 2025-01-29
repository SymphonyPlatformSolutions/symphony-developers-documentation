# Agent - 23.3 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.3.2.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.3.2

* Fixed `/agent/actuator` endpoints so they work even if the Agent runs with same `management.server.port` than `server.port`
* Fixed security vulnerabilities.
* Changes since last LTS release (22.12)
  * Fixed a regression with a deprecated service (Create Message v2) causing issue to the Universal Webhook 1.0 integration
  * Fixed security vulnerabilities

