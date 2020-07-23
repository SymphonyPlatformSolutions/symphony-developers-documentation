# Bots Best Practices

Symphony has a number of best practices to ensure smooth bot development and a positive user experience.  

## Getting Your Bots Attention

It is common that Symphony chatrooms contain more than one Bot constantly listening to events.  In order to preserve name space and ensure that there isn't overlap between bot workflows, we recommend that bots only respond to events that begin with an @mention:

![](../.gitbook/assets/screen-shot-2020-07-22-at-4.09.09-pm.png)

By '@mentioning' your bot, it ensures that only the intended bot responds.

## Commands

It is best practice to have bots listen for commands beginning with a '/'.  This naming convention makes it clear to other users that you are trying to get a bot's attention.  Additionally, it makes it clear to your bot that a user is instructing it to do something and kick off its intended workflow.  

It is also best practice to enforce command line style arguments for commands: 

![](../.gitbook/assets/screen-shot-2020-07-22-at-4.41.50-pm.png)

## Help Menu

It important that users understand exactly what your bot is capable of and what commands your bot understands.  As a result, it is best practice for your bot to list its commands as apart of a help menu:

 

![](../.gitbook/assets/screen-shot-2020-07-22-at-4.41.10-pm.png)

## Datafeed

