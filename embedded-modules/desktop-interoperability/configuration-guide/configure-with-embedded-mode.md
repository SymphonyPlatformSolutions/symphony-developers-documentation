# Configure with Embedded Mode

### **What is Embedded Mode?**

Symphony's **Embedded Mode** allows you to embed Symphony as a FDC3 enabled web component on your desktop platform.&#x20;

{% hint style="info" %}
Reminder: Embedded Mode is available as an add-on to the Symphony Services, and is subject to additional charges, terms, and Symphony review of your use case.&#x20;
{% endhint %}

We recommend loading Embedded Mode automatically at startup and always keep it on. It may also be possible to configure your desktop platform so that if the user closes the Embedded Mode window, the web app gets hidden instead of closed.

### Configure your FDC3 platform

Depending on your platform, the following steps will slightly differ. However the configuration will roughly consist in the following steps:

* Create a new app, that you can name "Symphony".
* The platform needs to provide the FDC3 API to Symphony using the window.fdc3 object. This option may be named `Inject FDC3` depending on your platform.
* Configure the FDC3 version:  Symphony supports FDC3 API version 1.2 and 2.0.&#x20;
* Configure the `load URL` of Symphony. This URL depends on the **mode** that best suits your use case: _Focus_ mode or _Collaboration_ mode.&#x20;

### Modes

Two modes are supported.

* The **Focus** mode, that displays a single view. The chat list is not visible. The Focus mode is very compact.
* The **Collaboration** mode, which looks like a simplified version of the Symphony desktop app. The user has access to the usual chat list, can navigate, search, and perform most actions available in the desktop app.

Depending on what you want to do, one mode may be more adapted than the other.

#### **Load URL for Focus mode**

Configure the following **load URL** in your FDC3 platform:

```html
https://{your_pod_url}.symphony.com/apps/embed?partnerId={partnerId}&container=true&mode=dark&condensed=true
```

In Focus mode, Symphony will not show the usual chat list. On startup, a landing page will be displayed instead.

To open a first chat or to navigate to another chat, you can raise a [ViewChat ](../fdc3-intents/#view-chat)intent. Symphony will automatically display the specified chat conversation.

Please note the presence of the `container` parameter and the absence of the `streamId` parameter.

Not all FDC3 intents may be available in Focus mode.

#### **Load URL for Collaboration mode**

In collaboration mode the user is able to navigate between his chats and can also start a new chat.&#x20;

Configure the following **load URL** in your fdc3 platform:

```html
https://{your_pod_url}.symphony.com/apps/client2?embed=true&partnerId={partnerId}&mode=dark&condensed=true
```

{% hint style="info" %}
Loading Symphony in Embedded Mode requires a`partnerId` to be passed along in the load URL. More info on Partner Id is available [here](../../embedded-mode/pricing-tiers.md#partner-id).
{% endhint %}

Once your configuration is complete, please have a look at our [troubleshooting.md](troubleshooting.md "mention") guide to validate that everything is working.

### Get started quickly with OpenFin

If you are using the OpenFin platform, you can see an example of how to setup Symphony Embedded Mode in an OpenFin Workspace in the [following GitHub page](https://github.com/built-on-openfin/contest-starter/blob/main/workspace/symphony/challenge-2023/README.md).
