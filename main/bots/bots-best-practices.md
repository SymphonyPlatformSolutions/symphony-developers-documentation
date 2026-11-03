# Bots Best Practices

Symphony has a number of best practices to ensure smooth bot development and a positive user experience.

## Getting Your Bots Attention

It is common that Symphony chatrooms contain more than one bot listening for events. In order to preserve name space and ensure that there isn't overlap between bot workflows, we recommend that bots only respond to events that begin with an @mention:

![](<../.gitbook/assets/Screen Shot 2020-07-22 at 4.09.09 PM.png>)

By '@mentioning' your bot, it ensures that only the intended bot responds.

## Commands

It is best practice to have bots listen for commands beginning with a '/'. This naming convention makes it clear to other users that you are trying to get a bot's attention. Additionally, it makes it clear to your bot that a user is instructing it to perform an actions and kick off its intended workflow.

It is also best practice to enforce command line style arguments for commands that require additional input or data:

![](<../.gitbook/assets/Screen Shot 2020-07-22 at 4.41.50 PM.png>)

## Help Menu

It important that users understand exactly what your bot is capable of and what commands your bot understands. It is best practice for your bot to list its commands inside a help menu:

![](<../.gitbook/assets/Screen Shot 2020-07-22 at 4.41.10 PM.png>)

## Datafeed

It is considered best practice that bot's only create and read from one datafeed. If your bot goes down, it should re-authenticate, and try to read from the previously created datafeed.  If this fails then you should create a new datafeed, and begin reading from this new datafeed.

Creating and reading from multiple datafeeds concurrently can result in your bot processing duplicate messages and subsequently sending duplicate or out of order messages back to the user.

{% hint style="info" %}
All datafeed management and best practices are provided out of the box by our dedicated BDKs (Bot Developer Kit) and WDK toolkits.
{% endhint %}

## Message Rate

For large rooms, it is recommended that bots do not send messages at a higher rate than 2 messages/sec or every 500ms.

## Bulk Adding Users

If bots are bulk adding users to rooms, it is recommended that bots add users at rate of 3 users / second.

## Duplicate Messages

In some rare cases, bots may receive duplicate messages from Symphony. In order to prevent duplicate processing, developers can implement logic to keep track of previous messages. It is recommended that bots store a list of unique messageIDs up to 15 minutes in the past. Upon each new message, bots should do a quick validation that new message is not received in the past and continue to process the message.

## Logging

Along with any request made to the [Symphony APIs](overview-of-rest-api/), bots should send header `X-Trace-Id` (random alphanumeric string of 6 characters) for logging purposes.

_Please note that the Symphony BDK for Java sets up your logger_ [_MDC_](http://logback.qos.ch/manual/mdc.html) _(Mapped Diagnostic Context) with this X-Trace-Id. This is especially useful for cross-applications debugging, assuming that the X-Trace-Id value is also present in your application logs. You can find more information about how to print the X-Trace-Id with specific technologies (like logback or log4j2) in the_ [_BDK 2.0 for Java documentation_](https://github.com/finos/symphony-bdk-java/blob/main/docs/tech/production-readiness.md)_._
