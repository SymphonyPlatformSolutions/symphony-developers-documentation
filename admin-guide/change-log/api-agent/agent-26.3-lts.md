# Agent - 26.3 (LTS)

## Change log

### Agent 26.3.1

* [Datahose API](https://rest-api.symphony.com/main/datahose/datahose-read-events) (/agent/v5/events/read): Added support for [generic system events](https://docs.developers.symphony.com/bots/datafeed/real-time-events#generic-system-event) in datahose with eventTypes = `GENERICSYSTEMEVENT`

### Changes introduced since last LTS version

* Fixed security vulnerabilities.
* Internal only: Added the support for On Behalf Of flows (OBO) when the Agent is deployed in customer's Confidential Cloud environment.
