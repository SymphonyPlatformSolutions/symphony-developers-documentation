# Building a Headless Bot using the BDK

## Prerequisites

### Complete the BDK Bot Configuration Guide:

{% page-ref page="../../../configuration/configure-your-bot-for-bdk.md" %}

## 1.  Dive into the Code

The Bot SDK provides all of the functionality as our regular Symphony SDKs such as easy to use authentication handlers, centralized configuration, convenient error handling, and API bindings so you can call the API directly in your Bot's code. The Bot SDK is also baked in with Bot's best practices and provides a lot of convenient out of the box code including a built in notification handler that exposes a local endpoint to receive incoming notifications or webhooks.  To illustrate these best practices and convenient boilerplate code, navigate to CreateNotificationCommandHandler.java inside your project directory:

{% tabs %}
{% tab title="command/CreateNotificationCommandHandler.java" %}
```java
package com.symphony.docs.demobot2.command;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;

import com.symphony.bdk.bot.sdk.command.CommandHandler;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

/**
 * Sample code for a CommandHandler that generates instructions on how to receive notifications from
 * external systems.
 */
public class CreateNotificationCommandHandler extends CommandHandler {

  private static final String NOTIFICATION_PATH = "/notification";
  private static final String NOTIFICATION_BASE_URL = "http://localhost:8080";

  @Value("${server.servlet.context-path}")
  private String servletContext;

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@" + getBotName() + " /create notification$")
        .asPredicate();
  }

  /**
   * Invoked when command matches
   */
  @Override
  public void handle(BotCommand command, SymphonyMessage commandResponse) {
    String notificationUrl = NOTIFICATION_BASE_URL + servletContext
    		+ NOTIFICATION_PATH + "/" + command.getMessageEvent().getStreamId();

    Map<String, String> data = new HashMap<>();
    data.put("notification_url", notificationUrl);

    commandResponse.setTemplateFile("create-notification", data);
  }

}

```
{% endtab %}
{% endtabs %}

Here we define a local endpoint for incoming webhooks or notifications:

```java
private static final String NOTIFICATION_BASE_URL = "http://localhost:8080";
```

When this endpoint is hit, the bot is able to process the incoming JSON as apart of this request.  This functionality lives inside the process\(\) function in the SimpleNotificationInterceptor.java file:

{% tabs %}
{% tab title="notification/SimpleNotificationInterceptor.java" %}
```java
public boolean process(NotificationRequest notificationRequest,
      SymphonyMessage notificationMessage) {
    LOGGER.debug("Notification received");

    // For simplicity of this sample code identifier == streamId
    String streamId = notificationRequest.getIdentifier();

    if (streamId != null) {
      notificationRequest.setStreamId(streamId);
      Map<String, String> data = jsonMapper.toObject(notificationRequest.getPayload(), Map.class);
      notificationMessage.setEnrichedMessage(
          "<b>Notification received:</b><br />" + notificationRequest.getPayload(), // Default message when extension app not present
          "com.symphony.ms.notification", // Root node in the payload received in extension app
          data, // payload received in extension app
          "1.0"); // version
      return true; // true if notification interception chain should continue
    }

    return false; // false if notification interception chain should be stopped and notification request rejected
  }
```
{% endtab %}
{% endtabs %}

  In this case, the JSON sent as apart of that notification payload is sent back to the user.  This is where you would add your own custom business logic or notification handler:



## 2.  Run your Bot 



