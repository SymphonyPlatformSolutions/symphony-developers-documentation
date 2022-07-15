---
description: Software Development Kits to bootstrap your Bot
---

# SDKs

{% hint style="danger" %}
Note: Symphony engineering has announced the End of Life (EOL) and support for our Java, Python and Node.js SDKs and Java BDK 1.0 (including CLI Tool & UI Toolkit) from March 2022.  Whilst limited support is still available for the .NET SDK.

\
We recommend you check out the latest version of the  Bot SDK (BDK 2.0) that comes with best practices, intelligent API bindings, and simplified authentication/configuration:

* [BDK 2.0 for Java](bdk-2.0/)
{% endhint %}

## Overview

Symphony SDKs help bootstrap your Bot, providing easy to use authentication handlers, centralized configuration, and convenient error handling. Additionally, our SDKs provide out of the box Datafeed and event handling architecture that make it simple for your Bot to handle different events. Lastly, our SDKs provide language-specific API bindings. Instead of calling the REST endpoint directly, simply call the corresponding SDK functions within your Bot's code.

Symphony provides SDKs in the following languages:

* Java
* Python
* Node.js
* .NET

## Configuration

The SDKs have a common configuration protocol across the 4 languages.  Bot's running on the SDKs expect a standard `config.json` file, in which you specify your development environment, authentication credentials, as well as bot metadata:

{% hint style="info" %}
Note: While RSA is the preferred method of authentication, all SDKs support both certificate-based and RSA authentication.   &#x20;
{% endhint %}

{% tabs %}
{% tab title="Java" %}
```java
{
    // Mandatory section
    "sessionAuthHost": "my-company-name-api.symphony.com",
    "sessionAuthPort": 8444,
    "keyAuthHost": "my-company-name-api.symphony.com",
    "keyAuthPort": 8444,
    "podHost": "my-company-name.symphony.com",
    "podPort": 443,
    "agentHost": "my-company-name.symphony.com",
    "agentPort": 443,
    
    // For bots only
    "botUsername": "my-bot-name",
    "botEmailAddress": "bot@company.com",
    // For bots using RSA authentication
    "botPrivateKeyPath": "/path/to/rsa/private-key/",
    "botPrivateKeyName": "bot-private-key.pem",
    // For bots using certificate authentication
    "botCertPath": "/path/to/bot-cert/",
    "botCertName": "bot-cert.p12",
    "botCertPassword": "bot-cert-password",
    
    // For extension apps only
    "appId": "app-id",
    // For extension apps using RSA authentication
    "appPrivateKeyPath": "/path/to/rsa-private-key/",
    "appPrivateKeyName": "app-private-key.pkcs8",
    // For extension apps using certificate authentication
    "appCertPath": "/path/to/app-cert/",
    "appCertName": "app-cert.p12",
    "appCertPassword": "app-cert-password",
    
    // Optional: If the connection to the pod (but not the agent) needs to run through a proxy
    "podProxyURL": "http://localhost:3128",
    "podProxyUsername": "proxy-username",
    "podProxyPassword": "proxy-password",
    
    // Optional: If the connection to both the pod and the agent needs to run through a proxy
    //           Do not include the podProxy properties if using this
    "proxyURL": "http://localhost:3128",
    "proxyUsername": "proxy-username",
    "proxyPassword": "proxy-password",
    
    // Optional: If the connection to the key manager needs to run through a proxy
    "keyManagerProxyURL": "http://localhost:3128",
    "keyManagerProxyUsername": "proxy-username",
    "keyManagerProxyPassword": "proxy-password",
    
    // Optional: If the SSL connection to any endpoint uses private or self-signed certificates
    "truststorePath": "/path/to/store/truststore.pks",
    "truststorePassword": "changeit",
    
    // Optional: To modify the default datafeed handling properties
    "datafeedEventsThreadpoolSize": 5, // default value: 5
    "datafeedEventsErrorTimeout": 30, // default value: 30
    "reuseDatafeedID": true,
    "datafeedVersion": "v2", // bot will use datafeed version 1 by default
    
    // Optional: Request filter pattern to verify JWT
    "authenticationFilterUrlPattern": "/v1/",
    
    // Optional: If custom URI schemes need to be supported by MessageML parser 
                 By setting this property, the default schemes (http and https) will be overridden
    "supportedUriSchemes": ["http", "https", "customScheme"],
  
    // Optional/experimental: exponential backoff configuration for retries
    "retry": {
        "maxAttempts": 10,
        "initialIntervalMillis": 500,
        "multiplier": 1.5
    },

    // Optional: path of folder where to write and read datafeed.id file
    // defaults to "./" when not set
    "datafeedIdFilePath": "folder/to/datafeed/id/"
}
```
{% endtab %}

