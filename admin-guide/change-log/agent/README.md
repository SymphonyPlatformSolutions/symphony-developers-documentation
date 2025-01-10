# Agent

{% hint style="info" %}
Latest LTS Agent version can be downloaded [here](https://static.symphony.com/agent/agent-24.12.2.zip).
{% endhint %}

Please find in the subpages below the list of changes related to each version of the [Agent](../../agent-guide/) service.

### Compatible with Java 17 / RHEL 8 and 9



{% content-ref url="agent-24.12-lts.md" %}
[agent-24.12-lts.md](agent-24.12-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-24.11.md" %}
[agent-24.11.md](agent-24.11.md)
{% endcontent-ref %}

{% content-ref url="agent-24.10.md" %}
[agent-24.10.md](agent-24.10.md)
{% endcontent-ref %}

{% content-ref url="agent-24.9-lts.md" %}
[agent-24.9-lts.md](agent-24.9-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-24.6-lts.md" %}
[agent-24.6-lts.md](agent-24.6-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-24.3-lts.md" %}
[agent-24.3-lts.md](agent-24.3-lts.md)
{% endcontent-ref %}

### Compatible with Java 8 / RHEL 7 and 8

{% content-ref url="agent-23.9-lts.md" %}
[agent-23.9-lts.md](agent-23.9-lts.md)
{% endcontent-ref %}

{% hint style="info" %}
Note: This version is not supported anymore, please migrate to Java 17 to benefit from supported Agent versions.
{% endhint %}

## Agent Release Cycle

#### Release cycle

The Agent is released every month, and the version number follows a year.month.patch convention. Occasionally, a release may be skipped.

Agent releases are not coupled with the releases of the Symphony Backend (SBE).

#### Long Term Support (LTS) versions

The releases of March, June, September and December are Long Term Support versions (e.g. releases named yy.3, yy.6, yy.9, and yy.12) and are supported for a year.

The other versions (yy.1, yy.2, yy.4, yy.5, yy.7, yy.8, yy.10, and yy.11) don't benefit from our Long Term Support.&#x20;

#### Compatibility with SBE versions

The **last four LTS versions are supported** and are always compatible with the production supported SBE versions.

LTS releases will be patched if any incompatibility is found with newly released SBE version.
