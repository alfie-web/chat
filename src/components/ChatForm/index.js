// import React, { useState } from 'react';
// import PropsTypes from 'prop-types';
// import classNames from 'classnames';
// // import {Button as BaseButton} from 'antd';
// import {Icon, Input} from 'antd';
// import { UploadField } from '@navjobs/upload';
// import { Picker } from 'emoji-mart';
// // import Picker from 'emoji-picker-react';

// import './ChatForm.sass';

// const { TextArea } = Input;


// const ChatForm = ({ className, onEmojiClick, onFilesUpload, onSendTextMessage }) => {
//             const [value, setValue] = useState('');
//             const [emojiPickerIsVisible, setEmojiPicker] = useState(false);

//             const toggleEmojiPickerIsVisible = () => {
//                         setEmojiPicker(!emojiPickerIsVisible);
//             }

//             const onSendTextMessageHandler = () => {
//                         onSendTextMessage(value) 
//                         setValue('');
//             }

//             return (
//                         <div className={classNames("chat__form", className)}>
//                                     <div className="chat__form-item"> {/*  А вообще вынести надо в компонент FormItem все инпуты*/}
//                                                 {emojiPickerIsVisible &&
//                                                             <div className="chat__form-emoji-picker">
//                                                                         <Picker set="apple" showPreview={false} onSelect={onEmojiClick} />
//                                                             </div>

//                                                 }
//                                                 <div onClick={toggleEmojiPickerIsVisible} className="chat__form-action-btn chat__form-smiles-btn">
//                                                             <Icon type="smile" />
//                                                 </div>

//                                                 <TextArea onChange={e => setValue(e.target.value)} value={value} placeholder="Введите текст сообщения..." />

//                                                 <div className="chat__form-actions">
//                                                             <UploadField
//                                                                         onFiles={files => onFilesUpload(files)}
//                                                                         containerProps={{
//                                                                                     className: 'photos'
//                                                                         }}
//                                                                         uploadProps={{
//                                                                                     accept: '.jpg, .png, .jpeg, .gif, .bmp',
//                                                                                     multiple: "multiple"
//                                                                         }}

//                                                             >
//                                                                         <div className="chat__form-action-btn chat__form-camera-btn">
//                                                                                     <Icon type="camera" />
//                                                                         </div>
//                                                             </UploadField>

//                                                             {!value ? <div className="chat__form-action-btn chat__form-audio-btn">
//                                                                         <Icon type="audio" />
//                                                             </div>
//                                                             : <div 
//                                                                         onClick={ onSendTextMessageHandler } 
//                                                                         className="chat__form-action-btn chat__form-send-btn">
//                                                                                     <Icon type="swap-right" />
//                                                             </div>}
//                                                 </div>
//                                     </div>
//                         </div>
//             );
// }

// ChatForm.propTypes = {
//             className: PropsTypes.string
// };

// export default ChatForm;








import React, { useState, useRef, Fragment } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
// import {Button as BaseButton} from 'antd';
import { Icon, Input, Popover } from 'antd';
import { UploadField } from '@navjobs/upload';
import { Picker } from 'emoji-mart';
// import Picker from 'emoji-picker-react';

import { useOutsideClickHandler } from '../../utils';
import { UploadFiles } from '../';

import './ChatForm.sass';

const { TextArea } = Input;


const ChatForm = (
	{
		className,
		onEmojiClick,
		onSelectFiles,
		onSendMessage,
		textValue,
		onChangeText,
		filesIsVisible,
		// setFilesIsVisible,
		uploadedFiles,
		uploadFetching,
		onRemoveFile
		// handleFilesIsVisible
	}) => {
	const [emojiPickerIsVisible, setEmojiPicker] = useState(false);
	const refChatForm = useRef(null);
	const refChatFormIcon = useRef(null);

	const toggleEmojiPickerIsVisible = () => {
		setEmojiPicker(!emojiPickerIsVisible);
	}

	//     Кастомный хук
	useOutsideClickHandler(refChatForm, () => setEmojiPicker(false), refChatFormIcon);


	return (
		<Fragment>
			<div className={classNames("chat__form", className)}>
				<div className="chat__form-item"> {/*  А вообще вынести надо в компонент FormItem все инпуты*/}
					{emojiPickerIsVisible &&
						<div className="chat__form-emoji-picker" ref={refChatForm}>
							<Picker set="apple" showPreview={false} onSelect={onEmojiClick} />
						</div>
					}
					<div ref={refChatFormIcon} onClick={toggleEmojiPickerIsVisible} className="chat__form-action-btn chat__form-smiles-btn">
						<Icon type="smile" />
					</div>

					<TextArea onChange={e => onChangeText(e.target.value)} value={textValue} placeholder="Введите текст сообщения..." />

					<div className="chat__form-actions">

					<Popover
						// content={<a onClick={this.hide}>Close</a>}
						content={
							<Fragment>
								<UploadFiles attachments={uploadedFiles} onRemoveFile={onRemoveFile} />
								{ uploadFetching && <div>Loading...</div> }
							</Fragment>
						}
						title="Прикреплённые файлы"
						trigger="click"
						placement="topRight"
						visible={filesIsVisible}
						// onVisibleChange={setFilesIsVisible}
					>
						{/* <div onClick={() => setFilesIsVisible(!filesIsVisible)} className="chat__form-action-btn chat__form-camera-btn">
							<Icon type="camera" />
						</div> */}
						
						<UploadField
							onFiles={files => onSelectFiles(files)}
							// onRemove={onRemoveFile}
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
					</Popover>
						

						{!textValue ? <div className="chat__form-action-btn chat__form-audio-btn">
							<Icon type="audio" />
						</div>
							: <div
								onClick={onSendMessage}
								className="chat__form-action-btn chat__form-send-btn">
								<Icon type="swap-right" />
							</div>}
					</div>
				</div>
			</div>

			{/* {filesIsVisible,
				handleFilesIsVisible  && <div>asdasdadasd</div>} */}
			
		</Fragment>
	);
}

ChatForm.propTypes = {
	className: PropsTypes.string
};

export default ChatForm;