import * as axios from 'axios';

const instance =  axios.create({
            baseURL: 'http://127.0.0.1:3003',
            withCredentials: true,
            // headers: {'Authorization': 'Bearer ' + window.access_token || ''}             //window.access_token - сюда я записываю токен
            // headers: {'Authorization': window.access_token || ''}             //window.access_token - сюда я записываю токен
});

// instance.defaults.headers.common['Authorization'] = window.access_token || '';

instance.defaults.headers.common['Authorization'] = window.localStorage['token'] || '';


window.axios = instance;

export default instance;