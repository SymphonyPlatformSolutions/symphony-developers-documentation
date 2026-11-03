# Client 2.0 - 23.02

### Enhanced tags

* **Important**: The introduction of the new enhanced tags that will replace the existing $cashtags may have an impact on your existing bots and apps. More information available [here](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/shorthand-tags/enhanced-tags-notice.md).

### Desktop interop

* **View Chat**: Display an existing chat conversation in Symphony, identified by its streamID or list of participants.
* **FDC3 configuration through user settings**. End users can configure their desktop provider directly from the settings in their Symphony client, thanks to the new Interoperability tab.&#x20;
* **ECP support for FDC3**: It is possible to enable FDC3 on ECP (Embedded Collaboration Platform), so Symphony can interoperate with local apps, even when Symphony is embedded in another web application.

**Important**: As we add support for new intents in Symphony, please keep the Symphony app directory entry in your DIP up-to-date, as the desktop agent may block intents if they are not listed as supported by Symphony in the application directory.

Refer to the [documentation on desktop interoperability](../../../embedded-modules/desktop-interoperability/) for more information.
