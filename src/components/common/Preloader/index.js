import React from 'react';
import classNames from 'classnames';
import PropsTypes from 'prop-types';
import { Spin } from 'antd';
import './Preloader.sass';

const Preloader = ({className, size}) => {
            return (
                        <div className={classNames('preloader', className)}>
                                    <Spin tip="Загружаем..." size={size}></Spin>
                        </div>
            );
}

Preloader.defaultProps = {
            className: '',
            size: 'default',          //small, large, default
};

Preloader.propTypes = {
            className: PropsTypes.string,
            size: PropsTypes.string
};

export default Preloader;