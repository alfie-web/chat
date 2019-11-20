import React from 'react';
import './Home.sass';

import { Icon } from 'antd';
// import { ChatForm } from '../../components';
import { DialogsContainer as Dialogs, MessagesContainer as Messages, ChatFormContainer, ChatUserStatusContainer } from '../../containers';

import { withAuthRedirect } from '../../components';

const Home = () => {
            return (
                        <section className="home">
                                    <div className="chat">
                                                <div className="chat__sidebar">
                                                            <div className="chat__sidebar-top">
                                                                        <div className="chat__sidebar-header">
                                                                                    <div>
                                                                                                <Icon type="team" />
                                                                                                <span>Список диалогов</span>
                                                                                    </div>
                                                                                    <button className="chat__button"><Icon type="form" /></button>
                                                                        </div>
                                                            </div>

                                                            <Dialogs />

                                                </div>
                                                <div className="chat__dialog">
                                                            <div className="chat__dialog-header-wrap">
                                                                        <div className="chat__dialog-header">
                                                                                    <div className="chat__dialog-header-left"></div>
                                                                                    {/* <div className="chat__dialog-header-center">
                                                                                                <p className="chat__dialog-header-username">Украженко Владислав</p>
                                                                                                <div className="chat__dialog-header-status">
                                                                                                            <div className="status status--online">онлайн</div>
                                                                                                </div>
                                                                                    </div> */}
                                                                                    <ChatUserStatusContainer />
                                                                                    <div className="chat__dialog-header-right">
                                                                                                <button className="chat__button"><Icon type="ellipsis" style={{fontSize: '22px'}} /></button>
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                            
                                                            <Messages />
                                                            {/* <Messages className="chat__dialog-messages" /> */}
                                                            {/* <div className="chat__dialog-messages">
                                                                        <Message 
                                                                                    avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png"
                                                                                    date="Sat Nov 02 2019 01:30:50"
                                                                                    audio="https://notificationsounds.com/soundfiles/3dc4876f3f08201c7c76cb71fa1da439/file-and-a-happy-new-year-sms.mp3"
                                                                        />
                                                                        <Message 
                                                                                    avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                                                    text="Здарова! Как дела в качалке, пацаны?" 
                                                                                    date="Sat Nov 02 2019 01:30:50"
                                                                        />
                                                                        <Message 
                                                                                    avatar="https://scontent-lhr3-1.cdninstagram.com/vp/6e8c82c184aa17728eb34024c1b6c1dd/5E4EEC64/t51.2885-15/e35/12783397_1537853169843880_1838106073_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=104&ig_cache_key=MTIwMjI3ODA2Mjk5NjYxNzMyOA%3D%3D.2" 
                                                                                    text="Hello World!" 
                                                                                    date="Sat Nov 02 2019 13:27:50"
                                                                                    isMe={true}
                                                                                    isReaded={true}
                                                                        />
                                                                        <Message 
                                                                                    avatar="https://scontent-lhr3-1.cdninstagram.com/vp/6e8c82c184aa17728eb34024c1b6c1dd/5E4EEC64/t51.2885-15/e35/12783397_1537853169843880_1838106073_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=104&ig_cache_key=MTIwMjI3ODA2Mjk5NjYxNzMyOA%3D%3D.2" 
                                                                                    text="Хехей, я гусь!!!" 
                                                                                    date="Sat Nov 02 2019 12:35:52"
                                                                                    isMe={true}
                                                                                    isReaded={false}
                                                                        />
                                                                        <Message 
                                                                                    avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                                                    text="Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки. Как правило, ни того, ни другого в момент показа эскизов у дизайнера нету. Что же делает дизайнер? Рыбу." 
                                                                                    date="Sat Nov 02 2019 13:38:52"
                                                                                    attachments={[
                                                                                                {
                                                                                                            filename: 'image',
                                                                                                            url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                                                                },
                                                                                                {
                                                                                                            filename: 'image',
                                                                                                            url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                                                                }
                                                                                    ]}
                                                                        />
                                                                        <Message 
                                                                                    avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                                                    isTyping
                                                                        />
                                                                        <Message 
                                                                                    avatar="http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png" 
                                                                                    attachments={[
                                                                                                {
                                                                                                            filename: 'image',
                                                                                                            url: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png'
                                                                                                }
                                                                                    ]}
                                                                        />
                                                            </div> */}

                                                            <div className="chat__dialog-add">
                                                                        {/* <ChatForm className="chat__dialog-form" /> */}
                                                                        <ChatFormContainer />
                                                            </div>
                                                </div>
                                    </div>
                                    

                                    {/*Моя версия  */}
                                    {/* <Dialogs 
                                                items={[
                                                            {
                                                                        _id: Math.random(),
                                                                        user: {
                                                                                    fullname: "Алфёров Дмитрий",
                                                                                    avatar: null,
                                                                                    isOnline: false
                                                                        },
                                                                        message: {
                                                                                    text: "Здарова! Как дела в качалке, пацаны?",
                                                                                    isReaded: false,
                                                                                    createdAt: "Sat Nov 02 2019 13:27:50"
                                                                        }
                                                            }
                                                ]} 
                                    /> */}

                                    
                        </section>
            );
}

export default withAuthRedirect(Home);