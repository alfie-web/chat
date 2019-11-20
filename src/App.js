import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Auth, Home } from './pages';
import { appActions } from './redux/actions';

import Preloader from './components/common/Preloader';


class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		const { initialized } = this.props;

		if (!initialized) {
			return <Preloader />
		}

		return ( 
			<div className = "wrapper" >
				{/* На самом деле решение не особо подойдёт если будет много страниц, лучше использовать hoc withAuthRedirect для страниц которые хотим заблокировать */}
				{/* {isAuth ? <Redirect to='/im' /> : <Redirect to='/login' />}  */}
				<Route exact path={['/', '/login', '/register']} component={Auth} />
				<Route exact path="/im" component={Home} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// isAuth: state.auth.isAuth,
		initialized: state.app.initialized
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps, appActions)
)(App)
