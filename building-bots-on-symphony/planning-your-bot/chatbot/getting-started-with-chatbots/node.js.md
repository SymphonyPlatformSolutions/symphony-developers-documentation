---
description: Building a Chatbot using Symphony Generator + Node.js SDK
---

# Build a Chatbot using the Node.js SDK

## Prerequisites

### Complete the Bot Configuration guide:

{% page-ref page="../../../configuration/configure-your-bot-for-sdks.md" %}

## 1.  Install Dependencies

Navigate to your project folder:

```text
$ cd demoBot1
```

You can view the package dependencies in the package.json file:

```text
$ more package.json

{
  "name": "demo-bot1",
  "version": "1.0.1",
  "description": "Sample Symphony Bot",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "symphony-api-client-node": "^1.0.11"
  }
}
```

Install the SDK and its child package dependencies:

```aspnet
$ npm install

added 31 packages from 30 contributors in 3.258s
```

## 2. Dive into the code

Let's take a look at the bots application logic inside the demoBot1/index.js file:

Running this file accomplishes four things:

* Configures your Bot \(below line 11\)
* Authenticates your Bot \(below line 12\)
* Starts up the Bot's datafeed event service \(below line 13\)
* Adds custom event listeners/handlers to the Bot's datafeed event service \(below line 4\)

{% tabs %}
{% tab title="demoBot1/index.js" %}
```javascript
const Symphony = require('symphony-api-client-node')
Symphony.setDebugMode(true)

const botHearsSomething = (event, messages) => {
  messages.forEach((message, index) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}

Symphony.initBot(__dirname + '/config.json')
  .then((symAuth) => {
    Symphony.getDatafeedEventsService(botHearsSomething)
  })
```
{% endtab %}
{% endtabs %}

As shown on lines 4-9 above, any event that occurs inside an IM or chatroom with the Bot will be passed as JSON objects.

Any events that happen within your Bot's scope will be read and captured by the Bot's datafeed. Any events that happen inside of an IM with the Bot will be parsed. Depending on the type of event or message the bot will reply back accordingly.

In this generated example, when an IM is sent to your Bot, it will be captured and as a result the bot will reply back with the message that is constructed on line 6 and reply back to the user using the sendMessage call on line 7.

The sendMessage reply to the user is calling the following function which corresponds to the 'Create Message' endpoint on the Symphony REST API: [https://developers.symphony.com/restapi/reference\#create-message-v4](https://developers.symphony.com/restapi/reference#create-message-v4)

{% tabs %}
{% tab title="demoBot1/index.js" %}
```javascript
Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
```
{% endtab %}
{% endtabs %}

## 5.  Run your Bot

Now that you have a firm grasp on the datafeed event handling process implemented by the Bot and Symphony SDK, lets start up our bot to see it in action:

\(vinay continue here\)

