# Building an Extension App with UI Toolkit

In this step by step tutorial, we will build an FX Watchlist App, an extension app that allows users to keep track of FX \(foreign exchange\) swaps.  We will demonstrate how to use the UI Toolkit provided by the BDK \(Bot Developer Kit\) in order to display a list of FX swaps and to display a corresponding candleStick chart of the currency rates.  

## Prerequisites:

Complete the BDK App configuration guide to generate the app frontend and bot backend required to complete this tutorial:

{% page-ref page="../app-configuration/configure-your-app-for-bdk-development.md" %}

## 1.  Dive into the Code

In this tutorial, we will be building off the generated app + bot scaffolds provided by the BDK.  The BDK comes out of the box with a number of best practices as well as boiler plate code in order to streamline extension app development.  The following demonstrates the BDK's implementation for bootstrapping your extension app:

### Initialization:

In order to use the services provided by the Client Extension API, your app must include the `symphony-api.js` file as seen on line 11 of the `controller.html` file provided by the BDK:

```markup
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Template -  controller</title>
    <!-- Include the extension app config-->
    <script type="text/javascript" src="config.js" charset="utf-8"></script>
</head>
<body>
    <!-- Include the Symphony Client Extensions API javascript -->
    <script type="text/javascript" src="https://www.symphony.com/resources/api/v1.0/symphony-api.js" charset="utf-8"></script>
    <!-- Include the app controller javascript. This file is generated when running the npm webpack commands. -->
    <script type="text/javascript" src="controller.bundle.js" charset="utf-8"></script>
</body>
</html>
```

In order to initialize the connection from your application's controller and views, your app must call the `SYMPHONY.remote.hello()` method.  This method returns an object containing the user's Symphony client theme name, font size, and any associated classes, including those for theme name, size, and condensed modules.  This method is located in the the `app.js` file provided out of the box by the BDK:

{% tabs %}
{% tab title="app.js" %}
```javascript
SYMPHONY.remote.hello().then((data) => {
    const themeSize = data.themeV2.size;
    const themeColor = data.themeV2.name;
    document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
    const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
      ? THEME_TYPES.DARK
      : themeColor.toUpperCase() === THEME_TYPES.LIGHT
        ? THEME_TYPES.LIGHT
        : THEME_TYPES.LIGHT;
    window.themeColor = appTheme;
    window.themeSize = themeSize;
  }
```
{% endtab %}
{% endtabs %}

###  Connect:

Next, you must connect an application view to an existing application that has been registered with Symphony.  Additionally, you must subscribe the application to remote services provided by the Extension API and also register local services that will be used by your application remotely.  In order to connect your application, your app must call the `SYMPHONY.application.connect()` function, provided out of the box by the BDK in the `app.js` file: 

```javascript
SYMPHONY.application.connect(
      APP_ID,
      ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service', 'dialogs'],
      [`${APP_ID}:app`],
    )
```

## 2.  Authentication

In addition to the boilerplate setup for connecting, initializing and registering you application, the BDK also provides an out of the box implementation of app authentication.  App authentication is required for apps that wish to receive sensitive conversation and user data.  Even though the extension app constructed in this tutorial does not require app authentication, we will keep the provided implementation of app authentication by the BDK.  The sample implementation of App Authentication leverages a combined bot \(backend\) and app \(frontend\) architecture.  The out of the box authentication sequence can be found at the bottom of the `controller.js` file:

```javascript
authController
  .init()
  .then(() => bootstrap())
  .catch(e => console.error(e));  
```

And subsequently inside the `authentication/index.js` file:

```javascript
init() {
    return SYMPHONY.remote.hello()
      .then(this.authenticate)
      .then(this.registerAuthenticatedApp)
      .then(this.validateAppTokens)
      .then(this.getJwtFromSymph)
      .then(this.validateJwtToken)
      .catch((e) => {
        console.error(`Fail to register application ${this.appId}`);
        throw e;
      });
  }
```

To learn more about App Authentication, please continue here:

{% page-ref page="../app-authentication/" %}

## 3.  Creating a Custom View

