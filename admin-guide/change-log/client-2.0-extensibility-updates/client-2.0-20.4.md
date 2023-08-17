---
description: This page describes the features introduced on Client 2.0 (20.4) version
---

# Client 2.0 - 20.4

* Fixed an issue where tables sent by the [Create Message v4](https://developers.symphony.com/restapi/reference#create-message-v4) API was not being displayed in conversation views.
* Fixed an issue when sending an invalid emoji via API was returning a random emoji instead of displaying the emoji error.
* Fixed an issue with the rendering of tables within modals of forward and reply messages when using the Dark Mode theme.
* Symphony Elements:
  * Fixed an issue that was allowing the copy of the content of `copyProtected` messages.
  * [Person Selector](../../../bots/messages/overview-of-messageml/symphony-elements-1/person-selector.md) : Fixed an issue where the person avatar was not being displayed on Safari (iOS application).
  * [Buttons](../../../bots/messages/overview-of-messageml/symphony-elements-1/buttons.md): The behavior of the reset button has changed. Now, the reset button function is to return all the form data to its initial value.
* Extension Apps:
  * Fixed an issue when invoking the [Share](../../../ext-apps/overview-of-extension-api/extension-api-services/share-service.md) API without setting the `publishedDate` attribute was showing a random date.
