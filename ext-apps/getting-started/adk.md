---
description: >-
  The App Developer Kit (ADK) is the preferred tooling for web developers to get
  started building extension apps on Symphony
---

# Getting Started with ADK

## Generate your Extension App

The [Symphony Generator](../../dev-tools/generator.md) offers a fast way to bootstrap your Symphony extension app project.

{% hint style="info" %}
**Prerequisite**: Install NodeJS first, either [directly](https://nodejs.org/en) or via [nvm](https://github.com/nvm-sh/nvm). You can also use other package managers like [bun](https://bun.sh) or [yarn](https://yarnpkg.com), which the generator will attempt to use before falling back to npm.
{% endhint %}

First, install yeoman and the Symphony Generator.

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

Then, create a directory for your new app project and launch the generator.

```bash
$ mkdir my-app && cd $_
$ yo @finos/symphony
```

This will prompt you with a number of questions about your app and pod configuration. Type in your app ID, using arrow keys to scroll and press enter to move on to the next prompt.

When prompted for `Select your type of application`, choose `Extension App (ADK)`. You then have a choice of different project types:

* **Basic** - simple project to demonstrate initialization
* **App View** - uses React with either JavaScript or TypeScript to create app views
* **Message Renderer** - overrides rendering of messages with custom formatting

If you require an extension app that requires user identity, you will also need a backend that can perform the [Circle of Trust](../app-authentication/circle-of-trust-authentication.md) process. You should then select the `Extension App + Circle of Trust (ADK + BDK)` option, which will generate both the extension app project using ADK and a backend project using BDK that will perform the app authentication and validation.

```bash
 __   __     ___                 _
 \ \ / /__  / __|_  _ _ __  _ __| |_  ___ _ _ _  _
  \ V / _ \ \__ \ || | '  \| '_ \ ' \/ _ \ ' \ || |
   |_|\___/ |___/\_, |_|_|_| .__/_||_\___/_||_\_, |
                 |__/      |_|                |__/
	https://developers.symphony.com

Welcome to Symphony Generator v2.9.0
Project files will be generated in folder: /Users/user/code/my-app
______________________________________________________________________________________________________
? Enter your pod host develop2.symphony.com
? Select your project type Extension App (ADK)
? Enter your app id my-app
? Select your application type Basic

Using ADK Version: 1.3.0
   create package.json
   create bundle.json
   create webpack.config.js
   create src/index.js

bun install v1.0.3 (25e69c71)
 + @symphony-ui/adk-webpack@1.3.0
 + webpack@5.88.2
 + webpack-cli@5.1.4
 + webpack-dev-server@4.15.1
 + @symphony-ui/adk@1.3.0

 356 packages installed [3.91s]

Your Extension App project has been successfully generated!

To launch your project, first run: bun start
Then, visit https://localhost:4000/controller.html and dismiss the warning
Finally, visit https://develop2.symphony.com/?bundle=https://localhost:4000/bundle.json
```

## Create Application

When you are ready to deploy your app permanently (or if you require Circle of Trust), follow the instructions on this page to setup your app.

{% content-ref url="add-app-entry.md" %}
[add-app-entry.md](add-app-entry.md)
{% endcontent-ref %}

## Start your App

```bash
$ npm start # or yarn start or bun start

$ webpack-dev-server --mode=development
SYMPHONY ADK 1.3.0
Building application: my-app
Running at: /Users/user/code/my-app
<i> [webpack-dev-server] Generating SSL certificate...
<i> [webpack-dev-server] SSL certificate: /Users/user/code/my-app/node_modules/.cache/webpack-dev-server/server.pem
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: https://localhost:4000/
<i> [webpack-dev-server] On Your Network (IPv4): https://192.168.1.2:4000/
<i> [webpack-dev-server] On Your Network (IPv6): https://[fe80::1]:4000/
<i> [webpack-dev-server] Content not from webpack is served from '/Users/user/code/my-app/node_modules/@symphony-ui/adk-webpack/dist' directory
Entrypoint controller 450 KiB = vendors.c3acceed.js 404 KiB controller.26a834b5.js 46.4 KiB
webpack compiled in 750 ms

```

## Test your App

1. A browser window should launch with the URL [https://localhost:4000/controller.html](https://localhost:4000/controller.html). If it doesn't, visit that page manually. Dismiss the security warning and close the page.
2. Visit [https://develop2.symphony.com/?bundle=https://localhost:4000/bundle.json](https://develop2.symphony.com/?bundle=https://localhost:4000/bundle.json) to inject the running app temporarily into a pod for testing
3. Acknowledge the developer mode notice. Your app is now loaded.

## Next Steps

Each project type in the generator corresponds to one of the guides below. Read the respective guide for explanations of how to use ADK.

{% content-ref url="../../dev-tools/adk/basic.md" %}
[basic.md](../../dev-tools/adk/basic.md)
{% endcontent-ref %}

{% content-ref url="../../dev-tools/adk/app-view/" %}
[app-view](../../dev-tools/adk/app-view/)
{% endcontent-ref %}

{% content-ref url="../../dev-tools/adk/message-renderer.md" %}
[message-renderer.md](../../dev-tools/adk/message-renderer.md)
{% endcontent-ref %}
