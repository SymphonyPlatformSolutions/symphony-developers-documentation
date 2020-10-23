# BBApplicationLaunchParameters

BBApplicationLaunchParameters is the class that encapsulates the various ways in which you can configure the Symphony App's behavior.

Typically you will allocate one of these at the time of `application:didFinishLaunchingWithOptions:`. You then set the parameters however you would like then you add the BBApplicationLaunchParameters to the launchOptions dictionary with the key `BBApplicationParameters`.

Once you have passed the [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) to the [`BBAppDelegate`](bbappdelegate.md) through `application:didFinishLaunchingWithOptions:`, changes to the [`BBApplicationLaunchParameters`](bbapplicationlaunchparameters.md) will not be reflected in the app.

### Properties

{% tabs %}
{% tab title="PodDomain" %}
```text
@property (nonatomic, strong) NSString *podDomain
```
{% endtab %}
{% endtabs %}

**PodDomain**  
When set, this controls the domain name to which the application can connect.  
For example:  
If you pass "home" the application will try to connect to home.symphony.com.  
If you pass "home.com" the application will try to connect to home.com  
Default is nil, which allows connection to any pod in the default Authentication UI.

{% tabs %}
{% tab title="PodSSOURL" %}
```text
@property (nonatomic) NSURL *podSSOURL
```
{% endtab %}
{% endtabs %}

**PodSSOURL**  
If the pod's SSO URL is specified \(and disableSSO is not set to YES\), the application will jump to this URL as though SSO were selected by the user.  
If specified, the host of this URL is used as the pod's domain, and the podDomain & userEmailAddress fields are ignored.  
Default is nil.

{% tabs %}
{% tab title="userEmailAddress" %}
```text
@property (nonatomic, strong) NSString *userEmailAddress;
```
{% endtab %}
{% endtabs %}

**UserEmailAddress**  
If the user's email address is specified, the sign-in control will be pre-populated with this value.

{% tabs %}
{% tab title="AllowPhotoPicker" %}
```text
@property (nonatomic) BOOL allowPhotoPicker;
```
{% endtab %}
{% endtabs %}

**AllowPhotoPicker**  
Set this to YES if you would like to permit your users to attach photos from their camera roll \(or taken from their camera\) to messages sent within the application.  
Default is YES.

{% tabs %}
{% tab title="Objective-C" %}
```text
@property (nonatomic) BOOL disableAccessToPhotoGallery;
```
{% endtab %}
{% endtabs %}

**disableAccessToPhotoGallery**  
Set this to YES if you would like to block your users from attaching photos from their camera roll to messages sent within the application.  
Default is NO.

{% tabs %}
{% tab title="AllowWebView" %}
```text
@property (nonatomic) BOOL allowWebView;
```
{% endtab %}
{% endtabs %}

**AllowWebView**  
Set this to YES if you would like to permit your users to view non-image attachments and URLs sent within the application.  
Default is YES.

{% tabs %}
{% tab title="AllowSharing" %}
```text
@property (nonatomic) BOOL allowSharing;
```
{% endtab %}
{% endtabs %}

**AllowSharing**  
Set this to YES if you would like to permit your users to share image attachments out to other applications through the OS installed share extensions.  
Default is YES.

{% tabs %}
{% tab title="AllowCrashlytics" %}
```text
@property (nonatomic) BOOL allowCrashlytics;
```
{% endtab %}
{% endtabs %}

**AllowCrashlytics**  
Set this to YES if you would like to permit the Symphony application to submit crash reports through the 3rd party application named Crashlytics.  
The Public AppStore version of the application does this and it is helpful for collecting crash reports and monitoring.  
Default is YES.

{% tabs %}
{% tab title="AllowAnalytics" %}
```text
@property (nonatomic) BOOL allowAnalytics;
```
{% endtab %}
{% endtabs %}

**AllowAnalytics**  
Set this to YES if you would like to permit the Symphony application to record anonymous usage statistics.  
Default is YES.

{% tabs %}
{% tab title="AllowAddressBook" %}
```text
@property (nonatomic) BOOL allowAddressBook;
```
{% endtab %}
{% endtabs %}

**AllowAddressBook**  
Set this to YES if you would like to permit your users to access their OS Address Book when inviting new contacts to the application.  
Default is YES.

{% tabs %}
{% tab title="AllowCopy" %}
```text
@property (nonatomic) BOOL allowCopy;
```
{% endtab %}
{% endtabs %}

**AllowCopy**  
Set this to YES if you would like to permit your users to copy the contents of messages they receive within the application.  
Default is YES.

{% tabs %}
{% tab title="NetworkDebugging" %}
```text
@property (nonatomic) BOOL networkDebugging;
```
{% endtab %}
{% endtabs %}

**NetworkDebugging**  
Set this to YES if you would like the Symphony application to emit logging which may be helpful to debug network-related issues. This is probably only helpful during the bring-up/integration phase.  
Default is NO.

