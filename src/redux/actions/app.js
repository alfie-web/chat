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

                        // authAPI.login(user)
                        //             .then((res) => {
                        //                         console.log(res);
                                                // dispatch(actions.authMeAC({ token: res.data.access_token }));
                                               
                                                if (window.localStorage['email']) {
                                                            let authPromise = dispatch(authActions.fetchUserProfile(window.localStorage['email']));
                                                            // console.log(authPromise);
                                                            Promise.all([authPromise])
                                                                        .then(() => {
                                                                                    dispatch(actions.setIsInitialized());
                                                                        })
                                                } else {
                                                            dispatch(actions.setIsInitialized());
                                                }

                                                
                                                // dispatch(actions.setIsFetching(false))
                                    // })
                                    // .catch(res => console.log(res))
            }


};

export default actions;