# Add an Extension App to a Symphony Pod

## Create Extension App for Production

{% hint style="warning" %}
This section is meant as a reference for pod administrators. If you are a developer trying to load your extension app onto your company's pod, please seek assistance from your pod administrator or local IT helpdesk.
{% endhint %}

1. Visit the Admin and Compliance Portal of the respective pod either via Settings > Admin Portal in the web or desktop client or by visiting `https://my-company-pod.symphony.com/?admin`
2. From the left navigation, select **App Management**
3. Click on **Add Custom App** on the top right
4. If the app developer has provided a `bundle.json` file, use the **Import Application Bundle File** button on the top right. If not, fill in the fields manually.
5. Ensure that the RSA public key and required app permissions are set correctly
6. Click **Create**
7. From the left navigation, select **App Settings**
8. Locate the newly-created entry and change the **Global Status** from **Disabled** to **Enabled**
9. If the app is intended for users to optionally self-install and uninstall from marketplace, change the **Visibility** from **Hidden** to **Visible**
10. If the app is intended for all users in the organisation to have installed, change the **Installation** from **Manual** to **Automatic**
11. Click **Save** at the bottom

## Sideload Extension App for Development or Testing

{% hint style="info" %}
Note that this method does not support obtaining user identity as app authentication is not supported. If you wish to test an app that requires user identity, you will have to create an actual app using the steps above with the assistance of your pod administrator
{% endhint %}

1. Host the extension app on a TLS-enabled server together with the application manifest (`bundle.json` file)
2. Visit `https://my-company-pod.symphony.com/?bundle=https://localhost:4000/bundle.json` assuming your app is running on localhost on port 4000 and you have a bundle.json served on the root
3. Acknowledge the developer mode warning and proceed
