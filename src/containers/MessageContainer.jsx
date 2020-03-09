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
            

            render() {
                        const { actionsVisible } = this.state;

                        return (
                                    <Message {...this.props} 
                                                actionsVisible={actionsVisible} 
                                                toggleActionsVisible={this.toggleActionsVisible} 
                                    />
                        )
            }
}

const mapStateToProps = (state) => ({
      currentDialogId: state.dialogs.currentDialogId,
})

export default connect(mapStateToProps, { ...messagesActions, ...dialogsActions })(MessageContainer);
