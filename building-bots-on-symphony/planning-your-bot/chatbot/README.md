# Chatbot

Chatbots or conversational Bots, are the most common bots in the Symphony ecosystem. These types of bots run 24/7 and wait for users to initiate conversations in order to perform certain tasks. The conversations could be simple commands or even natural language queries. The bot will determine the user’s intent based on their messages and take the appropriate action.

## Chatbot Workflow

## 1.  Kick off your Workflow

As stated before, users can interact with chatbots in chatrooms, MIMs and IMs. In order to initiate your chatbot's workflow we recommend that users @mention the bot's username in order to get the bot's attention and signal to the bot to begin its intended function. That way, chatbots can be active members of chatrooms or MIMs, but eliminate noise that is outside the scope of its intended workflow.

It is common for Bots to contain multiple commands or sub workflows that it can action upon. It is best practice to list these commands in a help menu. Additionally, it is best practice for all commands to follow a "/" so that it's clear what text is meant to be processed as a command. The following illustrates these best practices:

![](../../../.gitbook/assets/screen-shot-2020-07-09-at-2.31.12-pm.png)

## 2.  Listen for Events

A core aspect of all chatbots and conversational bots is the ability to 'listen' to different types of commands and events and reply to them accordingly. The mechanism that enables Symphony Bots to listen to events in chatrooms, MIMs, and IMs is the **Symphony Datafeed**.

The **Symphony Datafeed** is a real-time message and event stream that can be created using the REST API. The datafeed provides a secure stream of messages and events from all conversations that a bot is in.

In order to 'listen' and respond to user events, bots create a single datafeed and will subsequently have access to all chatroom activity including non-chat based events such as users being added/removed from chatrooms, external connection requests, as well as chatrooms, MIMs, and IMs being created.

To learn more about the Symphony Datafeed continue here:

{% page-ref page="../../datafeed.md" %}

## 3.  Handle Events with Custom Business Logic

The next step of your chatbot workflow is to introduce your custom business logic. Once you have access to the bot's events and messages through the Symphony Datafeed, the next step is to create dedicated event listeners. Inside these listeners is where you parse messages, fetch data from external sources, manage conversation state, and make requests to Symphony's REST API in order to reply to users directly or perform administrative functions such as creating chatrooms.

You can learn more about parsing events and introducing custom business logic [here](../../datafeed.md#handling-events).

## Next Steps:

Continue on to our [Getting Started with Chatbots](getting-started-with-chatbots.md) guide in order to learn more about our development tools and appropriate development pathway for building your first Symphony Chatbot.

{% page-ref page="getting-started-with-chatbots.md" %}

