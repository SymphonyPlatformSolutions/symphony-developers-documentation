# BBAuthorizationDelegate

BBAuthorizationDelegate is the protocol required for you to customize the sign-in experience of the Symphony App. To customize, you must set the authDelegate property of the shared instance of [`BBAppDelegate`](bbappdelegate.md) before calling application:didFinishLaunchingWithOptions:

{% hint style="info" %}
When accessing the BBAppDelegate use the share instance, rather than instantiating your own copy.  
{% endhint %}

If you do this, when the application normally would show the sign-in UI, your `BBAuthorizationDelegate` will have the `showAuthentication` method called. At this point you are free to present any UI that allows your user to sign-in. When you have completed the sign-in process and collected the required cookies/value, you post a `kLoginWithUserNameSKey` notification.

{% hint style="info" %}
See kLoginWithUsereNameSKey under [`BBAppDelegate`](bbappdelegate.md) for more details.  
{% endhint %}

## Methods

{% tabs %}
{% tab title="showAuthentication" %}
```aspnet
- (void)showAuthentication;
```
{% endtab %}
{% endtabs %}

**`showAuthentication`**  
This is the method that the Symphony App calls to give you the opportunity to present your custom sign-in UI. When you have completed the sign-in process and collected the required cookies/value, you post a `kLoginWithUserNameSKey` notification.

{% hint style="danger" %}
### Deprecated Method

`showAuthentication` has been deprecated as of 1.43 and will be removed in a future version of the framework.  Please move over to using `showAuthenticationForLogoutType`.
{% endhint %}

{% tabs %}
{% tab title="showAuthenticationForLogoutType" %}
```text
- (void)showAuthenticationForLogoutType:(BBLogoutType)type;
```
{% endtab %}
{% endtabs %}

**`showAuthenticationForLogoutType`**  
This is the method that the Symphony App calls to give you the opportunity to present your custom sign-in UI.  
When you have completed the sign-in process and collected the required cookies/value, you post a notification. See `kLoginWithUserNameSKey` on the [`BBAppDelegate`](bbappdelegate.md) page.  
This method is optional today, but when the deprecated version \(showAuthentication\) is removed, this method will become required.  
If you have implemented this method, the deprecated version \(`showAuthentication`\) will never be called.  
See [`BBLogoutType`](../enumerations/bblogouttype.md)\`\`

