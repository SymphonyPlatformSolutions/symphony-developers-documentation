# Configure Here Core

{% hint style="warning" %}
This integration requires **SDA v25.3.**
{% endhint %}

### Configure the connection to Here Core (formerly[ OpenFin Workspace](https://github.com/built-on-openfin/workspace-starter))

This integration requires configuration parameters in the SDA config file (Symphony.json). \
Deploying this configuration file to the end users machines is usually automated through the packaging of new SDA installers or through IT policies, and is handled by your IT team.&#x20;

{% hint style="info" %}
In the future, this configuration will be available through your  Admin Portal.&#x20;
{% endhint %}

For testing purposes and in development environments, you can configure the integration manually, as described below.&#x20;

Locate the `Symphony.json` config file on your desktop, by **right clicking** your Symphony Messaging desktop icon and selecting **Open file location**, then opening the **config** folde&#x72;**.**

<figure><img src="../../../.gitbook/assets/image (91).png" alt=""><figcaption></figcaption></figure>

Backup the `Symphony.config` file under a different name, then edit the original file.

Quit SDA if it running. If SDA is configured to hide instead of closing, you can quit SDA but selecting the hamburger menu on the top left then selecting **Window**, then **Quit Symphony Messaging**.

Add the following properties:&#x20;

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

**Edit** the properties below then **save** the file:

* `uuid`: The UUID will be the unique identifier of Symphony Messaging on Here Core. You can use the default value or change it based on your preferences.
* `licenseKey`: Your license key on the Here Core platform.
* `runtimeVersion`: The runtime version of the Here Core platform that Symphony Messaging should connect to.
* `autoConnect`: Keep to `true` so that the user doesn't have to manually select Here Core in the Interoperability settings of the Symphony Messaging app.
* `platformUuid`: Set the uuid of the Here Core platform you want Symphony Messaging to connect to.
* `connectionTimeout`: Timeout in seconds when attempting the connection to Here Core.&#x20;

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
