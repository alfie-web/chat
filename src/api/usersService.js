import api from './api';

const usersAPI = {
            getAllWithoutMe: () => api.get(`/user`),
            getAllFromSearch: text => api.get(`/user/search?search=${text}`),
            getFromId: id => api.get(`/users?_id=${id}`)
}

export default usersAPI;