{% tab title="Python" %}
```javascript
{
  "sessionAuthHost": "MY_ENVIRONMENT.symphony.com",
  "sessionAuthPort": 443,
  "keyAuthHost": "MY_ENVIRONMENT.symphony.com",
  "keyAuthPort": 443,
  "podHost": "MY_ENVIRONMENT.symphony.com",
  "podPort": 443,
  "agentHost": "MY_ENVIRONMENT.symphony.com",
  "agentPort": 443,

  // For bot RSA authentication
  "botPrivateKeyPath":"./sym_api_client_python/resources/",
  "botPrivateKeyName": "bot_private_key.pem",

  // For bot cert authentication
  "botCertPath": "/path/to/bot-cert/",
  "botCertName": "/bot-cert.p12",
  "botCertPassword": "bot-cert-password",

  "botUsername": "YOUR_BOT_USERNAME",
  "botEmailAddress": "YOUR_BOT_EMAIL_ADDRESS",

  "appCertPath": "",
  "appCertName": "",
  "appCertPassword": "",
  "authTokenRefreshPeriod": "30"

  // Optional: If all the traffic goes through a single proxy, set this parameter. If using multiple proxies or only using a proxy for some of the components, set them below and don't useproxyURL
  "proxyURL": "http://localhost:8888",
  "proxyUsername": "proxy-username",
  "proxyPassword": "proxy-password",

  // Optional: set this if traffic to pod goes through a specific, unique proxy
  "podProxyURL": "http://localhost:8888",
  "podProxyUsername": "proxy-username",
  "podProxyPassword": "proxy-password",

  // Optional: set this if traffic to agent goes through a specific, unique proxy
  "agentProxyURL": "http://localhost:8888",
  "agentProxyUsername": "proxy-username",
  "agentProxyPassword": "proxy-password",

  // Optional: set this if traffic to KeyManager goes through a specific, unique proxy
  "keyManagerProxyURL": "http://localhost:8888",
  "keyManagerProxyUsername": "proxy-username",
  "keyManagerProxyPassword": "proxy-password",


  // Required: If a truststore is required to access on-prem components, provide a path to the python truststore. Needs to be .pem file.  Instructions below for converting JKS to python pem truststore. If truststore is not needed, set value as empty string ("").
  "truststorePath": "/path/to/truststore.pem"
}
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
{
    // Mandatory section
    "sessionAuthHost": "my-company-name-api.symphony.com",
    "sessionAuthPort": 8444,
    "sessionAuthContextPath": "/app",
    "keyAuthHost": "my-company-name-api.symphony.com",
    "keyAuthPort": 8444,
    "keyAuthContextPath": "/app",
    "podHost": "my-company-name.symphony.com",
    "podPort": 443,
    "podContextPath": "/app",
    "agentHost": "my-company-name.symphony.com",
    "agentPort": 443,
    "agentContextPath": "/app",

    // For bots only
    "botUsername": "my-bot-name",
    "botEmailAddress": "bot@company.com",
    // For bots using RSA authentication
    "botPrivateKeyPath": "/path/to/rsa/private-key/",
    "botPrivateKeyName": "bot-private-key.pem",
    // For bots using certificate authentication
    "botCertPath": "/path/to/bot-cert/",
    "botCertName": "bot-cert.p12",
    "botCertPassword": "bot-cert-password",

    // For extension apps only
    "appId": "",
    // For extension apps using RSA authentication
    "appPrivateKeyPath": "",
    "appPrivateKeyName": "",
    // For extension apps using certificate authentication
    "appCertPath": "/path/to/app-cert/",
    "appCertName": "app-cert.p12",
    "appCertPassword": "app-cert-password",

    // Optional: If the connection to the pod (but not the agent) needs to run through a proxy
    "podProxyURL": "http://localhost:3128",
    "podProxyUsername": "proxy-username",
    "podProxyPassword": "proxy-password",

    // Optional: If the connection to both the pod and the agent needs to run through a proxy
    // Do not include the podProxy properties if using this
    "proxyURL": "http://localhost:3128",
    "proxyUsername": "proxy-username",
    "proxyPassword": "proxy-password",

    // Optional: If the connection to the key manager needs to run through a proxy
    "keyManagerProxyURL": "http://localhost:3128",
    "keyManagerProxyUsername": "proxy-username",
    "keyManagerProxyPassword": "proxy-password",

    // Optional: Self Signed Certificates - Set to 0 to not reject invalid or self-signed certificates
    "nodeTlsRejectUnauthorized": 0,

    // Optional: maximum number of retries to reconnect to the agent, default value is 10
    "maxRetries": 10,

    // Optional: maximum waiting time between retries in the exponential backoff algorithm,
    // default is 64 seconds, like in Google Cloud Storage lib
    "maxWaitInterval": 64
}
```
{% endtab %}

