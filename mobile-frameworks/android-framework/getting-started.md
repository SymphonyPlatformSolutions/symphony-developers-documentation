# Getting Started

## Introduction

Symphony Android Messaging Framework is an Android library module. Developer can use this library to build a version of the messaging app with some customized implementation.

## Customizable Areas

You can customize the following areas by providing your customized implementation.\
Storage

* Network Communication
* Text User Interface
* Attachment Handler
* SharedPreferences

## Sample Application

You can check out the Symphony Messaging App for Good Technology app to see how we provided the customized implementation of the above areas. `https://github.com/SymphonyOSF/SAndroid-Shared`

## Setup

You'll need to include the Symphony AAR file in your list of Gradle dependencies:

{% tabs %}
{% tab title="Gradle" %}
```javascript
dependencies {
    implementation("com.symphony:android-messaging-lib:2.56.3.1659@aar") {
        transitive = true
    }
}
```
{% endtab %}
{% endtabs %}

You'll then need to include the Symphony LoginActivity in your application's list of activities.

If you are not planning on customizing the framework, you can set the `package` to `com.symphony.android.messaging` and the application should run without modifications.\
The `@style/Theme.Symphony` is also important to set to get the UI to display as intended:

{% tabs %}
{% tab title="AndroidManifest.xml" %}
```javascript
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.symphony.android.messaging"
    xmlns:tools="http://schemas.android.com/tools">
 
    <application
        android:name=".Application"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:largeHeap="true"
        android:supportsRtl="true"
        android:theme="@style/Theme.Symphony"
        tools:replace="name">
        <activity
            android:name="com.symphony.android.login.LoginActivity"
            android:configChanges="orientation|screenSize"
            android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
</manifest>
```
{% endtab %}
{% endtabs %}

## Customizing

Customizing the functionality of the Android app is done through the [CoreComponentFactory](classes/corecomponentfactory.md).
