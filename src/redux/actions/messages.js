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

            fetchNewTextMessage: ({ text, dialogId, user }) => dispatch => {
                        const message = {
                                    id: Date.now(),         // Никак не учавствует в коде, нужно только для фейкового api
                                    _id: '' + Date.now(),
                                    text: text,
                                    isReaded: false,
                                    createdAt: new Date().toISOString(),
                                    user,
                                    dialog: dialogId
                        };

                        messagesAPI.addNewTextMessage(message)
                                    .then(() => dispatch(actions.addNewTextMessage(message)))
            }
};

export default actions;