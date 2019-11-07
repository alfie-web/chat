import api from './api';

const dialogsAPI = {
            getAll: () => api.get('/dialogs')
}

export default dialogsAPI;