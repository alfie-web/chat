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
                                    .then(({data}) => {
                                                dispatch(actions.setMessages(data));
                                                // dispatch(actions.setIsFetching(false));     // Можно кстати в reducer-е делать isFetching = false
                                    })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false));
                                    });
            },

            fetchNewTextMessage: ({ text, dialogId }) => dispatch => {
                        // const message = {
                        //             id: '' + Date.now(),         // Никак не учавствует в коде, нужно только для фейкового api
                        //             _id: '' + Date.now(),
                        //             text: text,
                        //             isReaded: false,
                        //             createdAt: new Date().toISOString(),
                        //             user,
                        //             dialog: dialogId
                        // };

                        return messagesAPI.addNewTextMessage({ text, dialogId })
                                    .then(({data}) => {
                                        console.log(data)
                                                // dispatch(actions.addNewTextMessage(data))    // Впринципе делать не надо, так как сокеты сделают это за нас (хотя лучше сделать проверку на то кто отправлял сообщение)
                                    })
            },

            deleteMessage: id => dispatch => {
                        if (window.confirm('Вы действительно хотите удалить сообщение?')) {
                                    messagesAPI.deleteMessage(id)
                                                .then(data => {
                                                            // console.log(data);
                                                            dispatch(actions.deleteMessageAC(id));
                                                            dispatch(actions.setLastMessage())
                                                })
                                                .catch(data => console.log(data))
                        }
            }
};

export default actions;