# Get Started

Clone the code repository from[ https://github.com/SymphonyOSF/SIOS-Shared](https://github.com/SymphonyOSF/SIOS-Shared)

The easiest way to start with the iOS Framework is to build the sample project.

Build and run the FrameworkDemo.xcodeproj located at `<SIOS-Shared>/Framework/FrameworkDemo`

The FrameworkDemo provides a bare-bones shell application which configures and launches the Symphony application.

Your main interface to the application is through the shared instance of [`BBAppDelegate`](classes/bbappdelegate.md).

{% hint style="warning" %}
When accessing the [`BBAppDelegate`](classes/bbappdelegate.md) use the shared instance, rather than instantiating your own copy.
{% endhint %}

Your application must pass calls from the UIApplication to the UIApplicationDelegate callbacks which the shared instance of [`BBAppDelegate`](classes/bbappdelegate.md) implements. It is essential that the shared instance of [`BBAppDelegate`](classes/bbappdelegate.md) gets a chance to process these messages.

{% hint style="info" %}
See [`BBAppDelegate`](classes/bbappdelegate.md) for the complete list of `UIApplicationDelegate` methods that are required.
{% endhint %}

The first call that `BBAppDelegate` is expecting is from the application:didFinishLaunchingWithOptions: method. It is before calling this method that you have the opportunity to configure the Symphony application. There are several settings that you can configure such as enabling copy/paste or attaching photos to messages sent. You configure the application by through the [`BBApplicationLaunchParameters`](classes/bbapplicationlaunchparameters.md) that you pass to the `BBAppDelegate` through the NSDictionary passed through application:didFinishLaunchingWithOptions:.

Getting the Symphony application up and running can be as simple as:

* Create a [`BBApplicationLaunchParameters`](classes/bbapplicationlaunchparameters.md)``
* Configure the [`BBApplicationLaunchParameters`](classes/bbapplicationlaunchparameters.md) (optional)
* Pass the [`BBApplicationLaunchParameters`](classes/bbapplicationlaunchparameters.md) to the [`BBAppDelegate`](classes/bbappdelegate.md)``
* Pass messages from your `UIApplicationDelegate` to [`BBAppDelegate`](classes/bbappdelegate.md)``

After you've setup the `BBAppDelegate` and called `application:didFinishLaunchingWithOptions`: (as a part of your app delegate processing this same call), your app delegate should continue to forward the `UIApplicationDelegate` calls to the shared instance of the `BBAppDelegate`.

{% tabs %}
{% tab title="Bare Minimum Configuration" %}
```java
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    BBApplicationLaunchParameters *applicationLaunchParameters = [[BBApplicationLaunchParameters alloc] init];
    NSDictionary *applicationLaunchOptions = [NSMutableDictionary dictionaryWithDictionary:launchOptions];
    [applicationLaunchOptions setValue:applicationLaunchParameters forKey:BBApplicationParameters];
    return [[BBAppDelegate sharedInstance] application:application didFinishLaunchingWithOptions:applicationLaunchOptions];
}
```
{% endtab %}
{% endtabs %}

In the demo application, the `UIApplicationDelegate` class to the `UIApplication` (FDAppDelegate) does all of the interaction with the `BBAppDelegate`. The reason for this is that `BBAppDelegate` needs to process many of the calls that come into the UIApplicationDelegate. You are expected to pass along these calls and their parameters to the `BBAppDelegate`:

{% tabs %}
{% tab title="UIApplicationDelegate pass through" %}
```java
- (void)applicationWillResignActive:(UIApplication *)application
{
    [[BBAppDelegate sharedInstance] applicationWillResignActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    [[BBAppDelegate sharedInstance] applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    [[BBAppDelegate sharedInstance] applicationWillEnterForeground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    [[BBAppDelegate sharedInstance] applicationDidBecomeActive:application];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [[BBAppDelegate sharedInstance] applicationWillTerminate:application];
}

- (void)application:(UIApplication*)application didReceiveRemoteNotification:(NSDictionary*)userInfo
{
    [[BBAppDelegate sharedInstance] application:application didReceiveRemoteNotification:userInfo];
}

- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [[BBAppDelegate sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [[BBAppDelegate sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return [[BBAppDelegate sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

```
{% endtab %}
{% endtabs %}

## Securing NSUserDefaults

The framework stores some preference-like information in a data store that conforms to the [`BBAbstractDataStore`](classes/bbabstractdatastore.md) protocol. You may want to set your own data store so you can secure these preference values.

{% tabs %}
{% tab title="Setting up the BBAbstractDataStore" %}
```java
[BBDataContainer setDefaultDataStore:[MySecureUserDefaults standardUserDefaults]];
```
{% endtab %}
{% endtabs %}

This should be done before your first call to the [`BBAppDelegate`](classes/bbappdelegate.md).

## Securing File IO

The framework uses BBFileManager.framework for all of its file access, apart from database access. You could either create a replacement BBFileManager framework, exposing all the same public classes and deliver this replacement instead of the default BBFileManager, or you could implement a few key classes and register them with [`BBFileManagerHelper`](classes/bbfilemanagerhelper.md).

{% tabs %}
{% tab title="Setting up BBFileManagerHelper" %}
```java
[BBFileManagerHelper registerClassForFileManager:[MySecureFileManager class]];
[BBFileManagerHelper registerClassForFileHandle:[MySecureFileHandle class]];
```
{% endtab %}
{% endtabs %}

This should be done before your first call to the [`BBAppDelegate`](classes/bbappdelegate.md).

## Securing the Database

{% hint style="warning" %}
### API Change

Starting on version 1.57.0 it's no longer possible to register custom database integrations.
{% endhint %}

## Securing Network Access

The framework uses NSURLConnection and NSURLSession objects for all networking. You could register custom protocol handlers to intercept the framework's NSURLConnection and NSURLSession requests. This method is how many popular MDM/EMM frameworks, such as MobileIron and Good, implement tunneling. If you're integrating with one of these frameworks, you may not need to do anything to be securing the network access. Or you could register your class as [`BBRequestSerializerDelegate`](classes/bbrequestserializerdelegate.md) and alter all of the NSURLRequests used by the framework. Check the [`BBRequestSerializationManager`](classes/bbrequestserializationmanager.md) class page to know how to do that.

## Handling Attachments and Links

The framework provides a way for you to intercept clicks on web links and attached files in chats and posts. With the functionality of the [`BBURLManager`](classes/bburlmanager.md) & its delegate, [`BBURLManagerDelegate`](classes/bburlmanagerdelegate.md), you'll be notified of any clicks on URLs and attachments and open them up in an external app of your choosing, or block the opening altogether. This functionality comes after the framework has evaluated the `allowWebView` property of [`BBApplicationLaunchParameters`](classes/bbapplicationlaunchparameters.md). If `allowWebView` is set to NO, your [`BBURLManagerDelegate`](classes/bburlmanagerdelegate.md) will not be called at all.
