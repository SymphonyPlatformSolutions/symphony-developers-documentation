# Support for extension applications

Extension applications on Symphony Messaging provide an easy and secure way to customize the Symphony experience.

Extension applications allow you to extend various parts of the Symphony Messaging UI by adding buttons to direct chats, group chats and chat rooms. They also allow you to display rich interactive content in a message through [structured objects](../../bots/messages/overview-of-messageml/entities/structured-objects.md).\
\
By default, Embedded Mode will not load any extension applications. Embedded Mode can, however, be configured to load extension apps by using the **allowedApps** [parameter](configuration-parameters.md), passing a comma separated list of app IDs. The [App ID](../../ext-apps/getting-started/bundle.md) is the identifier you provide for your app when configuring the app on your pod. \
\
**Note**: Only apps that are configured on the pod and installed can be loaded by Embedded Mode.

In Focus mode, apps can perform custom entity rendering, add buttons to the chat header or tags, and so on. In Collaboration mode, apps can also be opened from the app tray to display a custom UI.&#x20;

To know more about Symphony Messaging extension apps and how to build extension apps, see [Building extension apps on Symphony Messaging](../../ext-apps/building-extension-apps.md).&#x20;

Once an app is loaded, you can also dynamically open an app view in Embedded Mode using the `openApp` method, see [here](open-an-app.md).
