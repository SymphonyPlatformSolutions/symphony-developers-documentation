---
description: Overview of Symphony REST API Architecture
---

# REST API Architecture

As stated before, Symphony's REST API is spread out over Symphony's three main components: the Pod, Agent server, and Key Manager. Let's take a closer look at these components below:

## Symphony Pod ![](../../.gitbook/assets/symphony-pod.png) 

The Symphony Pod is your dedicated Symphony instance. The Symphony Pod is a cloud hosted component that handles all administrative functions as well as passing encrypted messages from user to user. Since Symphony provides end-to-end encrypted messaging, all messages passed from user to user are fully encrypted from the time of sending, so that the Symphony Pod never has access to the contents of messages being sent.

In addition, the Symphony Pod provides REST API endpoints in order for your bot to authenticate itself on the Symphony Pod. You can read more about the Pod API here:

{% page-ref page="pod-api.md" %}

## Agent Server

The Agent Server is the Symphony component responsible for encrypting and decrypting payloads of messages and files sent from a bot. The Agent server provides REST API endpoints that allow a bot to send and receive encrypted messages, acting as the intermediary between a bot and the Symphony Pod. In order to safely encrypt and decrypt these messages, the Agent server interacts the Key Manager which provides encryption keys for encrypting messages.

Read more about the Agent API here:

{% page-ref page="agent-api.md" %}

## Key Manager

The Key Manager generates and stores encryption keys which are used to encrypt and decrypt messages by the Agent Server. The Key Manager provides an authentication API that provides a unique Key Manager Token to a calling bot. This token is used to encrypt/decrypt messages on the Agent Server.

Read more about the Key Manager API here:

{% page-ref page="key-manager-api.md" %}

## Interacting with the Components

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.32.58-pm%20%281%29.png)

The above three components all interact with each other in order to create Symphony's secure messaging service. Let's take a closer look at the sequence of API calls a bot must make in order to send and receive encrypted messages on Symphony.

1. First a bot must authenticate on the Pod.  It does so by calling the Session Auth endpoint found here: [https://developers.symphony.com/restapi/reference\#rsa-session-authenticate](https://developers.symphony.com/restapi/reference#rsa-session-authenticate).  If successful, the bot will receive a valid Session Token.  This Session Token must be passed along with all subsequent Symphony API requests destined for the Agent or the Pod.  
2. Next, a bot must authenticate on the Key Manager.  It does so by calling the Key Manager Auth endpoint found here: [https://developers.symphony.com/restapi/reference\#key-manager-authenticate](https://developers.symphony.com/restapi/reference#key-manager-authenticate).  If successful, the bot will receive a valid Key Manager Token.  This Key Manager Token must be passed along with all subsequent Symphony API requests destined just for the Agent.    
3. If the bot wants to send a message, the bot will call the following Agent API endpoint: [https://developers.symphony.com/restapi/reference\#create-message-v4](https://developers.symphony.com/restapi/reference#create-message-v4) and pass both its Session Token and Key Manager Token as a part of the request.
4. At this point, the Agent Server calls the Key Manager and requests the bot's encryption keys.  
5. Next, the Agent server validates the bot's Key Manager Token.
6. If successful, the Agent will encrypt the payload/message sent by the bot and will forward the encrypted message up to the Pod where it will be routed to the intended user or chatroom.  The message will remain encrypted until it reaches its final destination.

The sequence of API calls and component interaction is illustrated below:

![](../../.gitbook/assets/copy-of-on-prem-bot-auth_workflow.png)

For more an even more detailed explanation, enroll in our Developer Certification Program:

{% hint style="info" %}
Navigate to [Overview of Datafeed](rest-api-architecture.md) to learn more about how bots process messages and events from conversations your bot is in.
{% endhint %}

## On-Premise Deployment

For our larger customers, the Agent server and Key Manager components are deployed on premise, whereas the Pod is always deployed in the cloud. Your bot or REST API caller, is an application that can be deployed on-premise or in the cloud.

An visual representation showing an on-premise deployment of Symphony components is shown below:

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.25.55-pm.png)

## In-Cloud Deployment

For some of our smaller customers, the Agent server and Key Manager may be deployed alongside the Pod in the cloud. Your bot or REST API caller, is an application that can be **deployed on-premise or in the cloud**.

A visual representation showing an in-cloud deployment of Symphony components is shown below:

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.40.33-pm.png)

