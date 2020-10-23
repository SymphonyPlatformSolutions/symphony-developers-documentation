# BBAppDelegate

This object is your primary interface to the Symphony App. Your `UIApplicationDelegate` should implement all of the following selectors of the `UIApplicationDelegate` protocol and pass the original arguments to the BBAppDelegate sharedInstance.

{% hint style="info" %}
When accessing the [`BBAppDelegate`](bbappdelegate.md) use the shared instance, rather than instantiating your own copy.  
{% endhint %}

The first call you should be making to `BBAppDelegate` `sharedInstance` is `application:didFinishLaunchingWithOptions:`. When you do, make sure you are passing along a [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) object in the `launchOptions` dictionary under the key `BBApplicationParameters`.

\`\`[`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) is how you will control behaviors of the Symphony App such as whether copy/share/addressbook-access are enabled.

### Properties

{% tabs %}
{% tab title="authDelegate" %}
```swift
@property (nonatomic, weak) id <BBAuthorizationDelegate> authDelegate;
```
{% endtab %}
{% endtabs %}

**`authDelegate`**  
If you would like to override the standard Symphony sign-in experience, you should supply an object which conforms to the [`BBAuthorizationDelegate`](bbauthorizationdelegate.md).  
Set the `authDelegate` property before calling `application:didFinishLaunchingWithOptions:`  
If you change or reset or nil the authDelegate after calling `application:didFinishLaunchingWithOptions:` your changes may not be respected.

### Class Static Methods

{% tabs %}
{% tab title="sharedInstance" %}
```text
+ (BBAppDelegate *)sharedInstance;
```
{% endtab %}
{% endtabs %}

**`sharedInstance`**  
You should not call BBAppDelegate alloc init to get a copy of the BBAppDelegate. Instead use `BBAppDelegate sharedInstance`.  
Returns the shared instance of BBAppDelegate. **Using your own copy of BBAppDelegate may seem to work, but many features of the app will not behave correctly.**

### Methods

{% tabs %}
{% tab title="application:didFinishLaunchingWithOptions" %}
```swift
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
```
{% endtab %}
{% endtabs %}

**`application:didFinishLaunchingWithOptions`:**  
Call this from your UIApplicationDelegate's own `application:didFinishLaunchingWithOptions:`

* _application_ Pass the original parameter.
* _launchOptions_ Pass the original parameter. However, if you would like to customize the way the Symphony app acts, you must add a [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) object to the `launchOptions` dictionary under the key `BBApplicationParameters`.

{% tabs %}
{% tab title="applicationWillResignActive" %}
```swift
- (void)applicationWillResignActive:(UIApplication *)application;
```
{% endtab %}
{% endtabs %}

**`applicationWillResignActive`:**  
Call this from your UIApplicationDelegate's own `applicationWillResignActive:`

* _application_ Pass the original parameter.

{% tabs %}
{% tab title="applicationDidEnterBackground" %}
```swift
- (void)applicationDidEnterBackground:(UIApplication *)application;
```
{% endtab %}
{% endtabs %}

**`applicationDidEnterBackground`:**  
Call this from your UIApplicationDelegate's own `applicationDidEnterBackground:`

* _application_ Pass the original parameter.

{% tabs %}
{% tab title="applicationWillEnterForeground" %}
```text
- (void)applicationWillEnterForeground:(UIApplication *)application;
```
{% endtab %}
{% endtabs %}

**`applicationWillEnterForeground`:**  
Call this from your UIApplicationDelegate's own `applicationWillEnterForeground:`

* _application_ Pass the original parameter.

{% tabs %}
{% tab title="applicationDidBecomeActive" %}
```swift
- (void)applicationDidBecomeActive:(UIApplication *)application;
```
{% endtab %}
{% endtabs %}

**`applicationDidBecomeActive`:**  
Call this from your UIApplicationDelegate's own `applicationDidBecomeActive:`

* _application_ Pass the original parameter.

{% tabs %}
{% tab title="applicationWillTerminate" %}
```swift
- (void)applicationWillTerminate:(UIApplication *)application;
```
{% endtab %}
{% endtabs %}

**`applicationWillTerminate`:**  
Call this from your UIApplicationDelegate's own `applicationWillTerminate:`

* _application_ Pass the original parameter.

{% tabs %}
{% tab title="application:didReceiveRemoteNotification" %}
```swift
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo;
```
{% endtab %}
{% endtabs %}

**`application:didReceiveRemoteNotification`:**  
Call this from your UIApplicationDelegate's own `application:didReceiveRemoteNotification:`

* _application_ Pass the original parameter.
* _userInfo_ Pass the original parameter.

{% tabs %}
{% tab title="application:didRegisterForRemoteNotificationsWithDeviceToken" %}
```swift
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
```
{% endtab %}
{% endtabs %}

**`application:didRegisterForRemoteNotificationsWithDeviceToken`:**  
Call this from your UIApplicationDelegate's own `application:didRegisterForRemoteNotificationsWithDeviceToken:`

* _application_ Pass the original parameter.
* _deviceToken_ Pass the original parameter.

{% tabs %}
{% tab title="application:didFailToRegisterForRemoteNotificationsWithError" %}
```swift
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
```
{% endtab %}
{% endtabs %}

