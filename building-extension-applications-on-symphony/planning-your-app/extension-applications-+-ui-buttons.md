# Extension Applications + UI Buttons

Symphony extension apps have the ability to extend various parts of the Symphony client user interface or UI. One common implementation is to add buttons to IMs, MIMs, and chatroom modules.

{% hint style="info" %}
Note this guide is an overview of how to leverage the Extension API to build UI Extensions as buttons. For an in depth reference of the UI Service and its methods refer to the [UI Service guide](../overview-of-extension-api/extension-api-services/ui-service/).
{% endhint %}

## 1.  Subscribe and Register your Extension

In order extend the Symphony client's UI, extension apps must subscribe to the `UI` service provided by the Extension API:

```javascript
var uiService = SYMPHONY.services.subscribe("ui");
```

After subscribing to this service you must register your extension in order to add elements to a particular class of the UI:

```javascript
function registerExtension(uiClass, id, serviceName, options)
```

The `uiClass` registered is the location within the Symphony application where the UI extension (button) will appear. The following are the possible values for the `uiClass` parameter:

| uiClass        | Description                                               |
| -------------- | --------------------------------------------------------- |
| single-user-im | Button added to 1-1 instant message module header         |
| multi-user-im  | Button added to multi-party instant message module header |
| room           | Button added to chatroom module header                    |

To customize the look and feel of your button, you can pass in an object containing an icon, label, and data to the options parameter:

```javascript
{
    label: 'Example In Chat button',
    icon: "link/to/your/icon.png",
    data: {"datetime" : Date()}
}
```

## 2.  Listen for Events

Once you have registered your UI extension on the appropriate UI class, you can listen for and handle user clicks by implementing the trigger method on your application service. This `trigger()` function will be called each time your extended `uiClass` button is pushed inside the Symphony client:

```javascript
// The application service that will be used to handle clicks on UI extensions
var helloControllerService = SYMPHONY.services.register("hello:controller");
// The application service that will handle the filter on UI extensions
var helloFilterService = SYMPHONY.services.register("hello:filter");
// subscribe to ui service
var uiService = SYMPHONY.services.subscribe("ui");

// Displays a button on 1-1 instant messages
uiService.registerExtension(
  "single-user-im", 
  "hello-im", 
  "hello:controller", 
  {
    label: "IM Button", 
    icon: "link/to/your/icon.png",
    data: {"datetime": Date()}
  }
);

// Implement the trigger method on your application service
helloControllerService.implement({
  trigger: function(uiClass, id, payload, data) {
    if (uiClass == "single-user-im") {
      console.log('IM button was clicked on ' + data.datetime + '.');
    }
  }
  })
```

### Receiving Conversation and User Data

If your app is authenticated, you can also receive conversation and user data. Each time your extended `uiClass` button is pushed inside the Symphony client, the `trigger()` method will receive the following user object for a button registered inside of an IM or user profile:

```javascript
//the following object is recieved if a button is pressed inside an IM or user profile
{
   threadId,         //id of the conversation. Also known as streamId or conversationId
   userCount,        //number of users returned
   isCrossPod,       //if cross pod, returns true
   user :  {         //user information
        id,             //user identifier
        emailAddress,   //user email
        username,       //user name
          displayName,    //user display name
          firstName,      //user first name
          lastName,       //user last name
        phone,          //user phone number
        mobile,         //user mobile phone number
    }
}
```

If the button is registered in a chatroom or MIM, the `trigger()` method will receive the following object:

```javascript
{
   isCrossPod,       //if it is a cross pod room, returns true
   roomName,         //room name
   threadId,         //id of the conversation. Also known as streamId or conversationId
   userCount,        //number of users returned
   users : [ {       //users information
       id,              //user id
       isCrossPodUser,  //if this is a cross pod user, returns true
       emailAddress,    //user email
       username,        //user name
       displayName,     //user display name
       firstName,       //user first name
       lastName,        //user last name
       phone,           //user phone number
       mobile,          //user mobile phone number
    }]
}
```

{% hint style="info" %}
Note: If the chatroom or MIM exceeds 20 users, then the users list will be returned empty.
{% endhint %}

## 3.  Filter Events

Additionally, the UI Service provides a `filter()` function that allows you to control if and when your UI Extension / button is displayed. This `filter()` function is called before your button is shown receiving the uiClass, data, and payload passed to.the `trigger()` function. Based on the information passed to the `filter()` function, you can choose to selectively display the button. For example, you can display the button only if a user's phone is present and if a user is not a cross-pod user:

```javascript
// Implement the filter function on your application service
   helloFilterService.implement({
   filter: function (type, id, data) {
        return !!(data.user && data.user.phone);
        }
});
```

## 4.  Add Custom Business Logic

Now that you've registered your UI extension, the next step is to add custom business logic. The bulk of your business logic will exist in your `trigger()` method as it gets called each time the button is clicked.

Continue here to go through a step by step tutorial of how to add custom business logic to your UI Extension using the BDK 1.0 (Bot Developer Kit):

{% content-ref url="../tutorials/building-an-extension-app-with-ui-buttons.md" %}
[building-an-extension-app-with-ui-buttons.md](../tutorials/building-an-extension-app-with-ui-buttons.md)
{% endcontent-ref %}
