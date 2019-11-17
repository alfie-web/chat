import api from './api';

window.api = api;

const authAPI = {
            login: ({ email, password }) => {
                        // console.log(email, password);
                        return api.post('/auth/login', { email, password })
                                    // .then(res => {
                                    //             console.log(res.message);
                                    //             return res;
                                    // })
            },

            fetchUserProfile: (email) => {      // Полный пиздец, но фейковое апи не даёт возможность получить текущего пользователя
                        // console.log(window.access_token);
                        return api.get(`/users?email=${email}`)          
                        // return api.get('/users')          
                        // return api.get('/users', {
                        //             headers: {'Authorization': 'Bearer ' + window.access_token}
                        //             // headers: {'Authorization': '' + window.access_token}
                        // })           


                                    .then(res => res.data)
            }
}

export default authAPI;