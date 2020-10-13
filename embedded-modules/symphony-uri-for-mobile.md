# Symphony URI for Mobile

The `symphony:` URI can be used to launch the Symphony iOS application from another iOS app.

## Launch the Symphony iOS app with a chat from another app

```text
symphony://chat_with?username=USERNAME&name=USER_FULL_NAME
```

* `username` is the Symphony username of the person with whom the user wants to start/continue a 1-1 chat.
* `name` is an optional parameter used to specify the first and last name of the person with whom the user wants to start/continue a 1-1 chat. This will be used for a fallback option if no user could be found with the provided username.

```text
symphony://chat_with?username=<john.smith>&name=John%20Smith
```

When the app is launched with the above URL, the UI should pop to the root view controller \(if necessary\) and then automatically dive into a 1-1 chat with John Smith.

* If there was an existing 1-1 with the user john.smith, all the conversation history would be expected to be present.
* If there was no existing 1-1 conversation with the user john.smith, a new 1-1 conversation would be created.
* If there was no such user with the username john.smith, the user should be directed to a Global Search on the People tab with the search text field pre-populated with the user's full name.

{% hint style="info" %}
Note: The symphony URI only supports internal use cases, as look up by username is only possible within the same company.
{% endhint %}

