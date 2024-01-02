# Application Manifest Bundle

Each application's metadata is represented by a manifest file called `bundle.json`. You must create a manifest file for your application and submit it to either your pod administrator for internal apps, or Symphony for apps meant for the public marketplace.

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

<table data-header-hidden><thead><tr><th width="178">Field</th><th width="310">Description</th><th width="127">Required</th><th>Type</th></tr></thead><tbody><tr><td>Field</td><td>Description</td><td>Required</td><td>Type</td></tr><tr><td><code>appGroupId</code></td><td><p>Applied for version 1.53 onwards. The unique identifier for your app. The ID must not match any existing app IDs or user names.</p><p>It consists of alphanumeric characters [0-9,A-Z, a-z], underscores (_), and dashes.</p><p><strong>Note</strong>: Do not use a colon (:) in this field, or you will receive a <code>401 Unauthorized</code> error.</p></td><td>Required</td><td>String</td></tr><tr><td><code>name</code></td><td>The name of your app, which will be displayed in the Symphony Market.</td><td>Required</td><td>String</td></tr><tr><td><code>description</code></td><td>The description of your app, which will be displayed in the Symphony Market.</td><td>Optional</td><td>String</td></tr><tr><td><code>publisher</code></td><td>The publisher of your app, which will be displayed in the Symphony Market.</td><td>Optional</td><td>String</td></tr><tr><td><code>loadUrl</code></td><td><p>The location of the app's controller, which will be displayed in a hidden iframe. Value must start with <code>https://</code>.</p><p><strong>Note</strong>: Do not specify this value for On Behalf Of (OBO) applications.</p></td><td>Required, except for OBO applications</td><td>URI</td></tr><tr><td><code>domain</code></td><td>The domain for your app, which should match the controller file URL.</td><td>Required</td><td>URI</td></tr><tr><td><code>iconUrl</code></td><td>An icon for your app (32x32 px), which will be displayed in the Symphony Market.</td><td>Optional</td><td>URI</td></tr><tr><td><code>notification</code></td><td>Fields required in order to receive webhook callback containing pod information (ie. pod, authentication and Agent URLs).</td><td>Optional</td><td>Object</td></tr><tr><td><code>url</code></td><td>URL which the pod will call to send pod information to the application</td><td>Optional</td><td>String</td></tr><tr><td><code>apiKey</code></td><td>Secret key used to validate the pod when calling the notification URL.</td><td>Optional</td><td>String</td></tr><tr><td><code>permissions</code></td><td>List of permissions the application requires. See Permissions details for <a href="../app-authentication/obo-authentication.md#obo-app-permissions">on-behalf-of applications</a>.</td><td>Optional</td><td>List</td></tr><tr><td><code>certificate</code></td><td>Certificate for the application. See <a href="../app-authentication/">Application Authentication</a></td><td>Optional</td><td>String</td></tr><tr><td><code>rsaKey</code></td><td>Applied for version 1.54 onwards. RSA key for the application. See <a href="../app-authentication/">Application Authentication</a></td><td>Optional</td><td>String</td></tr><tr><td><code>allowOrigins</code></td><td><p>The origin or origins that this application is allowed to receive cross-domain requests from.</p><p>For more information, see the <strong>AllowedOrigin</strong> description in <a href="http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html">Cross-Origin Resource Sharing</a>.</p></td><td>Optional</td><td>URI</td></tr><tr><td><code>type</code></td><td>Applied for 1.52 and prior versions.This field should be set to <code>sandbox</code>, which indicates that this is a standalone app, embedded within Symphony's client.</td><td>Required</td><td>String</td></tr><tr><td><code>id</code></td><td>Applied for 1.52 and prior versions. The unique identifier for your app.<br><strong>Note</strong>: Do not use a colon (:) in this field, or you will receive a <code>401 Unauthorized</code> error.</td><td>Required</td><td>String</td></tr><tr><td><code>blurb</code></td><td>Applied for Developer Mode.<br>Field for display in the Symphony Market and Admin Portal.</td><td>Optional</td><td>String</td></tr><tr><td><code>icon</code></td><td>Applied for Developer Mode.<br>An icon for your app (32x32 px), which will be displayed in the Symphony Market.</td><td>Optional</td><td>String</td></tr></tbody></table>
