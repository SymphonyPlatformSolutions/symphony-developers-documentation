# Extension Applications + \#hashtags and $cashtags

Symphony Extension Apps have the ability to extend various parts of the Symphony client user interface or UI.  One common implementation is to add buttons to Symphony's native \#hashtag and $cashtag modules.    

{% hint style="info" %}
Note: This guide is an overview of how to leverage the Extension API in order to extend the native \#hashtag and $cashtag hover cards.  For an in depth reference of the UI Service and its methods refer to the [UI Service guide](../development-tools/ui-style-guide/).         
{% endhint %}

## 1.  Subscribe and Register your Extension

In order to extend the Symphony client's UI, Extension Apps must subscribe the UI service provided by the Extension API:

```javascript
var uiService = SYMPHONY.services.subscribe("ui");
```

After subscribing to this service you must register your extension with the particular class of the UI that you wish to extend.  To do so, you can leverage the `registerExtension()` method provided by the UI service:

```javascript
function registerExtension(uiClass, id, serviceName, options)
```

 The uiClass parameter of this function represents the location within the Symphony client where the UI extension will appear.  In this case, the possible values for the uiClass parameter are the following:

| uiClass | Description |
| :--- | :--- |
| hashtag | Link added to hovercard that appears when hovering over a hashtag \(e.g. \#symphony\) |
| cashtag | Link added to hovercard that appears when hovering over a cashtag \(e.g. $GOOG\) |

To customize the look and feel of your button, you can pass in an object containing an icon, label, and data to the options parameter:

```javascript
{
    label: 'Example In Chat button',
    icon: "link/to/your/icon.png",
    data: {"datetime" : Date()}
}
```

## 2.  Listen for Events

Once you have registered your UI extension of the appropriate UI class, you can listen for and handle user clicks by implementing the `trigger()` method on your application service.  This `trigger()` function will be called each time your extended uiClass button, \#hashtag, or $cashtag is clicked inside the Symphony client.  The `trigger()` method must be `implemented` on your registered application service:

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
Note:  Extensions created on \#hashtag and $cashtag modules do not have access to user data.  To learn more about building extension apps that are able to access user and conversation data check out our guide on [Building an Extension App with UI Buttons](extension-applications-+-ui-buttons.md).
{% endhint %}



