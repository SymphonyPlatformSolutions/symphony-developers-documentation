---
description: Building a Chatbot using the BDK and CLI Tool
---

# Build a Chatbot using the BDK

### Prerequisites

#### Complete the BDK Bot Configuration guide:

&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD:building-bots-on-symphony/tutorials/bdk/building-a-chatbot-using-bdk.md

## {% page-ref page="../../configuration/configure-your-bot-for-bdk.md" %}

> > > > > > > master:building-bots-on-symphony/tutorials/building-a-chatbot-using-bdk.md

### 1. Dive into the Code

The Bot SDK provides all of the functionality as our regular Symphony SDKs such as easy to use authentication handlers, centralized configuration, convenient error handling, and API bindings so you can call the API directly in your Bot's code. The Bot SDK also provides out of the box Datafeed and event handling architecture that make it simple for your Bot to handle different events. The Bot SDK is also baked in with Bot's best practices and provides a lot of convenient out of the box code that can be used to bootstrap your bot quickly. To illustrate these best practices and convenient boilerplate code, navigate to HelpCommandHandler.java inside your project directory:

{% tabs %}
{% tab title="command/HelpCommandHandler.java" %}
```java
package com.symphony.docs.demobot2.command;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import com.symphony.bdk.bot.sdk.command.CommandHandler;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

/**
 * Sample code. Help command to return the list of available commands
 */
public class HelpCommandHandler extends CommandHandler {

  private static final String[] DESCRIPTIONS = {
      "/hello - simple hello command",
      "/help - displays the list of commands",
      "/create notification - generates details on how to receive notification in this room",
      "/login - returns the HTTP authorization header required to talk to external system",
      "/quote BRL - returns quote for the specified currency (e.g. BRL)",
      "/attachment file - simply returns the file attached to the message",
      "/register quote - displays the currency quote registration form",
      "/template alert - renders predefined templates (e.g. alert, notification) based on your inputs",
      "/broadcast message - spread a message to all bot active rooms"
  };

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@" + getBotName() + " /help$")
        .asPredicate();
  }

  /**
   * Invoked when command matches
   */
  @Override
  public void handle(BotCommand command, SymphonyMessage response) {
    Map<String, Object> data = new HashMap<>();
    data.put("bot_mention", "@" + getBotName());
    data.put("descriptions", DESCRIPTIONS);
    response.setTemplateFile("help-response", data);
  }

}
```
{% endtab %}
{% endtabs %}

The DESCRIPTIONS dictionary defined on line 17 defines a help menu or list of commands that the bot understands out of the box. The Bot automatically follows our best practice naming convention of "@botusername /command" which is defined on line 32. Each of these commands listed in the help menu have their own corresponding command handler inside of the commands folder.

So for example when a user prompts the Bot with "@demobot2 /hello", the handle\(\) function inside HelpCommandHandler.java will be called:

{% tabs %}
{% tab title="command/HelpCommandHandler.java" %}
```java
 public void handle(BotCommand command, SymphonyMessage response) {
    Map<String, String> variables = new HashMap<>();
    variables.put("user", command.getUser().getDisplayName());

    response.setTemplateMessage("Hello, <b>{{user}}</b>", variables);
  }
```
{% endtab %}
{% endtabs %}

### 2.  Run your Bot

Lastly, start up your Spring Application by running your BotApplication.java and test that your chatbot works in a 1-1 IM:

&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD:building-bots-on-symphony/tutorials/bdk/building-a-chatbot-using-bdk.md

## ![](../../../.gitbook/assets/screen-shot-2020-07-11-at-6.31.58-pm%20%281%29.png)

![](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/d53a0d96da58bb092bb4a07bf812b569cd918e6c/building-bots-on-symphony/.gitbook/assets/screen-shot-2020-07-11-at-6.31.58-pm%20%281%29.png)

> > > > > > > master:building-bots-on-symphony/tutorials/building-a-chatbot-using-bdk.md

To learn more about how your can add your own commands and business logic, navigate to our Developer Certification where we show you how to build a real-world FX Trading Bot using the Bot SDK and CLI tool:
