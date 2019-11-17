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

            // setIsFetching: isFetching => ({
            //             type: 'AUTH:SET_IS_FETCHING',
            //             payload: isFetching
            // }),



            fetchUserProfile: email => dispatch => {
                        return authAPI.fetchUserProfile(email)
                                    .then(data => {
                                                // console.log(data);
                                                dispatch(actions.setUserProfile(data[0]));     
                                    })
            },

            authMe: user => dispatch => {
                        // dispatch(actions.setIsFetching(true));

                        authAPI.login(user)
                                    .then((res) => {
                                                // console.log(res);
                                                // window.access_token = res.data.access_token;

                                                window.localStorage['token'] = res.data.access_token;       // А эту штуку по идее хранить в куки должны, бекендщик должен
                                                window.localStorage['email'] = user.email;      // Из за полного пиз.. с невозможностью получить текущего пользователя в фейковом апи
                                                // window.axios.defaults.headers.common['Authorization'] = window.localStorage['token'] || res.data.access_token;

                                                dispatch(actions.authMeAC({ token: res.data.access_token }));
                                               


                                                
                                                // dispatch(actions.setIsFetching(false))
                                                dispatch(actions.fetchUserProfile(user.email));
                                    })
                                    .catch(() => {
                                                // dispatch(actions.setIsFetching(false))
                                                // console.log(res);
                                                dispatch(stopSubmit('login', {_error: "Неверный логин или пароль"}));
                                    });
            }


};

export default actions;