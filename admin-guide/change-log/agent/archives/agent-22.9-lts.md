# Agent - 22.9 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.9.7.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 22.9.7

* Fixed `/agent/actuator` endpoints so they work even if the Agent runs with same `management.server.port` than `server.port`
* Fixed security vulnerabilities.

### Agent 22.9.6

* Fixed a syntax error in default agent.yml file
* Fixed missing `companyWide` field in payload when using our signal create/update API

### Agent 22.9.5

* Fixed an issue occurring with datafeed read service for bots developed with Python BDK on a lower version than 2.4.0

### Agent 22.9.4

* Fixed legacy startup.sh script

### Agent 22.9.3

* Support of [blast](https://developers.symphony.com/restapi/reference/blast-message) endpoint optimisation for sending attachments.

### Agent 22.9.2

* The Swagger [specifications](https://github.com/finos/symphony-api-spec) from the agent are now generated under the OpenAPI 3.0 standard.\
  _Please note you can still find a swagger2 folder to retrieve the last specifications that were generated in the 2.0 standard. However, we will remove these in Q1 2023 and they will not be updated with potential updates of our agent APIs. To use new features to be introduced in the future, please migrate to using our 3.0 specifications._
* From previous agent releases since last LTS (22.7 and 22.8):
  * Fixed very edgy issue of receiving "Message not found" when using the [create](https://developers.symphony.com/restapi/reference/create-message-v4) message endpoint, although the message has eventually been created due to timing out before retrieving some information from the payload.
  * Upgrade of some agent dependencies.
  * Spring boot has been updated to version 2.7.0.
  * [Datahose - Read Events](https://developers.symphony.com/restapi/reference/datahose-read-events) now supports `eventTypes`, which will allow to restrict the payload to the only [Real Time Events](../../../../bots/datafeed/real-time-events.md) requested.\
    _Please note that this is a breaking change from the version that was released with the 22.6 Agent: indeed the_ `filters` _parameter is no longer supported._\
    _Note also that Datahose still remains as beta._
  * The agent does not store the authentication token in clear in cache anymore.
  * Fixed some logging security vulnerability.

&#x20;

###
