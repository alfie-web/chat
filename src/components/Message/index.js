// import React, { useState, useRef, useEffect } from 'react';
import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import reactStringReplace  from 'react-string-replace';
import { Emoji } from 'emoji-mart';

import { Icon, Popover } from 'antd';
import { Time, ReadedIcon, Avatar } from '../';
import { convertToTime } from '../../utils';

import './Message.sass';


class MessageAudio extends React.Component {
	state = {
		isPlaying: false,
		duration: null,
		currentTime: null,
		progressWidth: null
	};

 
	togglePlay() {
		if (this.state.isPlaying) {
			this.audioElem.pause();
		} else {
			this.audioElem.play();
		}
	}

	componentDidMount() {
		this.audioElem.addEventListener("loadedmetadata", () => {
			this.setState({duration: this.audioElem.duration});
		});
		this.audioElem.addEventListener("playing", () => {
			this.setState({isPlaying: true});
		});
		this.audioElem.addEventListener("pause", () => {
			this.setState({isPlaying: false});
		});
		this.audioElem.addEventListener("timeupdate", () => {
			this.setState({currentTime: this.audioElem.currentTime});
			this.setState({progressWidth: (this.state.currentTime / this.state.duration) * 100});
			// this.setState({progressWidth: ((this.state.currentTime / this.state.duration) * 100) + (this.state.duration * 0.3)}); //  + (this.state.duration * 0.3) - это чтобы с учётом задержки transition нормально растягивался
		});
		this.audioElem.addEventListener("ended", () => {
			this.setState({progressWidth: 0, currentTime: 0});
		});

	}

	render() {
		return (
			<div className="message__audio">	{/* В идеале можно эту часть вынести в небольшой подкомпонент, чтобы не засорять методами жизненного цикла*/}
				<audio src={this.props.audio} ref={ref => (this.audioElem = ref)} preload="auto"></audio>
				<div className="message__audio-progress" style={{width: this.state.progressWidth + '%'}}></div>
				<div className="message__audio-info">
						<div className="message__audio-playBtn">
							<button onClick={this.togglePlay.bind(this)}>
									{this.state.isPlaying 
									? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 357 357">
									<g>
										<path d="M25.5,357h102V0h-102V357z M229.5,0v357h102V0H229.5z"/>
									</g>
									</svg>
									: <svg enableBackground="new 0 0 494.942 494.942" viewBox="0 0 494.942 494.942" xmlns="http://www.w3.org/2000/svg"><path d="m35.353 0 424.236 247.471-424.236 247.471z"/></svg>
									}
							</button>
						</div>
						<div className="message__audio-wave">
							<svg viewBox="0 -47 354.98667 354" xmlns="http://www.w3.org/2000/svg"><path d="m6.828125 102.894531c-3.773437 0-6.828125 3.054688-6.828125 6.824219v34.132812c0 3.773438 3.054688 6.828126 6.828125 6.828126 3.769531 0 6.824219-3.054688 6.824219-6.828126v-34.132812c0-3.769531-3.054688-6.824219-6.824219-6.824219zm0 0"/><path d="m40.984375 74.941406c-3.769531 0-6.828125 3.058594-6.828125 6.828125v94.515625c0 3.773438 3.058594 6.828125 6.828125 6.828125s6.828125-3.054687 6.828125-6.828125v-94.515625c0-3.769531-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m75.09375 27.800781c-3.769531 0-6.828125 3.054688-6.828125 6.824219v191.148438c0 3.769531 3.058594 6.828124 6.828125 6.828124s6.828125-3.058593 6.828125-6.828124v-191.148438c0-3.769531-3.058594-6.824219-6.828125-6.824219zm0 0"/><path d="m109.226562 61.933594c-3.769531 0-6.828124 3.054687-6.828124 6.828125v116.050781c0 3.769531 3.058593 6.828125 6.828124 6.828125 3.769532 0 6.828126-3.058594 6.828126-6.828125v-116.050781c0-3.773438-3.058594-6.828125-6.828126-6.828125zm0 0"/><path d="m212.292969 45.40625c-3.769531 0-6.824219 3.054688-6.824219 6.828125v153.589844c0 3.769531 3.054688 6.824219 6.824219 6.824219s6.828125-3.054688 6.828125-6.824219v-153.589844c0-3.773437-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m279.894531 55.105469c-3.769531 0-6.828125 3.058593-6.828125 6.828125v136.53125c0 3.773437 3.058594 6.828125 6.828125 6.828125s6.824219-3.054688 6.824219-6.828125v-136.53125c0-3.769532-3.054688-6.828125-6.824219-6.828125zm0 0"/><path d="m314.027344 89.238281c-3.769532 0-6.828125 3.058594-6.828125 6.828125v68.265625c0 3.769531 3.058593 6.828125 6.828125 6.828125 3.769531 0 6.824218-3.058594 6.824218-6.828125v-68.265625c0-3.769531-3.054687-6.828125-6.824218-6.828125zm0 0"/><path d="m245.761719.492188c-3.773438 0-6.828125 3.058593-6.828125 6.828124v245.757813c0 3.773437 3.054687 6.828125 6.828125 6.828125 3.769531 0 6.824219-3.054688 6.824219-6.828125v-245.757813c0-3.769531-3.054688-6.828124-6.824219-6.828124zm0 0"/><path d="m143.359375 109.71875c-3.769531 0-6.824219 3.058594-6.824219 6.828125v27.304687c0 3.773438 3.054688 6.828126 6.824219 6.828126s6.828125-3.054688 6.828125-6.828126v-27.304687c0-3.769531-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m348.160156 107.433594c-3.769531 0-6.828125 3.054687-6.828125 6.824218v29.539063c0 3.769531 3.058594 6.828125 6.828125 6.828125 3.769532 0 6.828125-3.058594 6.828125-6.828125v-29.539063c0-3.769531-3.058593-6.824218-6.828125-6.824218zm0 0"/><path d="m176.851562 94.417969c-3.773437 0-6.828124 3.054687-6.828124 6.824219v55.570312c0 3.769531 3.054687 6.828125 6.828124 6.828125 3.769532 0 6.824219-3.058594 6.824219-6.828125v-55.570312c0-3.769532-3.054687-6.824219-6.824219-6.824219zm0 0"/></svg>
						</div>
						<div className="message__audio-duration">{convertToTime(this.state.currentTime)}/{convertToTime(this.state.duration)}</div>
				</div>
			</div>
		);
	}
}

