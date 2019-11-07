import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
// import {Button as BaseButton} from 'antd';
import {Icon, Input} from 'antd';

import './ChatForm.sass';

const { TextArea } = Input;

const ChatForm = ({className}) => {
            const [value, setValue] = useState('');

            return (
                        <div className={classNames("chat__form", className)}>
                                    <div className="chat__form-item"> {/*  А вообще вынести надо в компонент FormItem все инпуты*/}
                                                {/* <Input placeholder="Введите текст сообщения..." /> */}
                                                <div className="chat__form-action-btn chat__form-smiles-btn">
                                                            <Icon type="smile" />
                                                </div>
                                                <TextArea onChange={e => setValue(e.target.value)} value={value} placeholder="Введите текст сообщения..." />
                                                <div className="chat__form-actions">
                                                            <div className="chat__form-action-btn chat__form-camera-btn">
                                                                        <Icon type="camera" />
                                                            </div>
                                                            {!value ? <div className="chat__form-action-btn chat__form-audio-btn">
                                                                        <Icon type="audio" />
                                                            </div>
                                                            : <div className="chat__form-action-btn chat__form-send-btn">
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