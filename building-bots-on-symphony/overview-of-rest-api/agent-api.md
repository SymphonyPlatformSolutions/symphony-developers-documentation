# Overview of Agent API

## Symphony Agent APIs ![](../../.gitbook/assets/screen-shot-2020-07-06-at-6.19.59-pm.png) 

The Symphony Agent is responsible for encryption and decryption of messages and content sent to and from a Bot.  As a result, the Agent API is used to build applications that send and receive messages and content.  The following guide includes API collections that exist on the Agent:

## Messages API ![](../../.gitbook/assets/api_bg.png) 

The Messages API is used to create, read, and search messages on your company Pod.  The Messages API can be leveraged to do the following:

* Get messages
* Create messages
* Get attachments
* List attachments
* Import messages
* Suppress messages
* Search messages
* Get message status
* List message receipts

The full list of Messages API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Datafeed API ![](../../.gitbook/assets/screen-shot-2020-07-02-at-12.02.55-pm.png) 

The Datafeed API is used to create and manage a real-time message and event stream from your Symphony Pod to your Bot.  The Datafeed APIs can be leveraged to do the following:

* Create Datafeed
* Read Datafeed

For more information on how Symphony Datafeeds allow your Bot to create rich, interactive workflows navigate here:

{% page-ref page="../datafeed/overview-of-datafeed.md" %}

The full list of Datafeed API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Signals API ![](../../.gitbook/assets/api_bg.png) 

The Signals API is used create and managed tailored alerts based on \#hashtag and $cashtag criteria.  The Signals APIs can be leveraged to do the following:

* List signals
* Get signal details
* Create a signal
* Subscribe/Unsubscribe to a signal
* List signal subscribers

The full list of Signals API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

## Basics API ![](../../.gitbook/assets/api_bg.png) 

This group of APIs allows you to perform testing and obtain diagnostics regarding the health of your Symphony components.  The Basics API can be leveraged to do the following:

* Perform a component health check
* Obtain Agent Info
* Perform an echo test 
* Get session info

The full list of Basics API endpoints and their corresponding reference guide can be found here: [https://developers.symphony.com/restapi/reference](https://developers.symphony.com/restapi/reference)

