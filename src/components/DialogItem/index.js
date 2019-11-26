import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import {Time, ReadedIcon, Avatar} from '../';

import './DialogItem.sass';

// 1:41:25
// А вообще last_message нужно сделать в reducer-e
const DialogItem = (props) => {
            const {_id, user, unreaded, isOnline, last_message, onSelect, isActive, isMe} = props;
            // console.log(props);
            return (
                        // <Link to={`/im/dialog/${_id}`}>
                        <Link to={`/dialog/${_id}`}>
                        <div onClick={onSelect.bind(this, _id)} className={classNames('dialogs__item', {'active': isActive})}>
                                    {isOnline && <span className="dialogs__item-online"></span>}
                                    <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="dialogs__item-avatar" />
                                    <div className="dialogs__item-info">
                                                <div className="dialogs__item-info-top">
                                                            <p className="dialogs__item-name">{user.fullname}</p>
                                                            {last_message && last_message.createdAt && <Time date={last_message.createdAt} type="dialog" className="dialogs__item-date" />}
                                                            {/* <Time date={last_message.createdAt} type="dialog" className="dialogs__item-date" /> */}
                                                </div>
                                                <div className="dialogs__item-info-bottom">
                                                            <p className="dialogs__item-message">
                                                                        {last_message && last_message.text ? last_message.text : 'Диалог пуст'}
                                                                        {/* {last_message && last_message.text && last_message.text} */}
                                                            </p>
                                                            
                                                            {/* {user.isMe && */}
                                                            {isMe &&
                                                                        <ReadedIcon isReaded={last_message && last_message.isReaded ? last_message.isReaded : false} /> 
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