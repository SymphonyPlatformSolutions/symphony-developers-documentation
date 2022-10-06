# Agent - 22.7

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.7.1.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Announcement

{% hint style="warning" %}
Since Agent 22.6, a new Release Cycle has been put in place for the Agent.

Agent 20.14 was the last agent to be released via the same schedule as SBE. Starting with the next version, Agent 22.6, agents release cadence will not be coupled to SBE's anymore, and its release version number will follow a year.month.patch pattern.

Please refer to the [main page](./) for more information (release cadence, new Long Term Support)
{% endhint %}

## Agent Changes

### Agent 22.7.1

* [Datahose - Read Events](https://developers.symphony.com/restapi/reference/datahose-read-events) now supports `eventTypes`, which will allow to restrict the payload to the only [Real Time Events](../../../building-bots-on-symphony/datafeed/real-time-events.md) requested.\
  _Please note that this is a breaking change from the version that was released with the 22.6 Agent: indeed the_ `filters` _parameter is no longer supported._\
  _Note also that Datahose still remains as beta._
* The agent does not store the authentication token in clear in cache anymore.
* Fixed some logging security vulnerability.
