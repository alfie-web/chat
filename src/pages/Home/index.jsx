import React from 'react';
import './Home.sass';
import Message from '../../components/Message';
import Dialogs from '../../components/Dialogs';

const Home = () => {
            return (
                        <section className="home">
                                    {/* Версия 30:47  */}
                                    <Dialogs 
                                                items={[
                                                            {
                                                                        _id: Math.random(),
                                                                        text: "Здарова! Как дела в качалке, пацаны?",
                                                                        isReaded: false,
                                                                        createdAt: "Sat Nov 02 2019 13:27:50",
                                                                        user: {
                                                                                    _id: 1,
                                                                                    fullname: "Алфёров Дмитрий",
                                                                                    avatar: null,
                                                                                    isOnline: false
                                                                        }
                                                            },
                                                            {
                                                                        _id: Math.random(),
                                                                        text: "Здарова!",
                                                                                    isReaded: false,
                                                                                    createdAt: "Sat Nov 04 2019 00:20:50",
                                                                        user: {
                                                                                    _id: 2,
                                                                                    fullname: "Украженко Владислав",
                                                                                    avatar: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png',
                                                                                    isOnline: true
                                                                        }
                                                            },
                                                            {
                                                                        _id: Math.random(),
                                                                        text: "Здарова!",
                                                                        isReaded: true,
                                                                        createdAt: "Sat Nov 03 2019 00:20:50",
                                                                        user: {
                                                                                    _id: 3,
                                                                                    fullname: "Ринатинка",
                                                                                    avatar: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png',
                                                                                    isOnline: true
                                                                        }
                                                            }
                                                ]} 
                                    />

                                    {/*Моя версия  */}
                                    {/* Пока ничего не менял 30:47 Разработка чата на ReactJS + NodeJS: вёрстка компонентов (голосовое сообщение, стикеры, аватарки) */}
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
                                                            },
                                                            {
                                                                        _id: Math.random(),
                                                                        user: {
                                                                                    fullname: "Украженко Владислав",
                                                                                    avatar: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png',
                                                                                    isOnline: true
                                                                        },
                                                                        message: {
                                                                                    text: "Здарова!",
                                                                                    isReaded: false,
                                                                                    createdAt: "Sat Nov 04 2019 00:20:50"
                                                                        }
                                                            },
                                                            {
                                                                        _id: Math.random(),
                                                                        user: {
                                                                                    fullname: "Ринатинка",
                                                                                    avatar: 'http://i63.beon.ru/63/44/1544463/59/85256659/1834256liara_smirk.png',
                                                                                    isOnline: true
                                                                        },
                                                                        message: {
                                                                                    text: "Здарова!",
                                                                                    isReaded: false,
                                                                                    createdAt: "Sat Nov 03 2019 00:20:50"
                                                                        }
                                                            }
                                                ]} 
                                    /> */}

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
                        </section>
            );
}

export default Home;