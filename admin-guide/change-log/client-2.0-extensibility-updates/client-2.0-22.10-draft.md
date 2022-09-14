# Client 2.0 - 22.10 - Draft

### Desktop interop - October 2022

* **View Messages**: It is possible to show all messages that contain a specific hashtag or cashtag (new ViewMessages intent)
* **Support of FDC3 2.0:** With the new FDC3 2.0 standard, intents can now return values to the calling app. The StartChat intent now returns the stream ids of the chats where the message has been posted. This means that you can target directly these rooms when sending a subsequent chat message (see new Send Chat Message intent below)
* **Send Chat Message** intent: You can now send a chat message to an existing room, using its streamid. Note: The user still needs to confirm the sending of the message.

### Early access features - Continuous delivery

You can get a preview of the new features by loading the early access branch available in UAT and PROD environments.

To do this, use the following URL path: `https://{pod_url}/client-bff/fdc3/index.html` in your browser.

**Note**: If you have to log into Symphony when you load the URL, you will be automatically redirected to the production branch. If this happens, please load again the early access branch (`/fdc3/index.html`).&#x20;

Early access features are meant for developers and integrators, and not end users.

Early access features are automatically available in GA on the production branch at the end of the following month.

**Currently available early access features:**

* ViewMessages intent
* Send Chat Message intent
* Support of return values for the Start Chat intent

Learn more on desktop interop [here](../../../embedded-modules/desktop-interoperability/).

###
