# Agent - 24.3 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://static.symphony.com/agent/agent-24.3.3.zip).\
For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 24.3.3

* Fixed security vulnerabilities.

### Agent 24.3.2

* Support inserting financial instruments (enhanced tags) in MessageML using our financial instrument resolver. Stocks, ETFs, Indices and Currency pairs are supported. More information is available in [#tags](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags/#tags "mention").

### Changes introduced since last LTS version

* Fix a case where invalid session does not return the right HTTP 401, when cryptoV2 enabled.
* Enriched error when timing out on sending a message.
* Support for attachments when updating a  message.
* Add to the real-time events the list of tenant identifiers (pods) where the event was distributed.
* Fixed security vulnerabilities.
