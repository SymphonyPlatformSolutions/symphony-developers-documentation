# OpenChat

Do you need users to open a specific chatroom or start a chat with another user by simply clicking on a button? With the OpenChat action, Symphony users can easily navigate from one stream to another thanks to the OpenChat capabilities from the ui-action.

The OpenChat functionality offers to Symphony users the possibility to:

* Open a specific IM/Chatroom on the side or in the place of the module in current focus&#x20;
* Start a conversation with 1 or several users on the side or in the place of the module in current focus

## MessageML action attribute

The OpenChat is represented by the `<ui-action>` tag, associated with the **`action='open-im'` **attribute as you can see in the examples at the bottom of the page. It must also wrap a [button](../symphony-elements-1/buttons.md), through which the Symphony user will be able to trigger the action specified, in this case the OpenChat functionality.

_Please note that some attributes are general to the ui-action tag and can therefore be used in different contexts. However, some attributes are really specific to the OpenChat functionality of the ui-action and can be used only in the context of action='open-im'._

## Attributes

| Attribute          | Type                    | Required?                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`action`**       | String                  | Yes                                                   | <p><em>General to <code>ui-action </code>tag</em></p><p>Identifies the action.<br><em>For the OpenChat functionality, it should be <code>action='open-im'</code></em></p>                                                                                                                                                                                                                                                                     |
| **`trigger`**      | String                  | No                                                    | <p><em>General to <code>ui-action</code> tag</em></p><p>Specifies the way the action will be triggered by the Symphony user.<br></p><p><em>NB: It is not a mandatory attribute and the default value will be 'click' for the tags where it is not specified. Currently, only <code>trigger='click' </code>is supported.</em></p>                                                                                                              |
| **`user-ids`**     | List of Integers        | Exclusive with `stream-id`                            | <p><em>Specific to the <code>open-im</code> action</em></p><p>List of ids of the users with whom the MIM must be opened when the Symphony user triggers the OpenChat functionality.</p>                                                                                                                                                                                                                                                       |
| **`stream-id`**    | String                  | Exclusive with `user-ids`                             | <p><em>Specific to the <code>open-im</code> action</em></p><p>The id of the room/IM that must be opened when the Symphony user triggers the OpenChat functionality.</p><p><br>NB: <em>Please note that the stream-id is the exact Conversation ID that you can find in the UI, and not the URLSafe64 converted id (see more details in </em><a href="../../../datafeed/overview-of-streams.md"><em>Overview of Streams</em></a><em>)</em></p> |
| **`side-by-side`** | Boolean (true or false) | <p>No</p><p><em>Default to <code>true</code></em></p> | <p><em>Specific to the <code>open-im</code> action</em><br><em></em>If set to <code>false</code>, the current chat will be replaced by the new chat to be opened when the Symphony user triggers the OpenChat functionality.</p>                                                                                                                                                                                                              |

## Accessibility

For the purpose of accessibility, Symphony users can interact with the OpenChat functionality via their keyboard using either "Enter" of "Space" to trigger the click action, once the UI component used for the OpenChat (i.e. button element) is in focus. Symphony users can move from one Element to another using "Tab".

## Rules and Limitations

* The **max length** of any ui-action attribute is 256 except `user-ids` attribute which max length is set to a list 15 ids.
* The OpenChat functionality is not supported in **forms** (see [Symphony Elements](../symphony-elements-1/)).
* Please note that the attribute `type` of the button is not supported when wrapped by a `<ui-action>` tag.
* When using **`user-ids`** attribute with 2 or more ids in the list, the functionality will always create a new chat between the considered users; it will not reopen an existing chat between these same users. This is a known limitation that might change in the future.
* In case the **`side-by-side`** attribute is set to true, when the Symphony user interacts with the OpenChat component, the IM/Chatroom appears on the side of current module in focus. In case the current module is not part of a workspace, then clicking on the button automatically creates workspace and focuses automatically to the desired IM/chat.
* The OpenChat feature is supported in **popped-out mode** with the following behaviour:
  * Current chat/IM on focus is popped-out independently from a workspace:
    * In case the side-by-side attribute is set to false, the popped-out module is replaced by the desired one
    * In case the side-by-side attribute is set to true, the popped-out module remains in place and the desired one opens in the main Symphony client
  * Current chat/IM on focus is part of a popped-out workspace (Capital Markets view only): same behaviour as if the workspace was not popped out: if the specific chat to be opened is not part of the workspace, it is automatically added, and then opened either on the side or in the place of the previous focused chat depending on the side-by-side attribute.
* When opening a specific chatroom where the user is not part of, then:
  * If it is a private room, a modal dialog will appear informing the user he cannot perform the action
  * If it is a public room, then the user is automatically added to the room and the considered stream is opened
* The side-by-side attribute set to false is meaningful only for users in Client 2.0

## Examples

The following examples show the OpenChat functionality being used as follows:

* The first open-im shows how the Symphony user may interact with a primary button that is empowered with the OpenChat functionality that opens a **specific stream** on the side of the current chat. _Note that the trigger and side-by-side attributes are not mentioned, as they are not mandatory: they are then defined by their default behaviour._
* The second open-im shows how the Symphony user may interact with a secondary button that is empowered with the OpenChat functionality that opens an **IM** with a **specific user** on the side of the current chat.
* The third open-im shows how the Symphony user may interact with a tertiary button that is empowered with the OpenChat functionality that opens a **chat** with a **specific list of users** on the side of the current chat.
* The fourth open-im shows how the Symphony user may interact with a destructive button that is empowered with the OpenChat functionality that opens a specific **stream that replaces** the current chat.



{% tabs %}
{% tab title="MessageML" %}
```html
<messageML>
  <ui-action action='open-im' stream-id='rKiuGRoGDTrPtpHSIgmUgH///oVFs7kzdA=='><button>Stream</button></ui-action>
  <ui-action action='open-im' trigger='click' user-ids='[13056700583037]'><button class='secondary'>User A</button></ui-action>
  <ui-action action='open-im' trigger='click' user-ids='[13056700583037,13056700583039]'><button class='tertiary'>List of Users</button></ui-action>
  <ui-action action='open-im' trigger='click' stream-id='rKiuGRoGDTrPtpHSIgmUgH///oVFs7kzdA==' side-by-side='false'><button class='destructive'>Replace current chat</button></ui-action>
</messageML>
```
{% endtab %}
{% endtabs %}

## Versions and Compatibility <a href="versions-and-compatibility" id="versions-and-compatibility"></a>

| Main features introduced | Client 1.5 release | Client 2.0 release | Backward client-compatibility behavior (e.g. external rooms) | Agent needed to parse message sent by the bot |
| ------------------------ | ------------------ | ------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| Initial release          | 20.13              | 21.7               | Not working                                                  | 20.12.2                                       |
