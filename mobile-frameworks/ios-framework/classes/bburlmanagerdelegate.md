# BBURLManagerDelegate

The `BBURLManagerDelegate` is how you can determine how and where the framework will open web links and attachments in conversations and posts.

One common use for this API is to forward selected URLs & attachments to external apps that are approved by your organization.

{% hint style="info" %}
#### BBURLManagerDelegate & BBApplicationLaunchParameters

The following functionality is triggered only after the framework has evaluated the allowWebView property of [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md).  If `allowWebView` is set to NO, your [`BBURLManagerDelegate`](bburlmanagerdelegate.md) will not be called at all. &#x20;
{% endhint %}

{% tabs %}
{% tab title="BBURLManagerDelegate" %}
```
@protocol BBURLManagerDelegate <NSObject>

@optional
- (NSURL *)urlManager:(BBURLManager *)manager appStoreUrlForForcedUpgradeToMinimumVersion:(NSString *)minimum withDefaultURL:(NSURL *)url;

- (BOOL)urlManager:(BBURLManager *)manager shouldOpenURL:(NSURL *)url;

- (BOOL)urlManager:(BBURLManager *)manager shouldOpenDecryptedData:(NSData *)data withFileName:(NSString *)name;

- (id <BBAlternateApplicationProxy>)urlManager:(BBURLManager *)manager alternateApplicationForURL:(NSURL *)url;

- (id <BBAlternateApplicationProxy>)urlManager:(BBURLManager *)manager alternateApplicationForFileName:(NSString *)name;

- (BOOL)urlManager:(BBURLManager *)manager openURL:(NSURL *)url inAlternateApplication:(id <BBAlternateApplicationProxy>)alternate;

- (BOOL)urlManager:(BBURLManager *)manager openDecryptedData:(NSData *)data withFileName:(NSString *)filenme inAlternateApplication:(id <BBAlternateApplicationProxy>)alternate;

- (void)urlManager:(BBURLManager *)manager webView:(UIWebView *)webView willMoveToWindow:(UIWindow *)window;

- (void)urlManager:(BBURLManager *)manager webViewDidMoveToWindow:(UIWebView *)webView;

@end
```
{% endtab %}
{% endtabs %}

## Methods

{% hint style="info" %}
#### The following methods must only be called on the main thread/queue. &#x20;
{% endhint %}

{% tabs %}
{% tab title="Objective-C" %}
```
- (NSURL *)urlManager:(BBURLManager *)manager appStoreUrlForForcedUpgradeToMinimumVersion:(NSString *)minimum withDefaultURL:(NSURL *)url;
```
{% endtab %}
{% endtabs %}

**`urlManager:appStoreUrlForForcedUpgradeToMinimumVersion:withDefaultURL`:**

When the pod requires a minimum version that is newer than the version running the `BBURLManagerDelegate` is given the opportunity to change the URL that the user is taken to. The assumption that this URL will explain to the user how to upgrade the app, or will be an AppStore url from where the newer version of the app can be downloaded.

* _manager_ The shared instance of the `BBURLManager`
* _minimum_ The version number of the Symphony framework to which you must upgrade to interact with this version of the server.
* _url_ The URL to the Symphony app in the AppStore. This is the URL the app will use if you do not override this method and return a different URL.

{% tabs %}
{% tab title="Objective-C" %}
```
- (BOOL)urlManager:(BBURLManager *)manager shouldOpenURL:(NSURL *)url;
```
{% endtab %}
{% endtabs %}

**`urlManager:shouldOpenURL`:**

When the user has tapped on a URL in a chat room, should the contents be opened in an in-app UIWebView? This is your opportunity to open the URL in an external application of your choosing.\
If you return YES, the app will present the URL in an in-app UIWebView.\
If you return NO, the app will not present the URL, with the assumption that you either have forbidden it or have presented it yourself.

* _manager_ The shared instance of the BBURLManager
* _url_ The URL that the app would like to present to the user in an in-app UIWebView.

If you do not override this method, the app will open this URL in an in-app UIWebView.

{% tabs %}
{% tab title="Objective-C" %}
```
- (BOOL)urlManager:(BBURLManager *)manager shouldOpenDecryptedData:(NSData *)data withFileName:(NSString *)name;
```
{% endtab %}
{% endtabs %}

**`urlManager:shouldOpenDecryptedData:withFileName`:**

When the user has tapped on an attached file (PDF, XLS, etc) in a chat room. Should the contents be opened in an in-app UIWebView? This is your opportunity to open the URL in an external application of your choosing.\
If you return YES, the app will present the URL in an in-app UIWebView.\
If you return NO, the app will not present the data, with the assumption that you either have forbidden it or have presented it yourself.

