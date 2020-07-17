# Symphony 2.0 Client Extensions \(BETA\)

## Overview

The Symphony 2.0 Client Extensions is way for Symphony users to customise the Symphony Client in ways that suits their needs. It can be used to add icon, buttons and canvases to project a specific behavior depending on the information provided by Symphony backend or by adding data through third party sources.

## How it works

The Symphony 2.0 Client Extensions is a set of TypeScript APIs that allows access to different parts of the Symphony 2 Client based on the credentials of the logged in user. It allows you to add UI components known as _UI Extension Points_ and to access client data from internal services known as _Stores_.

The APIs to access these internals are accessible through downloadable npm packages. 

## Getting started

The latest APIs, reference manuals and example code are found on github: [https://github.com/SymphonyPlatformSolutions/symphony-extension-api-2.0](https://github.com/SymphonyPlatformSolutions/symphony-extension-api-2.0).

Direct access to the reference manual for the APIs are found [here](https://github.com/SymphonyPlatformSolutions/symphony-extension-api-2.0/blob/master/ref/index.md). 

Download documentation:

```
$ mkdir myExtension
$ git clone https://github.com/SymphonyPlatformSolutions/symphony-extension-api-2.0
$ cd symphony-extension-api-2.0
```

The easiest way to get started is to use the example provided in the sample code referenced below. The package.json specifies the dependencies you need and sets up the example.

```text
$ cd examples/hello_world
```

The example [README.md](https://github.com/SymphonyPlatformSolutions/symphony-extension-api-2.0/blob/master/examples/hello-world/README.md) describes how to get started and what dependent packages to download. 

{% hint style="info" %}
 The documentation, APIs and behavior of Symphony 2.0 Extension API is currently under development and might be subject to changes. No backwards compatibility is in any way guaranteed.
{% endhint %}







