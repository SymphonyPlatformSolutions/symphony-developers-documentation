# OBO Authentication

OBO or On-Behalf-Of authentication allows an authenticated bot + extension app to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs and MIMs with other users
* Send messages and attachments
* Set the context user's own presence

{% hint style="info" %}
OBO use cases differ from bot use cases in that activities are performed as if end users had initiated actions directly from within Symphony themselves.
{% endhint %}

## Getting Started

  1.  In order to perform an OBO operation, you need to first create an extension application manifest `bundle.json` file and upload to the Pod.

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

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| type | String | Required | This field should be set to `sandbox`, which indicates that this is a standalone app, embedded within Symphony's client. |
| id | String | Required | The unique identifier for your app. **Note**: Do not use a colon \(:\) in this field, or you will receive a `401 Unauthorized` error. |
| name | String | Required | The name of your app, which will be displayed in the Symphony Market. |
| blurb | String | Optional | Applied for Developer Mode. Field for display in the Symphony Market and Admin Portal. |
| publisher | String | Optional | The publisher of your app, which will be displayed in the Symphony Market. |
| url | String | Optional | URL which the pod will call to send pod information to the application |
| domain | String | Required | The domain for your app, which should match the controller file URL. |
| icon | String | Optional | An icon for your app \(32x32 px\), which will be displayed in the Symphony Market. |

2.  Upload the manifest `bundle.json` to the Admin Portal -&gt; App Management -&gt; Add Custom App -&gt; Import Application Bundle File

3.  Add your App Backend's \(Bot\) RSA public key in the Authentication section under App Management.  

4.  Give your Application the following Permissions:

* **ACT\_AS\_USER**

{% hint style="info" %}
Note: Give your extension application the appropriate permissions corresponding to your OBO workflow.  For example,  if you Bot will perform an OBO workflow to list a user's streams, grant your application with the LIST\_USER\_STREAMS permission.  
{% endhint %}

5. Once your App is created, make sure that it is enabled: 

* Admin Portal -&gt; App Settings -&gt; Locate your App and toggle its 'Global Status' to be 'Enabled'
* Toggle 'Visibility' to be 'Visible'
* Toggle 'Installation' to be 'Manual'

6.  The last step is to make sure that the application is installed for the appropriate users.  If the installation is set to 'Manual', make sure end-users install the extension application manually via the Symphony Marketplace.  If not, make sure Symphony Admin installs this application on behalf of a given list of users.  

## Implementing OBO Authentication

The BDK 2.0 makes it super simple to create an OBO based workflow, To do so, simply, simply instantiate an OBO Session in your Bot project.  The BDK 2.0 allows you to instantiate your OBO session from a username or user ID. 

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

In the following code snippet, the Bot authenticates on behalf of a given user and then prints a list of Streams \(Type = ROOM\) that the user in context is apart of:

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



