import dialogsAPI from './../../api/dialogsService';

const actions = {
            setDialogs: items => ({
                        type: 'DIALOGS:SET_ITEMS',
                        payload: items
            }),
            setCurrentDialogId: id => ({
                        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
                        payload: id
            }),
            setIsFetching: isFetching => ({
                        type: 'DIALOGS:SET_IS_FETCHING',
                        payload: isFetching
            }),
            fetchDialogs: () => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        dialogsAPI.getAll()
                                    .then(({data}) => {
                                                dispatch(actions.setDialogs(data));
                                                // dispatch(actions.setIsFetching(false))
                                    })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false))
                                    });
            }
};

export default actions;