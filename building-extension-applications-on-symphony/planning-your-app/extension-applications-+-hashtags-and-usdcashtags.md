# Extension Applications + \#hashtags and $cashtags

Symphony extension apps have the ability to extend various parts of the Symphony client user interface or UI. One common implementation is to add buttons to Symphony's native \#hashtag and $cashtag modules.

{% hint style="info" %}
Note: This guide is an overview of how to leverage the Extension API in order to extend the native \#hashtag and $cashtag hover cards. For an in depth reference of the UI Service and its methods refer to the [UI Service guide](../overview-of-extension-api/extension-api-services/ui-service/).
{% endhint %}

## 1.  Subscribe and Register your Extension

In order to extend the Symphony client's UI, extension apps must subscribe the UI service provided by the Extension API:

```javascript
var uiService = SYMPHONY.services.subscribe("ui");
```

After subscribing to this service you must register your extension with the particular class of the UI that you wish to extend. To do so, you can leverage the `registerExtension()` method provided by the UI service:

```javascript
function registerExtension(uiClass, id, serviceName, options)
```

The `uiClass` parameter of this function represents the location within the Symphony client where the UI extension will appear. In this case, the possible values for the uiClass parameter are the following:

| uiClass | Description |
| :--- | :--- |
| `hashtag` | Link added to hovercard that appears when hovering over a hashtag \(e.g. \#symphony\) |
| `cashtag` | Link added to hovercard that appears when hovering over a cashtag \(e.g. $GOOG\) |

To customize the look and feel of your button, you can pass in an object containing an icon, label, and data to the options parameter:

```javascript
{
    label: 'Example In Chat button',
    icon: "link/to/your/icon.png",
    data: {"datetime" : Date()}
}
```

## 2.  Listen for Events

Once you have registered your UI extension of the appropriate UI class, you can listen for and handle user clicks by implementing the `trigger()` method on your application service. This `trigger()` function will be called each time your extended uiClass button, \#hashtag, or $cashtag is clicked inside the Symphony client. The `trigger()` method must be `implemented` on your registered application service:

```javascript
// The application service that will be used to handle clicks on UI extensions
var helloControllerService = SYMPHONY.services.register("hello:controller");
// subscribe to ui service
var uiService = SYMPHONY.services.subscribe("ui");

// Displays a button on hashtag hovercard
uiService.registerExtension(
  "hashtag", 
  //unique identifier for this extension
  "hello-im",
  //the name of the local service implemented by your application
  "hello:controller", 
  {
    label: "Hashtag Button", 
    icon: "link/to/your/icon.png",
    data: {"datetime": Date()}
  }
);

// Implement the trigger method on your application service
helloControllerService.implement({
  trigger: function(uiClass, id, payload, data) {
    if (uiClass == "hashtag") {
      console.log('Hashtag button was clicked on ' + data.datetime + '.');
    }
  }
  })
```

{% hint style="info" %}
Note: Extensions created on \#hashtag and $cashtag modules do not have access to user data. To learn more about building extension apps that are able to access user and conversation data check out our guide on [Extension Apps with UI Buttons](extension-applications-+-ui-buttons.md#receiving-conversation-and-user-data).
{% endhint %}

## 3.  Filter Events

Additionally, the UI Service provides a `filter()` function that allows you to control if/when your UI Extension is displayed. The `filter()` function is called each time your custom extension is invoked from a user click. In this case, each time a \#hashtag or $cashtag link is clicked, the `filter()` function will be called in order to determine if the custom button should be rendered on the \#hashtag or $cashtag hover card.

The `filter()` function receives the `uiClass`, `id`, and `payload` parameters passed to the `trigger()` function. Based of the information returned, you can selectively display a button on a \#hashtag or $cashtag hovercard:

```javascript
// Implement the filter function on your application service
   helloFilterService.implement({
   filter: function (type, id, payload) {
        return payload.name == "#symphony"
        }
});
```

{% hint style="info" %}
Note: If the `filter()` function on this particular service returns False, the button will not be rendered.
{% endhint %}

## 4.  Add Custom Business Logic

Now that you've register your UI extension, the next step is to add custom business logic. The bulk of your business logic will exist in your `trigger()` method as it gets called each time your extension/button is clicked. Continue here to go through a step by step tutorial of how to add custom business logic to your UI Extension using the BDK \(Bot Developer Kit\):

{% page-ref page="../tutorials/building-an-extension-app-with-hashtags-+-usdcashtags.md" %}

