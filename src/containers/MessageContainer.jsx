import React from 'react';
import { connect } from 'react-redux';

import { Message } from '../components';
import { messagesActions } from '../redux/actions';


class MessageContainer extends React.Component {
            state = {
                        actionsVisible: false
            }

            toggleActionsVisible = value => {
		this.setState({ actionsVisible: value });
            }
            
            deleteMessage = id => {
                        // console.log(id);
                        this.props.deleteMessage(id);
            }

            render() {
                        const { actionsVisible } = this.state;

                        return (
                                    <Message {...this.props} 
                                                actionsVisible={actionsVisible} 
                                                toggleActionsVisible={this.toggleActionsVisible} 
                                                deleteMessage={this.deleteMessage} 
                                    />
                        )
            }
}

export default connect(null, messagesActions)(MessageContainer);
