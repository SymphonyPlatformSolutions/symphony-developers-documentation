# Installation guide

### Prerequisites

1. A Desktop Integration Platform (DIP) is installed on your machine. The following platforms are supported:
   * Finsemble version 6.6.0 (recommended: 7.3.0+)
   * Glue42 version 3.15+
2. Minimal Symphony pod version: SBE 20.14+&#x20;

### Configuration in the Admin Portal

A specific extension app has to be configured on your pod, that will automatically connect to the DIP. See below how to configure this app.&#x20;

This extension app is specific to each desktop integration platform.&#x20;

{% hint style="success" %}
If you have access to the Symphony develop2 environment (either through a partnership or through the developer certification program), you can directly use the Glue42 and Finsemble apps that are installed there. Go to the App Marketplace and install the app you need.
{% endhint %}

#### Create the custom app

Log in to your Admin Portal and create a custom app.

Set the configuration as described in the table below:

![](https://lh5.googleusercontent.com/kTKn5kcGMAuuuzPH-BL88jNpxRHgkEguTCbj7EgQByOgxtueu9E1dADF2zIB5zVd3BZpK5Q6ydvl2Eg3cZZjB6Rt2Pbbxsxa-90Dr9WkjVUxqxU\_XLKTqtOOAyavu6fkP0I8j9r7YgbCj82\_AA)

|             | Finsemble                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Glue42                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | `Finsemble Plugin`                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `Glue42 Plugin`                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Publisher   | `Symphony`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `Symphony`                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Icon URL    | `https://symphony_pod_loopback.com/client-bff/static/fdc3-plugin/icon.png`&#xD;                                                                                                                                                                                                                                                                                                                                                                                                               | `https://symphony_pod_loopback.com/client-bff/static/fdc3-plugin/icon.png`&#xD;                                                                                                                                                                                                                                                                                                                                                                                                         |
| Description | <p><code>Extension app that connects Symphony with the Finsemble desktop integration platform, using the FDC3 open standard (Financial Desktop Connectivity and Collaboration Consortium).</code></p><p><code></code></p><p><code>FDC3 aims to provide an open standard for interoperability between applications on the financial desktop. See https://fdc3.finos.org/ for more info.</code></p><p><code></code></p><p><code>Note: Finsemble needs to be running on your desktop.</code></p> | <p><code>Extension app that connects Symphony with the Glue42 desktop integration platform, using the FDC3 open standard (Financial Desktop Connectivity and Collaboration Consortium).</code></p><p><code></code></p><p><code>FDC3 aims to provide an open standard for interoperability between applications on the financial desktop. See https://fdc3.finos.org/ for more info.</code></p><p><code></code></p><p><code>Note: Glue42 needs to be running on your desktop.</code></p> |
| APP ID      | `finsemble-plugin`                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `glue42-plugin`                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Domain      | `symphony_pod_loopback.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `symphony_pod_loopback.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Load URL    | [`https://symphony_pod_loopback.com/client-bff/fdc3-finsemble-plugin/index.html`](https://symphony\_pod\_loopback.com/client-bff/fdc3-finsemble-plugin/index.html)``                                                                                                                                                                                                                                                                                                                          | [`https://symphony_pod_loopback.com/client-bff/fdc3-glue42-plugin/index.html`](https://symphony\_pod\_loopback.com/client-bff/fdc3-glue42-plugin/index.html)``                                                                                                                                                                                                                                                                                                                          |
| Permissions | `Trust application`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `Trust application`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

{% hint style="info" %}
Keep the Load URL, Icon URL and Domain as is, including the "symphony\_pod\_loopback".
{% endhint %}

Alternatively, you can instead directly upload an app bundle file if this is more convenient to you.

{% file src="../../.gitbook/assets/Finsemble Plugin (1).json" %}
Finsemble Plugin Extension App bundle file
{% endfile %}

{% file src="../../.gitbook/assets/Glue42 Plugin.json" %}
Glue42 Plugin Extension App bundle file
{% endfile %}



#### Install the custom app for the users

1. Click **App Settings** on the left hand navigation bar.
2. Find the app in the application list.
3. To allow access to the custom app for anyone on Symphony:&#x20;
   1. Set the app to be _Enabled_.&#x20;
   2. Set the app to be _Visible_.
   3. Set the installation to be _Manual_.
4. To restrict access to the app to a subset of users on your pod:
   1. Set the app to be _Enabled_.
   2. Set the app to be _Hidden_.&#x20;
   3. Set the installation to be _Manual_.&#x20;
   4. Edit each user's apps, so that they have the app installed.

### Desktop Integration Platform configuration

Symphony needs to be registered in the DIP App directory, so that it will be able to connect to the platform. This configuration step is specific to each platform.

#### Finsemble

Manually **add an app entry** into your finsemble app directory file (_/public/configs/application/appd.json)_:

```json
"symphony": {
            "appId": "symphony",
            "name": "symphony",
            "manifest": {
                "foreign": {
                    "components": {
                        "App Launcher": {
                            "launchableByUser": false
                        },
                        "Window Manager": {
                            "FSBLHeader": {
                                "hideClose": false,
                                "hideMaximize": false,
                                "hideMinimize": false
                            }
                        }
                    }
                },
                "component": {
                    "singleton": true,
                    "spawnOnStartup": false,
                    "preload": []
                },
                "interop": {
                    "selectConnect": [],
                    "autoConnect": true
                }
            },
            "manifestType": "finsemble",
            "version": "1",
            "description": "",
            "intents": [
                {
                    "name": "StartChat",
                    "displayName": "Start Chat",
                    "contexts": [
                        "fdc3.chat.initSettings"
                    ]
                },
                {
		    "name": "ViewMessages",
		    "displayName": "View Messages",
		    "contexts": [
		        "fdc3.searchCriteria"
		    ]
		},
		{
		    "name": "SendChatMessage",
		    "displayName": "Send Chat Message",
		    "contexts": [
		        "fdc3.chat.message"
		    ]
		}
            ],
            "icons": [
                {"src": "https://symphony.com/wp-content/uploads/2021/10/logo-symphony-icon.jpeg", "sizes": "200x200"}
            ]
        }
```

#### Glue42

Add a new symphony.json file into your app directory folder (_Tick42\UserData\\{GLUE\_INSTANCE}\apps_):

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
                "fdc3.chat.initSettings"
            ]
        },
        {
            "name": "fdc3.SendChatMessage",
            "displayName": "Send Chat Message",
            "contexts": [
                "fdc3.chat.message"
            ]
        },
        {
            "name": "fdc3.ViewMessages",
            "displayName": "View Messages",
            "contexts": [
                "fdc3.searchCriteria"
            ]
        }
    ]
}
```
{% endcode %}

### Troubleshooting guide

To check that it works:

**Verify that the connector extension app is loaded.**

Start the Desktop Integration Platform, then **only** start Symphony.

Hover over a cashtag. The **View Instrument** link should appear. If it appears, the extension app that connects to the DIP has been successfully loaded.

![When hovering over a cashtag, a View Instrument link should be available.](<../../.gitbook/assets/image (2).png>)

**Verify that Symphony can send intents to desktop apps.**

Make sure you have a desktop app that supports the _ViewInstrument_ intent first.

**Note:** If you don't have one, you can add the **FDC3 Workbench app**, a developer tool available on [Finos](https://fdc3.finos.org/toolbox/fdc3-workbench/), to your app directory. The FDC3 Workbench allows you to dynamically listen to intents and raise intents very easily.

Then, hover over a cashtag in a chat, and click "ViewInstrument". If an app is listening to ViewInstrument intents, it should receive the cashtag as a fdc3.instrument context.

If this is not the case, please check that the Symphony app directory entry is properly configured.

**Verify that a desktop app can send intents to Symphony.**

To verify that Symphony can receive intents, we will attempt to raise a StartChat intent.

**Note:** If you don't have an app that sends a StartChat intent, you can add the FDC3 Workbench app, a developer tool available on [Finos](https://fdc3.finos.org/toolbox/fdc3-workbench/), to your app directory.

Send the StartChat intent using a sample context data (fdc3.chat.initSettings), such as the example provided [here](fdc3-intents/message-format.md).

If Symphony displays a popup, Symphony correctly receives intents coming from desktop apps.

### Access to development features

New features are shipped with each Client 2.0 releases.

However, you can **experiment with new features** before they are available in the stable release, by using the following fdc3 URL path:

`https://{pod_url}/client-bff/fdc3/index.html`, where `pod_url` is replaced by your own pod's URL.

You can access Symphony using this URL directly in your browser.&#x20;

You can also use our Symphony Desktop Application (SDA) by redirecting it to the FDC3 URL as described below:

1. Open the development tools (Shift + CTRL + J on Chrome with Windows/Linux).
2. Open the Console.
3. Type `window.location.href='https://{pod_url}/client-bff/fdc3/index.html'`_,_ where `pod_url` is replaced by your own pod's URL.
