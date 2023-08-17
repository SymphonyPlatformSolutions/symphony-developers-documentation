# Client 2.0 - 22.10

### Desktop interop - October 2022

* **View Messages (inbound)**: You can now display in Symphony a view that aggregates all the messages that contain a specific #hashtag or $cashtag (new _ViewMessages_ intent). See the [View Messages](../../../embedded-modules/desktop-interoperability/fdc3-intents/#view-messages) section for more information.
* **Support of FDC3 2.0:** With the new FDC3 2.0 standard, intents can now return values to the calling app. As a result, the _StartChat_ intent now returns the stream IDs of the chats where the message has been posted. This means that you can target these rooms directly when sending a subsequent chat message (see the new _Send Chat Message_ intent below).
* **Send Chat Message** intent: You can now send a chat message to an existing chat, using its stream ID. **Note:** The user still needs to confirm the sending of the message. See the [Send Chat Message](../../../embedded-modules/desktop-interoperability/fdc3-intents/#send-chat-message) section for more information.

**Important**: As we add support for new intents in Symphony, please keep the Symphony app directory entry in your DIP up-to-date, as the desktop agent may block intents if they are not listed as supported by Symphony in the application directory.

Refer to the [documentation on desktop interoperability](../../../embedded-modules/desktop-interoperability/) for more information.
