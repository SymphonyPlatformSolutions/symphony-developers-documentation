# App Authentication

In order to create a secure connection between your app and the Symphony client, apps need to perform app authentication.  Upon successful authentication, Symphony extension apps establish a bidirectional trust, allowing for secure and authorized access to user data by leveraging the Symphony Extension API.     

In order to perform app authentication, your app must perform a combination of frontend and backend authentication calls to the Symphony client and pod respectively.  The following steps provide an overview of the frontend and backend calls your App needs to make:

{% hint style="info" %}
Note: Many Extension Apps' backend take the form of Symphony bots.  The implementation of app authentication provided out of the box by the BDK \(Bot Developer Kit\) leverages this architectural design.  
{% endhint %}

## 1.  Initialize your Extension App 

The first step of app authentication is a frontend call that leverages the Symphony Extension API to initialize your app.  This should be used to initialize the connection to the Client Extension API from your application controller:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
SYMPHONY.remote.hello()
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note: Each extension app will contain a unique app id that is registered on the Pod.  You can learn more about this along with other setup prerequisites in the [App Configuration](../app-configuration/) section.
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
{% api-method-parameter name="appToken" type="string" required=false %}
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

The next step of the authentication workflow is to register your app on the Symphony client using the Symphony Extension API.  Registering your app requires the following frontend call to be performed in your application controller:

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
| Registration Promise  | Object | Object containing both your appID and Symphony JWT Token |

## 4.  Validate Tokens returned by Symphony Frontend 

The next step in the authentication workflow is to both:

* validate the App Token JWT returned from the backend API call in step 2
* validate the Symphony JWT Token that was passed to you through the frontend against the JWT Symphony JWT Token previously attained from executing the backend API call shown in step 2.

While the implementation of this token validation is up to the developer,  a sample implementation of both app token and symphony token validation is provided out of the box by the BDK.

## 5.  Obtain User Identity



