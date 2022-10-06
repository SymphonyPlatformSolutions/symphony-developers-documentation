# Agent - 22.8

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-22.8.1.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 22.8.1

* Fixed very edgy issue of receiving "Message not found" when using the [create](https://developers.symphony.com/restapi/reference/create-message-v4) message endpoint, although the message has eventually been created due to timing out before retrieving some information from the payload.
* Upgrade of some agent dependencies.
* Spring boot has been updated to version 2.7.0.
