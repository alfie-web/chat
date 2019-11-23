import api from './api';

const messagesAPI = {
            getAllByDialogId: (dialogId) => api.get(`/messages?dialog=${dialogId}`),
            addNewTextMessage: message => api.post(`/messages`, message),
            // deleteMessage: id => api.delete('/messages', {id})
            deleteMessage: id => api.delete(`/messages/${id}`)
}

export default messagesAPI;