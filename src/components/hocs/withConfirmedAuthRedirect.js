import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withConfirmedAuthRedirect(Component) {
	class ConfirmedAuthRedirectContainer extends React.Component {
		render() {
			if(this.props.isAuth) return <Redirect to="/" />

			return <Component {...this.props} /> 
		}
	}

	return connect(({ auth }) => ({ isAuth: auth.isAuth }))(ConfirmedAuthRedirectContainer)
}

export default withConfirmedAuthRedirect;
