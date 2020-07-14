---
description: Building a Chatbot using Symphony Generator + Python SDK
---

# Build a Chatbot using the Python SDK

## Prerequisites

### Complete the Bot Configuration guide:

{% page-ref page="../../../configuration/configure-your-bot.md" %}

## 1. Install Dependencies

First setup a Python virtual environment:

```aspnet
demoBot1 $ python3 -m venv demoEnv
demoBot1 $ source demoEnv/bin/activate
```

Install SDK and its child dependencies:

```aspnet
(demoEnv) demoBot1 $ pip install -r requirements.txt
```

## 4.  Dive into the code

Let's take a look at the main\(\) function inside or python/main.py file:

Running this file accomplishes four things:

* Configures your Bot
* Authenticates your Bot
* Starts up the Bot's datafeed event service
* Adds custom event listeners/handlers to the Bot's datafeed event service

{% tabs %}
{% tab title="python/main.py" %}
```python
import os
import sys
import asyncio
import logging
from pathlib import Path
from sym_api_client_python.configure.configure import SymConfig
from sym_api_client_python.auth.auth import Auth
from sym_api_client_python.auth.rsa_auth import SymBotRSAAuth
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from listeners.im_listener_impl import IMListenerImpl
from listeners.room_listener_impl import RoomListenerImpl
from listeners.elements_listener_impl import ElementsListenerImpl


def configure_logging():
    log_dir = os.path.join(os.path.dirname(__file__), "logs")
    if not os.path.exists(log_dir):
        os.makedirs(log_dir, exist_ok=True)
    logging.basicConfig(
        filename=os.path.join(log_dir, 'bot.log'),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        filemode='w', level=logging.DEBUG
    )
    logging.getLogger("urllib3").setLevel(logging.WARNING)

def main():
    # Configure log
    configure_logging()

    # Load configuration
    configure = SymConfig('../resources/config.json')
    configure.load_config()

    # Authenticate based on authType in config
    if ('authType' not in configure.data or configure.data['authType'] == 'rsa'):
        print('Python Client runs using RSA authentication')
        auth = SymBotRSAAuth(configure)
    else:
        print('Python Client runs using certificate authentication')
        auth = Auth(configure)
    auth.authenticate()

    # Initialize SymBotClient with auth and configure objects
    bot_client = SymBotClient(auth, configure)

    # Initialize datafeed service
    datafeed_event_service = bot_client.get_async_datafeed_event_service()

    # Initialize listener objects and append them to datafeed_event_service
    # Datafeed_event_service polls the datafeed and the event listeners
    # respond to the respective types of events
    datafeed_event_service.add_im_listener(IMListenerImpl(bot_client))
    datafeed_event_service.add_room_listener(RoomListenerImpl(bot_client))

    # Create and read the datafeed
    print('Starting datafeed')
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(datafeed_event_service.start_datafeed())
    except (KeyboardInterrupt, SystemExit):
        None
    except:
        raise


if __name__ == "__main__":
    main()
```
{% endtab %}
{% endtabs %}

As shown on lines 52-53, any event that occurs inside an IM or chatroom with the Bot will be passed as JSON objects to the event listeners. The generated IMListenerImpl class is as follows:

{% tabs %}
{% tab title="python/listeners/im\_listener\_impl.py" %}
```python
import logging
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from sym_api_client_python.listeners.im_listener import IMListener
from sym_api_client_python.processors.sym_message_parser import SymMessageParser


class IMListenerImpl(IMListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()

    async def on_im_message(self, im_message):
        logging.debug('IM Message Received')

        msg_text = self.message_parser.get_text(im_message)
        first_name = self.message_parser.get_im_first_name(im_message)
        stream_id = self.message_parser.get_stream_id(im_message)

        message = f'<messageML>Hello {first_name}, hope you are doing well!</messageML>'
        self.bot_client.get_message_client().send_msg(stream_id, dict(message=message))

    async def on_im_created(self, im_created):
        logging.debug('IM created', im_created)
```
{% endtab %}
{% endtabs %}

Any events that happen within your Bot's scope will be read and captured by the Bot's datafeed. Any events that happen inside of an IM with the Bot will be parsed and directed to its IM Listener. Depending on the type of event, the corresponding IM Listener function will be called. So if for example, you send a message to your Bot 1-1, that event will be captured and as a result the on\_im\_message\(\) will be executed.

