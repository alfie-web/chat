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

                        usersAPI.getFromId(partnerId)
                                    .then(({ data }) => {
                                                console.log(data);
                                                let dialog = {
                                                            id: '' + Date.now(),    // Для фейка
                                                            _id: '' + Date.now(),
                                                            isOnline: false,
                                                            author,
                                                            user: data[0],
                                                            last_message: null
                                                };

                                                dialogsAPI.createNewDialog(dialog)
                                                            .then(({data}) => {
                                                                        console.log(data);
                                                                        dispatch(actions.setNewDialog(data))
                                                                        dispatch(actions.setIsFetching(false))
                                                            })
                                                            .catch(() => {
                                                                        dispatch(actions.setIsFetching(false))
                                                            });
                                    })
            }
};

export default actions;