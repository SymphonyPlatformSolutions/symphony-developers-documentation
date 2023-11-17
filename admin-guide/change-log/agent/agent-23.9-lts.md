# Agent - 23.9 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.9.6.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.9.6

* Fixed error 503 when timing out on legacy datafeed API /agent/v4/datafeed in edge cases
* Fixed logs not reporting the correct duration of the request for datafeed endpoints

### Agent 23.9.5

* Fixed security vulnerabilities.

### Agent 23.9.4

* Fix potential retry loop issue when sending large attachments with DLP. This is the rollback of a change introduced on Agent 23.9.2, that could cause a side effect on retry mechanisms. Please engage with your Technical Account Manager if you are still encountering DLP timeout issues when sending large attachments.

### Agent 23.9.3

* Fixed security vulnerabilities.
* Fixed issue preventing bots from getting message replies containing tables.
* Support calling API endpoints with a trailing /, for example `/agent/v2/HealthCheck/` instead of the usual `/agent/v2/HealthCheck`, for backward compatibility with older agent versions. This is however not recommended and does not follow the API specifications.

### Agent 23.9.2

* The Datafeed bridge is now enforced. This means that API calls made to the legacy datafeed v1 APIs will be translated to the new Datafeed v2 service. Please note that this is a workaround and that it is still advised to upgrade your bot to directly use the Datafeed v2 APIs to benefit from increased reliability. More info on the bridge [here](../../../bots/datafeed/#datafeed-v1-deprecation-notice).
* New css properties are supported in MessageML in order to make it easier to organise the layout of your messages. All `flex` and `grid` properties are now supported, in addition to `align` and `justify` properties. The full list of supported properties is available [here](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/style-attributes.md).
* Fixed issue where sending a message with a large attachment would fail because of Data Loss Prevention (DLP) scan time out.
* Fixed Cross-Origin Resource Sharing (CORS) issue on allowed domains check.
* URL links sent from bots are now correctly displayed on Mobile when they have a title.&#x20;
* Changes since last LTS version (23.6)
  * Fixed security vulnerabilities.
  * Changed how the limits on the size of the messages are enforced. **This change has no effect until a future SBE release is deployed**, where the limits on the size of the messages will be increased (total number of characters, number of tokens, number of entities). This improvement will be documented in the release notes of the corresponding SBE release.&#x20;

###
