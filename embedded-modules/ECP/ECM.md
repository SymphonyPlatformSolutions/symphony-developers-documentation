# Embedded Chat Module (legacy)

{% hint style="warning" %}
_<mark style="color:red;">**This page describes the legacy "embedded chat module" (ECM) product.**</mark>_&#x20;

_**Legacy ECM will no longer be available after Oct 31, 2022. It should not be used for new deployments, please use**_ [_**Embedded Collaboration Platform (ECP)**_](./) _**instead.**_ \
_**If you are using the legacy ECM, please plan your migration to ECP.**_
{% endhint %}

## Description

The Symphony Embedded Chat Module allows you to embed stand-alone Symphony chat modules (both chatrooms and IMs) inside other applications.

The chat module can be embedded into websites or any tool that supports a webview. ECM allows custom themes and extensive interface configuration.

> ### Supported browser versions
>
> * Safari 11
> * IE 11
> * Chrome 32+

## Setup

There are three options to implement the Symphony Embedded Chat Module:

* Automatic rendering
* Explicit rendering
* Direct iFrame rendering

Each of these options requires either a working Symphony Conversation ID or comma separated Symphony User IDs to load a working Symphony chat.

> ### Conversation ID Encoding
>
> The direct iFrame rendering, the Conversation ID must be URI encoded to be successfully placed within the iFrame URL. &#x20;
>
> The automatic and explicit rendering use the standard Conversation ID.

## Automatic Rendering

The easiest way to embed Symphony is to include a javascript resource and a `symphony-ecm` tag. The `symphony-ecm` tag is a `DIV` node with the classname `symphony-ecm` and is customized with various `data-*` options.

The script tag must be loaded over HTTPS and include all of the attributes in the code sample below. It can be safely loaded at any point during page rendering.

The example below contains many of the various configuration options, but the full list is available at the end of this document:

```markup
<script async defer id="symphony-ecm-sdk" src="https://yourpodhere.symphony.com/embed/sdk.js" type="text/javascript"></script>

<div class="symphony-ecm"
     style="height: 500px; width: 500px"
     data-module="room"
     data-stream-id="c4iuKb1aizAeLt9LPGB8f3///qGEf2rldA=="
     data-mode="light"
     data-contrast="true"
     data-condensed="true"
     data-show-title="true"
     data-show-info="true"
     data-show-x-pod="false"
     data-show-emoji="false"
     data-show-attach="false"
     data-show-disable-input="false"
     data-show-compose="false"
     data-show-system-messages="false"
>       
</div>
```

> ### SSO Support for Automatic Rendering
>
> Note: SSO is not supported in automatic rendering mode. To use SSO with the JS SDK, please use the explicit rendering.

## Explicit Rendering

Deferring the render can be achieved with the explicit rendering mode. This mode also supports themes.

You can customize the `data-onload`callback name. When your callback is invoked you will have access to the symphony object. You can invoke the `symphony.render` method with two parameters: the container classname, and the configuration object.

**Important:** Note that the sample code that invokes the render method with the object containing the style field only works if the HTML file is not directly accessed from the disk. A server must be used to render the HTML.

Theme colors can be expressed in hexadecimal or human friendly names.

To use SSO, use the urlIntercept callback, as exemplified below. If you do not wish to use SSO, simply remove that parameter. Parameter passed into the url is the generated url from the SDK.

