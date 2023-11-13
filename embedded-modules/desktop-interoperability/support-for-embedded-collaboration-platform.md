# Support for Embedded Collaboration Platform

Our [Embedded Collaboration Platform](../embedded-collaboration-platform/) can be used directly containerized in Desktop Integration Platforms.&#x20;

It is therefore possible to load Symphony ECP as a standalone app.&#x20;

As Symphony listens to [ViewChat ](fdc3-intents/#view-chat)intents, it is possible even in Focus mode to navigate from one chat to another.&#x20;

However, to be able to do that in Focus mode, a specific setting (`container=true`) needs to be set when loading ECP in iFrame mode. When this setting is set, the Focus mode will load with a default landing page, therefore allowing to load the Focus mode without having to specify a specific `streamId`.

Once the landing page is loaded, it is then possible to pilot the displayed conversation using ViewChat intents.

### Loading ECP in DIP containers

Only the iFrame rendering mode is fully supported in containers.

**For the Focus mode:**

```html
https://{your_pod_url}.symphony.com/apps/embed?partnerId={partnerId}&container=true&mode=dark&condensed=true
```

In Focus mode, please note the presence of the `container` setting and the absence of the `streamId` setting.

**For the Collaboration mode:**

```html
https://{your_pod_url}.symphony.com/apps/client2?embed=true&partnerId={partnerId}&mode=dark&condensed=true
```

Reminder: Set the `partnerId` with the Partner Id that was provided to you. More info on Partner Id [here](../embedded-collaboration-platform/pricing-tiers.md#partner-id).
