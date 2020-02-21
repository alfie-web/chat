import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';

import { dialogsActions } from './../redux/actions';
import { ChatUserStatus } from '../components';

// TODO: Вынести этот компонент куда-нибудь в messages и оттуда брать информацию
// Либо как вариант попробовать где-то в dialogs сохранять партнёра текущего активного диалога в store
// И уже из store доставать его
class ChatUserStatusContainer extends React.Component {
	state = {
		partner: null
	}

	setCurrentPartner = () => {
		const { currentDialogId, items, user } = this.props;
		
		if (!items.length || !currentDialogId) return;

			console.log('m', currentDialogId, items, user)
			let dialogObj = items.filter(item => item._id === currentDialogId)[0];
			console.log(items)

			if (user._id === dialogObj.author._id) {
				this.setState({
					partner: dialogObj.partner
				})
			} else {
				this.setState({
					partner: dialogObj.author
				})
			}
	}

	componentDidMount() {
		this.setCurrentPartner()
	}

	componentDidUpdate(prevProps) {
		// Подключив reselect мне не пришлось бы делать фильтрацию сдесь
		const { currentDialogId } = this.props;
		
		// if ((items.length || currentDialogId) && currentDialogId !== prevProps.currentDialogId) {
		// if (items.length && currentDialogId !== prevProps.currentDialogId) {
		if (currentDialogId !== prevProps.currentDialogId) {
			this.setCurrentPartner()
			// let dialogObj = items.filter(item => item._id === currentDialogId)[0];
			// console.log(items)

			// if (user._id === dialogObj.author._id) {
			// 	this.setState({
			// 		partner: dialogObj.partner
			// 	})
			// } else {
			// 	this.setState({
			// 		partner: dialogObj.author
			// 	})
			// }
			
		}




		// let { currentDialogId } = this.props;

		// if (currentDialogId !== prevProps.currentDialogId) {
		//                 // if (items.length) {
		//                 //         let user = items.filter(item => item._id === currentDialogId)[0];
		//                 //         user && this.setState({ partner: {isOnline: user.isOnline, fullname: user.user.fullname} });
		//                 // } 
		// }



		// let { currentDialogId, items } = this.props;

		// // console.log(this.props.items);
		// if (items !== prevProps.items || currentDialogId !== prevProps.currentDialogId) {
		//            if (items.length) {
		//                        let user = items.filter(item => item._id === currentDialogId)[0];
		//                        user && this.setState({ partner: {isOnline: user.isOnline, fullname: user.user.fullname} });
		//            } 
		// }
	}

	render() {
		// const { currentDialogId } = this.props;

		return (
			<ChatUserStatus partner={this.state.partner} />
		)
	}
}

// TODO: Вообще подключить reselect
const mapStateToProps = (state) => ({
	currentDialogId: state.dialogs.currentDialogId,
	items: state.dialogs.items,
	user: state.auth.user
});

export default compose(
	connect(mapStateToProps, dialogsActions)
)(ChatUserStatusContainer);
