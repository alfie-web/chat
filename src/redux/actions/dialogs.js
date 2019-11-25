import dialogsAPI from './../../api/dialogsService';
import usersAPI from './../../api/usersService';

const actions = {
            setDialogs: items => ({
                        type: 'DIALOGS:SET_ITEMS',
                        payload: items
            }),

            setCurrentDialogId: id => ({
                        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
                        payload: id
            }),

            setNewDialog: dialog => ({
                        type: 'DIALOGS:SET_NEW',
                        payload: dialog
            }),

            setLastMessageAC: (message, dialogId) => ({
                        type: 'DIALOGS:SET_LAST_MESSAGE',
                        payload: {message, dialogId}
            }),

            setIsFetching: isFetching => ({
                        type: 'DIALOGS:SET_IS_FETCHING',
                        payload: isFetching
            }),


            fetchDialogs: id => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        dialogsAPI.getAll(id)
                                    .then(({data}) => {
                                                dispatch(actions.setDialogs(data));
                                                // dispatch(actions.setIsFetching(false))
                                    })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false))
                                    });
            },

            createNewDialog: (partnerId, author) => dispatch => {
                        dispatch(actions.setIsFetching(true));
                        // Убрать все return если не надо возвращать созданный диалог
                        return usersAPI.getFromId(partnerId)
                                    .then(({ data }) => {
                                                // console.log(data);
                                                let dialog = {
                                                            id: '' + Date.now(),    // Для фейка
                                                            _id: '' + Date.now(),
                                                            isOnline: false,
                                                            createdAt: new Date().toISOString(),
                                                            author,
                                                            user: data[0],
                                                            last_message: null
                                                };

                                                return dialogsAPI.createNewDialog(dialog)
                                                            .then(({data}) => {
                                                                        // console.log(data);
                                                                        dispatch(actions.setNewDialog(data))
                                                                        dispatch(actions.setCurrentDialogId(data._id))
                                                                        dispatch(actions.setIsFetching(false))

                                                                        return data;
                                                            })
                                                            .catch(() => {
                                                                        dispatch(actions.setIsFetching(false))
                                                            });
                                    })
            },

            setLastMessage: (dialogId, message) => dispatch => {
                        // debugger;
                        console.log('set_last_message');
                        dialogsAPI.setLastMessage(dialogId, message)
                                    .then(() => {
                                                // debugger;
                                                dispatch(actions.setLastMessageAC(message, dialogId));
                                    })
            }
};

export default actions;