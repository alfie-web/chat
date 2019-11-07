import dialogsAPI from './../../api/dialogsService';

const actions = {
            setDialogs: items => ({
                        type: 'DIALOGS:SET_ITEMS',
                        payload: items
            }),
            fetchDialogs: () => dispatch => {
                        dialogsAPI.getAll().then(({data}) => {
                                    dispatch(actions.setDialogs(data));
                        });
            }
};

export default actions;