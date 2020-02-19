import * as axios from 'axios';

const instance =  axios.create({
            baseURL: 'http://localhost:5555',
        //     baseURL: 'http://127.0.0.1:3003',

        // "proxy": "http://localhost:5555",    - нужно добавить в package.json
        //     baseURL: window.location.origin,    //Текущий url но так как в package.json прописали proxy, то запрос будет проксироваться на тот url
            withCredentials: true,
            // headers: {'Authorization': 'Bearer ' + window.access_token || ''}             //window.access_token - сюда я записываю токен
            // headers: {'Authorization': window.access_token || ''}             //window.access_token - сюда я записываю токен
});

// instance.defaults.headers.common['Authorization'] = window.localStorage['token'] || '';
instance.defaults.headers.common['token'] = window.localStorage['token'] || '';
window.axios = instance;

export default instance;