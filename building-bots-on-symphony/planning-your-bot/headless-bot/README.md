# Headless Bot

Headless Bots are the simplest form of Symphony Bots. Headless Bots usually take the form of a script that is either run on a scheduled basis or triggered by an event from an external system. These scripts are usually transient and terminate after performing their assigned task, like sending an alert or daily digest message.

## Headless Bot Workflows

## Scheduled Workflow

Often times, Headless Bots run on a scheduled basis. Since Headless Bots do not have a conversational aspect, they do not need to create/maintain a datafeed. As a result, Headless Bots do not need to always be running.

In practice, each time a Headless Bot kicks off its scheduled workflow, it will:

1. Authenticate
2. Post a message/alert in a designated IM, MIM, chatroom or call any number of Symphony's API endpoints
3. Terminate its process 

## External Workflow

Headless Bots can also listen for webhooks or incoming events from external/third-party systems. By listening and handling different events from multiple systems, Headless Bots are able to transform Symphony into a centralized notification center for all your data.

In practice, a Headless Bot needs to expose an endpoint in order to listen and handle these webhooks or incoming events. Each time the bot receives a webhook or an incoming request, it must also:

1. Authenticate
2. Post a message/alert in a designated IM, MIM, chatroom or call any number of Symphony's API endpoints
3. Terminate its process 

## Next Steps:

Continue on to our [Getting Started With Headless Bots](getting-started.md) guide. Here you will learn how to get your own Headless Bot up and running and take a closer look at the APIs used to create a simple Headless Bot workflow:

{% page-ref page="getting-started.md" %}

