# Conversational Bot

Chatbots or conversational Bots, are the most common bots in the Symphony ecosystem. These types of bots run 24/7 and wait for users to initiate conversations in order to perform certain tasks. The conversations could be simple commands or even natural language queries. The bot will determine the user’s intent based on their messages and take the appropriate action.

## Chatbot Workflow

## 1.  Kick off your Workflow

As stated before, users can interact with chatbots in chatrooms or 1 to 1 chats. In order to initiate your chatbot's workflow we recommend that users @mention the bot's username in order to get the bot's attention and signal to the bot to begin its intended function. That way, chatbots can be active members of chatrooms, but eliminate noise that is outside the scope of its intended workflow.

It is common for Bots to contain multiple commands or sub workflows that it can action upon. It is best practice to list these commands in a help menu. Additionally, it is best practice for all commands to follow a "/" so that it's clear what text is meant to be processed as a command. The following illustrates these best practices:

![](<../../.gitbook/assets/Screen Shot 2020-07-09 at 2.31.12 PM.png>)

## 2.  Listen for Events

A core aspect of all chatbots and conversational bots is the ability to 'listen' to different types of commands and events and reply to them accordingly. The mechanism that enables Bots to listen to events in chats is the **Datafeed**.

The **Datafeed** is a real-time message and event stream that can be created using the REST API. The datafeed provides a secure stream of messages and events from all conversations that a bot is in.

In order to 'listen' and respond to user events, bots create a single datafeed and will subsequently have access to all chat activity including non-chat based events such as users being added/removed from chatrooms, external connection requests, as well as chats being created.

To learn more about the Datafeed continue here:

{% content-ref url="../datafeed/" %}
[datafeed](../datafeed/)
{% endcontent-ref %}

## 3.  Handle Events with Custom Business Logic

The next step of your chatbot workflow is to introduce your custom business logic. Once you have access to the bot's events and messages through the Datafeed, the next step is to create dedicated event listeners. Inside these listeners is where you parse messages, fetch data from external sources, manage conversation state, and make requests to our Symphony Messaging REST API in order to reply to users directly or perform administrative functions such as creating chatrooms.

You can learn more about parsing events and introducing custom business logic [here](../datafeed/#handling-events).

## Next Steps:

Continue on to our [Building a Conversational Bot](../../dev-tools/bdk-java/conversational.md) guide in order to learn more about our development tools and appropriate development pathway for building your first Symphony Chatbot.

{% content-ref url="../../dev-tools/bdk-java/conversational.md" %}
[conversational.md](../../dev-tools/bdk-java/conversational.md)
{% endcontent-ref %}