const Message = (
	{ 
		_id,
		messageAuthor, 
		text, 
		createdAt, 
		isMe, 
		readed, 
		attachments, 
		isTyping, 
		audio, 
		actionsVisible,
		toggleActionsVisible,
		onDeleteMessage
	}) => {
	return (
		<div className={classNames("message", {
			"message--isme": isMe,
			"message--audio": audio,
			"message--typing": isTyping,         // Печатается
			"message--image": attachments && attachments.length === 1
			})}>


			<Avatar min url={messageAuthor.avatar} alt={messageAuthor.fullname} userId={messageAuthor._id} className="message__avatar" />

			<div className="message__content">
				<div className="message__info">
					{(text || isTyping || audio) && 
						<div className="message__bubble">
							{/* {text && <p className="message__text">{text}</p>} */}
							{text && <p className="message__text">{
								reactStringReplace(text, /:(.+?):/g, (match, i) => (	// Берёт строку, выбирает из неё подстроки заданные регуляркой и заменяет их компонентой
									<Emoji emoji={match} set='apple' size={22} key={i} />
								))
							}</p>}

							{isTyping && <span className="message__typing">
								<span></span>
								<span></span>
								<span></span>
							</span>}

							{audio && <MessageAudio audio={audio} />}
						</div>
					}

					{attachments &&
						<div className="message__attachments">
								{attachments.map(({ filename, url }, i) => (
									<div className="message__attachments-item" key={i}>
										<img src={url} alt={filename} />
									</div>
								))}
						</div>
					}

					{isMe &&
						<div className="message__actions">
							<div className={ classNames('message__actions-btn', { 'visible': actionsVisible }) }>
							<Popover
								content={
									<button onClick={() => onDeleteMessage(_id)} className="message__actions-action">Удалить сообщение</button>
								}
								// title="Title"
								trigger="click"
								visible={actionsVisible}
								onVisibleChange={toggleActionsVisible}
								>
								<button><Icon type="ellipsis" /></button>
							</Popover>
							</div>
							<ReadedIcon isReaded={readed} className="message__readed-icon" />
						</div>
					}
				</div>

				{createdAt &&
					<Time date={createdAt} className="message__date" type="message" />
				}

				{/* {isMe &&
					<div className="message__actions">
						<div className={ classNames('message__actions-btn', { 'visible': actionsVisible }) }>
						<Popover
							content={
								<button onClick={() => deleteMessage(_id)} className="message__actions-action">Удалить сообщение</button>
							}
							// title="Title"
							trigger="click"
							visible={actionsVisible}
							onVisibleChange={toggleActionsVisible}
							>
							<button><Icon type="ellipsis" /></button>
						</Popover>
						</div>
						<ReadedIcon isReaded={isReaded} className="message__readed-icon" />
					</div>
				} */}
			</div>
		</div>
	);
}











