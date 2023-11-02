# Get started

## How to load ECP

ECP can be loaded in three different ways:

* [Explicit rendering](get-started.md#explicit-rendering) (recommended)
* [Automatic rendering](get-started.md#automatic-rendering)&#x20;
* [Direct iFrame rendering](get-started.md#direct-iframe-rendering)

_Unless you have specific technical constraints, you should use **explicit rendering**._

### Explicit rendering

With explicit rendering, ECP will expose an API to the parent page, giving you fine-grained control over ECP.

There are three steps required to load a chat:

1. **Loading the SDK script of ECP**. You can be notified that the script has finished loading through a callback.
2. **Rendering ECP**, using the `render` method. This step takes approximately 4s, and can be done in the background, typically in a hidden div. You can be notified that ECP is ready through the promise returned by the `render` method. Optionally you can specify a `streamId` as a parameter, in which case the conversation will be opened as soon as ECP is ready.
3. **Opening a chat**, using the `openStream` method. This is quick and can be done once the render method has completed. If you want to switch from one chat to the other, or to display additional chat containers in the webpage, you use the `openStream` method and you dont need to use `render` again.&#x20;

#### 1. Loading the SDK script

To load ECP in explicit mode, you need to add the following script in your web page:

```html
<script
  id="symphony-ecm-sdk"
  render="explicit"
  data-onload="onECPSdkLoaded"
  data-partner-id="{partnerId}"
  src="https://{your_pod_url}.symphony.com/embed/sdk.js"
></script>
```

Optionally, you can define what needs to be done once the SDK is loaded (data-onload parameter).

```javascript
window.onECPSdkLoaded = () => {
  // window.symphony is available
  // Typically: call the render() method documented below.
}
```

Please note the `render="explicit"` parameter in the script tag.

Once loaded, the SDK will expose the ECP APIs in the `window.symphony` object.

By default, ECP will start in Focus mode, but you can choose Collaboration mode by setting the mode parameter `data-mode="full"` in the script tag above.

Set the `data-partner-id` with the Partner Id that was provided to you. More info on Partner Id [here](pricing-tiers.md#partner-id).

#### 2. Rendering ECP

Once the SDK is loaded, the first function you need to call to start ECP is `render`.&#x20;

The `render` method creates and adds the ECP iframe to the container with the class given as first parameter.

<table><thead><tr><th width="159">Parameter</th><th width="153">Type</th><th>Description</th></tr></thead><tbody><tr><td>containerOrClassName</td><td>string</td><td>Class of the container into which ECP will be injected (optional). <br>If not specified, the default value is "symphony-ecm".</td></tr><tr><td>configuration</td><td>Record&#x3C;string, string | boolean | undefined></td><td><a href="configuration-parameters.md">Configuration </a>(optional)</td></tr><tr><td>fromLogin</td><td>boolean</td><td><p>Startup time optimisation linked to the checkAuth feature described below.</p><p>If you know the user is not logged in, you can set this parameter to true, and the user will be sent straight to the login page (instead of first loading ECP and trying to connect before redirecting to login) <br><em>Cannot be used in conjunction with popupLogin</em></p><p><br>Default false (optional)</p></td></tr></tbody></table>

The `render` method returns a promise that resolves when the chat is ready. See the promise definition [here](send-a-message.md#returned-promise).

Example:

```html
<!-- ECP iframe will be loaded in this div by the SDK -->
<div class="ecp-chat"></div>

<script>
window.onECPSdkLoaded = () => {
  window.symphony.render('ecp-chat', {
    mode: 'dark',
    condensed: true,
    streamId: 'VYfoWw6oIUv+5K80BPUjeX///oz1uTOEdA=='
  })
}
</script>
```

**Note**: It is _not_ mandatory to pass a `streamId` to the `render` method. This is particularly useful when you want to render ECP in the background, in a hidden div. And then when ECP has been rendered, you can open the right conversation using the `openStream` method, which is very quick.

**Note:** Even if the `render` method can be used to switch from one conversation to another in Focus mode, it is not advised as it re-creates the iFrame entirely, which takes time. Prefer the [`openStream` ](open-a-chat.md#open-chat-with-streamid)method when you just want to switch to another conversation.

To optimize the render process based on whether the user is already authenticated and the type of authentication (SSO or password), you can use the `checkAuth` method before calling `render` with the most appropriate configuration.

```javascript
window.onECPSdkLoaded = async () => {
  const container = 'ecp-chat'
  const config = { mode: 'dark', condensed: true };
  
  const { isLoggedIn, authenticationType } = await symphony.checkAuth(null);
  if (!isLoggedIn) {
    if (authenticationType === 'password') {
      // Password Login
      await symphony.render(container, config, true);
    } else {
      // SSO Login - enable login popup
      await symphony.render(container, { ...config, ecpLoginPopup: true });
    }
  } else {
    // Already authenticated
    await symphony.render(container, config);
  }
}
```

#### 3. Opening a chat

Once the rendering is completed, you can open a conversation using the `openStream` method documented [here ](open-a-chat.md#open-chat-with-streamid)or start a new chat using the `startRoom` method documented [here](open-a-chat.md#open-chat-with-users).

### Automatic rendering

{% hint style="warning" %}
_Automatic rendering is not recommended, and is kept only for backwards compatibility with the previous ECM solution._
{% endhint %}

In automatic mode, ECP will create the iFrame for you, so you just need to add the ECP script tag and add a div in your page that has the `symphony-ecm` class, so that the script can find it and add the iFrame in it.

By default, ECP will start in Focus mode, but you can choose Collaboration mode by setting the mode parameter:`data-mode="full"` on the `script` tag.

```html
<script
  id="symphony-ecm-sdk"
  data-partner-id="{partnerId}"
  src="https://{your_pod_url}.symphony.com/embed/sdk.js"
></script>
```

Set the `data-partner-id` with the Partner Id that was provided to you. More info on Partner Id [here](pricing-tiers.md#partner-id).

With automatic rendering, the [parameters ](configuration-parameters.md)should then be added as `data-*` attributes to the div that will contain the iFrame:

```html
<div class="symphony-ecm" 
  data-stream-id="{streamId}"
  data-mode="dark"
  data-condensed="true">
</div>
```

### Direct iFrame rendering

{% hint style="warning" %}
_Direct iFrame rendering is very limited, and should only be used for situations where using **explicit rendering** is impossible (for example, if you only have an "iFrame widget" in a third-party application)._

_Make sure to give the iframe the correct permissions according to usage (e.g. clipboard access)_
{% endhint %}

It is possible to load ECP using the iFrame rendering mode, which accepts basic [configuration parameters](configuration-parameters.md), but does not allow any of the advanced features offered through the SDK.

For the Focus mode:

```html
<iframe
  src="https://{your_pod_url}.symphony.com/embed/index.html?streamId={STREAM_ID}&partnerId={partnerId}&mode=dark&condensed=true"
></iframe>
```

For the Collaboration mode:

```html
<iframe
  src="https://{your_pod_url}.symphony.com/client-bff/index.html?embed=true&streamId={STREAM_ID}&partnerId={partnerId}&mode=dark&condensed=true"
></iframe>
```

Set the `partnerId` with the Partner Id that was provided to you. More info on Partner Id [here](pricing-tiers.md#partner-id).

## User login to ECP

### SSO specificities

End users log into ECP using their usual Symphony credentials. \
If they have an SSO setup, they will automatically be redirected to their authentication page, just like what would happen in the Symphony Desktop Application.

{% hint style="info" %}
**Note**: As ECP uses an iFrame, some SSO systems will raise a Content Security Policy error (CSP) when ECP tries to redirect the user. In that case, you can either update your SSO system to **allow framing within your pod domain**, or alternatively you can configure ECP to do the **login in a popup** using the `ecpLoginPopup` parameter.
{% endhint %}

If you are a partner and uses ChannelConnect to onboard new Symphony users, you can also set up your own SSO. More information is available [here](ecp-with-channel-connect.md).&#x20;

### Allow users from different pods to log in

End users can only log in the Symphony pod where their credentials are defined. \
Meaning that depending on who are the users of your web portal, you may not always want to load ECP from a unique pod URL (e.g a single pod).

If you are Company A, but you want Symphony users from Company B to be able to log in ECP from your web portal then you need to adapt the script tag that loads ECP and set `{your_pod_url}` to the URL of Company B's pod, so ECP will be loaded from the right pod.

If that user does not have already a Symphony account, or if you prefer to control this user account, you can also create a new dedicated account for that user.

Onboarding this user on a new Symphony pod can be done thanks to our **Customer Connect** offering, or through our **Community or Channel Connect** offering. To learn more about Customer Connect and Community Connect please reach out to your Symphony representative.

#### Identify the right pod URL

In any case, as you onboard the user on your web portal you will need to identify what Symphony pod URL to load ECP from.

Use the following http endpoint to retrieve the Symphony pod URL of a user:

```url
https://{your_pod_url}.symphony.com/webcontroller/podLoginInformation?emailAddress={userEmail}
```

The http response will be formatted as below:

```json
{"podDomain":"corporate.symphony.com"}
```

If the user email is not found, the following error will be returned instead:

```json
{"message":"No pod found for emailAddress: 'janedoe@acme.com' and companyDomain: 'acme.com'","status":"NOT_FOUND"}
```

{% hint style="info" %}
If you have onboarded this user on your **Customer Connect** pod, the service will return an error, as users onboarded on Customer Connect pods are not listed for confidentiality reasons. In this situation, you can either persist the pod information when you onboard the user on the Customer Connect pod, or you can use the pod APIs of the Customer Connect pod to identify the user.
{% endhint %}

{% hint style="info" %}
If you are using **Community Connect** to onboard users, please reach out to us to learn more on how you can identify the correct pod URL.
{% endhint %}

## Health check

If you need to monitor the uptime of ECP, you can monitor that the following https request returns 200 OK.

```
https://{your_pod_url}.symphony.com/embed/version.json
```
