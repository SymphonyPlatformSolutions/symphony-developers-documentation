# Overview of Agent API

## Symphony Agent APIs <img src="../../.gitbook/assets/symphony-api.png" alt="" data-size="line">

The Symphony Agent is responsible for encryption and decryption of messages and content sent to and from a bot. As a result, the Agent API is used to build applications that send and receive messages and content. The following guide includes API collections that exist on the Agent:

## Message APIs <img src="../../.gitbook/assets/symphony-api.png" alt="" data-size="line">

The Message APIs create, read and search messages on the Pod. These APIs can be used to do the following:

* Get messages
* Create messages
* Get attachments
* List attachments
* Import messages
* Suppress messages
* Search messages
* Get message status
* List message receipts

The full list of Messages API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#messages-v4](https://developers.symphony.com/restapi/reference#messages-v4)

## Datafeed APIs <img src="../../.gitbook/assets/symphony-api.png" alt="" data-size="line">

The Datafeed APIs create and manage real-time event streams from the Pod to your bot. These APIs can be used to do the following:

* Create Datafeed
* Read Datafeed

For more information on how Symphony Datafeeds allow your bot to create rich and interactive workflows, navigate here:

{% content-ref url="../datafeed/" %}
[datafeed](../datafeed/)
{% endcontent-ref %}

The full list of Datafeed API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#introduction-to-datafeed](https://developers.symphony.com/restapi/reference#introduction-to-datafeed)

## Signal APIs <img src="../../.gitbook/assets/symphony-api.png" alt="" data-size="line">

The Signal APIs create and manage tailored alerts based on mention or tag criteria. These APIs can be used to do the following:

* List signals
* Get signal details
* Create a signal
* Subscribe/Unsubscribe to a signal
* List signal subscribers

The full list of Signals API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#list-signals](https://developers.symphony.com/restapi/reference#list-signals)

## Basic APIs <img src="../../.gitbook/assets/symphony-api.png" alt="" data-size="line">

This group of APIs perform testing and obtain diagnostics regarding the health of Symphony components. These APIs can be used to do the following:

* Perform a component health check
* Obtain Agent Info
* Perform an echo test&#x20;
* Get session info

The full list of Basics API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference#health-check-v3](https://developers.symphony.com/restapi/reference#health-check-v3)
