# Updating User Apps

This guide describes how to modify and reset application entitlements for a specific user, using the available APIs.

## Step 1 - Get a list of current user application entitlements.

First, you will need to call the public [User Apps](https://developers.symphony.com/restapi/docs/user-apps) API to have a list of application entitlements for the user.\
This step is important to guarantee that you have all the needed data.

{% tabs %}
{% tab title="200 OK" %}
```javascript
[
  {
    "appId": "djApp",
    "appName": "Dow Jones",
    "listed": true,
    "install": false
  },
  {
    "appId": "spcApp",
    "appName": "S&P Capital IQ Data",
    "listed": true,
    "install": false
  }
]
```
{% endtab %}
{% endtabs %}

## Step 2 - Updating User Apps

With the list of app entitlements returned by the [User Apps](https://developers.symphony.com/restapi/reference-link/user-apps) API call, you can choose how to update the entitlements for that user x app using the [Update User Apps](https://developers.symphony.com/restapi/reference-link/update-user-apps) API, according to the following scenarios.

## Scenario 1: Updating app entitlements

In this scenario, you are able to update the user app entitlements without having to include new ones.\
Note that you have to pass all the app entitlements returned by the [User Apps](https://developers.symphony.com/restapi/reference-link/user-apps) API call, otherwise, the ones you do not pass will be reset to the default configuration you have set for your pod.

{% tabs %}
{% tab title="Update User Apps API - body request" %}
```javascript
//The custom entitlements for the "Dow Jones" you already had. The "listed" parameter wil be changed to "false" and the "install" parameter will be changed to "true".
//The custom entitlements for the "S&P Capital IQ Data" you already had. Nothing will change for this App.

[
  {
    "appId": "djApp",
    "appName": "Dow Jones",
    "listed": false, 
    "install": true
  },
  {
    "appId": "spcApp",
    "appName": "S&P Capital IQ Data",
    "listed": true,
    "install": false
  } 
]
```
{% endtab %}
{% endtabs %}

## Scenario 2: Keeping (or updating) app entitlements + sending new ones

In this scenario, you are able to keep (or update) the user app entitlements returned and send new ones to be included for that user.\
Note that you have to pass all the app entitlements returned by the [User Apps](https://developers.symphony.com/restapi/reference-link/user-apps) API call, otherwise, the ones you do not pass will be reset to the default configuration you have set for your pod.

{% tabs %}
{% tab title="Update User Apps API - body request" %}
```javascript
//The custom entitlements for the "Dow Jones" you already had, nothing will be changed.
//For the "S&P Capital IQ Data", the "listed" parameter wil be changed to "false".
//For the "EarlyBird Twitter", new custom entitlements will be included.  

[
  {
    "appId": "djApp",
    "appName": "Dow Jones",
    "listed": true, 
    "install": false
  },
  {
    "appId": "spcApp",
    "appName": "S&P Capital IQ Data",
    "listed": false,
    "install": false
  },
  {
    "appId": "ebtApp",
    "appName": "EarlyBird Twitter",
    "listed": false,
    "install": false
  }  
]
```
{% endtab %}
{% endtabs %}

## Scenario 3: Resetting some apps entitlements + sending new ones.

In this scenario, you are able to keep some of the user x app entitlements and reset other ones. Also, a new app entitlement will be included.\
Note that only the apps you did not include on the [API](https://developers.symphony.com/restapi/reference-link/user-apps) call will be reset to the default configuration you have set for your pod.

{% tabs %}
{% tab title="Update User Apps API - body request" %}
```javascript
//The custom entitlements for the "Dow Jones" you already had, nothing will be changed.
//The "S&P Capital IQ Data" will be reset to the default Global configurations. 
//That is the reason why it is not included in the request body.
//New custom entitlements  will be included for "EarlyBird Twitter".

[
  {
    "appId": "djApp",
    "appName": "Dow Jones",
    "listed": true,
    "install": false
  },
  {
    "appId": "ebtApp",
    "appName": "EarlyBird Twitter",
    "listed": false,
    "install": false
  }  
]
```
{% endtab %}
{% endtabs %}

## Scenario 4: Resetting all the app entitlements for a user

In this scenario, you are able to reset all the custom user app entitlements to the default configuration you have set for your pod.\
Note that you need to call the [API](https://developers.symphony.com/restapi/reference-link/user-apps) sending an empty object.

{% tabs %}
{% tab title="Update User Apps API - body requst" %}
```
//All the Apps you already have will be reset to the default configuration you have set for your pod.

[]
```
{% endtab %}
{% endtabs %}
