import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';

import Time from '../Time';
import ReadedIcon from '../ReadedIcon';

import './Message.sass';


const Message = ({avatar, user, text, date, isMe, isReaded, attachments, isTyping}) => {
            return (
                        <div className={classNames("message", {
                                    "message--isme": isMe, 
                                    // "message--readed": isReaded,
                                    "message--typing": isTyping,         // Печатается
                                    "message--image": attachments && attachments.length === 1
                                    })}>

                                    <div className="message__avatar">
                                                <img src={avatar} alt={`Avatar ${user.fullname}`} />
                                    </div>

                                    <div className="message__content">
                                                <div className="message__info">
                                                            {(text || isTyping) && 
                                                                        <div className="message__bubble">
                                                                                    {text && <p className="message__text">{text}</p>}
                                                                                    {isTyping && <span className="message__typing">
                                                                                                <span></span>
                                                                                                <span></span>
                                                                                                <span></span>
                                                                                    </span>}
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
                                                </div>

                                                {date &&
                                                            <Time date={date} className="message__date" type="message" />
                                                }

                                                {isMe &&
                                                            <ReadedIcon isReaded={isReaded} className="message__readed-icon" />
                                                }
                                                
                                    </div>
                        </div>
            );
}


Message.defaultProps = {
            user: {},
            isMe: false,
            isReaded: false
};

Message.propTypes = {
            avatar: PropsTypes.string,
            text: PropsTypes.string,
            date: PropsTypes.string,
            user: PropsTypes.object,
            isMe: PropsTypes.bool,
            isReaded: PropsTypes.bool,
            attachments: PropsTypes.array,
            isTyping: PropsTypes.bool
};

export default Message;