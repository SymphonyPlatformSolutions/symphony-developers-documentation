# OBO Authentication

OBO or On-Behalf-Of authentication allows an authenticated extension app to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs and MIMs with other users
* Send messages and attachments
* Set the context user's own presence

For a full list of OBO-Enabled endpoints, click [here](https://developers.symphony.com/restapi/main/apps-on-behalf-of-obo/obo-enabled-endpoints).

{% hint style="info" %}
OBO use cases differ from bot use cases in that activities are performed as if end users had initiated actions directly from within Symphony themselves.
{% endhint %}

For OBO apps, authentication is a two-fold process:

1. The app itself must be authenticated using its RSA public Key. The app authenticates only if it is enabled for the pod and its key is trusted. Upon successful OBO app authentication, the app receives an app `sessionToken`.
2. The app must request to authenticate on behalf of a particular user, using its app `sessionToken`. The app authenticates only if it is installed for the user and its app `sessionToken` is valid. Upon successful OBO user authentication, the app receives the user's `sessionToken`.

Once the app has obtained the user's `sessionToken`, it can make REST API calls with this `sessionToken` to perform activities on behalf of the session user.

## OBO App Permissions

Before proceeding, check out the OBO App permissions required for a given workflow:

<table data-header-hidden><thead><tr><th width="209.33333333333331">Category</th><th width="222" align="center">Permission</th><th>Description</th></tr></thead><tbody><tr><td>Category</td><td align="center">Permission</td><td>Description</td></tr><tr><td>On Behalf Of</td><td align="center"><code>ACT_AS_USER</code></td><td><strong>Required</strong>. This required permission allows an application to act on behalf of a user via any of the other permissions.<br><br><strong>Note</strong>: This permission does not display to administrators on the Admin Portal because all apps can act on behalf of a user and therefore have the <code>ACT_AS_USER</code> permission by default.</td></tr><tr><td>Messaging</td><td align="center"><code>SEND_MESSAGES</code></td><td>The application can send messages for the logged-in user.</td></tr><tr><td>Messaging</td><td align="center"><code>SUPPRESS_MESSAGES</code></td><td>The application can suppress messages for the logged-in user.</td></tr><tr><td>Get Connections</td><td align="center"><code>GET_USER_CONNECTIONS</code></td><td>The application can get connection requests for the logged-in user.</td></tr><tr><td>Send Connections</td><td align="center"><code>REQUEST_USER_CONNECTIONS</code></td><td>The application can send connection requests for the logged-in user.</td></tr><tr><td>Get Presence</td><td align="center"><code>GET_PRESENCE</code></td><td>The application can only get presence for the logged-in user.</td></tr><tr><td>Set Presence</td><td align="center"><code>SET_PRESENCE</code></td><td>The application can only set presence for the logged-in user.</td></tr><tr><td>Primary User Identity</td><td align="center"><code>GET_BASIC_USER_INFO</code></td><td>The application can get information about the logged-in user.</td></tr><tr><td>Primary Contacts Access</td><td align="center"><code>GET_BASIC_CONTACT_INFO</code></td><td>The application can get information about other users through user look-up and search.</td></tr><tr><td>List User's Streams</td><td align="center"><code>LIST_USER_STREAMS</code></td><td>The application can list the streams in which the logged-in user is a member.</td></tr></tbody></table>

## Getting Started

1. In order to perform an OBO operation, you need to first create an extension application manifest `bundle.json` file and upload to the Pod.

### Application Manifest Bundle File Sample:

{% tabs %}
{% tab title="bundle.json" %}
```java
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

<table data-header-hidden><thead><tr><th width="144">Parameter</th><th width="79">Type</th><th width="105">Required</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Required</td><td>Description</td></tr><tr><td>type</td><td>String</td><td>Required</td><td>This field should be set to <code>sandbox</code>, which indicates that this is a standalone app, embedded within Symphony's client.</td></tr><tr><td>id</td><td>String</td><td>Required</td><td>The unique identifier for your app. <strong>Note</strong>: Do not use a colon (:) in this field, or you will receive a <code>401 Unauthorized</code> error.</td></tr><tr><td>name</td><td>String</td><td>Required</td><td>The name of your app, which will be displayed in the Symphony Market.</td></tr><tr><td>blurb</td><td>String</td><td>Optional</td><td>Applied for Developer Mode. Field for display in the Symphony Market and Admin Portal.</td></tr><tr><td>publisher</td><td>String</td><td>Optional</td><td>The publisher of your app, which will be displayed in the Symphony Market.</td></tr><tr><td>url</td><td>String</td><td>Optional</td><td>URL which the pod will call to send pod information to the application</td></tr><tr><td>domain</td><td>String</td><td>Required</td><td>The domain for your app, which should match the controller file URL.</td></tr><tr><td>icon</td><td>String</td><td>Optional</td><td>An icon for your app (32x32 px), which will be displayed in the Symphony Market.</td></tr></tbody></table>

1. Upload the manifest `bundle.json` to the Admin Portal -> App Management -> Add Custom App -> Import Application Bundle File
2. Add your App Backend's (Bot) RSA public key in the Authentication section under App Management.
3. Give your Application the following Permissions:
4. **ACT\_AS\_USER**

{% hint style="info" %}
Note: Give your extension application the appropriate permissions corresponding to your OBO workflow. For example, if you Bot will perform an OBO workflow to list a user's streams, grant your application with the LIST\_USER\_STREAMS permission.
{% endhint %}

1. Once your App is created, make sure that it is enabled:
2. Admin Portal -> App Settings -> Locate your App and toggle its 'Global Status' to be 'Enabled'
3. Toggle 'Visibility' to be 'Visible'
4. Toggle 'Installation' to be 'Manual'
5. The last step is to make sure that the application is installed for the appropriate users. If the installation is set to 'Manual', make sure end-users install the extension application manually via the Symphony Marketplace. If not, make sure Symphony Admin installs this application on behalf of a given list of users.

## Implementing OBO Authentication

The BDK 2.0 makes it super simple to create an OBO based workflow, To do so, simply, simply instantiate an OBO Session in your Bot project. The BDK 2.0 allows you to instantiate your OBO session from a username or user ID.

```java
public class BotApplication {

  /** The Logger */
  private static final Logger log = LoggerFactory.getLogger(BotApplication.class);

    public static void main(String[] args) throws BdkConfigException, AuthInitializationException, AuthUnauthorizedException, Exception {

        // Initialize BDK entry point
        final SymphonyBdk bdk = new SymphonyBdk(loadFromClasspath("/config.yaml"));

        final AuthSession oboSessionUsername = bdk.obo("user.name");
        final AuthSession oboSessionUserId = bdk.obo(123456789L);

        // finally, start the datafeed read loop
        bdk.datafeed().start();
  }
}
```

### Perform the Intended OBO workflow

In the following code snippet, the Bot authenticates on behalf of a given user and then prints a list of Streams (Type = ROOM) that the user in context is apart of:

```java
public class BotApplication {

    private static final Logger log = LoggerFactory.getLogger(BotApplication.class);

    public static void main(String[] args) throws BdkConfigException, AuthInitializationException, AuthUnauthorizedException, Exception {

        // Initialize BDK entry point
        final SymphonyBdk bdk = new SymphonyBdk(loadFromClasspath("/config.yaml"));

        final AuthSession oboSessionUsername = bdk.obo("user.name");

        // list streams OBO user "user.name"
        List<StreamAttributes> x = bdk.streams().listStreams(oboSessionUsername, new StreamFilter());
        System.out.println(x);
        List<StreamAttributes> y = x.stream()
                .filter(item -> item.getStreamType().getType().toString().equals("ROOM"))
                .collect(Collectors.toList());
        System.out.println(y);

        // finally, start the datafeed read loop
        bdk.datafeed().start();
  }
}
```

