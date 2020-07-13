# core-chat

[Home](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/index.md) &gt; [@sym20/core-chat](core-chat.md)

## core-chat package

## Enumerations

| Enumeration | Description |
| :--- | :--- |
| [DockingMode](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.dockingmode.md) | Enum that determines how an IOverlayView is displayed within the chat view. |

## Interfaces

| Interface | Description |
| :--- | :--- |
| [IChatService](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.ichatservice.md) | Service module for conversations |
| [IOverlayView](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.ioverlayview.md) | View that will be displayed inside a container viewThe view can choose how to be docked to the container view, or to completely cover the container view.See [DockingMode](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.dockingmode.md) for details on how to position a view in different docking modes. |

## Namespaces

| Namespace | Description |
| :--- | :--- |
| [IChatService](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.ichatservice.md) |  |

## Type Aliases

| Type Alias | Description |
| :--- | :--- |
| [OverlayFactory](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/6325d0db44fe3204c03fe1693d263a19356d3e04/symphony-2.0-beta/releases/releasetest/core-chat.overlayfactory.md) | Function to create overlay views for a specific chat view.The function will be invoked whenever a chat view is created, to give the opportunity to add zero or more overlay views to the chat. |