{% tab title=".NET" %}
```javascript
{
        "sessionAuthHost": "<podname>.symphony.com",
        "sessionAuthPort": 443,
        "keyAuthHost": "<podname>.symphony.com",
        "keyAuthPort": 443,
        "podHost": "<podname>.symphony.com",
        "podPort": 443,
        "agentHost": "<podname>.symphony.com",
        "agentPort": 443,
        "botCertPath": "",
        "botCertName": "",
        "botCertPassword": "",
        "botPrivateKeyPath": "./rsa/",
        "botPrivateKeyName": "rsa-private-dotnetDemo.pem",
        "botUsername": "dotnetDemo",
        "botEmailAddress": "dotnet@demo.com",
        "appCertPath": "",
        "appCertName": "",
        "appCertPassword": "",
		// Optional, global proxy
        "proxyURL": "",
        "proxyUsername": "",
        "proxyPassword": "",
		// Optional, session host proxy
        "sessionProxyURL": "",
        "sessionProxyUsername":"",
        "sessionProxyPassword": "",
		// Optional, key manager host proxy
        "keyProxyURL": "",
        "keyProxyUsername":"",
        "keyProxyPassword": "",
		// Optional, pod host proxy
        "podProxyURL": "",
        "podProxyUsername":"",
        "podProxyPassword": "",
		// Optional, agent host proxy
        "agentProxyURL": "",
        "agentProxyUsername":"",
        "agentProxyPassword": "",
        "authTokenRefreshPeriod": "30",
        "truststorePath": ""
    }
```
{% endtab %}
{% endtabs %}

## Datafeed&#x20;

Symphony SDKs come bootstrapped with a `DatafeedEventService` class that handles all of the logic for creating/reading datafeeds via the API, has best practices for maintaining datafeeds, and also provides event handling architecture that makes it easy to orchestrate complex workflows and introduce custom business logic to your bot.

As a bot developer all you have to do is to implement event listener interfaces that are provided out-of-the-box by Symphony's SDKs. The `DatafeedEventService` event service does all of the heavy lifting and acts as the backbone of your bot or workflow.

