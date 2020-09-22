# Building an Extension App with UI Toolkit

In this step by step tutorial, we will build an FX Watchlist App, an extension app that allows users to keep track of FX \(foreign exchange\) swaps.  We will demonstrate how to use the UI Toolkit provided by the BDK \(Bot Developer Kit\) in order to display a list of FX swaps and to display a corresponding candleStick chart of the currency rates.  

## Prerequisites:

Complete the BDK App configuration guide to generate the app frontend and bot backend required to complete this tutorial:

{% page-ref page="../app-configuration/configure-your-app-for-bdk-development.md" %}

## 1.  Dive into the Code

In this tutorial, we will be building off the generated app + bot scaffolds provided by the BDK.  The BDK comes out of the box with a number of best practices as well as boiler plate code in order to streamline extension app development.  The following demonstrates the BDK's implementation for bootstrapping your extension app:

### Initialization:

In order to use the services provided by the Client Extension API, your app must include the `symphony-api.js` file as seen on line 11 of the `controller.html` file provided by the BDK:

```text
s
```



 

