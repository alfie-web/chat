import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth, Home } from './pages';


// Конечно правильнее было бы сделать инициализацию приложения, но так как у нас нету действий 
// по сохранению данныйх о пользователе в coocies, пока смысла нету
// Фейковый сервер немного туповат
// Поэтому тут будет так, что при каждой перезагрузке данные аутентификации будут сбрасываться
// Хотя можно сохранять в localStorage токен и при инициализации смотреть есть ли он
// Возможно нужно будет вынести axios в window, и переконфигурировать его в успешной авторизации 
// переконфигурировать - а именно добавить токен в заголовки
function App(props) {
	console.log(props.isAuth);
	return ( 
		<div className = "wrapper" >
			{props.isAuth ? <Redirect to='/im' /> : <Redirect to='/login' />}
			<Route exact path={['/', '/login', '/register']} component={Auth} />
			<Route exact path="/im" component={Home} />
			
		</div>
	);
}

// const mapStateToProps = (state) => {
// 	return {
// 		isAuth: state.auth.isAuth
// 	}
// }

export default connect(({ auth }) => ({ isAuth: auth.isAuth }))(App);