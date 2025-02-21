# Configure Interop.io

### Configure for interop.io (Glue42)

* Go to the **Settings** menu <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line"> in your Symphony client and select the **Interoperability** tab.
* Select Glue42 from the dropdown menu.



<figure><img src="https://lh3.googleusercontent.com/kKzz4aKlN45MxcgblUHe9DgG9rHZMxksNkKt4DMwMCZHkATGaNxDHz8Spbdcqdtb1eMr070tV60GRuvp85x321YxcqPy9pMv1i5whusqYf-9eaZBDdIqWg1jgQAc8DQKxxsPAHdDJ3Z5ETgf9IqJPWA" alt=""><figcaption></figcaption></figure>

### Configure Glue42 for Symphony Messaging

Symphony Messaging needs to be registered in the App directory, so that it will be able to connect to the platform.

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

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide to validate that everything is working.

