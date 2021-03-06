//  В идеале все порефакторить
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messagesActions, dialogsActions } from './../redux/actions';
import filesAPI from '../api/filesService';
import socket from '../api/socket';

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
                isAudio: false,
                cancelRecord: false
                // isLoading: false
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
                        if(!this.state.cancelRecord) {
                                let file = new File([e.data], "audio.webm", { type: "audio/webm" });
                                filesAPI.upload(file)
                                        .then(({ data }) => {
                                                // console.log(data)
                                                this.onSendAudio(data.file);
                                        })
                        } else {
                                this.setState({
                                        cancelRecord: false
                                })
                        }
                }
        }

        onStopRecording = () => {
                mediaRecorder.stop();
        }

        onCancelRecording = () => {
                mediaRecorder.stop();
                this.setState({
                        cancelRecord: true,
                        isAudio: false
                })
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
                const { fetchNewTextMessage, currentDialogId, user } = this.props;
                const { textValue } = this.state;

                // socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user })

                fetchNewTextMessage({ 
                        text: textValue, 
                        dialogId: currentDialogId, 
                        attachments: this.state.uploadedFiles.map(file => file._id)
                })

                this.setState({ textValue: '', uploadedFiles: [], filesIsVisible: false });
        }


        onChangeText = value => {
                socket.emit('DIALOGS:TYPING', { dialogId: this.props.currentDialogId, user: this.props.user })
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
                                onCancelRecording={this.onCancelRecording}
                                isAudio={this.state.isAudio}
                        // handleFilesIsVisible={this.handleFilesIsVisible}
                        />
                                : null
                )
        }
}

const mapStateToProps = (state) => ({
        currentDialogId: state.dialogs.currentDialogId,
        user: state.auth.user
});

export default compose(
        connect(mapStateToProps, { ...messagesActions, ...dialogsActions })
)(ChatFormContainer);










