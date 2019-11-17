import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Auth, Home } from './pages';
import { appActions } from './redux/actions';

import Preloader from './components/common/Preloader';


// Конечно правильнее было бы сделать инициализацию приложения, но так как у нас нету действий 
// по сохранению данныйх о пользователе в coocies, пока смысла нету
// Фейковый сервер немного туповат
// Поэтому тут будет так, что при каждой перезагрузке данные аутентификации будут сбрасываться
// Хотя можно сохранять в localStorage токен и при инициализации смотреть есть ли он
// Возможно нужно будет вынести axios в window, и переконфигурировать его в успешной авторизации 
// переконфигурировать - а именно добавить токен в заголовки
// function App(props) {
// 	console.log(props.isAuth);
// 	return ( 
// 		<div className = "wrapper" >
// 			{props.isAuth ? <Redirect to='/im' /> : <Redirect to='/login' />}
// 			<Route exact path={['/', '/login', '/register']} component={Auth} />
// 			<Route exact path="/im" component={Home} />
			
// 		</div>
// 	);
// }

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		// console.log(this.props.initialized);
		// console.log(this.props.isAuth);
		const { initialized, isAuth } = this.props;

		if (!initialized) {
			return <Preloader />
		}

		return ( 
			<div className = "wrapper" >
				{/* На самом деле решение не особо подойдёт если будет много страниц, лучше использовать hoc withAuthRedirect для страниц которые хотим заблокировать */}
				{isAuth ? <Redirect to='/im' /> : <Redirect to='/login' />} 
				<Route exact path={['/', '/login', '/register']} component={Auth} />
				<Route exact path="/im" component={Home} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		initialized: state.app.initialized
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps, appActions)
)(App)

// export default connect(mapStateToProps, appActions)(App);

// export default connect(({ auth }) => ({ isAuth: auth.isAuth }))(App);