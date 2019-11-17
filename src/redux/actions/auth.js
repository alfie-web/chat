import { stopSubmit } from 'redux-form';
import authAPI from './../../api/authService';

const actions = {
            authMeAC: ({ user, token }) => ({
                        type: 'AUTH:ME',
                        payload: { user, token }
            }),

            setUserProfile: (user) => ({
                        type: 'AUTH:SET_USER_PROFILE',
                        // payload: { user }
                        payload: { 
                                    id: user.id,
                                    email: user.email,
                                    name: user.name,
                                    last_seen: user.last_seen
                        }
            }),

            setIsFetching: isFetching => ({
                        type: 'DIALOGS:SET_IS_FETCHING',
                        payload: isFetching
            }),



            fetchUserProfile: email => dispatch => {
                        authAPI.fetchUserProfile(email)
                                    .then(data => {
                                                console.log(data);
                                                dispatch(actions.setUserProfile(data[0]));     
                                    })
            },

            authMe: user => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        authAPI.login(user)
                                    .then((res) => {
                                                console.log(res);
                                                // if (res.status === 200) {
                                                window.access_token = res.data.access_token;
                                                dispatch(actions.authMeAC({ token: res.data.access_token }));
                                                // }

                                                //  else {
                                                //             let message = data.messages.length ? data.messages[0] : "Some error";     // Текст ошибки с сервера
                                                //             dispatch(stopSubmit('login', {_error: message}));
                                                // }

                                                
                                                // dispatch(actions.setIsFetching(false))
                                                dispatch(actions.fetchUserProfile(user.email));
                                    })
                                    // .then(() => {
                                    //             console.log(window.access_token);
                                    //             dispatch(actions.fetchUserProfile());
                                    // })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false))
                                                // console.log(res);
                                                dispatch(stopSubmit('login', {_error: "Неверный логин или пароль"}));
                                    });
            }


};

export default actions;