* _manager_ The shared instance of the `BBURLManager`
* _data_ The decrypted bytes of the attachment. These have been downloaded and decrypted for you to present to your user. These decrypted bytes are not stored on the device by the framework.
* _name_ The file name of the attachment. This can be used to infer the mime-type of the NSData.

If you do not override this method, the app will open this file data in an in-app UIWebView.

{% tabs %}
{% tab title="Objective-C" %}
```
- (id <BBAlternateApplicationProxy>)urlManager:(BBURLManager *)manager alternateApplicationForURL:(NSURL *)url;
```
{% endtab %}
{% endtabs %}

**`urlManager:alternateApplicationForURL`:**

When the user has tapped on an attached URL in a chat room,\
and when your `URLManagerDelegate` has answered YES to `shouldOpenURL:`\
The URLManager will ask you for an alternate application which the user might want to use to open this URL.\
If you have such an alternate application you can create an object to let the URLManager know that the alternate application exists.\
The Alternate Application needs only be able to provide a 48x48 pixel image (presumably the app's icon) for use in a navigation bar button.\
When the user taps on this navigation bar button, the `openURL:withAlternateApplication:` method will be called.

Return nil to indicate there is no alternate application.

{% tabs %}
{% tab title="Objective-C" %}
```
- (id <BBAlternateApplicationProxy>)urlManager:(BBURLManager *)manager alternateApplicationForFileName:(NSString *)name;
```
{% endtab %}
{% endtabs %}

**`urlManager:alternateApplicationForFileName`:**

When the user has tapped on an attached file in a chat room,\
and when your `URLManagerDelegate` has answered YES to `shouldOpenDecryptedData:`\
The URLManager will ask you for an alternate application which the user might want to use to open this data.\
If you have such an alternate application you can create an object to let the URLManager know that the alternate application exists.\
The Alternate Application needs only be able to provide a 48x48 pixel image (presumably the app's icon) for use in a navigation bar button.\
When the user taps on this navigation bar button, the `openDecryptedData:withAlternateApplication:`method will be called.

Return nil to indicate there is no alternate application.

{% tabs %}
{% tab title="Objective-C" %}
```
- (BOOL)urlManager:(BBURLManager *)manager openURL:(NSURL *)url inAlternateApplication:(id <BBAlternateApplicationProxy>)alternate;
```
{% endtab %}
{% endtabs %}

**`urlManager:openURL:inAlternateApplication`:**

When you have returned a `BBAlternateApplicationProxy` for a given URL,\
the framework will present UI which allows the user to open the URL in an external application.\
When the user opts to open the URL in the external application, this delegate call gives you the opportunity to open the URL in the external application.\
The `BBAlternateApplicationProxy` will be the same object returned by you in the call to `alternateApplicationForURL:`

Return NO if there was an error.

{% tabs %}
{% tab title="Objective-C" %}
```
- (BOOL)urlManager:(BBURLManager *)manager openDecryptedData:(NSData *)data withFileName:(NSString *)filenme inAlternateApplication:(id <BBAlternateApplicationProxy>)alternate;
```
{% endtab %}
{% endtabs %}

**`urlManager:openDecryptedData:withFileName:inAlternateApplication`**

When you have returned a `BBAlternateApplicationProxy` for a given file,\
the framework will present UI which allows the user to open the file in an external application.\
When the user opts to open the file in the external application, this delegate call gives you the opportunity to open the file in the external application.\
The `BBAlternateApplicationProxy` will be the same object returned by you in the call to `alternateApplicationForFileName:`

Return NO if there was an error.

{% tabs %}
{% tab title="UIWebViews" %}
```
- (void)urlManager:(BBURLManager *)manager webView:(UIWebView *)webView willMoveToWindow:(UIWindow *)window;
- (void)urlManager:(BBURLManager *)manager webViewDidMoveToWindow:(UIWebView *)webView;
```
{% endtab %}
{% endtabs %}

**`urlManager:webView:willMoveToWindow`:**\
**`urlManager:webViewDidMoveToWindow`:**

These methods are called anytime (before & after) a UIWebView is moved to a window. The window will be nil when exiting the window.\
This gives the application the chance to modify the UIWebView or to interrogate its settings.

{% hint style="danger" %}
### Do not change the `UIWebView` delegate

Changing the UIWebView delegate is not recommended, and may lead to unexpected results.  The intended use o these methods are to allow you to control how the UIWebView connects to the internet, as the GD.framework's `GDURLRequestConnectionDelegate`. &#x20;
{% endhint %}
