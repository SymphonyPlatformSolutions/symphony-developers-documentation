# Agent

{% hint style="info" %}
Latest LTS Agent version can be downloaded [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-24.3.2.zip).
{% endhint %}

Please find in the subpages below the list of changes related to each version of the [Agent](../../agent-guide/) service.

{% content-ref url="agent-24.3-lts.md" %}
[agent-24.3-lts.md](agent-24.3-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-23.12-lts.md" %}
[agent-23.12-lts.md](agent-23.12-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-23.9-lts.md" %}
[agent-23.9-lts.md](agent-23.9-lts.md)
{% endcontent-ref %}

{% content-ref url="agent-23.6-lts.md" %}
[agent-23.6-lts.md](agent-23.6-lts.md)
{% endcontent-ref %}

## Agent Release Cycle

### Release cycle

Agent releases are not coupled with the releases of the Symphony Backend (SBE).

The Agent is released every month, and the version number follows a year.month.patch convention.

Occasionally, a release may be skipped.

### Long Term Support (LTS)

Among the 12 yearly releases, the releases of March, June, September and December are Long Term Support versions (e.g. releases named yy.3, yy.6, yy.9, and yy.12).

The other versions (yy.1, yy.2, yy.4, yy.5, yy.7, yy.8, yy.10, and yy.11) won't benefit from our Long Term Support. They will be however available and you can install them if they bring a new feature that you are interested in.

_As an example, if you have installed Agent 22.8 but would like to benefit from a fix that has been backported to the LTS versions, then an upgrade of your Agent will be necessary to latest 22.9 version (a choice might be needed from you if we already released later LTS versions such as 22.12)._

### Compatibility with SBE

The **last four LTS versions are supported** and are always compatible with the production supported SBE versions.

LTS releases will be patched if any incompatibility is found with newly released SBE version.
