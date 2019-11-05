import React from 'react';
// import classNames from 'classnames';

import Time from '../Time';
import ReadedIcon from '../ReadedIcon';

import './DialogItem.sass';
import Avatar from '../Avatar';

const DialogItem = ({user, unreaded, isOnline, createdAt, text, isReaded}) => {
            return (
                        <div className="dialogs__item">
                                    {isOnline && <span className="dialogs__item-online"></span>}
                                    <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="dialogs__item-avatar" />
                                    <div className="dialogs__item-info">
                                                <div className="dialogs__item-info-top">
                                                            <p className="dialogs__item-name">{user.fullname}</p>
                                                            <Time date={createdAt} type="dialog" className="dialogs__item-date" />
                                                </div>
                                                <div className="dialogs__item-info-bottom">
                                                            <p className="dialogs__item-message">
                                                                        {text}
                                                            </p>
                                                            
                                                            {user.isMe &&
                                                                        <ReadedIcon isReaded={isReaded} /> 
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