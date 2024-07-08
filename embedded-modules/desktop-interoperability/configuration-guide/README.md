# Configuration guide

{% hint style="info" %}
Since February 2023, it is no longer needed to configure an extension app in the Admin Portal.&#x20;
{% endhint %}

## Enable FDC3 on Symphony

Two options are available, depending on your platform provider:&#x20;

* **Native connector**: Symphony directly embeds a native connector to the **Glue42** and **Finsemble** platforms (now Interop.io). With the native connector, you keep your Symphony standalone desktop app as is, and Symphony will seamlessly connect to the FDC3 platform. Go to [configure-with-the-native-connector.md](configure-with-the-native-connector.md "mention")to continue.&#x20;
* **Standard connector using ECP.** You can also load Symphony ECP as a web application in your FDC3 platform and it will automatically connect using the window.fdc3 standard API. \
  All FDC3-compliant platforms are supported, including **OpenFin** and **Connectifi**. Go to [configure-with-ecp.md](configure-with-ecp.md "mention")to continue.

You can also load directly the Symphony webapp in your FDC3 platform. This is handy for testing but please note that we are not verifying our web app against all platforms so this is not a recommended approach for use in production.

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide.
