# Configuration guide

{% hint style="info" %}
Since February 2023, it is no longer needed to configure an extension app in the Admin Portal.&#x20;
{% endhint %}

## Enable FDC3 on Symphony Messaging

Depending on the platform provider you use, the following options are available:&#x20;

#### **Native connector**&#x20;

Symphony Messaging directly embeds a native connector to **Interop.io** (Glue42), **Finsemble** and **Here** (formerly OpenFin)**.** With the native connector, you keep your Symphony Messaging standalone app as is, and Symphony Messaging will seamlessly connect to the FDC3 platform.&#x20;

* [**Here Core**](configure-here-core.md) version 20.1+: Here Core, previously known as [OpenFin Workspace](https://github.com/built-on-openfin/workspace-starter), requires SDA 25.3+. &#x20;
* [**Interop.io (Glue42)**](configure-with-the-native-connector.md) version 3.15+
* [**Finsemble** ](configure-finsemble.md)version 7.3.0+

#### **Standard connector using Embedded Mode**

You can also load Symphony Messaging Embedded Mode as a web application in your FDC3 platform and it will automatically connect using the window.fdc3 standard API. \
All FDC3-compliant platforms are supported, including **Connectifi**. Go to [configure-with-embedded-mode.md](configure-with-embedded-mode.md "mention") to configure.

You can also load directly the Symphony web app in your FDC3 platform. This is handy for testing but please note that we are not verifying our web app against all platforms so this is not a recommended approach in production.

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide.
