import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import {Button as BaseButton} from 'antd';

import './Button.sass';

const Button = (props) => {
            return (
                        <BaseButton {...props} className={classNames('button', props.className, {
                                    "button__large": props.size === "large"         // Если у кнопки нету параметра size="large" то класс не применится
                        })} />
            );
}

Button.propTypes = {
            className: PropsTypes.string
};

export default Button;