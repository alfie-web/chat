import React from 'react';
import { connect } from 'react-redux';

import { Message } from '../components';
import { messagesActions, dialogsActions } from '../redux/actions';


class MessageContainer extends React.Component {
            state = {
                        actionsVisible: false
            }

            toggleActionsVisible = value => {
		      this.setState({ actionsVisible: value });
            }
            
            // onDeleteMessage = id => {
            //       // const { lastMessage, setLastMessage, currentDialogId } = this.props;
            //       const { deleteMessage } = this.props;
                        
            //       deleteMessage(id)
            //             // .then(() => {
            //             //       setLastMessage(currentDialogId, lastMessage);
            //             // })
            // }

            render() {
                        const { actionsVisible } = this.state;

                        return (
                                    <Message {...this.props} 
                                                actionsVisible={actionsVisible} 
                                                toggleActionsVisible={this.toggleActionsVisible} 
                                                readed={this.props.readed}
                                                // user={this.props.user}
                                                // onDeleteMessage={this.onDeleteMessage} 
                                                onDeleteMessage={this.props.onDeleteMessage} 
                                    />
                        )
            }
}

const mapStateToProps = (state) => ({
      currentDialogId: state.dialogs.currentDialogId,
      // lastMessage: state.messages.items[state.messages.items.length - 2]      // Ибаный лисапет
      // lastMessage: state.messages.items[state.messages.items.length - 1]      // Ибаный лисапет
      // lastMessage: state.messages.lastMessage    
      // items: state.messages.items      // Ибаный лисапет
})

export default connect(mapStateToProps, { ...messagesActions, ...dialogsActions })(MessageContainer);
