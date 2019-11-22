import api from './api';

const usersAPI = {
            getAll: () => api.get(`/users`),
            getAllFromName: name => api.get(`/users?q=${name}`),
            getFromId: id => api.get(`/users?_id=${id}`)
}

export default usersAPI;