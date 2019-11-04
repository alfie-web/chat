import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import ruLocale from 'date-fns/locale/ru';

import './Time.sass';

const Time = ({date, type, className}) => {
            return (
                        <time className={classNames('time-item', className)}>
                                    {
                                                type === 'message' 
                                                            ? formatDistanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})
                                                            : type === 'dialog' ? isToday(new Date(date)) 
                                                                        ? format(new Date(date), "HH:mm")   // Если диалог сегодня, то часы и минуты
                                                                        : format(new Date(date), "dd.MM.Y") // Если не сегодня, то дата
                                                            : ''
                                    }
                        </time>
            );
}

Time.defaultProps = {
            className: ''
}

Time.propTypes = {
            date: PropsTypes.string,
            type: PropsTypes.string,
            className: PropsTypes.string
};

export default Time;