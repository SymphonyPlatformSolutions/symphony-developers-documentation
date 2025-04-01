# Configure Here Core

{% hint style="warning" %}
This integration requires **SDA v25.3.**
{% endhint %}

### Configure the connection to Here Core (formerly[ OpenFin Workspace](https://github.com/built-on-openfin/workspace-starter))

To configure Here Core, some parameters need to be added to the SDA config file (Symphony.json). \
Deploying changes to this file to the machines of the end users is usually automated through the packaging of the SDA installer, or through IT policies, and is handled by your IT team.&#x20;

For testing purposes, you can configure the integration manually, as described below.&#x20;

{% hint style="success" %}
For production deployments, simply apply the same configuration changes described below to the user machines.
{% endhint %}

Quit SDA if it is running. If SDA is configured to hide instead of closing, you can quit SDA by selecting the hamburger menu on the top left then selecting **Window**, then **Quit Symphony Messaging**.

To locate the `Symphony.json` config file on your machine, **right-click** your Symphony Messaging desktop icon, select **Open file location**, and then open the **config** folde&#x72;**.**

<figure><img src="../../../.gitbook/assets/image (91).png" alt=""><figcaption></figcaption></figure>

Backup the `Symphony.config` file, then edit the original file.

Add the following properties at the root of the json file:&#x20;

```json
"openfin": {
        "uuid": "symphony-messaging-app",
        "licenseKey": "TO_BE_REPLACED",
        "runtimeVersion": "TO_BE_REPLACED",
        "autoConnect": true,
        "platformUuid": "TO_BE_REPLACED",
        "connectionTimeout": "10000"
    }
```

**Edit** the properties above according to your needs:

* `uuid`: The UUID is the unique identifier of Symphony Messaging on Here Core. You can use the default value or change it based on your preferences.
* `licenseKey`: The license key to your Here Core platform.
* `runtimeVersion`: The runtime version of the Here Core platform that Symphony Messaging should connect to.
* `autoConnect`: Keep this `true` so that the user doesn't have to manually select Here Core in the Interoperability settings of the Symphony Messaging app.
* `platformUuid`: Set the UUID of the Here Core platform you want Symphony Messaging to connect to.
* `connectionTimeout`: Timeout in seconds when attempting the connection to Here Core.&#x20;

Don't forget to **Save** your changes.

### Configure your Here platform for Symphony Messaging

Add the following entry in the `apps.json` file, to describe the intents that Symphony supports. This way, you will be able to open Symphony Messaging directly from the Here Core app launcher.

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

Edit the following propertie&#x73;**:**

* Edit the `manifest` property to target your symphony.exe.
* The `appId` should match the `uuid` defined in your SDA config file.

### Launch SDA

Launch the Symphony Desktop App as normal.

If your Here Core platform is running, you should see a toast notification confirming that Symphony successfully connected to Here Core .

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

If you need help, you can have a look at our [Troubleshooting guide](troubleshooting.md).
