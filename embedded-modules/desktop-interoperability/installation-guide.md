# Installation guide

### Prerequisites

1. A Desktop Integration Platform (DIP) is installed on your machine. The following platforms are supported:
   * Finsemble version 6.6.0+
   * Glue42 version 3.15+
2. Minimal Symphony pod version is SBE 20.14+&#x20;

### Configuration in the Admin Portal

A specific extension app has to be configured on your pod, that will automatically connect to the DIP. See below how to configure this app.&#x20;

This extension app is specific to each desktop integration platform.&#x20;

#### Create the custom app

To do this, log into your Admin portal and create a custom app, and set the configuration as described in the table below.

![](https://lh5.googleusercontent.com/kTKn5kcGMAuuuzPH-BL88jNpxRHgkEguTCbj7EgQByOgxtueu9E1dADF2zIB5zVd3BZpK5Q6ydvl2Eg3cZZjB6Rt2Pbbxsxa-90Dr9WkjVUxqxU\_XLKTqtOOAyavu6fkP0I8j9r7YgbCj82\_AA)

|             | Finsemble                                                                                                                                                            | Glue42                                                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | `Finsemble Plugin`                                                                                                                                                   | `Glue42 Plugin`                                                                                                                                                |
| Publisher   | `Symphony`                                                                                                                                                           | `Symphony`                                                                                                                                                     |
| Description | `Connector to the Finsemble desktop integration platform.`                                                                                                           | `Connector to the Glue42 desktop integration platform.`                                                                                                        |
| APP ID      | `finsemble-plugin`                                                                                                                                                   | `glue42-plugin`                                                                                                                                                |
| Domain      | `symphony_pod_loopback.com`                                                                                                                                          | `symphony_pod_loopback.com`                                                                                                                                    |
| Load URL    | [`https://symphony_pod_loopback.com/client-bff/fdc3-finsemble-plugin/index.html`](https://symphony\_pod\_loopback.com/client-bff/fdc3-finsemble-plugin/index.html)`` | [`https://symphony_pod_loopback.com/client-bff/fdc3-glue42-plugin/index.html`](https://symphony\_pod\_loopback.com/client-bff/fdc3-glue42-plugin/index.html)`` |
| Permissions | `Trust application`                                                                                                                                                  | `Trust application`                                                                                                                                            |

{% hint style="info" %}
Keep the Load URL and Domain as is, including the "symphony\_pod\_loopback".
{% endhint %}

#### Install the custom app for the users

1. On the left hand navigation bar click ‘App Settings'.&#x20;
2. Find the app in the applications list&#x20;
3. To allow access to the custom app for anyone on Symphony:&#x20;
   1. Set the app to be ‘Enabled’&#x20;
   2. Set the app to be ‘Visible’&#x20;
   3. Set the install to be ‘Manual’&#x20;
4. To Restrict access to the app to a subset of users on your pod:&#x20;
   1. Set the app to be ‘Enabled’&#x20;
   2. Set the app to be ‘Hidden’&#x20;
   3. Set the install to be ‘Manual’&#x20;
   4. Edit each users apps so that they have the app installed

### Configuration of the Desktop Integration Platform

Symphony needs to be registered in the DIP App directory so it will be able to connect to the platform. This configuration step is specific to each platform.

#### Finsemble

Manually **add an app entry** into your finsemble app directory file (_/public/configs/application/appd.json)_:

```json
"symphony": {
			"appId": "symphony",
			"name": "symphony",
			"description": "Symphony",
			"manifest": {
				"component": {
					"singleton": true
				},
				"window": {
					"windowType": "assimilation",
					"path": "C:/some/path/on/disk/mynativeapp.exe"
				},
				"foreign": {
					"components": {
						"App Launcher": {
							"launchableByUser": false
						},
						"Toolbar": {
							"iconURL": "https://assets.finsemble.com/components/fdc3-workbench/fdc3-icon-256.png"
						},
						"Window Manager": {
							"FSBLHeader": false,
							"persistWindowState": false
						}
					}
				},
				"interop": {}
			},
			"version": "1.0.0",
			"tooltip": "FDC3 Test App",
			"images": [
				{
					"url": "https://assets.finsemble.com/components/fdc3-workbench/fdc3-icon-256.png",
					"tooltip": "FDC3 logo"
				}
			],
			"tags": [
				"fdc3",
				"interop",
				"interoperabilty",
				"developer tool"
			],
			"publisher": "Symphony",
			"icons": [
				{
					"url": "https://assets.finsemble.com/components/fdc3-workbench/fdc3-icon-256.png"
				}
			],
			"intents": [
				{
					"name": "StartChat",
					"displayName": "Start Chat",
					"contexts": [
						"fdc3.chat.initSettings"
					]
				}
			]
		},
```

#### Glue42

Add a new symphony.json file into your app directory folder (_Tick42\UserData\\{GLUE\_INSTANCE}\apps_)

{% code title="symphony.json" %}
```json
{
    "name": "symphony",
    "title": "symphony",
    "hidden": true,
    "details": {
        "autoInjectFdc3": {
            "enabled": true
        },
        "fdc3InitsGlue": true,
        "allowChannels": true
    },
    "intents": [
        {
            "name": "fdc3.ViewInstrument",
            "displayName": "View Instrument",
            "contexts": [
                "fdc3.instrument"
            ]
        },
        {
            "name": "fdc3.StartChat",
            "displayName": "Start Chart",
            "contexts": [
                "fdc3.instrument"
            ]
        }
    ]
}
```
{% endcode %}

### Check that it works - Troubleshoot guide

**Verify that the connector extension app is loaded.**

Start the Desktop Integration Platform, then **only** start Symphony.

Hover on a cashtag. The "View Instrument" link should appear. If it appears, the extension app that connects to the DIP has been successfully loaded.

![When hovering on a cashtag, a View Instrument action should be available.](<../../.gitbook/assets/image (2).png>)

**Verify that Symphony can send intents to desktop apps.**

Be sure that you have a desktop app that supports the ViewInstrument intent first. If you don't have one, you can add the **FDC3 Workbench app** in your app directory, a developer tool available on [Finos](https://fdc3.finos.org/toolbox/fdc3-workbench/). The FDC3 Workbench allows you to dynamically listen to intents and raise intents very easily.

Then, hover on a cashtag in a chat, and click "ViewInstrument". If an app is listening to ViewInstrument intents, it should receive the cashtag as a fdc3.instrument context.

If this is not the case, please check that the Symphony app directory entry is properly configured.

**Verify that a desktop app can send intents to Symphony.**

To verify that Symphony can receive intents, we will attempt to raise a StartChat intent.

If you don't have an app that sends a StartChat intent, you can add the FDC3 Workbench app in your app directory, a developer tool available on [Finos](https://fdc3.finos.org/toolbox/fdc3-workbench/).

Send the StartChat intent using a sample context data (fdc3.chat.initSettings), such as the example provided [here](https://app.gitbook.com/o/-MB5vuhMZDPnMHgoaIX-/s/-MB51RkjSmfA\_ejydg4M-3415978100/\~/changes/BeNT7JQ1eO6nLDxYh3su/embedded-modules/desktop-interoperability/fdc3-intents#examples).

If Symphony displays a popup, Symphony correctly receives intents coming from desktop apps.

### Access to development features

New features are shipped with each Client 2.0 releases.

However, you can **experiment with new features** before they are available in the stable release by using the following fdc3 URL path:\
&#x20;`https://{pod_url}/client-bff/fdc3/index.html`, where `pod_url` is replaced by your own pod URL.

You can either access Symphony using this URL directly in your browser, or if you prefer to use our Symphony Desktop Application (SDA), it is also possible by redirecting it to the /fdc3 URL this way:

1. Open the development tools (Shift + CTRL + J on Chrome with Windows/Linux)
2. Open the Console
3. Type `window.location.href='https://{pod_url}/client-bff/fdc3/index.html'`_,_ where `pod_url` is replaced by your own pod URL.