import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
// import {Button as BaseButton} from 'antd';
import {Icon, Input} from 'antd';
import { UploadField } from '@navjobs/upload';
import { Picker } from 'emoji-mart';
// import Picker from 'emoji-picker-react';

import './ChatForm.sass';

const { TextArea } = Input;


const ChatForm = ({ className, onEmojiClick, onFilesUpload, onSendTextMessage }) => {
            const [value, setValue] = useState('');
            const [emojiPickerIsVisible, setEmojiPicker] = useState(false);

            const toggleEmojiPickerIsVisible = () => {
                        setEmojiPicker(!emojiPickerIsVisible);
            }

            const onSendTextMessageHandler = () => {
                        onSendTextMessage(value) 
                        setValue('');
            }

            return (
                        <div className={classNames("chat__form", className)}>
                                    <div className="chat__form-item"> {/*  А вообще вынести надо в компонент FormItem все инпуты*/}
                                                {emojiPickerIsVisible &&
                                                            <div className="chat__form-emoji-picker">
                                                                        <Picker set="apple" showPreview={false} onSelect={onEmojiClick} />
                                                            </div>
                                                            
                                                }
                                                <div onClick={toggleEmojiPickerIsVisible} className="chat__form-action-btn chat__form-smiles-btn">
                                                            <Icon type="smile" />
                                                </div>

                                                <TextArea onChange={e => setValue(e.target.value)} value={value} placeholder="Введите текст сообщения..." />
                                                
                                                <div className="chat__form-actions">
                                                            <UploadField
                                                                        onFiles={files => onFilesUpload(files)}
                                                                        containerProps={{
                                                                                    className: 'photos'
                                                                        }}
                                                                        uploadProps={{
                                                                                    accept: '.jpg, .png, .jpeg, .gif, .bmp',
                                                                                    multiple: "multiple"
                                                                        }}
                                                                        
                                                            >
                                                                        <div className="chat__form-action-btn chat__form-camera-btn">
                                                                                    <Icon type="camera" />
                                                                        </div>
                                                            </UploadField>

                                                            {!value ? <div className="chat__form-action-btn chat__form-audio-btn">
                                                                        <Icon type="audio" />
                                                            </div>
                                                            : <div 
                                                                        onClick={ onSendTextMessageHandler } 
                                                                        className="chat__form-action-btn chat__form-send-btn">
                                                                                    <Icon type="swap-right" />
                                                            </div>}
                                                </div>
                                    </div>
                        </div>
            );
}

ChatForm.propTypes = {
            className: PropsTypes.string
};

export default ChatForm;