**`application:didFailToRegisterForRemoteNotificationsWithError`:**  
Call this from your UIApplicationDelegate's own `application:didFailToRegisterForRemoteNotificationsWithError:`

* _application_ Pass the original parameter.
* _error_ Pass the original parameter.

{% tabs %}
{% tab title="application:openURL:sourceApplication:annotation" %}
```swift
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;
```
{% endtab %}
{% endtabs %}

**`application:openURL:sourceApplication:annotation`:**  
Call this from your UIApplicationDelegate's own `application:openURL:sourceApplication:annotation:`

* _application_ Pass the original parameter.
* _url_ Pass the original parameter.
* _sourceApplication_ Pass the original parameter.
* _annotation_ Pass the original parameter.

{% tabs %}
{% tab title="logoutAndPreserveData" %}
```swift
- (void)logoutAndPreserveData;
```
{% endtab %}
{% endtabs %}

**`LogoutAndPreserveData`**  
Use this method to log the user out. Nothing special is done to local data at the time the user is logged out.  
This will be useful in cases where the MDM service indicates that the user has lost access to the network.  
No UI is shown to the user. Any messaging about why the user is being logged out should be performed by the caller.  
This must only be called from the main thread.

{% tabs %}
{% tab title="logoutAndClearData" %}
```swift
- (void)logoutAndClearData;
```
{% endtab %}
{% endtabs %}

**`LogoutAndClearData`**  
Use this method to log the user out. Local data is removed a the time the user is logged out.  
This will be useful in cases where the MDM service indicates that the user has lost access to the network.  
No UI is shown to the user. Any messaging about why the user is being logged out should be performed by the caller.  
This must only be called from the main thread.

{% tabs %}
{% tab title="resetApplicationLaunchParameters" %}
```swift
- (void)resetApplicationLaunchParameters:(BBApplicationLaunchParameters *)launchParams;
```
{% endtab %}
{% endtabs %}

**`ResetApplicationLaunchParameters`**  
When the policies change, use this to change the various permissions set in the [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) .  
The POD domain cannot be changed after the call to `didFinishLaunchingWithOptions:`  
If you call `resetApplicationLaunchParameters:` before `didFinishLaunchingWithOptions:`, your BBApplicationLaunchParameters will be overwritten by the defaults when you do call `didFinishLaunchingWithOptions`  
This should only be called after `didFinishLaunchingWithOptions`

{% tabs %}
{% tab title="updateApplicationIconBadgeNumber" %}
```swift
- (void)updateApplicationIconBadgeNumber;
```
{% endtab %}
{% endtabs %}

**UpdateApplicationIconBadgeNumber**  
Use this method to trigger the count update of the App Icon at the home screen.  
This method will retrieve the correct updated count and set the app badge count.

### Constants

{% tabs %}
{% tab title="kLoginWithUserNameSKey" %}
```swift
FOUNDATION_EXPORT NSString * const kLoginWithUserNameSKey;
```
{% endtab %}
{% endtabs %}

**`kLoginWithUserNameSKey`**  
If you supply a [`BBAuthorizationDelegate`](bbauthorizationdelegate.md), the application will turn over control to you whenever sign-in is required. When you have obtained the correct values, you post `kLoginWithUserNameSKey` notification to the default NSNotificationCenter.

An example of this notification would look like this:

{% tabs %}
{% tab title="kLoginWithUserNameSKey Notification" %}
```swift
NSDictionary *params = @{ @"antiCSRFCookie" : anticsrf, @"Cookie" : skey, @"kmCookie" : kmsession, @"kmAntiCSRFCookie" : kmAnticsrf };
[[NSNotificationCenter defaultCenter] postNotificationName:kLoginWithUserNameSKey object:self userInfo:params];
```
{% endtab %}
{% endtabs %}

The notification should contain four values. Two are cookies. One from the main Symphony server \("Cookie"\) and one from the Key Manager \("kmCookie"\). The other two are Anti-Cross-Site-Request-Forgery Cookies. These four values are obtained from the server either in the Set-Cookie response header or from the custom X-Symphony-CSRF-Token & X-KM-CSRF-Token response headers for Symphony and the Key Manager respectively.

You might reimplement the same calls that the web client uses to obtain these values, or you might obtain these values through a custom authentication flow. Exactly how you might obtain these four values are beyond the scope of this document.

If you follow the web-based SSO flow, here is where you can expect to find the four values.  
There are two relevant response headers from the call to `<pod>/login/sso/acs`  
Set-Cookie:  
Set-Cookie:

There are two relevant response headers from the call to `<pod>/relay/setsession`  
Set-Cookie:

{% tabs %}
{% tab title="x-km-csrf-token:BBApplicationParameters" %}
```swift
FOUNDATION_EXPORT NSString * const BBApplicationParameters;
```
{% endtab %}
{% endtabs %}

**BBApplicationParameters**  
When you are ready to start the Symphony Application, such as when your appDelegate responds to `application:didFinishLaunchingWithOptions:`, you create a [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) object and pass it to BBAppDelegate sharedInstance through "application:didFinishLaunchingWithOptions:." The [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) is passed in the `launchOptions` dictionary under the `BBApplicationParameters` key.

