import { stopSubmit } from 'redux-form';
import authAPI from './../../api/authService';
import axios from './../../api/api';
import { notification  } from 'antd';

const openNotificationWithIcon = type => {
	notification[type]({
		message: 'Вы успешно авторизованы!',
		description: 'Спасибо, что остаётесь с нами!',
	});
};

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



	// setAuthMe: token => dispatch => {
	//         return dispatch(actions.authMeAC({ token }))
	// },

	// setIsFetching: isFetching => ({
	//             type: 'AUTH:SET_IS_FETCHING',
	//             payload: isFetching
	// }),



	//     fetchUserProfile: email => dispatch => {
	//                 return authAPI.fetchUserProfile(email)
	//                             .then(data => {
	//                                         dispatch(actions.setUserProfile(data[0]));     
	//                             })
	//     },

	fetchUserProfile: () => dispatch => {
		if (!window.localStorage['token']) return;
		return authAPI.fetchUserProfile()
			.then(data => {
				console.log(data);
				dispatch(actions.setUserProfile(data));
				// dispatch(actions.setUserProfile(data[0]));     
			})
	},

	authMe: user => dispatch => {
		// dispatch(actions.setIsFetching(true));

		authAPI.login(user)
			.then((res) => {
				if (res.data.status !== 'error') {
					console.log(res);
					window.localStorage['token'] = res.data.token;       // А эту штуку по идее хранить в куки должны, бекендщик должен
					dispatch(actions.authMeAC({ token: res.data.token }))

					axios.defaults.headers.common['token'] = res.data.token;
					dispatch(actions.fetchUserProfile())
						.then(() => openNotificationWithIcon('success'))	// Надо везде добавить и настроить тексты
				} else {
					dispatch(stopSubmit('login', { _error: "Неверный логин или пароль" }));
				}

			})
			.catch(() => {
				// dispatch(actions.setIsFetching(false))
				dispatch(stopSubmit('login', { _error: "Неверный логин или пароль" }));
			});
	},


	registerUser: formData => dispatch => {
		authAPI.register(formData)
			.then(({ data }) => {
				console.log(data)
				return data;
			})
			.catch(err => console.log(err))		// В продакшене нужно избавиться от всех таких консолей (Ибо хацкеру будет понятно в чем ошибка)
	}


};

export default actions;