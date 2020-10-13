# Headless Bot

Headless Bots are the simplest form of Symphony Bots. Headless Bots usually take the form of a script that is either run on a scheduled basis or triggered by an event from an external system. These scripts are usually transient and terminate after performing their assigned task, like sending an alert or daily digest message.

## Headless Bot Workflows

## Scheduled Workflow

Often times, Headless Bots run on a scheduled bases. Since Headless Bots do not have a conversational aspect, they do not need to create/maintain a datafeed. As a result, Headless Bots do not need to always be running.

In practice, each time a Headless Bot kicks off its scheduled workflow, it will:

* Authenticate
* Post a message/alert in a designated IM, MIM, chatroom or call any number of Symphony's API endpoints
* Terminate its process 

## External Workflow

Headless Bots can also listen for webhooks or incoming events from external/third-party systems. By listening and handling different events from multiple systems, Headless Bots are able to transform Symphony into a centralized notification center for all your data.

In practice, a Headless Bot needs to expose an endpoint in order to listen and handle these webhooks or incoming events. Each time the bot receives a webhook or an incoming request, it must also:

* Authenticate
* Post a message/alert in a designated IM, MIM, chatroom or leverage any number of Symphony's API endpoints
* Terminate its process

## Next Steps:

Continue on to our [Getting Started With Headless Bots](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/ca6abde30e0bc0a2309a885f28efb96df7e470ed/building-bots-on-symphony/planning-your-bot/headless-bot/getting-started.md) guide. Here you will learn how to get your own Headless Bot up and running and take a closer look at the APIs used to create a simple Headless Bot workflow:

