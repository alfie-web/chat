import { stopSubmit } from 'redux-form';
import authAPI from './../../api/authService';

const actions = {
            authMeAC: ({ token }) => ({
                        type: 'AUTH:ME',
                        payload: { token }
            }),

            setUserProfile: (user) => ({
                        type: 'AUTH:SET_USER_PROFILE',
                        payload: { 
                                    _id: user._id,
                                    email: user.email,
                                    fullname: user.fullname,
                                    last_seen: user.last_seen
                        }
            }),

            // setIsFetching: isFetching => ({
            //             type: 'AUTH:SET_IS_FETCHING',
            //             payload: isFetching
            // }),



            fetchUserProfile: email => dispatch => {
                        return authAPI.fetchUserProfile(email)
                                    .then(data => {
                                                dispatch(actions.setUserProfile(data[0]));     
                                    })
            },

            authMe: user => dispatch => {
                        // dispatch(actions.setIsFetching(true));

                        authAPI.login(user)
                                    .then((res) => {
                                                window.localStorage['token'] = res.data.access_token;       // А эту штуку по идее хранить в куки должны, бекендщик должен
                                                window.localStorage['email'] = user.email;      // Из за полного пиз.. с невозможностью получить текущего пользователя в фейковом апи

                                                dispatch(actions.authMeAC({ token: res.data.access_token }));
                                                dispatch(actions.fetchUserProfile(user.email));
                                                // dispatch(actions.setIsFetching(false))
                                    })
                                    .catch(() => {
                                                // dispatch(actions.setIsFetching(false))
                                                dispatch(stopSubmit('login', {_error: "Неверный логин или пароль"}));
                                    });
            }


};

export default actions;