import api from './api';

const messagesAPI = {
            getAllByDialogId: (dialogId) => api.get(`/messages?dialog=${dialogId}`),
            addNewTextMessage: message => api.post(`/messages`, message)
}

export default messagesAPI;