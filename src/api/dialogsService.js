import api from './api';

const dialogsAPI = {
            getAll: (id) => api.get(`/dialogs?author._id=${id}`)
}

export default dialogsAPI;