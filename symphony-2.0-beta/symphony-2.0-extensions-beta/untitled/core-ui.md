# core-ui

[Home](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/index.md) &gt; [@sym20/core-ui](core-ui.md)

## core-ui package

## Interfaces

| Interface | Description |
| :--- | :--- |
| [IService](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-ui.iservice.md) | A service is a module that encapsulates common functionality in some areaA service is part of the UI layer, but will service all applications using the features that the service provides.This is the base class for all services. |
| [IView](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core-ui.iview.md) | A view is the base class for any visual UI component.View components are implemented using React components, and the render\(\) method should return a React element.Example: |

```typescript
class MyView implements IView {
  render() {
    return <MyComponent />;
  }
}
```

\|

