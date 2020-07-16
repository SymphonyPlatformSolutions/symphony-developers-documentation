<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@sym20/core-chat](./core-chat.md) &gt; [IOverlayView](./core-chat.ioverlayview.md) &gt; [subscribe](./core-chat.ioverlayview.subscribe.md)

## IOverlayView.subscribe() method

Subscribe to changes in the view that should cause the container view to render the overlay view again.

The subscription is active until the overlay view is closed.

More specifically, subscribers will be notified when the value of `getDockingMode()` changes.

<b>Signature:</b>

```typescript
subscribe(fn: () => void): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fn | <code>() =&gt; void</code> |  |

<b>Returns:</b>

`void`
