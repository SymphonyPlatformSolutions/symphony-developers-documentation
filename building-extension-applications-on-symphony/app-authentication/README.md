# App Authentication

{% hint style="info" %}
**Note: This guide is a conceptual overview of how Symphony performs secure app authentication. While you can implement the following workflow on your own, the BDK \(Bot Developer Kit\) provides an out of the box implementation of app authentication making it easy to get started building authenticated apps.**
{% endhint %}

In order to create a secure connection between your app and the Symphony client, apps need to perform app authentication. Upon successful authentication, Symphony extension apps establish a bidirectional trust, allowing for secure and authorized access to user data by leveraging the Symphony Extension API.

In order to perform app authentication, your app must perform a combination of frontend and backend authentication calls to the Symphony client and pod respectively. The following steps provide an overview of the frontend and backend calls your App needs to make:

{% hint style="info" %}
Note: Many Extension Apps' backend take the form of Symphony bots. The implementation of app authentication provided out of the box by the BDK \(Bot Developer Kit\) leverages this architectural design.
{% endhint %}

## 1.  Initialize your Extension App

The first step of app authentication is a frontend call that leverages the Symphony Extension API to initialize your app. This should be used to initialize the connection to the Client Extension API from your application controller:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
SYMPHONY.remote.hello()
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note: Each extension app will contain a unique app id that is registered on the Pod. You can learn more about this along with other setup prerequisites in the [App Configuration](../app-configuration/) section.
{% endhint %}

## 2.  Initiate Backend Authentication

The next step of app authentication is to perform a backend authentication call to the session authentication endpoint on the pod:

{% api-method method="post" host="https://<host>:<port>" path="/sessionauth/v1/authenticate/extensionApp" %}
{% api-method-summary %}
RSA App Authenticate
{% endapi-method-summary %}

{% api-method-description %}
Authenticate your Extension App with an App Token
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="appToken" type="string" required=true %}
A signed JWT token containing the App ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "appId": "appId",
  "appToken": "Ta",
  "symphonyToken": "Ts",
  "expireAt": "<Unix Timestamp in milliseconds of Symphony token expiration>"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

Your backend should store this token pair as they will be used for subsequent validation steps in the following authentication process.

## 3.  Register your App

The next step of the authentication workflow is to register your app on the Symphony client using the Symphony Extension API. Registering your app requires the following frontend call to be performed in your application controller:

```text
SYMPHONY.application.register(appData, servicesWanted, servicesSent)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| appData | Object | Object containing both your appID and your app token. |
| servicesWanted | Array of Strings | A list of names of remote services that your application wants to subscribe to |
| servicesSent | Array of Strings | A list of names of local services that your application wants to make available remotely |

Response:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| Registration Promise | Object | Object containing both your appID and Symphony JWT Token |

## 4.  Validate Tokens returned by Symphony Frontend

The next step in the authentication workflow is to:

* validate the App Token JWT returned from the backend API call in step 2
* validate the Symphony JWT Token that was passed to you through the frontend against the JWT Symphony JWT Token previously attained from executing the backend API call shown in step 2.

While the implementation of this token validation is up to the developer, a sample implementation of both app token and symphony token validation is provided out of the box by the BDK. In this sample implementation, the app frontend sends both the App Token and Symphony Token to the backend where it verifies that the token pair exists in the token cache.

At this point, your app is fully authenticated and has established a bi-directional trust between itself and the Symphony client.

## 5.  Obtain User Identity

Once you have successfully authenticated and validated your tokens, you can obtain user data through the Extension API:

The Extension API provides an `extended-user-info` service that contains a `getJwt()` method. In order to leverage this method, your app must first subscribe to the `extended-user-info` service:

```javascript
const extendedUserInfoService = SYMPHONY.services.subscribe(
    'extended-user-info',
  );
```

Once subscribed, you app can leverage the `getJwt()` method as follows:

```javascript
extendedUserInfoService.getJwt()
```

{% hint style="warning" %}
#### Deprecated Field

The `username` field has been changed in version 1.55.3, it now returns &lt;email address&gt; instead of &lt;Symphony username&gt;. Please note that this change has been done to help the transition for Applications that were relying on the username field and that the username field will be entirely removed in an upcoming version.
{% endhint %}

This method returns a base-64 encoded JWT token for the user in context, containing the following data when decoded:

{% tabs %}
{% tab title="JSON" %}
```javascript
{
    "aud" : "<id of app>",
    "iss" : "Symphony Communication Services LLC.",
    "sub" : "<Symphony user ID>",
    "exp" : "<expiration date in millis>",
    "user" : {
        "id" : "<Symphony user ID>",
        "emailAddress" : "<email address>",
        "username" : "<email address>",
        "firstName" : "<first name>",
        "lastName" : "<last name>",
        "displayName" : "<display name>",
        "title" : "<title>",
        "company" : "<company>",
        "companyId" : "<company (pod) ID>",
        "location" : "<location>",
        "avatarUrl" : "<URL for user's avatar>",
        "avatarSmallUrl" : "<URL for user's small avatar>"
    }
}
```
{% endtab %}
{% endtabs %}

At this point, your authenticated app has access to sensitive user data such as the Symphony user ID, username, email address, displayName, company, location, etc. Extension apps can leverage this user data in order to create user-specific workflows and automations.

{% hint style="danger" %}
#### Known Issue

Currently, calling `getJwt()` without having completed the application authentication sequence will return Undefined. We will be addressing this in an upcoming release so that userReferenceId will correctly be returned if application authentication has not been completed. In the interim, userReferenceId can still be obtained from the [Register and Connect](../overview-of-extension-api/register-and-connect.md) methods.
{% endhint %}

## 6.  OBO Authentication

If you wish to take this a step further, your app can take the JWT returned in the last step and perform authentication on behalf of \(OBO\) the user in context. If you wish you learn more about OBO authentication and OBO enabled workflows, continue here:

{% page-ref page="obo-authentication.md" %}

## Next Steps

To learn how to properly configure and authenticate your extension app using the BDK, complete the following configuration tutorial:

{% page-ref page="../app-configuration/configure-your-app-for-bdk-development.md" %}