```markup
<script async defer id="symphony-ecm-sdk" src="https://yourpodhere.symphony.com/embed/sdk.js" type="text/javascript" data-onload="onloadCallback"></script>

<script>
  var onloadCallback = function() {
    symphony.render('my-class', {
      'module': 'room',
      'streamId': 'nhOXoSY+xifD1S/Ya2GUA3///qBHxoW0dA==',
      //'module': 'im',
      //'userIds': [7696581462201],
      'mode': 'light',
      'contrast': true,
      'condensed': true,
      'showTitle': true,
      'showInfo': true,
      'showXPod': true,
      'showEmoji': false,
      'showAttach': false,
      'showDisableInput': false,
      'showCompose': true,
      'showSystemMessages': true,
      'urlIntercept': function(url) {
        return 'https://yourpodhere.symphony.com/login/sso/initsso?RelayState='+encodeURIComponent(url);
        }
      'style': {
    general: {
      color: "#ff0000",
      background: "#ff0000",
      font: 'italic 1em fantasy'
    },
    header: {
      background: "#1e72cc",
      font: "italic small-caps bolder condensed 16px/3 cursive;",
      color: "red",
    },
    input: {
      outline: "5px dotted blue",
      background: "pink",
      font: "bold 3em \"Comic Sans MS\", sans-serif",
      color: "#ca1e7a"
    },
    sendUsername: {
      font: "1em monospace",
      color: "grey"
    },
    sendText: {
      font: "bold italic large serif",
      color: "green"
    },
    receiveUsername: {
      font: "italic small fantasy",
      color: "white"
    },
    receiveText: {
      font: "italic 6px arial, sans-serif",
      color: "blue"
    },
    systemMessages: {
      font: "normal 1em monospace",
      color: "purple",
    }
  },
    });
  };


</script>

<div class="my-class" style="width: 500px; height: 500px;"></div>
```

## Direct iFrame Rendering

You can also use the direct iFrame rendering mode, but it does not allow some of the advanced features of automatic or explicit rendering such as custom themes. The direct iFrame rendering mode is recommended for native applications that support a webview. Set the content source of the webview to the Symphony ECM URL:

{% tabs %}
{% tab title="Embedding a Symphony Chat Module" %}
```markup
<iframe src="https://yourpodhere.symphony.com/?embed&streamId=lX1hwfmQ-AK_k_a_BB0y2n___q2-0KfbdA&module=im&mode=light&font=xsmall"></iframe>
```
{% endtab %}
{% endtabs %}

The above example creates an Embedded Chat Module pointing to a room with a Conversation ID of `lX1hwfmQ-AK_k_a_BB0y2n___q2-0KfbdA`.

## Embedded Chat Module Parameters

These parameters work in all embedded chat scenarios: iFrame, explicit and automatic:

| Parameter            | Description                                                                                   | Acceptable Values                             | Default  |
| -------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------- | -------- |
| `module`             | Which type of conversation the module contains.                                               | `im`, `room`                                  | `null`   |
| `streamId`           | The Conversation ID of the IM/MIM/Room. Needs the `module` parameter to be set to `room`.     | URL encoded Conversation ID                   | `null`   |
| `userIds`            | To create an IM or MIM, use List of User IDs. Needs the `module` parameter to be set to `im`. | Comma separated userIds for IM/MIM            | -        |
| `mode`               | Dark or light mode.                                                                           | `light`, `dark`                               | `light`  |
| `contrast`           | Enables contrast mode.                                                                        | `true`, `false`                               | `false`  |
| `condensed`          | Enables condensed mode.                                                                       | `true`, `false`                               | `false`  |
| `font`               | Font size.                                                                                    | `xsmall`, `small`, `medium`, `large`          | `medium` |
| `showTitle`          | Display the module tile                                                                       | `true`, `false`                               | `true`   |
| `showInfo`           | Display the module info (private icon, member count)                                          | `true`, `false`                               | `true`   |
| `showXPod`           | Display orange coloring for cross pod rooms                                                   | `true`, `false`                               | `true`   |
| `showEmoji`          | Display the emoji picker                                                                      | `true`, `false`                               | `true`   |
| `showAttach`         | Display the "attach file" button                                                              | `true`, `false`                               | `true`   |
| `showDisableInput`   | Display the "disable input" button                                                            | `true`, `false`                               | `true`   |
| `showCompose`        | Display the RTE "compose" mode                                                                | `true`, `false`                               | `true`   |
| `urlIntercept`       | Intercept the login URL to use with your SSO system                                           | 'function'                                    | `noop`   |
| `showSystemMessages` | Display system messages such as "Bob added John to the room"                                  | `true`, `false`                               | `true`   |
| `'Theme'`            | Select the color of the theme                                                                 | 'blue', 'green', 'yellow', 'magenta' , 'grey' | N/A      |
