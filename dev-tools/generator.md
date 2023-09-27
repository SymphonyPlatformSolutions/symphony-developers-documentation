# Symphony Generator

{% hint style="info" %}
**Prerequisite**: Install NodeJS first, either [directly](https://nodejs.org/en) or via [nvm](https://github.com/nvm-sh/nvm). You can also use other package managers like [bun](https://bun.sh) or [yarn](https://yarnpkg.com), which the generator will attempt to use before falling back to npm.
{% endhint %}

The Symphony Generator is a yeoman-based CLI tool that can be used to quickly generate Symphony bot, app and workflow project scaffolds. You can create example projects that use our developer toolkits:

* BDK for Java
* BDK for Python
* WDK
* ADK

## Quick Start

Install yeoman and the Symphony Generator.

{% tabs %}
{% tab title="npm" %}
```bash
$ npm i -g yo @finos/generator-symphony
```
{% endtab %}

{% tab title="yarn" %}
```bash
$ yarn global add yo @finos/generator-symphony
```
{% endtab %}

{% tab title="bun" %}
```bash
$ bun add -g yo @finos/generator-symphony
```
{% endtab %}
{% endtabs %}

Then, create a directory for your new project and launch the generator.

```bash
$ mkdir mybot && cd $_
$ yo @finos/symphony
```

Configure your bot, workflow or app environments accordingly.
