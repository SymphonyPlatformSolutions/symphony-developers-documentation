# Receiving Conversation and User Information

Symphony’s Extension API allows apps to extend the Symphony client user interface by adding buttons on the IM, MIM, profile, and chatroom modules. This capability can be used to build apps that act upon the room and user identity details, such as a click-to-call integration.

## **Prerequisites**

* Your app must be an [authenticated](../../../app-authentication/) Extension App.

## **How this works**

Extension apps can receive stream participant information when an end user clicks on a button added by the app.

Your button will receive information from the user object in a MIM, IM and a room of up to 20 users.

Please note that the current user’s information isn’t returned, only the information of the other user(s) in the profile of a user, an IM, MIM or room.

## **Sample Objects**

This is the information that you will receive if your button is pressed inside of an IM or on a users Profile:

{% tabs %}
{% tab title="IM, User Profile" %}
```
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
{% endtab %}
{% endtabs %}

You must implement the `trigger()` method on your application service in order to handle clicks on the registered extensions. This is a sample trigger method that will allow you to receive a user's phone number and email address as an authenticated extension app:

```javascript
// The application service that willbe used to handle clicks on UI extensions
var helloControllerService = SYMPHONY.services.register("hello:controller");

// Displays a button on 1-1 instant messages
uiService.registerExtension(
  "single-user-im", 
  "hello-im", 
  "hello:controller", 
  {
    label: "IM Button", 
    data: {"datetime": Date()}
  }
);

// Implement the trigger method on your application service
helloControllerService.implement({
  trigger: function(uiClass, id, payload, data) {
    if (uiClass == "single-user-im") {
      console.log('IM button was clicked on ' + data.datetime + '.');
      // This acquires the user's phone number from the payload
      var userPhone = payload.user.phone; 
      // You can do this for any field in the prior section, such as emailAddress 
      var userEmail = payload.user.emailAddress;
      // You can now pass the user's phone number and email to your system. 
    }
  }
});
```

This is the information that you will receive if your button is pressed inside of a MIM or a room:

{% hint style="info" %}
This is the information that you will receive if your button is pressed inside of a MIM or a room with less than 20 users. If there are more than 20 users, the _users_ list will be returned empty.
{% endhint %}

{% tabs %}
{% tab title="MIM or Room" %}
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
{% endtab %}

{% tab title="MIM or Room (<20 Users)" %}
```
{
    isCrossPod,
    roomName, 
    threadId, 
    userCount,
    users : [ {
        id,
        isCrossPodUser,
        emailAddress,
        username,
          displayName,
          firstName,
        lastName,
        phone,
        mobile,
    }]
}
```
{% endtab %}
{% endtabs %}
