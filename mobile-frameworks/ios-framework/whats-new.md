# What's New

## Release 1.57.0

Symphony Framework requires using Xcode 11

### New frameworks to import

One new dependency is needed to build and use Symphony.framework:

```text
SymphonySwift.framework
```

**How to import these files :**

* Copy new framework file into the working directory
* Select in Xcode FrameworkDemo project
* Select the target FrameworkDemo
* In the section "Framework, Libraries and Embedded Content", Select + to add the new files.
* Click on "Add other..." &gt; "Add Files..."
* Select the new framework
* Don't change import options

And it's done.

## Release 1.56.0

Symphony Framework requires using Xcode 11

### New policies available

```text
None
```

## Release 1.55.5

Symphony Framework requires using Xcode 10.3.

### Meeting framework

**We made the Meeting framework included in the previous release optional.**

If you are not using the Meeting feature in your application, you can remove the Meeting.framework and WebRTC.framework from the linked library section of the project.  
That will reduce the size of your application binary.

#### New policies available

```java
@property (nonatomic) BOOL disableAccessToPhotoGallery;
```

  
Set **`disableAccessToPhotoGallery`** to YES if you would like to block your users from attaching photos from their camera roll to messages sent within the application.  
Default is NO  
App config key : disable\_access\_to\_photo\_gallery

## Release 1.54.0

### Frameworks renamed

JitsiMeet.framework has been renamed Meetings.framework please.  
Please remove JitsiMeet.framework and add Meetings.framework instead.

* Copy new framework file into the working directory
* Select in Xcode FrameworkDemo project
* Select the target FrameworkDemo
* In the section "Embedded Binaries", Select + to add the new files.
* Click on "Add others..."
* Select the new framework

### New policies available

```text
None
```

## Release 1.53.6

Improved experience for SSO based authentication

### New policies available

```text
None
```

## Release 1.53.5

### New frameworks to import

Two new dependencies are needed to build and use `Symphony.framework:Frameworks`

```text
JitsiMeet.framework
WebRTC.framework
```

**How to import these files :**

* Copy new framework files into the working directory
* Select in Xcode FrameworkDemo project
* Select the target FrameworkDemo
* In the section "Embedded Binaries", Select + to add the new files.
* Click on "Add others..."
* Select the 2 frameworks
* Don't change import options

And it's done.

### New policies available

```text
@property (nonatomic) BOOL allowOpeningEmailAddress;
```

  
Set **`allowOpeningEmailAddress`** to YES if you would like to permit your users to open email address in an external application  
App config key : enable\_opening\_email\_address  
_Default is YES_Objective-C

```text
@property (nonatomic) BOOL enforcePincode;
```

  
Set **`enforcePincode`** to YES if you would like the Symphony application to force the user to define a 6 digit pin code on launch  
If enabled, the "Turn Off Pincode" control in the Settings view will be hidden.

Note: This option overrides `disablePincode`.  
If both `disablePincode` and `enforcePincode` are enabled, `enforcePincode` wins and the user will be forced to setup a 6 digit pin code.  


If the user is already logged in from a previous version of the app or if `enforcePincode` was disabled when the user logged in, a prompt is presented to ask the user to define the pin code on launch  
App config key : enforce\_pin  
_Default is NO_Objective-C

```text
@property (nonatomic, strong) NSNumber *refreshTokenPeriod;
```

  
Define the `refreshTokenPeriod` in hours  
_If not defined the default value of 24h will be used_  
App config key : refresh\_token\_period

### Symphony logger

You can add information to Symphony logs by using:

```text
[[BBLogger sharedInstance] log:@"My log"];
[[BBLogger sharedInstance] logFormat:@"My log %@", my_object];
```

