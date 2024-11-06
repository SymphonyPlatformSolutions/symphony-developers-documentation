# Agent - 24.9 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://static.symphony.com/agent/agent-24.9.3.zip).\
For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 24.9.3

* DLP violation API now supports the Audit Trail 2 API parameters: Customers using the DLP enforcement API for detailing enforcements natively on Expression Filters v3 (EFv3) can continue to use their existing endpoints in order to download enforcement data such as: _‘Keyword Blocked’, ‘Keyword Unavailable’, ‘Expression Warning’, ‘Expression Blocked’, ‘Expression Logged’, ‘File Blocked’, ‘File Logged’._ but will require changing the parameters used to reference AT2.&#x20;
  * Customers which tenant is hosted on GCP, and willing to use the DLP enforcement APIs, are required to configure their Agent with the following flag: `agent.dlp.violationSource` set to "`audit`".&#x20;
* DLP violation API: fixed value of ignoreDlpWarning
* DLP violation API: support case of violations in multiple dictionaries

### Agent 24.9.1

* Upgrade to Spring 3.3.2
* Upgrade jetty dependency

### Changes introduced since last LTS version

* Fixed security vulnerabilities
* (future use) Introduced new 'tier' parameter for message search APIs. This property will be documented once the feature becomes available.
