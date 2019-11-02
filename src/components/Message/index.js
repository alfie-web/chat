import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

import './Message.sass';

// 1:43:09
const Message = ({avatar, user, text, date, isMe, isReaded, attachments, isTyping}) => {
            return (
                        <div className={classNames("message", {
                                    "message--isme": isMe, 
                                    "message--readed": isReaded,
                                    "message--typing": isTyping,         // Печатается
                                    "message--image": attachments && attachments.length === 1
                                    })}>

                                    <div className="message__avatar">
                                                <img src={avatar} alt={`Avatar ${user.fullname}`} />
                                    </div>

                                    <div className="message__content">
                                                <div className="message__info">
                                                            {(text || isTyping) && 
                                                                        <div className="message__bubble">
                                                                                    {text && <p className="message__text">{text}</p>}
                                                                                    {isTyping && <span className="message__typing">
                                                                                                <span></span>
                                                                                                <span></span>
                                                                                                <span></span>
                                                                                    </span>}
                                                                        </div>
                                                            }

                                                            {attachments &&
                                                                        <div className="message__attachments">
                                                                                    {attachments.map(({ filename, url }, i) => (
                                                                                                <div className="message__attachments-item" key={i}>
                                                                                                            <img src={url} alt={filename} />
                                                                                                </div>
                                                                                    ))}
                                                                        </div>
                                                            }
                                                </div>

                                                {date && 
                                                            <time className="message__date">
                                                                        {formatDistanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})}
                                                            </time>
                                                }

                                                {isMe &&
                                                            <svg className="message__readed-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 679.83466 399.3085">
                                                                        <g transform="translate(-1.3899672,-0.6093489)">
                                                                        <path d="M 155.33334,397.44424 C 148.73259,394.35361 4.8301454,250.51313 2.7365841,244.9132 0.65551409,239.34668 1.034453,229.69952 3.5417168,224.41585 c 2.6118839,-5.50413 9.7932732,-10.54146 16.8491342,-11.8187 10.799861,-1.95498 11.70259,-1.1971 80.269689,67.38921 l 63.99388,64.0118 170.67279,-170.5696 C 486.48736,22.359816 506.62723,2.6952149 511.48614,1.4267049 529.05704,-3.1605165 544.49354,12.275864 539.90685,29.847213 538.63822,34.70726 517.98228,55.852372 358.90407,215.13653 234.43329,339.76845 177.69685,395.70711 174.00001,397.44059 c -6.74656,3.16352 -11.91588,3.16453 -18.66667,0.004 z m 178.43479,1.09035 c -5.28229,-1.52896 -45.34421,-41.67852 -48.80596,-48.91275 -6.74877,-14.10332 4.65755,-30.95517 20.95225,-30.95517 8.39411,0 12.91283,2.60192 25.1333,14.47194 l 10.38104,10.08335 151.61896,-151.47917 c 83.39043,-83.31354 153.66712,-152.504646 156.1704,-153.758002 9.9503,-4.981965 24.93798,0.0035 30.11664,10.017923 2.42412,4.687732 2.54197,16.848041 0.20409,21.060212 -0.935,1.684606 -74.8608,76.247007 -164.27957,165.694237 -166.87232,166.92544 -165.37067,165.50529 -174.5926,165.11515 -1.46667,-0.062 -4.57102,-0.66403 -6.89855,-1.33772 z" />
                                                                        </g>
                                                            </svg>
                                                }
                                                
                                    </div>
                        </div>
            );
}


Message.defaultProps = {
            user: {},
            isMe: false,
            isReaded: false
};

Message.propTypes = {
            avatar: PropsTypes.string,
            text: PropsTypes.string,
            date: PropsTypes.string,
            user: PropsTypes.object,
            isMe: PropsTypes.bool,
            isReaded: PropsTypes.bool,
            attachments: PropsTypes.array,
            isTyping: PropsTypes.bool
};

export default Message;