
//  В идеале все порефакторить
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messagesActions, dialogsActions } from './../redux/actions';
import filesAPI from '../api/filesService';

import { ChatForm } from '../components';

let mediaRecorder = null;

const mediaAccess = window.navigator.getUserMedia || 
                window.navigator.mozGetUserMedia || 
                window.navigator.msGetUserMedia || 
                window.navigator.webkitGetUserMedia;

class ChatFormContainer extends React.Component {
        state = {
                textValue: '',
                uploadedFiles: [],      // массив превьюшек для antd
                filesIsVisible: false,
                uploadFetching: false,
                isRecording: false,
                isAudio: false
        }

        // toggleIsRecording = val => {
        //         this.setState({
        //                 isRecording: val
        //         })
        // }


        onRecord = () => {
                // if (navigator.getUserMedia) {
                if (mediaAccess) {
                        navigator.getUserMedia(
                                { audio: true }, 
                                this.onRecording, 
                                (err) => console.log('The following error occured: ' + err) 
                        );
                }
        }

        onRecording = stream => { 
                // mediaRecorder = new MediaRecorder(stream, { mimeType : 'audio/webm; codecs=opus' })
                mediaRecorder = new MediaRecorder(stream)
                mediaRecorder.start();

                mediaRecorder.onstart = () => {
                        // this.toggleIsRecording(true);
                        this.setState({
                                isRecording: true,
                                isAudio: true
                        })
                }

                mediaRecorder.onstop = () => {
                        // this.toggleIsRecording(false);
                        this.setState({
                                isRecording: false
                        })
                }

                mediaRecorder.ondataavailable = (e) => {        // e.data - это blob
                        // let audioUrl = window.URL.createObjectURL(e.data);
                        // new Audio(audioUrl).play();
                        
                        // let file = new File([e.data], "audio.ogg", { type: "audio/ogg" });
                        let file = new File([e.data], "audio.webm", { type: "audio/webm" });
                        filesAPI.upload(file)
                                .then(({ data }) => {
                                        // console.log(data)
                                        this.onSendAudio(data.file);
                                })
                }
        }

        onStopRecording = () => {
                mediaRecorder.stop();
        }


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


        


        onSendAudio = (audio) => {
                const { fetchNewTextMessage, currentDialogId } = this.props;

                fetchNewTextMessage({ 
                        text: '', 
                        dialogId: currentDialogId, 
                        attachments: [audio._id]
                })
                
                this.setState({ isAudio: false });
        }


