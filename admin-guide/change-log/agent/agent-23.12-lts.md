# Agent - 23.12 (LTS)

## Agent Download

{% hint style="info" %}
To download the Agent, click [here](https://storage.googleapis.com/sym-platform/developers/rest-api/agent-23.12.4.zip).

For a list of Agent x SBE compatibilities, click [here](../../agent-guide/sbe-x-agent-compatibility-matrix.md).
{% endhint %}

{% hint style="warning" %}
**Important**:&#x20;

* **Java 8** is **no longer supported** starting with Agent 23.12. Only **Java 17** is supported moving forward. More information below.
* As RHEL7 is not supported on Java 17, **RHEL7 is no longer supported**. Please consider migrating to RHEL8 or RHEL9.
{% endhint %}

## More info on the end of support of Java 8

Java 8 is **no longer supported** starting with Agent 23.12. Only **Java 17** is supported moving forward.

**Why now?**

A key dependency of the Agent service is [SpringBoot](https://spring.io/projects/spring-boot). As SpringBoot v2 is no longer supported, we upgraded to SpringBoot v3, which is no longer compatible with Java 8.&#x20;

**Why Java 17?**

Java 17 has been released in 2021 and benefits from **Long Term Support**.

**How to stay on Java 8?**

If you need time to migrate to Java 17, you can stay on the Agent version 23.9 LTS, which will stay supported on a best effort basis until **September 2024**.

Please note that this support will be on a **best effort basis**: As this version relies on an unsupported version of SpringBoot, we may not be in a position to fix a bug or vulnerability that will be discovered in SpringBoot v2. If the issue is not related to SpringBoot, we will fix it as per our support policy.&#x20;

## Agent Changes

### Agent 23.12.4

* Fixed security vulnerabilities.

### Agent 23.12.1

* Support of **RHEL 9**. RHEL7 is no longer supported.
* Support of **Java 17**. Java 8 is no longer supported.
* Update **Spring Boot** version from 2.x to 3.x.

### Changes introduced since last LTS version

* MessageML - Accept new languages in the <[code](../../../bots/messages/overview-of-messageml/messageml-basic-format-tags/text-level-formatting-and-semantics.md)> tag: Markdown, JSON, Scala, Shell, YAML
* Elements - **Dependency on Client version 23.12, released in December 2023**.&#x20;
  * [DropDownMenu](../../../bots/messages/overview-of-messageml/symphony-elements-1/dropdown-menu.md#attributes) and [TextField ](../../../bots/messages/overview-of-messageml/symphony-elements-1/text-field.md#attributes)now support auto-submit: When auto submit is enabled for an element, the form gets submitted on selection of the drop down menu, or when typing the <`enter`> key in a text field. This allows a faster and more natural interaction with a form, and works very well with the capability to update a form with a new state (using the MessageUpdate endpoint). You can create cascading drop down menus for example.
  * Buttons can benefit from two [new styles](../../../bots/messages/overview-of-messageml/symphony-elements-1/buttons/#attributes): `primary-link` and `destructive-link` that are borderless and are either blue or red.
  * Buttons can now support icons from our standard icon library.
* Elements - **Dependency on Client version 24.1, released in January 2024**.&#x20;
  * TextArea width and height can now be controlled using cols and rows attributes.
* Elements - **Dependency on Client version 24.4, released in April 2024**.&#x20;
  * New Room Selector Element that allows a user to select a chat room. More information in the [Room Selector documentation](../../../bots/messages/overview-of-messageml/symphony-elements-1/room-selector.md).
* **Dependency on future Client versions which are** <mark style="color:red;">**not confirmed**</mark><mark style="color:red;">.</mark> Please check future Client release notes. Features:
  * _Elements_
    * _Support hidden attributes for text fields._
    * _Support read-only and disabled attributes on elements._
  * _Accept \<sup> and \<sub> tags_
* Removed `jcurl` from the Agent deliverable. If you used this library in your scripts, the library is still available from the following FINOS [repository](https://github.com/finos/JCurl/releases).
* Fixed security vulnerabilities.
* Fixed issue preventing bots from getting message replies containing tables.
* Support calling API endpoints with a trailing /, for example `/agent/v2/HealthCheck/` instead of the usual `/agent/v2/HealthCheck`, for backward compatibility with older agent versions. This is however not recommended and does not follow the API specifications.