// Рабочая версия
// class Message extends React.Component {
//             state = {
// 			isPlaying: false,
// 			duration: null,
// 			currentTime: null,
// 			progressWidth: null
//             };

// 	togglePlay() {
// 		if (this.state.isPlaying) {
// 			this.audioElem.pause();
// 		} else {
// 			this.audioElem.play();
// 		}
// 	}

//             componentDidMount() {
//                   if (this.audioElem) {
//                         this.audioElem.addEventListener("loadedmetadata", () => {
//                                     this.setState({duration: this.audioElem.duration});
//                                 //     console.log('loaded');
// 			});
// 			this.audioElem.addEventListener("playing", () => {
// 				this.setState({isPlaying: true});
// 				// console.log('playing');
// 			});
// 			this.audioElem.addEventListener("pause", () => {
// 				this.setState({isPlaying: false});
// 				// console.log('pause');
// 			});
// 			this.audioElem.addEventListener("timeupdate", () => {
// 				// console.log('timeupdate');
// 				this.setState({currentTime: this.audioElem.currentTime});
// 				this.setState({progressWidth: (this.state.currentTime / this.state.duration) * 100});
// 				// this.setState({progressWidth: ((this.state.currentTime / this.state.duration) * 100) + (this.state.duration * 0.3)}); //  + (this.state.duration * 0.3) - это чтобы с учётом задержки transition нормально растягивался
// 			});
// 			this.audioElem.addEventListener("ended", () => {
// 				this.setState({progressWidth: 0, currentTime: 0});
// 				// console.log('ended');
// 			});

//                   }
//             }

//             render() {
//                         const {avatar, user, text, date, isMe, isReaded, attachments, isTyping, audio} = this.props;
//                         return (
//                                     <div className={classNames("message", {
//                                                 "message--isme": isMe,
//                                                 "message--audio": audio,
//                                                 "message--typing": isTyping,         // Печатается
//                                                 "message--image": attachments && attachments.length === 1
//                                                 })}>
            
//                                                 <div className="message__avatar">
//                                                             <img src={avatar} alt={`Avatar ${user.fullname}`} />
//                                                 </div>
            
