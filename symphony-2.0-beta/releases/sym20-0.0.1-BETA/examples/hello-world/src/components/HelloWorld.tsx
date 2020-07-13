import { withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import styles from './styles';

import { IConversation } from '@mana/core-conversations';

export interface HelloWorldProps {
    conversation: IConversation;
    onClick(): void;
}

class HelloWorld extends React.Component<WithStyles<typeof styles> & HelloWorldProps> {
    public render() {
        return (
            <div className={this.props.classes.overlay} onClick={this.props.onClick}>
                <div>Hello World!</div>
                <div>Conversation ID: {this.props.conversation.id}</div>
            </div >
        );
    }
}

export default withStyles(styles)(HelloWorld);
