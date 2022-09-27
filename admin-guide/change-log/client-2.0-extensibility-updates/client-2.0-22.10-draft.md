# Client 2.0 - 22.10 - Draft

### Desktop interop - October 2022

* **View Messages (inbound)**: You can now display in Symphony a view that aggregates all the messages that contain a specific #hashtag or $cashtag (new _ViewMessages_ intent). See the [View Messages](../../../embedded-modules/desktop-interoperability/fdc3-intents/#view-messages) section for more information.
* **Support of FDC3 2.0:** With the new FDC3 2.0 standard, intents can now return values to the calling app. As a result, the _StartChat_ intent now returns the stream IDs of the chats where the message has been posted. This means that you can target these rooms directly when sending a subsequent chat message (see the new _Send Chat Message_ intent below).
* **Send Chat Message** intent: You can now send a chat message to an existing chat, using its stream ID. **Note:** The user still needs to confirm the sending of the message. See the [Send Chat Message](../../../embedded-modules/desktop-interoperability/fdc3-intents/#send-chat-message) section for more information.

**Important**: As we add support for new intents in Symphony, please keep the Symphony app directory entry in your DIP up-to-date, as the desktop agent may block intents if they are not listed as supported by Symphony in the application directory.

### Early access features - continuous delivery

You can get a preview of the new features by loading the early access branch available in UAT and PROD environments.&#x20;

To do this, use the URL path `https://{pod_url}/client-bff/fdc3/index.html` in your browser.

**Note**: If you have to log in to Symphony when you load the URL, you will be automatically redirected to the production branch. If this happens, please load the early access branch (`/fdc3/index.html`) again.&#x20;

Early access features are meant for developers and integrators, and not for end users.

Early access features are automatically available in GA on the production branch at the end of the following month.

**Currently available early access features:**

* View Messages intent
* Send Chat Message intent
* Support of return values for the Start Chat intent
* View Contact intent - PROD planned for 22.11 November

Refer to the [documentation on desktop interoperability](../../../embedded-modules/desktop-interoperability/) for more information.
