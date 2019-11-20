import React from 'react';
import classNames from 'classnames';

import {Time, ReadedIcon, Avatar} from '../';

import './DialogItem.sass';

const DialogItem = ({_id, user, unreaded, isOnline, last_message, onSelect, isActive, isMe}) => {
            console.log(isMe);
            return (
                        <div onClick={onSelect.bind(this, _id)} className={classNames('dialogs__item', {'active': isActive})}>
                                    {isOnline && <span className="dialogs__item-online"></span>}
                                    <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="dialogs__item-avatar" />
                                    <div className="dialogs__item-info">
                                                <div className="dialogs__item-info-top">
                                                            <p className="dialogs__item-name">{user.fullname}</p>
                                                            <Time date={last_message.createdAt} type="dialog" className="dialogs__item-date" />
                                                </div>
                                                <div className="dialogs__item-info-bottom">
                                                            <p className="dialogs__item-message">
                                                                        {last_message.text}
                                                            </p>
                                                            
                                                            {/* {user.isMe && */}
                                                            {isMe &&
                                                                        <ReadedIcon isReaded={last_message.isReaded} /> 
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
            );
}

export default DialogItem;