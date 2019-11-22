import usersAPI from './../../api/usersService';

const actions = {
            setUsers: items => ({
                        type: 'USERS:SET_ITEMS',
                        payload: items
            }),
            setIsFetching: isFetching => ({
                        type: 'USERS:SET_IS_FETCHING',
                        payload: isFetching
            }),
            fetchAllUsers: () => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        usersAPI.getAll()
                                    .then(({data}) => {
                                                dispatch(actions.setUsers(data));
                                                dispatch(actions.setIsFetching(false))
                                    })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false))
                                    });
            }
};

export default actions;