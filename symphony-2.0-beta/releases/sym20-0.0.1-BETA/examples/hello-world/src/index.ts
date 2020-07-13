import { IExtension, IExtensionInit, IRegistry } from '@mana/core';
import { IChatService } from '@mana/core-chat';
import { IConversationStore } from '@mana/core-conversations';
import { HelloWorldView } from './HelloWorldView';

export default class Extension implements IExtension {

    private chatService!: IChatService;
    private conversationStore!: IConversationStore;

    public async init(init: IExtensionInit, registry: IRegistry) {
        this.chatService = await registry.resolve(IChatService.TypeTag);
        this.conversationStore = await registry.resolve(IConversationStore.TypeTag);

        this.chatService.registerOverlayViewFactory(async (conversationId) => [new HelloWorldView(
            await this.conversationStore.getConversation(conversationId)),
        ]);
    }
}
