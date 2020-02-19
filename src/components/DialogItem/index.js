import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import {Time, ReadedIcon, Avatar} from '../';

import './DialogItem.sass';

// 1:41:25
// А вообще last_message нужно сделать в reducer-e
const DialogItem = (props) => {
            const {_id, user, unreaded, lastMessage, onSelect, isActive, isMe} = props;
            // console.log(props);
            return (
                        // <Link to={`/im/dialog/${_id}`}>
                        <Link to={`/dialog/${_id}`}>
                        <div onClick={onSelect.bind(this, _id)} className={classNames('dialogs__item', {'active': isActive})}>
                                    {user.isOnline && <span className="dialogs__item-online"></span>}
                                
                                    <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="dialogs__item-avatar" />
                                  
                                    <div className="dialogs__item-info">
                                                <div className="dialogs__item-info-top">
                                                            <p className="dialogs__item-name">{user.fullname}</p>
                                                            {lastMessage && lastMessage.createdAt && <Time date={lastMessage.createdAt} type="dialog" className="dialogs__item-date" />}
                                                            {/* <Time date={lastMessage.createdAt} type="dialog" className="dialogs__item-date" /> */}
                                                </div>
                                                <div className="dialogs__item-info-bottom">
                                                            <p className="dialogs__item-message">
                                                                        {lastMessage && lastMessage.text && lastMessage.text}
                                                                        {/* {last_message.text} */}
                                                            </p>
                                                            
                                                            {/* {user.isMe && */}
                                                            {isMe &&
                                                                        <ReadedIcon isReaded={lastMessage && lastMessage.unread ? lastMessage.unread : false} /> 
                                                                        // <ReadedIcon isReaded={last_message.isReaded} /> 
                                                            }

                                                            {/* {user.isMe && */}
                                                                        {/* <ReadedIcon isReaded={user.isReaded} /> */}
                                                                        {/* <ReadedIcon isReaded={true} /> */}
                                                            {/* } */}
                                                            {unreaded > 0 && 
                                                                        <span className="dialogs__item-count" title={unreaded}>
                                                                                    {unreaded > 999 ? '999+' : unreaded}
                                                                        </span>
                                                            }
                                                </div>
                                    </div>
                        </div>
                        </Link>
            );
}

export default DialogItem;