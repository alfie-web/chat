import React, { Fragment } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';

// import './ChatUserStatus.sass';


const ChatUserStatus = ({ partner }) => {
            // console.log(partner);
            return (

                        <div className="chat__dialog-header-center">
                                    {partner &&
                                    <Fragment>
                                                <p className="chat__dialog-header-username">{ partner.fullname ? partner.fullname : '' }</p>
                                                <div className="chat__dialog-header-status">
                                                            <div className={ classNames('status', { 'status--online': partner.isOnline }) }>онлайн</div>
                                                </div>
                                    </Fragment>
                                    }
                        </div>
            );
}

ChatUserStatus.propTypes = {
            isOnline: PropsTypes.bool,
            fullname: PropsTypes.string,
};

export default ChatUserStatus;