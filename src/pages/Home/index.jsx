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
                        </section>
            );
}

export default Home;