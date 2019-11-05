import React from 'react';
import classNames from 'classnames';

import {avatarGradient} from '../../utils';

import './Avatar.sass';

const CreateGradient = ({alt, userId}) => {
            const {color1, color2} = avatarGradient(userId);
            return (
                        <div className="avatar__gradient" style={{ background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` }}>
                                    <span >{alt.substr(0, 1)}</span>
                        </div>
            );
}

const Avatar = ({url, alt, min, userId, className}) => {
            return (
                        <div className={classNames('avatar', className, {'avatar-min': min})}>
                                    {url 
                                                ? <img src={url} alt={`Avatar: ${alt}`} /> 
                                                : <CreateGradient alt={alt} userId={userId} />
                                    }
                        </div>
            );
}

export default Avatar;