After the `DatafeedEventService` creates/reads from the datafeed API, it categorizes each event based on its event type seen [above](../../building-bots-on-symphony/datafeed/#here-is-the-full-list-of-different-real-time-datafeed-events), and dispatches the event downstream to their appropriate event handler function. For example, If a user sends a message to bot inside a **chatroom**, the event will be read by the datafeed, and dispatched to the `onRoomMessage()` function inside the `RoomListener` Interface.

The following diagram shows the event handling workflow:

![](<../../.gitbook/assets/copy-of-on-prem-bot-auth\_workflow-copy-3 (2) (2) (2).png>)

\
Inside of `onRoomMessage()` is where you implement your own business logic such as accessing a database, connecting to an external API, or reply back to your user by leveraging the Symphony API/SDK methods:

{% tabs %}
{% tab title="Java" %}
```java
import clients.SymBotClient;
import listeners.IMListener;
import model.InboundMessage;
import model.OutboundMessage;
import model.Stream;

public class RoomListenerImpl implements RoomListener {
    public void onRoomMessage(InboundMessage message); {
        OutboundMessage msgOut = new OutboundMessage("Hello " + msg.getUser().getFirstName() + "!");
        this.botClient.getMessagesClient().sendMessage(msg.getStream().getStreamId(), msgOut);
    }
```
{% endtab %}

{% tab title="Python" %}
```python
import logging
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from sym_api_client_python.listeners.room_listener import RoomListener
from sym_api_client_python.processors.sym_message_parser import SymMessageParser


class RoomListenerImpl(RoomListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()

    def on_room_msg(self, room_message):
        logging.debug('Room Message Received')

        first_name = self.message_parser.get_im_first_name(room_message)
        stream_id = self.message_parser.get_stream_id(room_message)

        message = f'<messageML>Hello {first_name}, hope you are doing well!</messageML>'
        self.bot_client.get_message_client().send_msg(stream_id, dict(message=message))
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
  messages.forEach((message, index) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}
```
{% endtab %}

{% tab title=".NET" %}
```csharp
public class MyRoomListener : RoomListener
    {
        private SymConfig symConfig;


        public void init(SymConfig symConfig)
        {
            this.symConfig = symConfig;
        }

        override public void onRoomMessage(Message message)
        {
            string FirstCommand = "";
            string SearchTerm = null;
            string SearchStatus = null;

            if (message.message.Contains("/form"))
            {
                    string fresponse = "";
                    fresponse += "<form id=\"form_id\">";
                    fresponse += "<text-field name=\"Question_Subject\" required=\"true\" placeholder=\"Ask a Question\" />";
                    fresponse += "<textarea name=\"comment\" placeholder=\"Add details (optional)\" required=\"false\"></textarea>";
                    fresponse += "<button type=\"reset\">Reset</button>";
                    fresponse += "<button name=\"submit_button\" type=\"action\">Submit</button>";
                    fresponse += "</form>";
                    sendMessage(message.stream.streamId, fresponse);
            }
        }

        private void sendMessage(String streamId, String messageText)
        {
            Console.WriteLine("streamId:" + streamId);
            OutboundMessage message = new OutboundMessage();
            message.message = "<messageML>"+messageText+"</messageML>";                
            RestRequestHandler restRequestHandler = new RestRequestHandler();
            string url = "https://" + this.symConfig.agentHost + "/agent/v4/stream/" + streamId + "/message/create";
            HttpWebResponse resp = restRequestHandler.executeRequest(message, url, false, WebRequestMethods.Http.Post, symConfig, true);

        }
    }
```
{% endtab %}
{% endtabs %}

## Generating SDK Bot Projects

Generating SDK bot projects is made simple with the Symphony Generator.  This is a command-line utility that generates language specific code scaffolds on top of our SDKs.  To learn more about generating your bot project navigate here:

{% content-ref url="symphony-bot-generator.md" %}
[symphony-bot-generator.md](symphony-bot-generator.md)
{% endcontent-ref %}

For a tutorial on configuring a bot using the Symphony Generator and SDKs, continue here:&#x20;

{% content-ref url="../../building-bots-on-symphony/configuration/configure-your-bot-for-sdks.md" %}
[configure-your-bot-for-sdks.md](../../building-bots-on-symphony/configuration/configure-your-bot-for-sdks.md)
{% endcontent-ref %}

## Tutorials

Check out the following SDK tutorials to learn about how to leverage the SDKs to quickly build powerful workflows and automations:

{% content-ref url="../../building-bots-on-symphony/tutorials/sdk/" %}
[sdk](../../building-bots-on-symphony/tutorials/sdk/)
{% endcontent-ref %}

## Reference

Check out the following Github repositories for direct access and reference to Symphony's dedicated SDKs:

### [Java SDK](https://github.com/SymphonyPlatformSolutions/symphony-api-client-java/tree/master/symphony-bdk-legacy/symphony-api-client-java)

### [Python SDK](https://github.com/SymphonyPlatformSolutions/symphony-api-client-python)&#x20;

### [Node.js SDK](https://github.com/SymphonyPlatformSolutions/symphony-api-client-node)

### [.NET SDK](https://github.com/SymphonyPlatformSolutions/symphony-api-client-dotnet)

