# Configure OpenFin

{% hint style="info" %}
OpenFin is available as **Beta**, and is only qualified for UAT environments. General Availability and access in Production is planned for **March 2025.**
{% endhint %}

Because the OpenFin connector is only available as Beta, it currently requires a **specific version of the Symphony Desktop App (SDA)**, and is only supported in environments where OpenFin has been switched on. The Beta connector also requires specific configuration.&#x20;

These limitations will be waived as soon as our connector is generally available.&#x20;

{% hint style="success" %}
Some of the configuration steps below will not be required anymore once the OpenFin connector is released to production (March 2025)
{% endhint %}

### Install the custom SDA version

* Get in touch with us to get access to the installer, and to get OpenFin enabled on your UAT Pod.
* Quit SDA if it is running.
* Launch the new installer. It will uninstall your current SDA version, then install the new version.

### Configure the connection to OpenFin

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
        "platformUuid": "TO_BE_REPLACED",
        "connectionTimeout": "10000"
    }
```

Edit the properties above:

* `uuid`: The UUID will be the unique identifier of Symphony on OpenFin. You can use the default value or change it based on your preferences.
* `licenseKey`: Your license key on the OpenFin platform.
* `runtimeVersion`: The runtime version of the OpenFin platform that Symphony should connect to.
* `autoConnect`: Keep to `true` so that the user doesn't have to manually select OpenFin in the Interoperability settings of the Symphony Messaging app.
* `platformUuid`: Set the uuid of the OpenFin platform you want Symphony to connect to.
* `connectionTimeout`: Timeout in seconds when attempting the connection to OpenFin.&#x20;

### Configure your OpenFin platform for Symphony

Add the following entry in the `apps.json` file, to describe the intents that Symphony supports. This way, you will be able to open Symphony directly from the OpenFin app launcher.

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

### Launch SDA and target your UAT pod

* Launch the Symphony Desktop App.
* Open the developer tools (`Ctrl` + `Shift` + `i`).
* Open the developer console.
* Type the following line (replacing your UAT pod sub domain where appropriate) then press `Enter`.

```
location = "https://UATPODSUBDOMAIN.symphony.com"
```

This will load the Symphony webapp from your UAT environment, where OpenFin has been switched on. You can now close the developer console.

If your OpenFin platform is running, you should see a toast notification confirming that Symphony successfully connected to OpenFin.

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
If SDA auto update is enabled in your UAT pod, you may get prompts to install a new SDA version. Don't do it, otherwise you will need to reinstall the SDA installer that embeds OpenFin.
{% endhint %}

If you need help, you can have a look at our [Troubleshooting guide](troubleshooting.md).
