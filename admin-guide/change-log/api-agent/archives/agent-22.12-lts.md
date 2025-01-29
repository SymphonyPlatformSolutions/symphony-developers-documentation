# Agent - 22.12 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.12.3.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 22.12.3

* Fixed `/agent/actuator` endpoints so they work even if the Agent runs with same `management.server.port` than `server.port`
* Fixed security vulnerabilities.

### Agent 22.12.2

* Fixed a regression with a deprecated service (Create Message v2) causing issue to the Universal Webhook 1.0 integration

### Agent 22.12.1

* From previous agent releases since last LTS (22.10 and 22.11):
  * [Cashtag](../../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags/) restrictions were lifted: among them, note that cashtags sent by bots can now include whitespace (eg: _$123 EOL_) and be numeric-only (eg: _$123_)
  * Fixed an issue occurring with datafeed read service for bots developed with Python BDK on a lower version than 2.4.0
  * Fixed issue preventing to create messages when pods have different rotationIds greater than 0
  * Fixed missing `companyWide` field in payload when using our signal create/update API
  * Changes since last LTS release (22.9)
    * Fixed issue preventing to create messages when pods have different rotationIds greater than 0
    * Fixed missing `companyWide` field in payload when using our signal create/update API
    * Fixed an issue occurring with datafeed read service for bots developed with Python BDK on a lower version than 2.4.0
    * Fixed missing `companyWide` field in payload when using our signal create/update API
    * Fixed a syntax error in default agent.yml file
    * Fixed an issue occurring with datafeed read service for bots developed with Python BDK on a lower version than 2.4.0
    * [Cashtag](../../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags/) restrictions were lifted: among them, note that cashtags sent by bots can now include whitespace (eg: _$123 EOL_) and be numeric-only (eg: _$123_)
