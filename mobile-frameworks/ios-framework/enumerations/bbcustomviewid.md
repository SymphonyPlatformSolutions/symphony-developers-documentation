# BBCustomViewID

BBCustomViewID is an enumeration for identifying various UI customization points provided by the Symphony Framework.  
You use the [`BBApplicationLaunchParameters`](../classes/bbapplicationlaunchparameters.md) to set the text for various [`BBCustomViewID`](bbcustomviewid.md) before passing the [`BBApplicationLaunchParameters`](../classes/bbapplicationlaunchparameters.md) to [`BBAppDelegate`](../classes/bbappdelegate.md) in application:didFinishLaunchingWithOptions:.

{% hint style="info" %}
Once you have passed the `BBApplicationLaunchParameters` to `BBAppDelegate`, additional changes to the `BBApplicationLaunchParameters` may not be picked up.  
{% endhint %}

{% tabs %}
{% tab title="BBCustomViewID" %}
```text
typedef NS_ENUM(NSUInteger, BBCustomViewID)
{
    BBCustomViewIDLoginForgotPassword
};
```
{% endtab %}
{% endtabs %}

**`BBCustomViewIDLoginForgotPassword`**  
This is the text of the forgot password link on the default sign-in screen.  
If you are providing your own [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md), setting the text for this id can have no effect.

