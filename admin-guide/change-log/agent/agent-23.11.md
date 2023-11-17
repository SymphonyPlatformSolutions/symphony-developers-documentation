# Agent - 23.11

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.11.1.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

## Agent Changes

### Agent 23.11.1

* MessageML:&#x20;
  * Accept new languages in the <[code](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/text-level-formatting-and-semantics.md)> tag: Markdown, JSON, Scala, Shell, YAML
* Elements - **Dependency on Client version 23.12, released in December 2023**. Please check Client release notes for confirmation.
  * [DropDownMenu](../../../bots/messages/overview-of-messageml/symphony-elements-1/dropdown-menu.md#attributes) and [TextField ](../../../bots/messages/overview-of-messageml/symphony-elements-1/text-field.md#attributes)now support auto-submit: When auto submit is enabled for an element, the form gets submitted on selection of the drop down menu, or when typing the <`enter`> key in a text field. This allows a faster and more natural interaction with a form, and works very well with the capability to update a form with a new state (using the MessageUpdate endpoint). You can create cascading drop down menus for example.
  * Buttons can benefit from two [new styles](../../../bots/messages/overview-of-messageml/symphony-elements-1/buttons/#attributes): `primary-link` and `destructive-link` that are borderless and are either blue or red.
  * Buttons can now support icons from our standard icon library.
* **Dependency on future Client versions which are** <mark style="color:red;">**not confirmed**</mark><mark style="color:red;">.</mark> Please check future Client release notes. Features:
  * _Elements_
    * _Support hidden attributes for text fields._
    * _Support read-only and disabled attributes on elements._
    * _Support new room picker elements that allows to select a conversation._&#x20;
  * _Accept \<sup> and \<sub> tags_
  * _TextArea width and height can now be controlled using cols and rows attributes._
