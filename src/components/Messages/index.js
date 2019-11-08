import React, { Fragment } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import { Empty } from 'antd';

import { Message, Preloader } from '../../components';

import './Messages.sass';
// 1:18:13 / 3:01:25
const Messages = ({isFetching, items, className, refEl}) => {
            return (
                        <div ref={refEl} className={classNames("messages", className)}>
                                    {
                                    isFetching ? <Preloader size="large" />         // Если идёт загрузка
                                    : items ? (             // Если items не null
                                                items.length > 0        // Если массив items не пуст
                                                            ? <Fragment>
                                                                        {items.map(item => (
                                                                                    <Message {...item} key={item._id} />
                                                                        ))}
                                                            </Fragment>
                                                            : <div className="messages__empty"><Empty description="Диалог пуст" /></div>        // Если пуст
                                                ) 
                                    : <div className="messages__empty"><Empty description="Откройте диалог" /></div>    // Если items = null (это по умолчанию)
                                    }


                                                 {/* <Fragment>
                                                             <Message 
                                                //                         avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png"
                                                //                         date="Sat Nov 02 2019 01:30:50"
                                                //                         audio="https://notificationsounds.com/soundfiles/3dc4876f3f08201c7c76cb71fa1da439/file-and-a-happy-new-year-sms.mp3"
                                                //             />
                                                //             <Message 
                                                //                         avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                //                         text="Здарова! Как дела в качалке, пацаны?" 
                                                //                         date="Sat Nov 02 2019 01:30:50"
                                                //             />
                                                //             <Message 
                                                //                         avatar="https://scontent-lhr3-1.cdninstagram.com/vp/6e8c82c184aa17728eb34024c1b6c1dd/5E4EEC64/t51.2885-15/e35/12783397_1537853169843880_1838106073_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=104&ig_cache_key=MTIwMjI3ODA2Mjk5NjYxNzMyOA%3D%3D.2" 
                                                //                         text="Hello World!" 
                                                //                         date="Sat Nov 02 2019 13:27:50"
                                                //                         isMe={true}
                                                //                         isReaded={true}
                                                //             />
                                                //             <Message 
                                                //                         avatar="https://scontent-lhr3-1.cdninstagram.com/vp/6e8c82c184aa17728eb34024c1b6c1dd/5E4EEC64/t51.2885-15/e35/12783397_1537853169843880_1838106073_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=104&ig_cache_key=MTIwMjI3ODA2Mjk5NjYxNzMyOA%3D%3D.2" 
                                                //                         text="Хехей, я гусь!!!" 
                                                //                         date="Sat Nov 02 2019 12:35:52"
                                                //                         isMe={true}
                                                //                         isReaded={false}
                                                //             />
                                                //             <Message 
                                                //                         avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                //                         text="Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки. Как правило, ни того, ни другого в момент показа эскизов у дизайнера нету. Что же делает дизайнер? Рыбу." 
                                                //                         date="Sat Nov 02 2019 13:38:52"
                                                //                         attachments={[
                                                //                                     {
                                                //                                                 filename: 'image',
                                                //                                                 url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                //                                     },
                                                //                                     {
                                                //                                                 filename: 'image',
                                                //                                                 url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                //                                     }
                                                //                         ]}
                                                //             />
                                                //             <Message 
                                                //                         avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                //                         isTyping
                                                //             />
                                                //             <Message 
                                                //                         avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                //                         attachments={[
                                                //                                     {
                                                //                                                 filename: 'image',
                                                //                                                 url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                //                                     }
                                                //                         ]}
                                                //             />
                                                // </Fragment> */}
                                    
                        </div>
            );
}

Messages.propTypes = {
            items: PropsTypes.array,
            className: PropsTypes.string
};

export default Messages;