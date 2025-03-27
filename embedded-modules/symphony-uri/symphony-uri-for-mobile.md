# Symphony Messaging URI for Mobile (deprecated)

{% hint style="warning" %}
Following the introduction of **universal URIs** that work both on **desktop** and **mobile**, mobile-specific URIs are deprecated. \
URIs defined below will continue to work, but for any new integration, please use the universal URIs defined [here](./).
{% endhint %}

#### The `symphony:` URI can be used to launch the Symphony Messaging iOS application from another iOS app.

## Launch the Symphony Messaging iOS app with a chat from another app

```
symphony://chat_with?username=USERNAME&name=USER_FULL_NAME
```

* `username` is the Symphony Messaging username of the person with whom the user wants to start/continue a 1-1 chat.
* `name` is an optional parameter used to specify the first and last name of the person with whom the user wants to start/continue a 1-1 chat. This will be used for a fallback option if no user with the provided username can be found.

```
symphony://chat_with?username=<john.smith>&name=John%20Smith
```

When the app is launched with the above URL, the UI should pop to the root view controller (if necessary) and then automatically go to a 1-1 chat with the user John Smith.

* If a 1-1 with the user `john.smith` already exists, all the conversation history is expected to be present.
* If a 1-1 conversation with the user `john.smith` doesn't exist yet, a new 1-1 conversation is created.
* If there is no such user with the username `john.smith`, the user is directed to a global search on the **People** tab with the search text field pre-populated with the user's full name.

{% hint style="info" %}
**Note:** The Symphony Messaging URI only supports internal use cases, as the search by username is only possible within the same company.
{% endhint %}
