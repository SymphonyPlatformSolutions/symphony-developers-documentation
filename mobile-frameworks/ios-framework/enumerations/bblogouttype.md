# BBLogoutType

BBLogoutType is an enum that will let you know for what reason the user was logged out when the [`BBAppDelegate`](../classes/bbappdelegate.md) calls your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md).

{% tabs %}
{% tab title="Objective-C" %}
```
typedef  NS_ENUM(NSInteger, BBLogoutType) {
    BBLogoutTypeNotLoggedIn,
    BBLogoutTypeUserInitiated,
    BBLogoutTypeSessionRenewalError,
    BBLogoutTypeUpdateRequired,
    BBLogoutTypeFrameworkRequested,
    BBLogoutTypeFrameworkRequestedDataMaintained,
};
```
{% endtab %}
{% endtabs %}

**`BBLogoutTypeNotLoggedIn`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because the user was not signed in on application launch.

**`BBLogoutTypeUserInitiated`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because the user explicitly chose to sign out.

**`BBLogoutTypeSessionRenewalError`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because the Session could not be renewed. This BBLogoutType is not necessarily an indication of any error, it just means that the framework could not automatically renew the session. For example, when the user has signed in with SSO, the framework does not have the credentials required to renew the session so when the session times out, the user is logged out.

**`BBLogoutTypeUpdateRequired`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because the pod to which we are connecting has been updated to require a newer version of the framework. Another attempt to sign in is expected to fail if the application/framework is not updated.

**`BBLogoutTypeFrameworkRequested`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because your application layer requested that the user be logged out. Like all other logouts, the user's cached data was cleared from the device.

**`BBLogoutTypeFrameworkRequestedDataMaintained`**\
This is an indication that your [`BBAuthorizationDelegate`](../classes/bbauthorizationdelegate.md) was called because your application layer requested that the user be logged out. Unlike all other logouts, the user's cached data was not cleared from the device by an express request from the application layer.\
