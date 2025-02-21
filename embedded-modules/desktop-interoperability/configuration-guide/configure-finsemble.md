# Configure Finsemble

### Configure Symphony Messaging for Finsemble

* Go to the **Settings** menu <img src="https://lh4.googleusercontent.com/pGUyIc49QxTNab36tneEr7VEJ3I8jz9FFxSriC265WIP_3_cwo6Y7QGlvHXES5-eEP5S8TJ4U9BOOBBAyRV0o_PGFDZ2SJRdS_DrV7yNT0Ix59egjHhoXb9egYH_lIXMdt9oMJijb5mHXGVch9qVKxc" alt="" data-size="line"> in your Symphony client and select the **Interoperability** tab.
* Select Finsemble from the dropdown menu.

<figure><img src="https://lh3.googleusercontent.com/kKzz4aKlN45MxcgblUHe9DgG9rHZMxksNkKt4DMwMCZHkATGaNxDHz8Spbdcqdtb1eMr070tV60GRuvp85x321YxcqPy9pMv1i5whusqYf-9eaZBDdIqWg1jgQAc8DQKxxsPAHdDJ3Z5ETgf9IqJPWA" alt=""><figcaption></figcaption></figure>

### Configure Finsemble

Symphony Messaging needs to be registered in the App directory, so that it will be able to connect&#x20;

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

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide to validate that everything is working.
