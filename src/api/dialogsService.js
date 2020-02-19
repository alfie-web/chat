import api from './api';

const dialogsAPI = {
        //     getAll: (id) => api.get(`/dialogs?author._id=${id}`),
            getAll: () => api.get(`/dialogs`),
            createNewDialog: dialog => api.post(`/dialogs`, dialog),
            // setLastMessage: (dialogId, message) => api.patch(`/dialogs?_id=${dialogId}`, {last_message: message}),
            setLastMessage: (dialogId, message) => api.patch(`/dialogs/${dialogId}`, {last_message: message}),
}

export default dialogsAPI;