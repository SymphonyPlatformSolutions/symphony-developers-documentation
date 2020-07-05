# Anatomy of a Symphony Bot

As we just learned, a Symphony Bot is an automated user that leverages Symphony's REST API in order to create automations and workflows on top of Symphony.

## What are the components of a Symphony Bot?

### 1.  Authentication Credentials and Configuration  ![](../../.gitbook/assets/screen-shot-2020-07-02-at-11.52.10-am.png) 

The first step in creating a Symphony Bot is obtaining unique authentication credentials from your Symphony Admin.  Symphony allows RSA based and Certificate based authentication.  You can learn more  about ways to securely authenticate and obtain keys below:

{% page-ref page="../authentication/" %}

We understand that each firm in the Symphony community has unique infrastructure and development environments.  Built for flexibility, Symphony development tools provide a standardized yet customizable Bot configuration guide geared towards your company's load-balancers, proxy servers, and customized authentication methods.  You can learn more about configuring your bot below:

{% page-ref page="../authentication/bot-configuration.md" %}

### 2. Symphony Datafeed ![](../../.gitbook/assets/screen-shot-2020-07-02-at-12.02.55-pm.png) 

The Symphony Datafeed is a real-time message and event stream that can be created via the REST API.  This datafeed provides messages and event from all conversations that the bot is in.  In order for your bot to process incoming events on Symphony, your bot will need to create and maintain a singular datafeed. Read more about creating and managing datafeeds below:

{% page-ref page="../datafeed/" %}

### 3.  Business Logic ![](../../.gitbook/assets/screen-shot-2020-07-02-at-12.31.41-pm.png) 

The functionality of your Bot is its business logic.  For Conversational and Interactive Bots,  your business logic is stored in datafeed event handlers or datafeed listeners.  In these event handler or listener files, your bot will process incoming events from the Symphony Datafeed and react accordingly by calling the REST API.  You can learn for about processing datafeed events and introducing your own business logic below:

{% page-ref page="../datafeed/handling-datafeed-events.md" %}



     

