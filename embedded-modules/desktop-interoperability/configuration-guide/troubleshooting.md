# Troubleshooting

Once you have configured Symphony either using the [native connector](configure-interop.io.md) or using [ECP](configure-with-embedded-mode.md), please follow the steps below to ensure that FDC3 is properly enabled.

### **1. Verify that the fdc3 connector is loaded.**

Hover over a cashtag. The **View Instrument** link should appear. If it appears, the connector to the DIP has been successfully loaded.

![When hovering over a cashtag, a View Instrument link should be available.](<../../../.gitbook/assets/image (7).png>)

### **2. Verify that Symphony can send intents to desktop apps.**

Make sure you have a desktop app that supports the _ViewInstrument_ intent first.

**Note:** If you don't have one, you can use the **FDC3 Workbench app**, a developer tool available on [Finos](https://fdc3.finos.org/toolbox/fdc3-workbench/). The FDC3 Workbench allows you to dynamically listen to intents and raise intents very easily.

Then, hover over a cashtag in a chat, and click "ViewInstrument". If an app is listening to ViewInstrument intents, it should receive the cashtag as a fdc3.instrument context.

If this is not the case, please check that the Symphony app directory entry is properly configured.

### **3. Verify that a desktop app can send intents to Symphony.**

To verify that Symphony can receive intents, we will attempt to raise a StartChat intent.

**Note:** If you don't have an app that sends a StartChat intent, you can also user the FDC3 Workbench app to do that very easily.

Send the StartChat intent using a sample context data (fdc3.chat.initSettings), such as the example provided [here](../fdc3-intents/message-format.md).

If Symphony displays a popup, Symphony has correctly received the intent.