        // TODO: Сделать проверку, на пустое сообщение или аттачмент
        onSendMessage = () => {
                const { fetchNewTextMessage, currentDialogId } = this.props;
                const { textValue } = this.state;

                fetchNewTextMessage({ 
                        text: textValue, 
                        dialogId: currentDialogId, 
                        attachments: this.state.uploadedFiles.map(file => file._id)
                })

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
                                isRecording={this.state.isRecording}
                                onRecord={this.onRecord}
                                onStopRecording={this.onStopRecording}
                                isAudio={this.state.isAudio}
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






























// // import React, {useState, useEffect} from 'react';
// import React from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// // import { withRouter } from 'react-router-dom';

// import { messagesActions, dialogsActions } from './../redux/actions';
// import filesAPI from '../api/filesService';

// import { ChatForm } from '../components';

// let mediaRecorder = null;

// const mediaAccess = window.navigator.getUserMedia || 
//                 window.navigator.mozGetUserMedia || 
//                 window.navigator.msGetUserMedia || 
//                 window.navigator.webkitGetUserMedia;

// class ChatFormContainer extends React.Component {
//         state = {
//                 textValue: '',
//                 uploadedFiles: [],      // массив превьюшек для antd
//                 filesIsVisible: false,
//                 uploadFetching: false,
//                 isRecording: false,
                
//         }

//         toggleIsRecording = val => {
//                 this.setState({
//                         isRecording: val
//                 })
//         }


//         onRecord = () => {
//                 // if (navigator.getUserMedia) {
//                 if (mediaAccess) {
//                         navigator.getUserMedia(
//                                 { audio: true }, 
//                                 this.onRecording, 
//                                 (err) => console.log('The following error occured: ' + err) 
//                         );
//                 }
//         }

//         onRecording = stream => { 
//                 // mediaRecorder = new MediaRecorder(stream, { mimeType : 'audio/webm; codecs=opus' })
//                 mediaRecorder = new MediaRecorder(stream)
//                 mediaRecorder.start();

//                 mediaRecorder.onstart = () => {
//                         this.toggleIsRecording(true);
//                 }

//                 mediaRecorder.onstop = () => {
//                         this.toggleIsRecording(false);
//                 }

//                 mediaRecorder.ondataavailable = (e) => {        // e.data - это blob
//                         // let audioUrl = window.URL.createObjectURL(e.data);
//                         // new Audio(audioUrl).play();
                        
//                         // let file = new File([e.data], "audio.ogg", { type: "audio/ogg" });
//                         let file = new File([e.data], "audio.webm", { type: "audio/webm" });
//                         filesAPI.upload(file)
//                                 .then(({ data }) => {
//                                         // console.log(data)
//                                         this.onSendAudio(data.file);
//                                 })
//                 }
//         }

//         onStopRecording = () => {
//                 mediaRecorder.stop();
//         }


//         onEmojiClick = emojiObject => {
//                 // console.log(emojiObject);
//                 this.setState({ textValue: this.state.textValue.trim() + ' ' + emojiObject.colons.trim() });
//         }




//         onRemoveFile = fileUid => {
//                 this.setState({
//                         uploadedFiles: this.state.uploadedFiles.filter(file => file.uid !== fileUid)
//                 })
//         }


//         onUploadFile = async (file, length) => {

//                 await filesAPI.upload(file)
//                         .then(({ data }) => {
//                                 this.setState({
//                                         uploadedFiles: [
//                                                 ...this.state.uploadedFiles,
//                                                 {       // Превьюшка antd
//                                                         _id: data.file._id,
//                                                         uid: data.file.publicId,
//                                                         name: data.file.fullname,
//                                                         url: data.file.url,
//                                                         status: 'done'
//                                                 }
//                                         ]
//                                 });
//                         })
//                         .then(() => {
//                                 length === this.state.uploadedFiles.length &&
//                                         this.setState({
//                                                 uploadFetching: false
//                                         })
//                                 // this.setState({
//                                 //         uploadFetching: length !== this.state.uploadedFiles.length
//                                 // })
//                         })
//         }

//         onSelectFiles = files => {
//                 this.setState({ filesIsVisible: true, uploadFetching: true });

//                 for (let i = 0; i < files.length; i++) {
//                         const file = files[i];

//                         this.onUploadFile(file, files.length);
//                 }
//         }


        


//         onSendAudio = (audio) => {
//                 const { fetchNewTextMessage, currentDialogId } = this.props;

//                 fetchNewTextMessage({ 
//                         text: '', 
//                         dialogId: currentDialogId, 
//                         attachments: [audio._id]
//                 })
                
//                 // this.setState({ textValue: '', uploadedFiles: [], filesIsVisible: false });
//         }


//         // TODO: Сделать проверку, на пустое сообщение или аттачмент
//         onSendMessage = () => {
//                 const { fetchNewTextMessage, currentDialogId } = this.props;
//                 const { textValue } = this.state;

//                 fetchNewTextMessage({ 
//                         text: textValue, 
//                         dialogId: currentDialogId, 
//                         attachments: this.state.uploadedFiles.map(file => file._id)
//                 })

//                 this.setState({ textValue: '', uploadedFiles: [], filesIsVisible: false });
//         }


//         onChangeText = value => {
//                 this.setState({ textValue: value });
//         }


//         render() {
//                 return (
//                         this.props.currentDialogId ? <ChatForm
//                                 textValue={this.state.textValue}
//                                 onEmojiClick={this.onEmojiClick}
//                                 onSelectFiles={this.onSelectFiles}
//                                 onSendMessage={this.onSendMessage}
//                                 onChangeText={this.onChangeText}
//                                 className="chat__dialog-form"
//                                 filesIsVisible={this.state.filesIsVisible}
//                                 // setFilesIsVisible={this.setFilesIsVisible}
//                                 uploadedFiles={this.state.uploadedFiles}
//                                 uploadFetching={this.state.uploadFetching}
//                                 onRemoveFile={this.onRemoveFile}
//                                 isRecording={this.state.isRecording}
//                                 onRecord={this.onRecord}
//                                 onStopRecording={this.onStopRecording}
//                         // handleFilesIsVisible={this.handleFilesIsVisible}
//                         />
//                                 : null
//                 )
//         }
// }

// const mapStateToProps = (state) => ({
//         currentDialogId: state.dialogs.currentDialogId,
// });

// export default compose(
//         connect(mapStateToProps, { ...messagesActions, ...dialogsActions })
// )(ChatFormContainer);
