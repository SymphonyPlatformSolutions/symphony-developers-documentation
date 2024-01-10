# Installation guide

{% hint style="info" %}
**Important**: Starting with version 23.2 (February 2023), it is no longer needed to configure an extension app in the Admin Portal.&#x20;
{% endhint %}

### Prerequisites

1. A Desktop Integration Platform (DIP) is installed on your machine. The following platforms are supported:
   * Finsemble version 6.6.0 (recommended: 7.3.0+)
   * Glue42 version 3.15+
2. Minimal Symphony pod version: SBE 20.14+&#x20;

### Configuration in the user settings

* Go to the **Settings** menu <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line"> in your Symphony client and select the **Interoperability** tab.
* Select your desktop provider from the dropdown menu.

<figure><img src="https://lh3.googleusercontent.com/kKzz4aKlN45MxcgblUHe9DgG9rHZMxksNkKt4DMwMCZHkATGaNxDHz8Spbdcqdtb1eMr070tV60GRuvp85x321YxcqPy9pMv1i5whusqYf-9eaZBDdIqWg1jgQAc8DQKxxsPAHdDJ3Z5ETgf9IqJPWA" alt=""><figcaption></figcaption></figure>

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
		},
		{
		    "name": "ViewChat",
		    "displayName": "View Chat",
		    "contexts": [
		        "fdc3.chat.room", "fdc3.contact", "fdc3.contactList"
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
        },
        {
	    "name": "fdc3.ViewChat",
	    "displayName": "View Chat",
	    "contexts": [
	        "fdc3.chat.room", "fdc3.contact", "fdc3.contactList"
	    ]
	}
    ]
}
```
{% endcode %}

### Troubleshooting guide

To check that it works:

**Verify that the fdc3 connector is loaded.**

Start the Desktop Integration Platform, then **only** start Symphony.

Hover over a cashtag. The **View Instrument** link should appear. If it appears, the connector to the DIP has been successfully loaded.

![When hovering over a cashtag, a View Instrument link should be available.](<../../.gitbook/assets/image (3) (1).png>)

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

### Configuration for ECP (Embedded Collaboration Platform)

Starting with version 23.2 (February 2023), you can use FDC3 APIs over [ECP](support-for-embedded-collaboration-platform.md).

To make this work, the user must have selected the FDC3 provider (such as Glue42 or Finsemble) in the **interoperability** tab of the **user settings** <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line">. Alternatively, if you are running ECP in a container that injects the window.fdc3 object, the fdc3 object will be automatically used. In that case, it is not required to select a desktop provider in the user settings.

Please note that not all FDC3 APIs may be available in ECP Focus mode.

We recommend that the web app that will load ECP stays always on and loads ECP on start up. It may also be possible to configure your desktop platform so that if a user closes the web app hosting ECP, the web app will be hidden instead of getting closed, meaning ECP will stay on.

