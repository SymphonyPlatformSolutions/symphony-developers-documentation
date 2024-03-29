---
description: Building a Headless Bot using the BDK
---

# Build a Headless Bot using the BDK

## Prerequisites

### Complete the BDK Bot Configuration Guide:

{% page-ref page="../../configuration/configure-your-bot-for-bdk.md" %}

## Summary:

In this guide we show you how to use the BDK's built in notification command handler and test it using postman. In addition we will take a look at how the BDK processes incoming notifications and how you can add your custom notification handlers.

## 1.  Dive into the Code

The Bot SDK provides all of the functionality as our regular Symphony SDKs such as easy to use authentication handlers, centralized configuration, convenient error handling, and API bindings so you can call the API directly in your Bot's code. The Bot SDK is also baked in with Bot's best practices and provides a lot of convenient out-of-the-box code including an example notification handler shows you how to handle incoming notifications or webhooks.

Here are the steps taken to define a notification handler as defined in `CreateNotificationCommandHandler.java`:

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

On lines 20-21 we define a local endpoint and path for incoming webhooks or notifications:

```java
private static final String NOTIFICATION_PATH = "/notification";
private static final String NOTIFICATION_BASE_URL = "http://localhost:8080";
```

The full `servletContext` defined on line 24 is configured in our application.yaml:

```java
server:
    port: 8080
    servlet:
        display-name: demobot2
        context-path: /demobot2
```

The full notification URL is defined on line 38:

```java
String notificationUrl = NOTIFICATION_BASE_URL + servletContext + NOTIFICATION_PATH + "/" + command.getMessageEvent().getStreamId();
```

When this endpoint is hit, the headless bot will process the incoming JSON object and post it to the room or streamID defined. In this case the streamID is the IM between you and your bot.

## 2.  Taking a Closer Look

Each time, an incoming notification or webhook is sent to your exposed URL, the request is processed by `NotificationInterceptor.java`. `SimpleNotificationInterceptor.java` is a sample class that demonstrates how to extend this class to process incoming requests:

{% tabs %}
{% tab title="SimpleNotificationInterceptor.java" %}
```java
public class SimpleNotificationInterceptor extends NotificationInterceptor {
  private static final Logger LOGGER = LoggerFactory.getLogger(SimpleNotificationInterceptor.class);

  private JsonMapper jsonMapper;

  public SimpleNotificationInterceptor(JsonMapper jsonMapper) {
    this.jsonMapper = jsonMapper;
  }

  /**
   * Invoked by InterceptorChain on incoming requests
   */
  @Override
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

}
```
{% endtab %}
{% endtabs %}

 Each time, our local endpoint defined in our `application.yaml` is hit, the `process()` function is called. This is where you would implement your bot's custom business logic.

{% hint style="info" %}
Note: For simplicity sake, this implementation sets the incoming URL identifier to streamID. This is is the location that the bot ultimately posts a message into.
{% endhint %}

## 3. Run your Bot

Start up your Spring Application by running your `BotApplication.java` and prompting your bot:

Click on the payload section to expand:

![](../../../.gitbook/assets/screen-shot-2020-07-17-at-12.13.34-pm%20%282%29%20%281%29%20%281%29.png)

## 4.  Testing the Notification Handler

Open up Postman and create a new request with the method, url, headers, and body provided by your Bot:

![](../../../.gitbook/assets/screen-shot-2020-07-17-at-12.18.52-pm%20%282%29%20%282%29%20%282%29%20%282%29.png)

Click 'Send' and navigate back to your Bot's IM. If successful, you should see the following:

![](../../../.gitbook/assets/screen-shot-2020-07-17-at-12.20.54-pm%20%282%29%20%282%29%20%282%29.png)

## Next Steps:

Navigate to our Developer Certification Program for an in depth guide and video tutorials on how to implement your own notification handlers and how to render custom handlers bars templates to nicely display incoming JSON:

