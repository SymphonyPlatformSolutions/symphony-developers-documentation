# Agent - 24.12 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://static.symphony.com/agent/agent-24.12.1.zip).\
For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 24.12.1

* Support SKD deployment model (Simplified Key Delivery) - This new deployment model allows to isolate the Key manager better. Thanks to SKD, you can remove the network connectivity between the Key Manager and your Agent / Bots for enhanced security. For more information, contact your Technical Account Manager, or the support team. SKD is not enabled by default, config steps are required for activation.
* Cryptographic encryption v2 is now enabled by default - This enhanced encryption is **not compatible** with SBE version **lower than SBE 20.16**.

### Changes introduced since last LTS version

* Fixed security vulnerabilities
* DLP: Error message for case where a stream is not found is now more explicit.
  * Added diagnostic error message for WARN actions
* DLP violation API: support case of violations in multiple dictionaries and support ruleResults parameter