In this generated example, when an IM is sent to your Bot, it will capture the event, and reply to the user by calling the following function which corresponds to the 'Create Message' endpoint on the Symphony REST API: [https://developers.symphony.com/restapi/reference\#create-message-v4](https://developers.symphony.com/restapi/reference#create-message-v4)

{% tabs %}
{% tab title="python/listeners/im\_listener\_impl.py" %}
```python
self.bot_client.get_message_client().send_msg()
```
{% endtab %}
{% endtabs %}

## 5.  Run your Bot

Now that you have a firm grasp on the datafeed event handling process implemented by the Bot and Symphony SDK, lets start up our bot to see it in action:

```aspnet
(demoEnv) demoBot1 $ python3 main.py
```

Navigate to Symphony and create an IM with your Bot:

![](../../../../.gitbook/assets/screen-shot-2020-07-10-at-1.01.53-pm%20%281%29.png)

As you can see, your Bot replied with the message shown in the IM Listener class.

## 6.  Implementing your own Functionality

Lets create help menu as a best practice shown in step 1 of the chatbot workflow: [Chatbot](../#1-kick-off-your-workflow)

First create a a processors folder inside your listeners folder and add the following to a new file called im\_processor.py:

{% tabs %}
{% tab title="python/listeners/processors/im\_processor.py" %}
```python
from sym_api_client_python.processors.message_formatter import MessageFormatter
from sym_api_client_python.processors.sym_message_parser import SymMessageParser

class IMProcessor:
    def __init__(self, bot_client):
        self.bot_client = bot_client
        self.message_formatter = MessageFormatter()
        self.sym_message_parser = SymMessageParser()
        #enter your bot's ID here:
        self.bot_id = "349026222350822"

    async def process(self, msg):
        msg_text = self.sym_message_parser.get_text(msg)
        mentions = self.sym_message_parser.get_mention_ids(msg)

        self.default_message = dict(message= """<messageML> Sorry, I didn't quite catch that. </messageML>""")
        self.help_message = dict(message= """<messageML>
                                        <h3>Hi! Use Demo Bot to assist with all your onboarding needs! You can try:</h3>
                                            <ul>
                                                <li><mention uid="{0}"/> /help</li>
                                                <li><mention uid="{0}"/> /onboard</li>
                                                <li><mention uid="{0}"/>/documentation</li>
                                                <li><mention uid="{0}"/> /clear</li>
                                                <li><mention uid="{0}"/> /finish</li>
                                            </ul>
                                </messageML>""".format(self.bot_id))
        if mentions and mentions[0] == self.bot_id:
            if msg_text[1] == "/help":
                await self.bot_client.get_message_client().send_msg_async(msg['stream']['streamId'], self.help_message)
            else:
                await self.bot_client.get_message_client().send_msg_async(msg['stream']['streamId'], self.default_message)

        else:
            await self.bot_client.get_message_client().send_msg_async(msg['stream']['streamId'], self.default_message)
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Check out our [Overview of MessageML](../../../messages/overview-of-messageml.md) guide for more information on message formatting and styling.
{% endhint %}

On line 10, you'll need to replace self.bot\_id with your Bot's User ID which can be found in the admin portal:

![](../../../../.gitbook/assets/screen-shot-2020-07-13-at-10.15.25-pm.png)

Import the IMProcessor class into your IMListener and add the process\(\) function to your on\_im\_message\(\) function:

{% tabs %}
{% tab title="python/listeners/im\_listener\_impl.py" %}
```python
import logging
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from sym_api_client_python.listeners.im_listener import IMListener
from sym_api_client_python.processors.sym_message_parser import SymMessageParser
from .processors.im_processor import IMProcessor

class IMListenerImpl(IMListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()
        self.im_processor = IMProcessor(self.bot_client)

    async def on_im_message(self, im_message):
        logging.debug('IM Message Received')

        msg_text = self.message_parser.get_text(im_message)
        first_name = self.message_parser.get_im_first_name(im_message)
        stream_id = self.message_parser.get_stream_id(im_message)

        await self.im_processor.process(im_message)

    async def on_im_created(self, im_created):
        logging.debug('IM created', im_created)
```
{% endtab %}
{% endtabs %}

Next, start up your bot by running **python3 main.py** and test in a 1-1 IM:

![](../../../../.gitbook/assets/screen-shot-2020-07-10-at-2.16.34-pm.png)

**For an in depth video tutorial visit our "Developing Bots & Apps" course as apart of our Developer Certification program:**

