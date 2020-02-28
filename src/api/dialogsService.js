import api from './api';

const dialogsAPI = {
        //     getAll: (id) => api.get(`/dialogs?author._id=${id}`),
            getAll: () => api.get(`/dialogs`),
            getById: id => api.get(`/dialogs/${id}`),
            createNewDialog: dialogData => api.post(`/dialogs`, dialogData),
            // setLastMessage: (dialogId, message) => api.patch(`/dialogs?_id=${dialogId}`, {last_message: message}),
            // setLastMessage: (dialogId, message) => api.patch(`/dialogs/${dialogId}`, {last_message: message}),
}

export default dialogsAPI;