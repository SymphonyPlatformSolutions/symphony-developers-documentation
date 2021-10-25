# Application Manifest Bundle File Reference

Each application metadata is represented in a manifest file called `bundle.json`. You must create a manifest file for your application and submit it to Symphony.

To create and upload a file:

1. Create the manifest file that your application requires.
2. Upload the manifest file to Symphony: drag and drop the file into the application creation window of the administrative portal.

## Application Manifest Bundle File Sample

The following bundle file is only applied for **Developer Mode**. Note that it is an array of apps, allowing you to load multiple apps at once.

{% tabs %}
{% tab title="bundle.json - Developer Mode" %}
```javascript
{
  "applications": [
    {
      "type": "sandbox",
      "id": "hello",
      "name": "Hello World",
      "blurb": "This is a hello world app with a few example extension API invocations!",
      "publisher": "Symphony",
      "url": "https://localhost:4000/controller.html",
      "domain": "localhost",
      "icon": "https://localhost:4000/icon.png"
    }
  ]
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
### AC Portal x Developer Mode

In the following examples, the bundle files are applied for the **AC Portal**. Note that they are different than the one applied for Developer Mode.
{% endhint %}

{% tabs %}
{% tab title="bundle.json via UI" %}
```javascript
{
      "appGroupId": "testapplication",
      "name": "Application name",
      "description": "Enter the application description, as it will appear in the Symphony Market",
      "publisher": "Symphony",
      "loadUrl": "https://symphony.myapplication.com:4000/controller.html",
      "domain": ".myapplication.com",
      "iconUrl": "https://symphony.myapplication.com/icon.png",
      "notification": {
         "url": "https://symphony.myapplication.com:4000/podInfo",
         "apiKey": "super-secret-key" 
      },  
      "permissions": [
        "ACT_AS_USER",
        "GET_BASIC_CONTACT_INFO",
        "GET_PRESENCE"],
      "certificate": "-----BEGIN CERTIFICATE-----\nMIICpTCCAY2gAwIBAgIBATANBgkqhk...sCPV2jH\n0hFUK5JHPrGO\n-----END CERTIFICATE-----\n",
      "allowOrigins": "myapplication.com",
      "rsaKey": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1QGTGazbI/\n-----END PUBLIC KEY-----"
    }
```
{% endtab %}

{% tab title="bundle.json via API" %}
```javascript
{
    "applicationInfo": {
        "appId": "my-test-app",
        "name": "my-test-app-update",
        "appUrl": "https://joe.mydomain.com",
        "domain": "mydomain.com",
        "publisher": "Updated Joe Smith"
    },
    "description": "updating an app",
    "allowOrigins": "mydomain.com",
    "iconUrl": "https://symphony.myapplication.com/icon.png",
    "permissions": [
        "ACT_AS_USER",
        "SEND_MESSAGES"
    ],
    "cert": "certificate",
    "authenticationKeys": {
      "current": {
         "key":"-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0....YOUR_NEW_KEY...cCAwEAAQ==\n-----END PUBLIC KEY-----"
    }
```
{% endtab %}
{% endtabs %}

## Fields details

The table describes the required and additional optional fields.

| Field          | Description                                                                                                                                                                                                                                                                                                                                                    | Required                              | Type   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------ |
| `appGroupId`   | <p>Applied for version 1.53 onwards. The unique identifier for your app. The ID must not match any existing app IDs or user names.</p><p>It consists of alphanumeric characters [0-9,A-Z, a-z], underscores (_), and dashes.</p><p><strong>Note</strong>: Do not use a colon (:) in this field, or you will receive a <code>401 Unauthorized</code> error.</p> | Required                              | String |
| `name`         | The name of your app, which will be displayed in the Symphony Market.                                                                                                                                                                                                                                                                                          | Required                              | String |
| `description`  | The description of your app, which will be displayed in the Symphony Market.                                                                                                                                                                                                                                                                                   | Optional                              | String |
| `publisher`    | The publisher of your app, which will be displayed in the Symphony Market.                                                                                                                                                                                                                                                                                     | Optional                              | String |
| `loadUrl`      | <p>The location of the app's controller, which will be displayed in a hidden iframe. Value must start with <code>https://</code>.</p><p><strong>Note</strong>: Do not specify this value for On Behalf Of (OBO) applications.</p>                                                                                                                              | Required, except for OBO applications | URI    |
| `domain`       | The domain for your app, which should match the controller file URL.                                                                                                                                                                                                                                                                                           | Required                              | URI    |
| `iconUrl`      | An icon for your app (32x32 px), which will be displayed in the Symphony Market.                                                                                                                                                                                                                                                                               | Optional                              | URI    |
| `notification` | Fields required in order to receive webhook callback containing pod information (ie. pod, authentication and Agent URLs).                                                                                                                                                                                                                                      | Optional                              | Object |
| `url`          | URL which the pod will call to send pod information to the application                                                                                                                                                                                                                                                                                         | Optional                              | String |
| `apiKey`       | Secret key used to validate the pod when calling the notification URL.                                                                                                                                                                                                                                                                                         | Optional                              | String |
| `permissions`  | List of permissions the application requires. See Permissions details for [on-behalf-of applications](../app-authentication/obo-authentication.md#obo-app-permissions).                                                                                                                                                                                        | Optional                              | List   |
| `certificate`  | Certificate for the application. See [Application Authentication](../app-authentication/)                                                                                                                                                                                                                                                                      | Optional                              | String |
| `rsaKey`       | Applied for version 1.54 onwards. RSA key for the application. See [Application Authentication](../app-authentication/)                                                                                                                                                                                                                                        | Optional                              | String |
| `allowOrigins` | <p>The origin or origins that this application is allowed to receive cross-domain requests from.</p><p>For more information, see the <strong>AllowedOrigin</strong> description in <a href="http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html">Cross-Origin Resource Sharing</a>.</p>                                                                   | Optional                              | URI    |
| `type`         | Applied for 1.52 and prior versions.This field should be set to `sandbox`, which indicates that this is a standalone app, embedded within Symphony's client.                                                                                                                                                                                                   | Required                              | String |
| `id`           | <p>Applied for 1.52 and prior versions. The unique identifier for your app.<br><strong>Note</strong>: Do not use a colon (:) in this field, or you will receive a <code>401 Unauthorized</code> error.</p>                                                                                                                                                     | Required                              | String |
| `blurb`        | <p>Applied for Developer Mode.<br>Field for display in the Symphony Market and Admin Portal.</p>                                                                                                                                                                                                                                                               | Optional                              | String |
| `icon`         | <p>Applied for Developer Mode.<br>An icon for your app (32x32 px), which will be displayed in the Symphony Market.</p>                                                                                                                                                                                                                                         | Optional                              | String |
