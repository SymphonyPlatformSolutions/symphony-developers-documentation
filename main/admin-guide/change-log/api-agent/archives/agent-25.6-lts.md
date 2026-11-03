# Agent - 25.6 (LTS)

{% hint style="info" %}
To download the Agent 25.6, click [here](https://static.symphony.com/agent/agent-25.6.2.zip).
{% endhint %}

## Change log

### Agent 25.6.2

* Fixed security vulnerabilities.

### Agent 25.6.1

* Elements - Dependency on a future Client version, not released yet. More information will be provided once the feature will be avilailable in the desktop client.
  * Support of localized date time
  * New option for submit elements to bypass the form validation checks
  * New rich text area.
* Fixed missing emojies.

### Changes introduced since last LTS version

* The MessageML check on the url protocols is now case insensitive (e.g. if a message contained a url with **M**ailto:john@sym.com it was blocked, even if the **m**ailto protocol was whitelisted)
* Fixed security vulnerabilities.
