# Agent - 23.10

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.10.1.zip).

For a list of Agent x SBE compatibilities, click [here](../../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.10.1

* Removed `jcurl` from the Agent deliverable. If you used this library in your scripts, the library is still available from the following FINOS [repository](https://github.com/finos/JCurl/releases).
* Fixed security vulnerabilities.
* Fixed issue preventing bots from getting message replies containing tables.
* Support calling API endpoints with a trailing /, for example `/agent/v2/HealthCheck/` instead of the usual `/agent/v2/HealthCheck`, for backward compatibility with older agent versions. This is however not recommended and does not follow the API specifications.
