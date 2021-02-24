# Documentation Updates

Our documentation is continually updated with new topics, and corrections or clarifications made to existing content. Check back every now and then, to see what is new!

Also, visit the [Change Log](change-log.md) to know more about the major Symphony updates.

## Documentation Changes of Version 20.10

This section contains the main changes that occurred in the v20.10 version of the documentation.

#### **New tutorial pages, overviews, and guides**

No tutorial pages, overviews, nor guides have been added to the Symphony Platform documentation for v20.10.

#### **API References**

The following list shows the endpoints that have been updated or added to the [API Reference](%20https://rest-api.symphony.com/v20.10/reference) documentation.

* [Get Message IDs by Timestamp](%20https://developers.symphony.com/restapi/v20.10/reference#get-message-ids-by-timestamp) has been moved to deprecated endpoints starting with version 20.10.

#### Other Changes

* Updated Extension App Documentation to add the specification for openIM in the [UI Service](../building-extension-applications-on-symphony/overview-of-extension-api/extension-api-services/ui-service/)
* Updated element count limitation \(increased up to 50\) for [Checkbox](../building-bots-on-symphony/symphony-elements/available-elements/checkbox.md) and [Radio Button](../building-bots-on-symphony/symphony-elements/available-elements/radio-button.md) 

## General Documentation Updates

Here after you can find the updates of our documentation impacting the 20.10 version. These changes might be also reflected in previous versions:

* Added limitations on the [Overview of Symphony Elements](../building-bots-on-symphony/symphony-elements/):
  * The form is reset when the page is refreshed and the enduser is able to send a new reply.
  * New Elements features are generally not supported by pods running an older client version than the one where they have been introduced \(i.e. for XPod use cases\)
* Added a section "Versions and Compatibility" on each [Available Element](../building-bots-on-symphony/symphony-elements/available-elements/) documentation, which gathers the versions in which main features of the considered Element were introduced, and which outcome can be expected from it in previous Client version, for the purpose of using it in XPod use-cases for example.
* The endpoint [Subscribers](https://developers.symphony.com/restapi/reference#subscribers) documentation has been updated to highlight both default and maximum values for the parameter "limit"



