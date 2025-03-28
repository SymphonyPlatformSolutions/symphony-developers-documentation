# Planning Your Bot

## What is a Bot?

A bot on Symphony Messaging can be thought of as an automated version of a human performing specific tasks in Symphony Messaging chats. Most actions that an end user is able to perform in Symphony Messaging can be performed by a bot as well.

Each bot has a unique identity represented by a service account that has similar features to an end-user account such as a name and avatar.

Symphony Messaging Bots enable end users to benefit from innovative **workflows** and time-saving **automations** built on top of the Symphony Messaging platform.

## How do Bots create workflows and automations?

The answer lies in Symphony Messaging's open REST API. Once authenticated, Symphony Messaging bots can leverage the APIs that enables bots to execute administrative functions such as creating chatrooms, managing users, and facilitating cross-pod connections. In addition, our APIs allow bots to perform messaging functions such as sending and receiving messages and signals.

For a full overview of the Symphony Messaging REST APIs continue here:

{% content-ref url="../overview-of-rest-api/" %}
[overview-of-rest-api](../overview-of-rest-api/)
{% endcontent-ref %}

## Next Steps

Before you begin your Bot development journey, it is important to consider the following when determining what type of Bot you build:

## 1.  What are the goals of your Bot?

Before building your Bot, it's important that you identify the use cases that this Bot will serve. In other words, identify the ways in which this Bot will increase productivity, add meaningful color to your daily tasks, centralize information, reduce business pain points, and make working simpler for its users. To easily identify valuable use cases, ask yourself the following:

* Are there any tasks in my daily workflow that are recurring and can be automated to assist me in my job?
* Are there numerous sources of information that I check daily that can be centralized inside of Symphony Messaging?
* Are there any tasks in my daily workflow that require manually sifting through large amounts of data?
* Is there tedious data validation or compliance checks that I must perform when dealing with colleagues, clients, customers, or third-party vendors?
* Do I have to manually collect and carefully collate unstructured data from colleagues, clients, customers, or third-party vendors?

If you need additional inspiration, checkout our **Symphony Messaging App Directory** for examples of what has been built today: [https://symphony.com/resource/app-directory/](https://symphony.com/resource/app-directory/)

## 2.  Who is your Bot's target audience?

The type of Bot you build will depend on who is using and interacting with it. To identify your bot's audience, ask yourself the following:

* Are the users of my bot internal or external counter-parties?
* Will the bot be interacting with front-office or back-office employees mostly?
* Is your bot interacting with a technical audience or business audience?
* Will users interact with your bot via the Symphony Messaging Mobile App or on the desktop?
* What languages does your audience speak?
* Will your bot be performing bot-to-bot communication?

The more you understand your audience, the more you can understand their business pain points and in turn develop a better user-experience and bot-based solution.

## 3.  What sort of interactions will your Bot have?

Users can interact with Bots in IMs, group chats, and in chatrooms. Before building your Bot, it's important to identify the types of interactions between users and your Bot:

### Will your Bot be sending and receiving messages to and from users?

If so, you are looking to build a **chatbot**, which is a type of Bot that allows direct user interaction in the form of request/reply. You can learn more about rich chat-based workflows and building chatbots here:

{% content-ref url="chatbot.md" %}
[chatbot.md](chatbot.md)
{% endcontent-ref %}

### Will your Bot need to collect structured/unstructured data through [Interactive Elements](../messages/overview-of-messageml/symphony-elements-1/) forms?

If so, you are looking to build an **interactive bot.** Interactive bots leverage Elements to collect user data and feedback through forms, textfields, buttons, etc. You can learn more about interactive workflows and Elements here:

{% content-ref url="interactive-bot.md" %}
[interactive-bot.md](interactive-bot.md)
{% endcontent-ref %}

### Will your Bot act as a notification system, without any chat or request/reply mechanisms?

If so, you are looking to build a **headless bot.** Headless bots can leverage webhooks or build custom notification handlers and formatters from external systems. You can learn more about headless bot workflows and notification handlers here:

{% content-ref url="headless-bot.md" %}
[headless-bot.md](headless-bot.md)
{% endcontent-ref %}

## 4.  What is your Bot's entry point?

Lastly, it's important to clearly define the lifecycle and scope of your bot's workflow:

* What chats will my bot exist in?
* Will these rooms be public, private, broadcast, or external (cross-pod)?
* How can I define the scope of my bot in order to reduce unnecessary noise not relevant to my bot's workflow?
* How can I clearly define the protocol for initiating my bot's workflow?

Continue here for a full list of Bot's best practices to establish Bot parameters, scope, and protocol:

{% content-ref url="../bots-best-practices.md" %}
[bots-best-practices.md](../bots-best-practices.md)
{% endcontent-ref %}
