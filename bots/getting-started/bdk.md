---
description: >-
  The Bot Developer Kit (BDK) is the preferred tooling for Java or Python
  developers to get started building bots on Symphony
---

# Getting Started with BDK

## Generate your Bot&#x20;

The [Symphony Generator](../../dev-tools/generator.md) offers a fast way to bootstrap your Symphony BDK project in Java and Python.

{% hint style="info" %}
**Prerequisite**: Install NodeJS first, either [directly](https://nodejs.org) or via [nvm](https://github.com/nvm-sh/nvm)
{% endhint %}

First, install yeoman and the Symphony Generator. Then, create a directory for your new bot project. Finally, launch the generator.

```bash
$ npm i -g yo @finos/generator-symphony
$ mkdir my-bot && cd $_
$ yo @finos/symphony
```

This will prompt you with a number of questions about your bot and pod configuration. Type in your bot's information, using arrow keys to scroll and press enter to move on to the next prompt.

When prompted for `Select your type of application`, choose `Bot Application`.

{% tabs %}
{% tab title="Java" %}
```
 __   __     ___                 _
 \ \ / /__  / __|_  _ _ __  _ __| |_  ___ _ _ _  _
  \ V / _ \ \__ \ || | '  \| '_ \ ' \/ _ \ ' \ || |
   |_|\___/ |___/\_, |_|_|_| .__/_||_\___/_||_\_, |
                 |__/      |_|                |__/

Welcome to Symphony Generator v2.7.1
Application files will be generated in folder: /home/user/code/my-bot
______________________________________________________________________________________________________
? Enter your pod host mycompany.symphony.com
? Enter your bot username my-bot
? Select your type of application Bot Application
? Select your programing language Java
? Select your framework Java (no framework)
? Select your build system Maven
? Enter your project groupId com.mycompany
? Enter your project artifactId bot-application
? Enter your base package com.mycompany.bot

Generating RSA keys...
   create rsa/publickey.pem
   create rsa/privatekey.pem
   create src/main/resources/config.yaml
   create src/main/resources/templates/gif.ftl
   create src/main/resources/templates/welcome.ftl
   create src/main/java/com/mycompany/bot/BotApplication.java
   create src/main/java/com/mycompany/bot/GifFormActivity.java
   create mvnw
   create mvnw.cmd
   create .mvn/wrapper/MavenWrapperDownloader.java
   create .mvn/wrapper/maven-wrapper.properties
   create pom.xml
   create .gitignore

[INFO] Scanning for projects...
[INFO]
[INFO] -------------------< com.mycompany:bot-application >--------------------
[INFO] Building bot-application 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ bot-application ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 3 resources
[INFO]
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ bot-application ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 2 source files to /home/ys/code/hello/target/classes
[INFO]
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ bot-application ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/ys/code/hello/src/test/resources
[INFO]
[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ bot-application ---
[INFO] No sources to compile
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ bot-application ---
[INFO] No tests to run.
[INFO]
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ bot-application ---
[INFO] Building jar: /home/ys/code/hello/target/bot-application-0.0.1-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.473 s
[INFO] Finished at: 2023-07-05T15:40:04+08:00
[INFO] ------------------------------------------------------------------------

You can now update the service account my-bot with the following public key:

-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEAvFZi2h0yX7uScduCRD+tCKOJAaMB3bNUyjXv/5f+aCMfzhfx9JpS
...
XCXnaO2GT22pmjjqLLUKzw2hump2fpAka2l8+mc0UzZc658JcROClEMCAwEAAQ==
-----END RSA PUBLIC KEY-----

Please submit these details to your pod administrator.
If you are a pod administrator, visit https://mycompany.symphony.com/admin-console

Your Java project has been successfully generated !
```
{% endtab %}

{% tab title="Python" %}
```
 __   __     ___                 _
 \ \ / /__  / __|_  _ _ __  _ __| |_  ___ _ _ _  _
  \ V / _ \ \__ \ || | '  \| '_ \ ' \/ _ \ ' \ || |
   |_|\___/ |___/\_, |_|_|_| .__/_||_\___/_||_\_, |
                 |__/      |_|                |__/

Welcome to Symphony Generator v2.7.1
Application files will be generated in folder: /home/user/code/my-bot
______________________________________________________________________________________________________
? Enter your pod host mycompany.symphony.com
? Enter your bot username my-bot
? Select your type of application Bot Application
? Select your programing language Python

Generating RSA keys...
   create rsa/publickey.pem
   create rsa/privatekey.pem
   create requirements.txt
   create resources/logging.conf
   create .gitignore
   create readme.md
   create resources/config.yaml
   create resources/gif.jinja2
   create src/__main__.py
   create src/activities.py
   create src/gif_activities.py

No change to package.json was detected. No package manager install will be executed.

You can now update the service account my-bot with the following public key:

-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEA059e0WKgmDVyazFxszs0Xty17iLemhyIrghwfn9XGEwvK40q/dE0
...
ST7yvzUeAy5Xkhad6ySvSviK9dt2Zl+FLVu3uwg1bMfMzXN2T44afp0CAwEAAQ==
-----END RSA PUBLIC KEY-----

Please submit these details to your pod administrator.
If you are a pod administrator, visit https://mycompany.symphony.com/admin-console

Your Python project has been successfully generated !
Install environment: python3 -m venv env
Activate virtual environment: source env/bin/activate
Install all required packages with: pip3 install -r requirements.txt
And run your bot with: python3 -m src
```
{% endtab %}
{% endtabs %}

## Configuration

The Symphony Generator creates a basic configuration file that works for fully cloud-hosted pods. If you have additional network requirements like a web proxy or an on-premise Key Manager and API Agent, refer to the complete configuration guide below for more details.

{% content-ref url="config.md" %}
[config.md](config.md)
{% endcontent-ref %}

## Create Service Account

For any bot to work, it requires a service account with a matching username and public key. The Symphony Generator creates a configuration file based on the answers supplied, including the bot username and the path to the generated key pair. These can be changed by modifying the `config.yaml` file. If you do not already have a service account set up, follow the instructions on this page to continue.

{% content-ref url="creating-a-bot-user.md" %}
[creating-a-bot-user.md](creating-a-bot-user.md)
{% endcontent-ref %}

## Test your Bot

Open the project in your preferred IDE and use the IDE's launch/debug feature to start the bot. Alternatively, continue using the command-line to launch the bot using the appropriate command.

{% tabs %}
{% tab title="Java" %}
```bash
# Maven + No Framework
# Edit package and main class if changed
./mvnw exec:java -Dexec.mainClass=com.mycompany.bot.BotApplication

# Maven + Spring
./mvnw spring-boot:run

# Gradle + No Framework
./gradlew run

# Gradle + Spring
./gradlew bootRun
```
{% endtab %}

{% tab title="Python" %}
```bash
# For the first run, create a virtual environment and install requirements
python3 -m venv env
pip3 install -r requirements.txt

# For subsequent runs, 
source env/bin/activate  # macOS or Linux
env\Scripts\activate.bat # Windows

# Run the bot
python3 -m src
```
{% endtab %}
{% endtabs %}

The bot should start up successfully and the following log indicates that it is up and listening:

{% tabs %}
{% tab title="Java" %}
`[main] INFO com.symphony.bdk.core.service.datafeed.impl.DatafeedLoopV2 - Start reading events from datafeed`
{% endtab %}

{% tab title="Python" %}
`symphony.bdk.core.service.datafeed.datafeed_loop_v2 - DEBUG - Starting datafeed V2 loop`
{% endtab %}
{% endtabs %}

## Build your Bot

Now that you have a basic bot project ready, you can proceed to find out more about building bots using the respective kits:

<table data-card-size="large" data-column-title-hidden data-view="cards"><thead><tr><th></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Bot Developer Kit for Java</strong></td><td></td><td></td><td><a href="../../dev-tools/bdk-java/">bdk-java</a></td></tr><tr><td><strong>Bot Developer Kit for Python</strong></td><td></td><td></td><td><a href="../../dev-tools/bdk-python.md">bdk-python.md</a></td></tr></tbody></table>
