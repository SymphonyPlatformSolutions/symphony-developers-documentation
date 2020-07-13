# core

[Home](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/index.md) &gt; [@sym20/core](core.md)

## core package

## Interfaces

| Interface | Description |
| :--- | :--- |
| [IExtension](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.iextension.md) | This interface should be implemented by an extension |
| [IExtensionInit](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.iextensioninit.md) | Initialization parameters for an extension |
| [IRegistry](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.iregistry.md) | The registry is used to look up other modulesEach public interface has a `TypeTag` that can be used to look up the module in the registry.Example: |

```typescript
import { IConversationStore } from '@sym20/core-conversations';

const conversationStore = await registry.resolve<IConversationStore>(IConversationStore.TypeTag);
```

\| \| [IStore](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.istore.md) \| \| \| [IStoreItem](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.istoreitem.md) \| \| \| [StoreOnAddedEvent](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.storeonaddedevent.md) \| \| \| [StoreOnDeletedEvent](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.storeondeletedevent.md) \| \| \| [StoreOnUpdatedEvent](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.storeonupdatedevent.md) \| \|

## Type Aliases

| Type Alias | Description |
| :--- | :--- |
| [StoreEvent](https://github.com/SymphonyPlatformSolutions/symphony-developers-documentation/tree/cf81036ccc43186133a477206510a495a02aa569/symphony-2.0-beta/releases/releasetest/core.storeevent.md) |  |

