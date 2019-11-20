// import React, {useState, useEffect} from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';

import { messagesActions } from './../redux/actions';
import { ChatForm } from '../components';


class ChatFormContainer extends React.Component {
            onEmojiClick = emojiObject => {
                        console.log(emojiObject);
            }

            onFilesUpload = files => {
                        console.log(files);
            }

            onSendTextMessage = value => {
                        const { fetchNewTextMessage, currentDialogId, user } = this.props;
                        // console.log(value);
                        fetchNewTextMessage({ text: value, dialogId: currentDialogId, user });
            }

            // componentDidMount() {

            // }

            render() {
                        return (
                                    <ChatForm 
                                                onEmojiClick={this.onEmojiClick} 
                                                onFilesUpload={this.onFilesUpload}
                                                onSendTextMessage={this.onSendTextMessage}
                                                className="chat__dialog-form" />
                        )
            }
}

const mapStateToProps = (state) => ({
            currentDialogId: state.dialogs.currentDialogId,
            user: state.auth.user,
});

export default compose(
            // withRouter,
            connect(mapStateToProps, messagesActions)
)(ChatFormContainer);
