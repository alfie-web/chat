import React from 'react';
import './Home.sass';
import Message from '../../components/Message';

const Home = () => {
            return (
                        <section className="home">
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