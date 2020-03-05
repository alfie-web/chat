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
import filesAPI from '../api/filesService';

import { ChatForm } from '../components';


class ChatFormContainer extends React.Component {
            state = {
                        textValue: '',
                        uploadedFiles: [],      // массив превьюшек для antd
                        filesIsVisible: false,
                        uploadFetching: false,
            }

        // setFilesIsVisible = filesIsVisible => {
        //         this.setState({filesIsVisible});
        // }

    
        onEmojiClick = emojiObject => {
                // console.log(emojiObject);
                this.setState({ textValue: this.state.textValue.trim() + ' ' + emojiObject.colons.trim() });
        }




        onRemoveFile = fileUid => {
                this.setState({
                        uploadedFiles: this.state.uploadedFiles.filter(file => file.uid !== fileUid)
                })
        }


        onUploadFile = async (file, length) => {

                await filesAPI.upload(file)
                        .then(({ data }) => {
                                this.setState({ 
                                        uploadedFiles: [
                                                ...this.state.uploadedFiles,
                                                {       // Превьюшка antd
                                                        _id: data.file._id,
                                                        uid: data.file.publicId,
                                                        name: data.file.fullname,
                                                        url: data.file.url,
                                                        status: 'done'
                                                }
                                        ]
                                });
                        })
                        .then(() => {
                                length === this.state.uploadedFiles.length && 
                                        this.setState({
                                                uploadFetching: false
                                        })
                                // this.setState({
                                //         uploadFetching: length !== this.state.uploadedFiles.length
                                // })
                        })
        }

        onSelectFiles = files => {
                this.setState({ filesIsVisible: true, uploadFetching: true });

                for (let i = 0; i < files.length; i++) {
                        const file = files[i];

                       this.onUploadFile(file, files.length);
                }
        }




        onSendMessage = () => {
                const { fetchNewTextMessage, currentDialogId } = this.props;
                const { textValue } = this.state;
                
                fetchNewTextMessage({ text: textValue, dialogId: currentDialogId, attachments: this.state.uploadedFiles })
                this.setState({ textValue: '', uploadedFiles: [], filesIsVisible: false });
        }


        onChangeText = value => {
                this.setState({ textValue: value });
        }


        render() {
                return (
                        this.props.currentDialogId ? <ChatForm 
                                        textValue={this.state.textValue}
                                        onEmojiClick={this.onEmojiClick} 
                                        onSelectFiles={this.onSelectFiles}
                                        onSendMessage={this.onSendMessage}
                                        onChangeText={this.onChangeText}
                                        className="chat__dialog-form" 
                                        filesIsVisible={this.state.filesIsVisible}
                                        // setFilesIsVisible={this.setFilesIsVisible}
                                        uploadedFiles={this.state.uploadedFiles}
                                        uploadFetching={this.state.uploadFetching}
                                        onRemoveFile={this.onRemoveFile}
                                        // handleFilesIsVisible={this.handleFilesIsVisible}
                                />
                        : null
                )
        }
}

const mapStateToProps = (state) => ({
            currentDialogId: state.dialogs.currentDialogId,
});

export default compose(
            connect(mapStateToProps, { ...messagesActions, ...dialogsActions })
)(ChatFormContainer);
