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
            }
};

export default actions;