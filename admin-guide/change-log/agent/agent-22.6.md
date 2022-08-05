---
description: >-
  This page describes the change log of the 22.6 patch updates of the Agent
  service
---

# Agent - 22.6

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.6.2.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Announcement

{% hint style="warning" %}
Since Agent 22.6, a new Release Cycle has been put in place for the Agent.

Agent 20.14 was the last agent to be released via the same schedule as SBE. Starting with the next version, Agent 22.6, agents release cadence will not be coupled to SBE's anymore, and its release version number will follow a year.month.patch pattern.

Please refer to the [main page](./) for more information (release cadence, new Long Term Support)
{% endhint %}

## Agent Changes

### Agent 22.6.2

* Fixed a bug with the authentication of the ceservice.

### Agent 22.6.1

* A parentMessageId field is now exposed in the payloads returned by the Agent when retrieving information of a message consecutive to either a reply or a forward; it can be used as a link to the original message.
* Datahose API has been released as a _Beta version_. It allows any bot that is authorized by the right entitlements to retrieve all events happening on the pod, including the ones that happen in rooms it is not part of. For more information, follow the link to the [Datahose - Read Events](https://developers.symphony.com/restapi/reference/datahose-read-events) endpoint introduced in our REST API documentation.\
  _Please note that a breaking change will be introduced in the 22.7 version of the Agent: indeed the_ `filters` _parameter will be removed and replaced by another one,_ `eventTypes`_, which will allow to restrict the payload to the only_ [_Real Time Events_](../../../building-bots-on-symphony/datafeed/real-time-events.md) _requested._\
  _Note there is also a dependency on a specific Datafeed v2 version that should be soon deployed to production - more information will be available soon._
* Consequently to the deprecation notice of the Datafeed v1 APIs on [Agent 20.14](agent-20.14.md#deprecation-notice) change log, a bridge has been introduced to facilitate the transition period from Datafeed v1 APIs to Datafeed v2 service. More information are available for the [deprecation timeline and the introduction of the bridge](https://docs.developers.symphony.com/building-bots-on-symphony/datafeed) as well as the [benefits of Datafeed v2](https://developers.symphony.com/restapi/v20.14/reference/datafeed).
* Similarly to its historic capabilities on downloading messages, the ceservice is now able to download attachments even from streams it is not part of.
* Fixed a bug with Blast Message API returning unexpected 500 error message.
* Spring boot has been updated to version 2.6.8

