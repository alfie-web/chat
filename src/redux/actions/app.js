import { authActions } from './../actions';

const actions = {
            setIsInitialized: () => ({
                        type: 'APP:SET_INITIALIZED'
            }),

            setIsFetching: isFetching => ({
                        type: 'APP:SET_IS_FETCHING',
                        isFetching
            }),


            initializeApp: () => dispatch => {
                        // dispatch(actions.setIsFetching(true));

                        // if (window.localStorage['email']) {             // Разумеется этого условия быть не должно, но фейковое апи падла
                                //     let authPromise = dispatch(authActions.fetchUserProfile(window.localStorage['email']));
                                    let authPromise = dispatch(authActions.fetchUserProfile());
                                    
                                    Promise.all([authPromise])
                                                .then(() => {
                                                            dispatch(actions.setIsInitialized());
                                                })
                                                .catch(() => {
                                                        dispatch(actions.setIsInitialized());
                                                })
                        // } 
                        // else {
                        //             dispatch(actions.setIsInitialized());
                        // }

                        
                        // dispatch(actions.setIsFetching(false))
            }


};

export default actions;