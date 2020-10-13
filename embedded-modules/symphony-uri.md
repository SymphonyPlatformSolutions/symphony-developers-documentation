# Symphony URI

### The `symphony:` URI allows you to launch the Symphony desktop client from your browser:

## Launch the Symphony Desktop Client

```text
symphony://
```

* If the Symphony desktop client is not running, starts up and focuses the Symphony desktop client.
* If the Symphony desktop client is already running, switches focus to the Symphony desktop client. If the client is minimized, brings the client to the foreground.
* If the Symphony desktop client is already running and in focus, has no effect -- the Symphony desktop client remains in focus.
* If the Symphony desktop client is not installed, the Windows operating system will handle the request with its default behavior.

## Launch the Symphony Desktop Client with IM or MIM in Focus

* If the Symphony desktop client is not running, starts up and focuses the Symphony desktop client with the IM, or MIM with the specified userIDs in focus
* If the Symphony desktop client is already running, switches focus to the Symphony desktop client. If the client is minimized, brings the client to the foreground and loads the IM, or MIM with the specified userIDs in focus
* If the Symphony desktop client is already running and in focus, it will open the IM, or MIM with the specified userIDs
* If the Symphony desktop client is not installed, the Windows operating system will handle the request with its default behavior.

> ### 📘Error Handling Behavior
>
> For IM, if an invalid userId is supplied, the behaviour is the same as "symphony://"  
> For MIM, if one of the userId is invalid, an MIM with only the valid userIds is opened.  
> For MIM, if all the userIds are invalid, the behaviour is the same as "symphony://"

## Opening a chat with a single user

{% tabs %}
{% tab title="IM" %}
```text
symphony://?startChat=71811853189751
```
{% endtab %}
{% endtabs %}

## Opening a chat with other users

{% tabs %}
{% tab title="MIM" %}
```text
symphony://?startChat=71811853187751,3563645678951
```
{% endtab %}
{% endtabs %}

## Creating a chatroom with User IDs

What happens if no room name is provided?

* The wrapper is brought into focus and nothings happens

Can you put spaces in the URI to create a room name?

* Yes, if opening the URI via chrome.

{% tabs %}
{% tab title="Chatroom" %}
```text
symphony://?startRoom=RoomName=Example&userIds=4378106230763,5478106410145,7078106304564
```
{% endtab %}
{% endtabs %}

## Creating a chatroom with User Emails

What happens if no room name is provided?

* The wrapper is brought into focus and nothings happens

Can you put spaces in the URI to create a room name?

* Yes, if opening the URI via chrome.
* No, if opening the URI via safari

{% tabs %}
{% tab title="Chatroom" %}
```text
Protocol example with userEmails
symphony://?startRoom=RoomName=AroomWith2people&userEmails=sample@symphony.com,acme@bank.com
```
{% endtab %}
{% endtabs %}

## Launch the Symphony Desktop Client with Stream in Focus

Mirrors the behavior of `symphony:` but puts the specified stream \(IM, multiparty IM, or chatroom\) in focus.Text

```text
symphony://?streamId=STREAM_ID&streamType=STREAM_TYPE
```

* If no modules are open, opens the specified stream in the grid.
* If an unpinned module is open in the grid, replaces the unpinned module with the specified stream.
* If there are existing pinned modules, opens a new module with the specified stream, while retaining the existing modules.
* If the user is not logged into Symphony when the client is launched, the user will be required to first login. Once logged in, the specified stream will be displayed.
* You must specify `streamType`, which can be either `im` \(for IM or multiparty IM\) or `chatroom`. If `streamType` is not specified, the Symphony client is launched as with `symphony:`.

**Error Handling**

* If the wrong stream type is specified, the Symphony client is launched as with `symphony:`.
* If no such stream exists and `streamType=chatroom`, the Symphony client is launched as with `symphony:`.
* If no such stream exists and `streamType=im`, a rendering error message is displayed.
* If a stream where the user is not a participant is specified, the Symphony client is not launched.

## Launch the Symphony Desktop Client with Profile in Focus

Mirrors the behavior of `symphony:` but puts the specified user's profile in focus.Text

```text
symphony://?userId=USER_ID
```

* If no modules are open, opens the specified profile in the grid.
* If an unpinned module is open in the grid, replaces the unpinned module with the specified profile.
* If there are existing pinned modules, opens a new module with the specified profile, while retaining the existing modules.
* If the user is not logged into Symphony when the client is launched, the user will be required to first login. Once logged in, the specified profile will be displayed.

**Error Handling**

* If no such user exists but the userId is of a valid format \(integer\), a blank user profile is opened.
* If a userId of invalid format is specified, the Symphony client is launched as with `symphony:`.
* If an external userId of a user who is not entitled to external communications is specified, a blank user profile is opened.

