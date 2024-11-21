# Configuration guide

{% hint style="info" %}
Since February 2023, it is no longer needed to configure an extension app in the Admin Portal.&#x20;
{% endhint %}

## Enable FDC3 on Symphony

Depending on the platform provider you use, the following options are available:&#x20;

* **Native connector**: Symphony directly embeds a native connector to **Glue42** and **Finsemble.** With the native connector, you keep your Symphony standalone app as is, and Symphony will seamlessly connect to the FDC3 platform. Go to [configure-with-the-native-connector.md](configure-with-the-native-connector.md "mention") to configure.&#x20;
* **Standard connector using ECP.** You can also load Symphony ECP as a web application in your FDC3 platform and it will automatically connect using the window.fdc3 standard API. \
  All FDC3-compliant platforms are supported, including **OpenFin** and **Connectifi**. Go to [configure-with-embedded-mode.md](configure-with-embedded-mode.md "mention") to configure.

You can also load directly the Symphony web app in your FDC3 platform. This is handy for testing but please note that we are not verifying our web app against all platforms so this is not a recommended approach in production.

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide.
