import api from './api';

const filesAPI = {
	upload: (file) => {
		// console.log(file)
		const formData = new FormData();
		formData.append('file', file);

		return api.post('/files', formData, {
			hesder: {
				"Content-Type": "multipart/form-data"
			}
		});
	},

	delete: fileId=> {
		return api.delete(`/files?fileId=${fileId}`)
	}
}

export default filesAPI;