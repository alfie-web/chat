import messagesAPI from './../../api/messagesService';

const actions = {
	setMessages: items => ({
		type: 'MESSAGES:SET_ITEMS',
		payload: items
	}),
	setIsFetching: isFetching => ({
		type: 'MESSAGES:SET_IS_FETCHING',
		payload: isFetching
	}),
	addNewTextMessage: message => ({
		type: 'MESSAGES:ADD_NEW_TEXT_MESSAGE',
		payload: message
	}),

	deleteMessageAC: id => ({
		type: 'MESSAGES:DELETE_MESSAGE',
		payload: id
	}),
	//     setLastMessage: message => ({
	//                 type: 'MESSAGES:SET_LAST_MESSAGE',
	//                 payload: message
	//     }),

	addNewMessageInDialog: (message) => (dispatch, getState) => {
		const { dialogs } = getState();
		if (dialogs.currentDialogId !== message.dialog._id) return;

		dispatch(actions.addNewTextMessage(message))
	},

	fetchMessages: (dialogId) => dispatch => {
		dispatch(actions.setIsFetching(true));

		// messagesAPI.getAllByDialogId(dialogId)
		return messagesAPI.getAllByDialogId(dialogId)   // Возвращаю промис
			.then(({ data }) => {
				dispatch(actions.setMessages(data));
				// dispatch(actions.setIsFetching(false));     // Можно кстати в reducer-е делать isFetching = false
			})
			.catch(() => {
				dispatch(actions.setIsFetching(false));
			});
	},

	fetchNewTextMessage: ({ text, dialogId, attachments }) => dispatch => {
		// let messageAttachments = attachments.map(file => file._id);

		const message = {
			text,
			dialogId,
			attachments
		};

		return messagesAPI.addNewTextMessage(message)
			// return messagesAPI.addNewTextMessage({ text, dialogId })
			.then(({ data }) => {
				console.log(data)
				// dispatch(actions.addNewTextMessage(data))    // Впринципе делать не надо, так как сокеты сделают это за нас (хотя лучше сделать проверку на то кто отправлял сообщение)
			})
	},

	// deleteMessage: (id, authUserId) => dispatch => {
	deleteMessage: (id) => dispatch => {
		// console.log(authUserId);     // теперь я могу передавать его на сервер, и там проверять с текущим авторизованным юзером
		if (window.confirm('Вы действительно хотите удалить сообщение?')) {
			messagesAPI.deleteMessage(id)
				.then(data => {
					// console.log(data);
					dispatch(actions.deleteMessageAC(id));
					// dispatch(actions.setLastMessage())
				})
				.catch(data => console.log(data))
		}
	}
};

export default actions;