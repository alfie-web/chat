import api from './api';

const messagesAPI = {
            getAllByDialogId: (dialogId) => api.get(`/messages?dialog=${dialogId}`)
}

export default messagesAPI;