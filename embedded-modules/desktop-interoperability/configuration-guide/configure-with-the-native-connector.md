# Configure Interop.io

### Configure for interop.io (ioConnect)

* Go to the **Settings** menu <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line"> in your Symphony Messaging client and select the **Interoperability** tab.
* Select interop.io from the dropdown menu.

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

### Configure ioConnect for Symphony Messaging

#### Add Symphony Messaging in the App directory

Symphony Messaging needs to be registered in the App directory, so that it will be able to connect to the platform.

Add a new symphony.json file into your app directory folder (_io.Connect Desktop\UserData\\{IO\_INSTANCE}\apps_):

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

#### Configure the authentication

In the `system.json` file, add a custom authenticator "symphony".&#x20;

Replace your pod sub domain with your actual pod URL.&#x20;

```json
{
  ...
  "gw": {
    ...
    "configuration": {
      "customAuthenticators": {
        "symphony": {
          "file": "%GDDIR%/assets/authenticators/symphony/index.js",
          "configuration": {
            "pem": [
              "https://{MYPOD_SUBDOMAIN}.symphony.com/client-bff/v1/jwt/publicKey"
            ]
          }
        }
      }
    },
    ...
  },
  ...
}
```

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide to validate that everything is working.

