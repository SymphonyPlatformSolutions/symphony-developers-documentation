# Configure with the native connector

### Prerequisites

A Desktop Integration Platform (DIP) needs to be installed on your machine. The following platforms are supported:

* Interop.io (Glue42) version 3.15+
* Finsemble version 7.3.0+
* OpenFin: Beta only. OpenFin currently requires custom configuration in SDA and needs to be enabled by the Symphony team. &#x20;

### Configure for interop.io (Glue42) and Finsemble

* Go to the **Settings** menu <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line"> in your Symphony client and select the **Interoperability** tab.
* Select your desktop provider from the dropdown menu.

<figure><img src="https://lh3.googleusercontent.com/kKzz4aKlN45MxcgblUHe9DgG9rHZMxksNkKt4DMwMCZHkATGaNxDHz8Spbdcqdtb1eMr070tV60GRuvp85x321YxcqPy9pMv1i5whusqYf-9eaZBDdIqWg1jgQAc8DQKxxsPAHdDJ3Z5ETgf9IqJPWA" alt=""><figcaption></figcaption></figure>

### Configure for OpenFin

{% hint style="warning" %}
OpenFin is available as Beta, and is only qualified for UAT environments.
{% endhint %}

Configuring OpenFin requires a **specific version of our Symphony Desktop App (SDA)**, and needs to be activated on your environment, until it is qualified for Production.&#x20;

Please get in touch with us to get access to the installer, and to get OpenFin enabled on your Pod.

Once you have installed the custom SDA installer, please proceed with the configuration step below.

#### Configure the connection to OpenFin:

Locate the `Symphony.json` config file on your desktop, by **right clicking** your Symphony desktop icon and selecting **Open file location**, then opening the **config** folde&#x72;**.**

<figure><img src="../../../.gitbook/assets/image (91).png" alt=""><figcaption></figcaption></figure>

Backup the `Symphony.config` file under a different name, then edit the original file.

Add the following properties:&#x20;

```json
"openfin": {
        "uuid": "symphony-messaging-app",
        "licenseKey": "TO_BE_REPLACED",
        "runtimeVersion": "TO_BE_REPLACED",
        "autoConnect": true,
        "channelName": "",
        "connectionTimeout": "10000"
    }
```

Edit the properties:

* `uuid`: The UUID will be the unique identifier of Symphony on OpenFin. You can use the default value or change it based on your preferences.
* `licenseKey`: Your license key on the OpenFin platform.
* `runtimeVersion`: The runtime version of the OpenFin platform that Symphony should connect to.
* `autoConnect`: Keep to `true` so that the user doesn't have to manually select OpenFin in the Interoperability settings of the Symphony Messaging app.
* `channelName`: For future use. Keep it empty.
* `connectionTimeout`: Timeout in seconds when attempting the connection to OpenFin.&#x20;

Launch the Symphony Desktop App and login as normal.

You should see a toast notification confirming that Symphony successfully connected to OpenFin.

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
                    "name": "ViewInstrument",
                    "displayName": "View Instrument",
                    "contexts": [
                        "fdc3.instrument"
                    ]
                },
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

#### Glue42 / Interop.io

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

#### OpenFin

Add the following entry in the apps.json file.

```json
{
	"appId": "symphony-messaging-app",
	"name": "Symphony",
	"title": "Symphony Messaging",
	"description": "Symphony is the most secure and compliance-enabling markets’ infrastructure and technology platform, where solutions are built or integrated to standardize, automate and innovate financial services workflows. It is a vibrant community of over half a million financial professionals with a trusted directory and serves over 1,000 institutions.",
	"manifest": "C:\\Users\\salah.benmoussati\\AppData\\Local\\Programs\\symphony\\Symphony\\Symphony.exe",
	"manifestType": "external",
	"private": true,
	"autostart": false,
	"instanceMode": "single",
	"icons": [
		{
			"src": "https://symphony.com/wp-content/uploads/2022/12/logo-symphony-dark.svg"
		}
	],
	"contactEmail": "sales@symphony.com",
	"supportEmail": "support@symphony.com",
	"publisher": "Symphony Communication Services, LLC",
	"intents": [
                {
                    "name": "ViewInstrument",
                    "displayName": "View Instrument",
                    "contexts": [
                        "fdc3.instrument"
                    ]
                },
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
	"images": [],
	"tags": []
}
```

**Edit the following properties:**

* Edit the `manifest` property to target your symphony.exe.
* The `appId` should match the `uuid` defined in your SDA config file.

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide to validate that everything is working.

####
