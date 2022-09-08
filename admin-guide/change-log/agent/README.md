---
description: >-
  Please find in the subpages below the list of changes related to each version
  of the agent.
---

# Agent

{% hint style="info" %}
Latest Agent version can be downloaded [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.6.2.zip).
{% endhint %}

## New Agent Release Cycle

### Release Cycle

Since Agent 22.6, a new Release Cycle has been put in place for the Agent.

Agent 20.14 was the last agent to be released via the same schedule as SBE. Starting with the next version, Agent 22.6, agents release cadence will not be coupled to SBE's anymore, and its release version number will follow a year.month.patch pattern.

### Long Term Support (LTS)

Be aware that a new Long Term Support strategy has been introduced for the Agents that are installed on-premise:

* Only one version per quarter will be supported as LTS: yy.3, yy.6, yy.9, and yy.12.
* The other versions (yy.1, yy.2, yy.4, yy.5, yy.7, yy.8, yy.10, and yy.11) won't benefit from our Long Term Support. They will be however released and available to install on our website as they might get features that you are interested in.
* The last four LTS versions only will be supported, all older ones will move to the archives.

_As an example, if you have installed Agent 22.8 but would like to benefit from a fix that has been backported to the LTS versions, then an upgrade of your Agent will be necessary to latest 22.9 version (a choice might be needed from you if we already released later LTS versions like 22.12)._

### Compatibility with SBE

When released, new Agents are compatible with the production supported SBE versions.

LTS Agents may be updated as patch if any incompatibility is found with new SBE versions released.
