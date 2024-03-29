# Getting Started With Interactive Bots

## Build Your First Bot

Symphony provides a number of tools to help streamline bot development:

## Symphony SDKs

Symphony SDKs help bootstrap your bot, providing easy to use authentication handlers, centralized configuration, and convenient error handling. Additionally, our SDKs provide out of the box datafeed and event handling architecture that make it simple for your bot to handle different events including Symphony Elements. Lastly, our SDKs provide language-specific API bindings. Instead of calling the REST endpoint directly, simply call the corresponding SDK functions within your bot's code.

For a deeper dive into Symphony SDKs and their offerings continue here:

{% page-ref page="../../../developer-tools/developer-tools/sdks.md" %}

## Configure your Bot

Symphony provides SDKs in Java, Python, Node.js, and .NET. Whatever your development language of choice, configuring and bootstrapping your bot is the same across all Symphony supported SDKs. Before moving onto the following language specific getting started guides, first configure your bot here:

{% page-ref page="../../configuration/configure-your-bot-for-sdks.md" %}

### Building Your Bot

Get started building your first Interactive Bot using the Python SDK:

{% page-ref page="../../tutorials/sdk/build-an-interactive-bot-using-the-sdk.md" %}

## Bot Developer Kit

The next tool in Symphony's suite of development tools is the BDK, or Bot Developer Kit. The Bot Developer Kit comprises of three development tools for more advanced Symphony Bot and Extension App development.

### Bot SDK

The Bot SDK is a Java specific SDK that provides all the basic support as our other SDKs including authentication handlers, centralized configuration, convenient error handling, Datafeed management, and API bindings. In addition, the Bot SDK provides development best practices for building enterprise grade, financial applications.

Learn more about the Bot SDK here:

{% page-ref page="../../../developer-tools/developer-tools/bdk-2.0/bdk-1.0/bot-sdk.md" %}

### CLI Tool

The CLI tool allows you to generate code scaffolds for Symphony Bots and Applications. Through the command line tool, developers can bootstrap their projects, adds command handlers and message templates, and manage project dependencies.

Learn more about the CLI Tool here:

### UI Toolkit

The UI Toolkit is a library of react components that helps you build complex frontend applications quickly. The library contains layout guides, forms, input fields, complex financial charts, and is already compatible with Symphony's UI theme.

{% hint style="info" %}
Note: In the current version of the BDK, the UI Toolkit is designed to help build Extension Applications only and is not relevant for Bot development.
{% endhint %}

You can learn more about the UI Toolkit here:

{% page-ref page="../../../developer-tools/developer-tools/bdk-2.0/bdk-1.0/ui-toolkit.md" %}

## Configure your Bot for BDK Development

The next step is to build a Bot using the BDK is to configure your bot:

{% page-ref page="../../configuration/configure-your-bot-for-bdk.md" %}

Afterwards, continue building and running your Interactive Bot here:

{% page-ref page="../../tutorials/bdk/building-an-interactive-bot-using-bdk.md" %}

