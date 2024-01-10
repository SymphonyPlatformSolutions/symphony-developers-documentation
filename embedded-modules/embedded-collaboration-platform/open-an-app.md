# Open an app

## Open an extension app with an appId

{% hint style="info" %}
`openApp` is only available in **Focus** mode for now.
{% endhint %}

The `openApp` function exposed by the SDK allows you to open a module of an extension app in ECP.&#x20;

The extension app needs to be already installed for the user, and to have been preloaded by ECP, using the `allowedApps` setting. Please refer to [Support for extension applications](support-for-extension-applications.md) for information on preloading an app.&#x20;

{% hint style="info" %}
Only extension applications that add navigation links can be opened in ECP.
{% endhint %}

To learn more about extension APIs, refer to the relevant [developers documentation](../../ext-apps/overview-of-extension-api/).

#### Parameters

<table><thead><tr><th width="211.33333333333331">Parameter</th><th width="116">Type</th><th>Description</th></tr></thead><tbody><tr><td>appId</td><td>string</td><td>Id of the extension app (as defined in the Admin Portal)</td></tr><tr><td>moduleName</td><td>string | undefined</td><td>The label of the nav item that will be opened. If an app registers several links, this parameter can be used to select which link will open.</td></tr><tr><td>containerSelector</td><td>string | undefined</td><td>Selector of the container to add the new ECP iFrame into</td></tr></tbody></table>

If an error occurs (for example, if the app is not installed for the user or not loaded, or the app has not registered a nav item), then an error page will be displayed to the user.
