# Build a Basic Extension App

This guide will provide an overview on how to use the Symphony App Developer Kit (ADK) to build the most basic extension app. This app will add a sample entry in the left navigation bar and a button to each available target zone in the Symphony user interface. For simplicity, the project will be minimal and not use any frameworks to demonstrate the bare neccessities required to build an extension app.

{% hint style="info" %}
**Prerequisite**: Install NodeJS first, either [directly](https://nodejs.org) or via [nvm](https://github.com/nvm-sh/nvm)
{% endhint %}

## Create Project

Create a working directory and initialize it using `npm`.

```bash
mkdir adk-example-basic && cd $_
npm init -y
```

## Install Dependencies

Install the Symphony ADK along with the webpack bundler.

```bash
npm install @symphony-ui/adk
npm install --save-dev @symphony-ui/adk-webpack webpack-cli webpack-dev-server
```

Open the project directory in an editor of your choice

## Add Script Commands

Edit the `package.json` file, replacing the `scripts` section with the following:

```json
"scripts": {
  "start": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production"
},
```

This adds two commands:

* `npm start` for starting the development web server
* `npm run build` to launch the production build process

## Add Webpack Configuration

Create a file named `webpack.config.js` that will inject the ADK configuration into the webpack bundler.

{% code title="webpack.config.js" lineNumbers="true" %}
```javascript
const SymADKWebpack = require('@symphony-ui/adk-webpack');
const package = require('./package.json');
module.exports = SymADKWebpack({}, package.name);
```
{% endcode %}

## Add Application Manifest

Each extension app requires a manifest (also known as the `bundle.json` file) to describe the application. Create a file named `bundle.json` with the following contents:

{% code title="bundle.json" lineNumbers="true" %}
```json
{
  "applications": [
    {
      "type": "sandbox",
      "id": "adk-example",
      "name": "ADK Example",
      "description": "Symphony ADK",
      "blurb": "Symphony ADK",
      "publisher": "Symphony",
      "url": "https://localhost:4000/controller.html",
      "domain": "localhost"
    }
  ]
}

```
{% endcode %}

## Build the App

We are now ready to start building the app. Create a `src` directory and a file named `index.js` within it.

{% code title="src/index.js" lineNumbers="true" %}
```javascript
import * as ADK from '@symphony-ui/adk';

ADK.start({ id: 'adk-example' }).then(() => {
  ADK.navigation.add('ADK Example', () => alert('Navigate!'));

  const targets = [
    'hashtag', 'cashtag', 'single-user-im',
    'multi-user-im', 'profile', 'room'
  ];
  
  targets.forEach((target) => {
    ADK.buttons.add(
      `Button on ${target}`,
      target,
      (payload) => { console.log(`You clicked on ${target}`, payload) }
    );
  });
});

```
{% endcode %}

The code `ADK.start()` initializes the ADK with an app id (`adk-example`) that must correspond with the value provided in the `bundle.json` manifest from the previous step.\
\
Once the initialization is complete, we use `ADK.navigation` to add an item to the left navigation bar. This item will have the label "ADK Example" and clicking on it will pop up an alert with the content: "Navigate!"\
\
We then proceed to build an array of all the available target zones and loop through them, calling `ADK.buttons` to add a button into each target zone. Each button will be labelled "Button on" followed by the zone and cicking on them will log a message to the console. The message will report from which zone the button was pressed and the payload included with the event. Note that not all zones will contain a payload.

## Start the App

We can now start the app using:

```bash
npm start
```

This starts a local development server on `https://localhost:4000`. Note that this is a TLS-enabled site because all extension apps need to be loaded from TLS-enabled sites. However, because this is a development server, the certificate is self-signed and not trusted by any browser.

{% hint style="warning" %}
Visit https://localhost:4000 in your browser to accept the security warning about the untrusted self-signed certificate. Skipping this step will cause the extension app to not load within Symphony in the next step.
{% endhint %}

## Load the App in Symphony

There are 2 ways to load an extension app into Symphony. For development purposes, we will be using the bundle injection method to temporarily load the app into the current session.

{% hint style="info" %}
Beyond local development testing, you should get your pod administrator to create a corresponding app entry in the Admin Portal by uploading the `bundle.json` file.
{% endhint %}

We can now load the app by injecting the bundle URL as a parameter named `bundle` behind a pod URL. For example, if you are using the developer sandbox located at develop2.symphony.com, visit the following URL in your browser:

```
https://develop2.symphony.com/?bundle=https://localhost:4000/bundle.json
```

## Test the App

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

Acknowledge the warning about being in developer mode. You should notice that a new left navigation item appears and triggers an alert when pressed.

## Next Steps

Now that you know how to build a basic extension app, you can continue to use the ADK in building out the rest of your app, depending on what type of app you require.

{% content-ref url="build-an-extension-app-with-app-views.md" %}
[build-an-extension-app-with-app-views.md](build-an-extension-app-with-app-views.md)
{% endcontent-ref %}

{% content-ref url="build-an-extension-app-with-message-renderers.md" %}
[build-an-extension-app-with-message-renderers.md](build-an-extension-app-with-message-renderers.md)
{% endcontent-ref %}

