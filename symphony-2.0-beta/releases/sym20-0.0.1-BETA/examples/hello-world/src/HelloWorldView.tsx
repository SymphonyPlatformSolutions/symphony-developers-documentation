import * as React from 'react';

import { DockingMode, IOverlayView } from '@mana/core-chat';
import { IConversation } from '@mana/core-conversations';
import HelloWorld from './components/HelloWorld';

const DOCKING_MODES = [
    DockingMode.TOP,
    DockingMode.HEADER,
    DockingMode.FOOTER,
    DockingMode.BOTTOM,
    DockingMode.CENTER,
];

export class HelloWorldView implements IOverlayView {
    private _subs: (() => void)[] = [];
    private _idx = 0;

    constructor(
        private conversation: IConversation,
    ) { }

    public render() {
        return <HelloWorld conversation={this.conversation} onClick={this.onClick} />;
    }

    public close() {
        // No cleanup needed
    }

    public getDockingMode() {
        return DOCKING_MODES[this._idx % DOCKING_MODES.length];
    }

    public subscribe(fn: () => void) {
        this._subs.push(fn);
    }

    private onClick = () => {
        this._idx++;
        this._subs.forEach((fn) => fn());
    }
}
