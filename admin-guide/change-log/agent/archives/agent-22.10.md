# Agent - 22.10

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.10.3.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 22.10.3

* Fixed missing `companyWide` field in payload when using our signal create/update API
* Fixed a syntax error in default agent.yml file

### Agent 22.10.2

* Fixed an issue occurring with datafeed read service for bots developed with Python BDK on a lower version than 2.4.0

### Agent 22.10.1

* [Cashtag](../../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags.md) restrictions were lifted: among them, note that cashtags sent by bots can now include whitespace (eg: _$123 EOL_) and be numeric-only (eg: _$123_)
* From Agent 20.9.3:
  * Support of [blast](https://developers.symphony.com/restapi/reference/blast-message) endpoint optimisation for sending attachments
