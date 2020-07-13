# DockingMode enum

[Home]() &gt; [@sym20/core-chat](core-chat.md) &gt; [DockingMode](core-chat.dockingmode.md)

## DockingMode enum

Enum that determines how an IOverlayView is displayed within the chat view.

**Signature:**

```typescript
export declare enum DockingMode
```

## Enumeration Members

| Member | Value | Description |
| :--- | :--- | :--- |
| BOTTOM | `"bottom"` | The overlay view is docked to the bottom of the chat view The overlay view will occupy 100% of the width of the chat view. The height will be determined by the content of the overlay view. |
| CENTER | `"center"` | The overlay view is covering the center part of the chat view, that is usually occupied by the chat message list. Any other overlay view which is docking to left, right, top or bottom will still be visible. |
| COVER | `"cover"` | Covers the complete chat view, including any other docked view and the header of the chat view. Floating overlay views are still visible on top of the covering view. |
| FLOAT | `"float"` | The overlay is floating above the chat view, and should be absolutely positioned and sized. |
| FOOTER | `"footer"` | The overlay view is docked to the bottom of the chat, above the chat typing area. The overlay view will occupy 100% of the width of the chat view. The height will be determined by the content of the overlay view. |
| HEADER | `"header"` | The overlay view is docked to the top of the chat, below the chat header. The overlay view will occupy 100% of the width of the chat view. The height will be determined by the content of the overlay view. |
| LEFT | `"left"` | The overlay view is docked to the left side of the chat view The overlay view will occupy 100% of the height of the chat view. The width will be determined by the content of the overlay view. |
| RIGHT | `"right"` | The overlay view is docked to the right side of the chat view The overlay view will occupy 100% of the height of the chat view. The width will be determined by the content of the overlay view. |
| TOP | `"top"` | The overlay view is docked to the top of the chat view. The overlay view will occupy 100% of the width of the chat view. The height will be determined by the content of the overlay view. |