//                                                 <div className="message__content">
//                                                             <div className="message__info">
//                                                                         {(text || isTyping || audio) && 
//                                                                                     <div className="message__bubble">
//                                                                                                 {text && <p className="message__text">{text}</p>}
//                                                                                                 {isTyping && <span className="message__typing">
//                                                                                                             <span></span>
//                                                                                                             <span></span>
//                                                                                                             <span></span>
//                                                                                                 </span>}
//                                                                                                 {audio && 
//                                                                                                 <div className="message__audio">	{/* В идеале можно эту часть вынести в небольшой подкомпонент, чтобы не засорять методами жизненного цикла*/}
//                                                                                                             <audio src={audio} ref={ref => (this.audioElem = ref)} preload="auto"></audio>
//                                                                                                             <div className="message__audio-progress" style={{width: this.state.progressWidth + '%'}}></div>
//                                                                                                             <div className="message__audio-info">
//                                                                                                                         <div className="message__audio-playBtn">
//                                                                                                                                     <button onClick={this.togglePlay.bind(this)}>
//                                                                                                                                                 {this.state.isPlaying 
//                                                                                                                                                 ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 357 357">
//                                                                                                                                                 <g>
//                                                                                                                                                             <path d="M25.5,357h102V0h-102V357z M229.5,0v357h102V0H229.5z"/>
//                                                                                                                                                 </g>
//                                                                                                                                                 </svg>
//                                                                                                                                                 : <svg enableBackground="new 0 0 494.942 494.942" viewBox="0 0 494.942 494.942" xmlns="http://www.w3.org/2000/svg"><path d="m35.353 0 424.236 247.471-424.236 247.471z"/></svg>
//                                                                                                                                                 }
//                                                                                                                                     </button>
//                                                                                                                         </div>
//                                                                                                                         <div className="message__audio-wave">
//                                                                                                                                     <svg viewBox="0 -47 354.98667 354" xmlns="http://www.w3.org/2000/svg"><path d="m6.828125 102.894531c-3.773437 0-6.828125 3.054688-6.828125 6.824219v34.132812c0 3.773438 3.054688 6.828126 6.828125 6.828126 3.769531 0 6.824219-3.054688 6.824219-6.828126v-34.132812c0-3.769531-3.054688-6.824219-6.824219-6.824219zm0 0"/><path d="m40.984375 74.941406c-3.769531 0-6.828125 3.058594-6.828125 6.828125v94.515625c0 3.773438 3.058594 6.828125 6.828125 6.828125s6.828125-3.054687 6.828125-6.828125v-94.515625c0-3.769531-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m75.09375 27.800781c-3.769531 0-6.828125 3.054688-6.828125 6.824219v191.148438c0 3.769531 3.058594 6.828124 6.828125 6.828124s6.828125-3.058593 6.828125-6.828124v-191.148438c0-3.769531-3.058594-6.824219-6.828125-6.824219zm0 0"/><path d="m109.226562 61.933594c-3.769531 0-6.828124 3.054687-6.828124 6.828125v116.050781c0 3.769531 3.058593 6.828125 6.828124 6.828125 3.769532 0 6.828126-3.058594 6.828126-6.828125v-116.050781c0-3.773438-3.058594-6.828125-6.828126-6.828125zm0 0"/><path d="m212.292969 45.40625c-3.769531 0-6.824219 3.054688-6.824219 6.828125v153.589844c0 3.769531 3.054688 6.824219 6.824219 6.824219s6.828125-3.054688 6.828125-6.824219v-153.589844c0-3.773437-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m279.894531 55.105469c-3.769531 0-6.828125 3.058593-6.828125 6.828125v136.53125c0 3.773437 3.058594 6.828125 6.828125 6.828125s6.824219-3.054688 6.824219-6.828125v-136.53125c0-3.769532-3.054688-6.828125-6.824219-6.828125zm0 0"/><path d="m314.027344 89.238281c-3.769532 0-6.828125 3.058594-6.828125 6.828125v68.265625c0 3.769531 3.058593 6.828125 6.828125 6.828125 3.769531 0 6.824218-3.058594 6.824218-6.828125v-68.265625c0-3.769531-3.054687-6.828125-6.824218-6.828125zm0 0"/><path d="m245.761719.492188c-3.773438 0-6.828125 3.058593-6.828125 6.828124v245.757813c0 3.773437 3.054687 6.828125 6.828125 6.828125 3.769531 0 6.824219-3.054688 6.824219-6.828125v-245.757813c0-3.769531-3.054688-6.828124-6.824219-6.828124zm0 0"/><path d="m143.359375 109.71875c-3.769531 0-6.824219 3.058594-6.824219 6.828125v27.304687c0 3.773438 3.054688 6.828126 6.824219 6.828126s6.828125-3.054688 6.828125-6.828126v-27.304687c0-3.769531-3.058594-6.828125-6.828125-6.828125zm0 0"/><path d="m348.160156 107.433594c-3.769531 0-6.828125 3.054687-6.828125 6.824218v29.539063c0 3.769531 3.058594 6.828125 6.828125 6.828125 3.769532 0 6.828125-3.058594 6.828125-6.828125v-29.539063c0-3.769531-3.058593-6.824218-6.828125-6.824218zm0 0"/><path d="m176.851562 94.417969c-3.773437 0-6.828124 3.054687-6.828124 6.824219v55.570312c0 3.769531 3.054687 6.828125 6.828124 6.828125 3.769532 0 6.824219-3.058594 6.824219-6.828125v-55.570312c0-3.769532-3.054687-6.824219-6.824219-6.824219zm0 0"/></svg>
//                                                                                                                         </div>
//                                                                                                                         <div className="message__audio-duration">{convertToTime(this.state.currentTime)}/{convertToTime(this.state.duration)}</div>
//                                                                                                             </div>
//                                                                                                 </div>}
//                                                                                     </div>
//                                                                         }
            
//                                                                         {attachments &&
//                                                                                     <div className="message__attachments">
//                                                                                                 {attachments.map(({ filename, url }, i) => (
//                                                                                                             <div className="message__attachments-item" key={i}>
//                                                                                                                         <img src={url} alt={filename} />
//                                                                                                             </div>
//                                                                                                 ))}
//                                                                                     </div>
//                                                                         }
//                                                             </div>
            
//                                                             {date &&
//                                                                         <Time date={date} className="message__date" type="message" />
//                                                             }
            
//                                                             {isMe &&
//                                                                         <ReadedIcon isReaded={isReaded} className="message__readed-icon" />
//                                                             }
                                                            
//                                                 </div>
//                                     </div>
//                         );
//             }
// }


Message.defaultProps = {
            user: {},
            isMe: false,
            isReaded: false,
            audio: null,
};

Message.propTypes = {
            avatar: PropsTypes.string,
            text: PropsTypes.string,
            date: PropsTypes.string,
            user: PropsTypes.object,
            isMe: PropsTypes.bool,
            isReaded: PropsTypes.bool,
            attachments: PropsTypes.array,
            isTyping: PropsTypes.bool,
            audio: PropsTypes.string
};

export default Message;