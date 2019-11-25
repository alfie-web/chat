// // import React, {useState, useEffect} from 'react';
// import React from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// // import { withRouter } from 'react-router-dom';

// import { messagesActions, dialogsActions } from './../redux/actions';
// import { ChatForm } from '../components';


// class ChatFormContainer extends React.Component {
//             onEmojiClick = emojiObject => {
//                         console.log(emojiObject);
//             }

//             onFilesUpload = files => {
//                         console.log(files);
//             }

//             onSendTextMessage = value => {
//                         const { fetchNewTextMessage, currentDialogId, user } = this.props;
                        
//                         fetchNewTextMessage({ text: value, dialogId: currentDialogId, user })
//             }


//             render() {
//                         return (
//                                     <ChatForm 
//                                                 onEmojiClick={this.onEmojiClick} 
//                                                 onFilesUpload={this.onFilesUpload}
//                                                 onSendTextMessage={this.onSendTextMessage}
//                                                 className="chat__dialog-form" />
//                         )
//             }
// }

// const mapStateToProps = (state) => ({
//             currentDialogId: state.dialogs.currentDialogId,
//             user: state.auth.user,
// });

// export default compose(
//             // withRouter,
//             // connect(mapStateToProps, messagesActions)
//             connect(mapStateToProps, { ...messagesActions, ...dialogsActions })
// )(ChatFormContainer);




// import React, {useState, useEffect} from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';

import { messagesActions, dialogsActions } from './../redux/actions';
import { ChatForm } from '../components';


class ChatFormContainer extends React.Component {
            state = {
                        textValue: ''
            }

    
            onEmojiClick = emojiObject => {
                        // console.log(emojiObject);
                        this.setState({ textValue: this.state.textValue.trim() + ' ' + emojiObject.colons.trim() });
            }

            onFilesUpload = files => {
                        console.log(files);
            }

            onSendTextMessage = () => {
                        const { fetchNewTextMessage, currentDialogId, user } = this.props;
                        const { textValue } = this.state;
                        
                        fetchNewTextMessage({ text: textValue, dialogId: currentDialogId, user })
                        this.setState({ textValue: '' });
            }

            // onSendTextMessage = value => {
            //             const { fetchNewTextMessage, currentDialogId, user } = this.props;
                        
            //             fetchNewTextMessage({ text: value, dialogId: currentDialogId, user })
            //             // this.setState({ textValue: '' });
            // }

            onChangeText = value => {
                        this.setState({ textValue: value });
            }


            render() {
                        return (
                                    <ChatForm 
                                                textValue={this.state.textValue}
                                                onEmojiClick={this.onEmojiClick} 
                                                onFilesUpload={this.onFilesUpload}
                                                onSendTextMessage={this.onSendTextMessage}
                                                onChangeText={this.onChangeText}
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
            // connect(mapStateToProps, messagesActions)
            connect(mapStateToProps, { ...messagesActions, ...dialogsActions })
)(ChatFormContainer);
