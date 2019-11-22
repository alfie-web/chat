import api from './api';

const dialogsAPI = {
            getAll: (id) => api.get(`/dialogs?author._id=${id}`),
            createNewDialog: dialog => api.post(`/dialogs`, dialog)
}

export default dialogsAPI;