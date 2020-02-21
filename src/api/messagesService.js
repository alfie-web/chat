import api from './api';

const messagesAPI = {
            getAllByDialogId: (dialogId) => api.get(`/messages?dialog=${dialogId}`),
            addNewTextMessage: ({ text, dialogId }) => api.post(`/messages/create`, { text, dialogId }),
            // deleteMessage: id => api.delete('/messages', {id})
            deleteMessage: id => api.delete(`/messages/${id}`)
}

export default messagesAPI;