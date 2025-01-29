# Agent - 24.12 (LTS)

{% hint style="info" %}
To download the Agent 24.12, click [here](https://static.symphony.com/agent/agent-24.12.2.zip).
{% endhint %}

## Change log

### Agent 24.12.2

* SKD: Properly handle user deactivation when SKD (Simplified Key Delivery) is enabled. <mark style="color:red;">**Important**</mark>: To enable SKD, please upgrade to this Agent version.
* Fixed security vulnerabilities.

### Agent 24.12.1

* Support SKD deployment model (Simplified Key Delivery) - This new deployment model allows to isolate the Key manager better. Thanks to SKD, you can remove the network connectivity between the Key Manager and your Agent / Bots for enhanced security. For more information, contact your Technical Account Manager, or the support team. SKD is not enabled by default, config steps are required for activation.
* Cryptographic encryption v2 is now enabled by default - This enhanced encryption is **not compatible** with SBE version **lower than SBE 20.16**.

### Changes introduced since last LTS version

* Fixed security vulnerabilities
* DLP: Error message for case where a stream is not found is now more explicit.
  * Added diagnostic error message for WARN actions
* DLP violation API: support case of violations in multiple dictionaries and support ruleResults parameter
