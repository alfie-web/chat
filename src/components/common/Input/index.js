import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Input as AntdInput } from 'antd';

import './Input.sass';

// Сделать универсальным типо FormField
// А в зависимости от fieldType рендерить тот или иной компонент

const Input = ({meta, input, className, type, placeholder, antdIconType}) => {
            // const hasError = meta.touched || false && meta.error || false;
            const hasError = meta.touched && meta.error;
            const hasSuccess = meta.touched && !meta.error;
            return (
                        <div className={classNames('form__field', className, {
                                    "form__field-error": hasError,
                                    "form__field-success": hasSuccess
                        })}>
                                    <AntdInput
                                                prefix={<Icon type={antdIconType} style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type={type}
                                                placeholder={placeholder} size="large"
                                                {...input}
                                    />
                                    {
                                                // Сюда попадёт текст ошибки из наших валидаторов
                                                hasError ? <span className="form__field-error-message">{meta.error}</span> : ""       
                                    }
                        </div>
            );
}

Input.defaultProps = {
            className: '',
            type: 'text',
            placeholder: '',
            antdIconType: 'user'
};

Input.propTypes = {
            className: PropsTypes.string,
            type: PropsTypes.string,
            placeholder: PropsTypes.string,
            antdIconType: PropsTypes.string
};

export default Input;