{% tabs %}
{% tab title="ShowClearCacheOnSignOut" %}
```text
@property (nonatomic) BOOL showClearCacheOnSignOut;
```
{% endtab %}
{% endtabs %}

**ShowClearCacheOnSignOut**  
Set this to YES if you would like the Symphony application to show the "Clear Cache on Sign out" control in the Settings view.  
The "Clear Cache on Sign out" allows the user to retain all of his information in a local \(encrypted\) cache when signed out of the application.  
This could be useful for occasions when signing-in while offline to access data cached locally.  
Default is NO.

{% tabs %}
{% tab title="DisablePincode" %}
```text
@property (nonatomic) BOOL disablePincode;
```
{% endtab %}
{% endtabs %}

**DisablePincode**  
Set this to YES if you would like the Symphony application to hide the "Turn On Pincode" control in the Settings view.  
The "Turn On Pincode" allows the application to require a 6 digit pin code to launch the application. This is in addition to the username & password required to login initially.  
This could be useful for situations where you are providing your own layer of security to the application.  
If the user has the Pincode enabled, as from a previous version of the app, the "Turn Off Pincode" option will be available, but the "Unlock with Touch ID" option will not be enabled. Once the pincode is disabled, the "Turn On Pincode" option will not be enabled.  
Default is NO.

{% tabs %}
{% tab title="DisableIntroduction" %}
```text
@property (nonatomic) BOOL disableIntroduction;
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="enforcePincode" %}
```text
@property (nonatomic) BOOL enforcePincode;
```
{% endtab %}
{% endtabs %}

**EnforcePincode**  
Set this to YES if you would like the Symphony application to force user to define a 6 digit pin code to launch the application.  
If enabled, the "Turn Off Pincode" control in the Settings view must be hidden.  
This option overrides disablePincode. It means if both disablePincode and enforcePincode are enabled, enforcePincode wins and the user must define the pin code.  
If the user is already logged from a previous version of the app or with the enforcePincode disabled when logged, a prompt must ask the user to define the pin code to launch the application  
Default is NO

**DisableIntroduction**  
Set this to YES if you would like the Symphony application to hide First Launch introduction screens.  
Default is NO.

{% tabs %}
{% tab title="allowFeedback" %}
```text
@property (nonatomic) BOOL allowFeedback;
```
{% endtab %}
{% endtabs %}

**AllowFeedback**  
Set this to YES if you would like the Symphony application to show the feedback feature in settings.  
Default is YES.

{% tabs %}
{% tab title="enforceBBAccess" %}
```text
@property (nonatomic) BOOL enforceBBAccess;
```
{% endtab %}
{% endtabs %}

**EnforceBBAccess**  
Set this to YES if you would like to enforce Symphony application to open links in BlackBerry Access app. \(applies to Symphony for BlackBerry only\).  
Default is NO.

{% tabs %}
{% tab title="allowSendingEmojis" %}
```text
@property (nonatomic) BOOL allowSendingEmojis;
```
{% endtab %}
{% endtabs %}

**AllowSendingEmojis**  
Set this to YES if you would like the Symphony application to render emojis sent or received by the user.  
Default is YES.

{% tabs %}
{% tab title="Objective-C" %}
```text
@property (nonatomic, strong) NSNumber *refreshTokenPeriod;
```
{% endtab %}
{% endtabs %}

**refreshTokenPeriod**  
Define the refresh token delay  
If not defined the default value will be used 24h.

{% tabs %}
{% tab title="Objective-C" %}
```text
@property (nonatomic) BOOL allowOpeningEmailAddress;
```
{% endtab %}
{% endtabs %}

**allowOpeningEmailAddress**  
Set this to YES if you would like to permit your users to open email address in an external application  
Default is YES

## Methods

### `init()`

```text
- (id)init NS_DESIGNATED_INITIALIZER;
```

  
This is the designated initializer for BBApplicationLaunchParameters.  
Use this to create a BBApplicationLaunchParameters which you pass to the shared instance of [`BBAppDelegate`](bbappdelegate.md) through the method application:didFinishLaunchingWithOptions:

{% tabs %}
{% tab title="setText:forCustomViewID" %}
```text
- (void)setText:(NSString *)text forCustomViewID:(BBCustomViewID)customization;
```
{% endtab %}
{% endtabs %}

**setText:forCustomViewID:**  
This is how you can pass custom text for various UI customizations.  
**@param** text NSString of the text you would like displayed to the user.  
**@param** customization [`BBCustomViewID`](../enumerations/bbcustomviewid.md) enumeration value specifying where the text should be displayed.

{% tabs %}
{% tab title="textForCustomViewID" %}
```text
- (NSString *)textForCustomViewID:(BBCustomViewID)customization;
```
{% endtab %}
{% endtabs %}

This is how you can retrieve the custom text for various UI customizations.  
This method is used by the Symphony App when setting up the associated UI elements.  
**@param** customization [`BBCustomViewID`](../enumerations/bbcustomviewid.md) enumeration value of the text you would like to retrieve  
**@return** NSString of the customized value

