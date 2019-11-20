import api from './api';

window.api = api;

const authAPI = {
            login: ({ email, password }) => {
                        return api.post('/auth/login', { email, password })
                        // return api.post('/login', { email, password })
            },

            fetchUserProfile: (email) => {      // Полный пиздец, но фейковое апи не даёт возможность получить текущего пользователя
                        return api.get(`/users?email=${email}`)       
                                    .then(res => res.data)
            }
}

export default authAPI;