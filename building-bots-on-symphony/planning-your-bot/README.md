# Planning Your Bot

## What is a Symphony Bot?

A Symphony bot can be thought of as an automated version of a human performing specific tasks in Symphony. Most actions that an end user is able to perform in Symphony can be performed by a bot as well.

Each bot has a unique identity represented by a service account that has similar features to an end-user account such as a name and avatar.

Symphony Bots enable end users to benefit from innovative **workflows** and timesaving **automations** built on top of the Symphony platform.

## How do Bots create workflows and automations?

The answer lies in Symphony's open REST API. Once authenticated, Symphony Bots can leverage the Symphony REST API that enables bots to execute administrative functions such as creating chatrooms, managing users, and facilitating cross-pod connections. In addition, Symphony's REST API allows bots to perform messaging functions such as sending and receiving messages and signals.

For a full overview of Symphony's REST API continue here:

{% page-ref page="../overview-of-rest-api/" %}

## Next Steps

Before you begin your Bot development journey, it is important to consider the following when determining what type of Bot you build:

## 1.  What are the goals of your Symphony Bot?

Before building your Symphony Bot, it's important that you identify the use cases that this Bot will serve. In other words, identify the ways in which this Bot will increase productivity, add meaningful color to your daily tasks, centralize information, reduce business pain points, and make working simpler for its users. To easily identify valuable use cases, ask yourself the following:

* Are there any tasks in my daily workflow that are recurring and can be automated to assist me in my daily job?
* Are there numerous sources of information that I check daily that can be centralized inside of Symphony?
* Are there any tasks in my daily workflow that require manually sifting through large amounts of data?
* Is there tedious data validation or compliance checks that I must perform when dealing with colleagues, clients, customers, or third-party vendors?
* Do I have to manually collect and carefully collate unstructured data from colleagues, clients, customers, or third-party vendors?

If you need additional inspiration, checkout our **Symphony App Directory** for examples of what has been built today: [https://symphony.com/resource/app-directory/](https://symphony.com/resource/app-directory/)

## 2.  Who is your Bot's target audience?

The type of Bot you build will depend on who is using and interacting with it. To identify your Bot's audience, ask yourself the following:

* Are the users of my Bot internal or external counter-parties?
* Will the Bot be interacting with front-office or back-office employees mostly?
* Is your Bot interacting with a technical audience or business audience?
* Will users interact with your Bot via Symphony mobile or on the desktop?
* What languages does your audience speak?
* Will your Bot be performing bot-to-bot communication?

The more you understand your audience, the more you can understand their business pain points and in turn develop a better user-experience and Bot solution.

## 3.  What sort of interactions will your Bot have?

Users can interact with Symphony Bots in IMs, MIMs, and in chatrooms. Before building your Bot, it's important to identify the types of interactions between users and your Bot:

### Will your Bot be sending and receiving messages to and from users?

If so, you are looking to build a **chatbot**, which is a type of Symphony Bot that allows direct user interaction in the form of request/reply. You can learn more about rich chat-based workflows and building chatbots here:

{% page-ref page="chatbot/" %}

### Will your Bot need to collect structured/unstructured data through [Symphony Elements](../symphony-elements/)?

If so, you are looking to build an **interactive bot.** Interactive bots leverage Symphony Elements to collect user data and feedback through forms, textfields, buttons, etc. You can learn more about interactive workflows and Symphony Elements here:

{% page-ref page="interactive-bot/" %}

### Will your Bot act as a notification system, without any chat or request/reply mechanisms?

If so, you are looking to build a **headless bot.** Headless bots can leverage Symphony Webhooks or build custom notification handlers and formatters from external systems. You can learn more about headless workflow and notification handlers here:

{% page-ref page="headless-bot/" %}

## 4.  What is your Bot's entry point?

Lastly, it's important to clearly define the lifecycle of the Bots workflow as well as the scope of your Bots workflow:

* What chatrooms, IMs, MIMs will my Bot exist in?
* Will these rooms be public, private, broadcast, or cross-pod?
* How can I define the scope of my Bot to reduce unnecessary noise not relevant to my Bot's workflow?
* How can I clearly define the protocol for initiating my Bot's workflow

Continue here for a full list of Bot's best practices to establish Bot parameters, scope, and protocol:

{% page-ref page="../bots-best-practices.md" %}

