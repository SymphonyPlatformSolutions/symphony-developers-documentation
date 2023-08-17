# OpenChat

Chat bots can add buttons in chat messages that on click will open an existing chat room or start a chat with a specific user or group of users.&#x20;

This can be useful to help Symphony users easily navigate from one chat to another, or to reference another discussion happening in a different chat.

The new chat can either replace the current chat, or open on the side instead.

## MessageML tag

OpenChat is represented in MessageML as a `<ui-action action='open-im'>` tag and wraps a single button.

The `<ui-action>` tag for OpenChat supports the following attributes:

<table data-header-hidden><thead><tr><th width="127">Attribute</th><th width="103">Type</th><th width="123">Required?</th><th>Description</th></tr></thead><tbody><tr><td>Attribute</td><td>Type</td><td>Required?</td><td>Description</td></tr><tr><td><strong><code>action</code></strong></td><td>String</td><td>Yes</td><td>For OpenChat, always set to <code>action='open-im'</code></td></tr><tr><td><strong><code>user-ids</code></strong></td><td>List of Integers</td><td>Exclusive with <code>stream-id</code></td><td>List of ids of the users with whom the MIM must be opened when the Symphony user triggers the OpenChat functionality.</td></tr><tr><td><strong><code>stream-id</code></strong></td><td>String</td><td>Exclusive with <code>user-ids</code></td><td><p>The id of the room/IM that must be opened when the Symphony user triggers the OpenChat functionality.</p><p><br>NB: <em>Please note that the stream-id is the exact Conversation ID that you can find in the UI, and not the URLSafe64 converted id (see more details in</em> <a href="../../../datafeed/overview-of-streams.md"><em>Overview of Streams</em></a><em>)</em></p></td></tr><tr><td><strong><code>side-by-side</code></strong></td><td>Boolean</td><td><p>No.</p><p><em>Default to <code>true</code></em></p></td><td>If set to <code>false</code>, the current chat will be replaced by the new chat to be opened when the Symphony user triggers the OpenChat functionality.</td></tr></tbody></table>

## Accessibility

Symphony users can interact with the OpenChat functionality via their keyboard using either "Enter" of "Space" to trigger the click action, once the UI component used for the OpenChat (i.e. button element) is in focus. Symphony users can move from one Element to another using "Tab".

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

## Versions and Compatibility <a href="#versions-and-compatibility" id="versions-and-compatibility"></a>

<table data-header-hidden><thead><tr><th>Main features introduced</th><th>Agent needed to parse message sent by the bot</th><th width="150">Client 2.0 release</th><th width="150">Client 1.5 release</th><th>Backward client-compatibility behavior (e.g. external rooms)</th></tr></thead><tbody><tr><td>Main features introduced</td><td>Agent needed to parse message sent by the bot</td><td>Client 2.0 release</td><td><em>Client 1.5 release</em></td><td><em>Backward client-compatibility behavior (e.g. external rooms)</em></td></tr><tr><td>Initial release</td><td>20.12.2</td><td>21.7</td><td><em>20.13</em></td><td><em>Not working</em></td></tr></tbody></table>
