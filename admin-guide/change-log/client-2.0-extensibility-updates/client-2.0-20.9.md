---
description: This page describes the features introduced on Client 2.0 (20.9) version
---

# Client 2.0 - 20.9

* Extension APIs:
  * Main functionalities of Extension Applications are supported in the version 20.9 in the Client 2.0.
  * Fixed missing refresh when a module is popped out
  * Fixed permission to allow again Applications to propose download of files to the end users
* New features for Symphony Elements:
  * Expandable card: new Expandable card with updated display. The card can have three different states, that can be set by the developer: collapsed, expanded but cropped, fully expanded. _See how to use the `expandable-card` tag in _[_Content Grouping_](../../../building-bots-on-symphony/messages/overview-of-messageml/messageml-basic-format-tags/content-grouping.md)_ specifications._
  * Label: it is now possible to set a Label associated with an element (text-field, masked text-field, textarea, dropdown, person selector) so the user can understand better the field meaning. This way the placeholder can focus on providing a hint of the expected format. _See more details on how to use it in the documentation for specific elements supporting the `label` attribute under the _[_Interactive Elements Forms_](../../../building-bots-on-symphony/messages/overview-of-messageml/symphony-elements-1/)_ section._
  * Tooltip: it is now possible to add a hint associated with an element (for text-field, masked text-field, textarea, dropdown, person selector) to provide more detailed information to the user on the meaning or expected value of an Element. _See more details on how to use it in the documentation for specific elements supporting the `title` attribute under the _[_Interactive Elements Forms_](../../../building-bots-on-symphony/messages/overview-of-messageml/symphony-elements-1/)_ section._
* Fixed display bug for Elements Buttons with a long text
* Fixed display of the placeholder for Elements Dropdown
* Fixed display bug for Cards
* Fixed display when Elements are focused in Client 2.0
