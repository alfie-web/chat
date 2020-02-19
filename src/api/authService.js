import api from './api';

window.api = api;

const authAPI = {
        login: ({ email, password }) => {
                return api.post('/user/login', { email, password })
                // return api.post('/auth/login', { email, password })
        },

        fetchUserProfile: () => {      // Полный пиздец, но фейковое апи не даёт возможность получить текущего пользователя
                return api.get(`/user/me`)
                        .then(res => res.data)
        },

        verifyHash: hash => {
                return api.get(`/user/verify?hash=${hash}`)
                        .then(res => res.data);
        },

        register: ({ email, fullname, password }) => {
                return api.post('/user/registration', { email, fullname, password })
        }
}

export default authAPI;