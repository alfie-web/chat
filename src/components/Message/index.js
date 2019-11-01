import React from 'react';
import PropsTypes from 'prop-types';
// import classNames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

import './Message.sass';

// 54:41
const Message = ({avatar, user, text, date}) => {
            return (
                        <div className="message">
                                    <div className="message__avatar">
                                                <img src={avatar} alt={`Avatar ${user.fullname}`} />
                                    </div>
                                    <div className="message__content">
                                                <div className="message__bubble">
                                                            <p className="message__text">{text}</p>
                                                </div>
                                                <time className="message__date">{formatDistanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})}</time>
                                    </div>
                        </div>
            );
}


Message.defaultProps = {
            user: {}
};

Message.propTypes = {
            avatar: PropsTypes.string,
            text: PropsTypes.string,
            date: PropsTypes.string,
            user: PropsTypes.object,
};

export default Message;