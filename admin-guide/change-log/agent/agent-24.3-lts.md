# Agent - 24.3 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-24.3.3.zip).\
For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 24.3.3

* Fixed security vulnerabilities.

### Agent 24.3.2

* Support inserting financial instruments (enhanced tags) in MessageML. This feature is **not yet generally available** and will be released officially in the coming months. More information is available in [#tags](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags.md#tags "mention").

### Changes introduced since last LTS version

* Fix a case where invalid session does not return the right HTTP 401, when cryptoV2 enabled.
* Enriched error when timing out on sending a message.
* Support for attachments when updating a  message.
* Add to the real-time events the list of tenant identifiers (pods) where the event was distributed.
* Fixed security vulnerabilities.
