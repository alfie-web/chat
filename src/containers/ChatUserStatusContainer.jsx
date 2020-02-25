import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import { dialogsActions } from './../redux/actions';
import dialogsAPI from './../api/dialogsService';
import { ChatUserStatus } from '../components';

// TODO: Вынести этот компонент куда-нибудь в messages и оттуда брать информацию
// Либо как вариант попробовать где-то в dialogs сохранять партнёра текущего активного диалога в store
// И уже из store доставать его
class ChatUserStatusContainer extends React.Component {
	state = {
		partner: null
	}

	// Вариант работает, только для didUpdate (Не делаем запрос на сервак, но вытягиваем из стора items - ну философия лютая)
	// setCurrentPartner = () => {
	// 	const { currentDialogId, items, user } = this.props;
		
	// 	if (!items.length || !currentDialogId) return;

	// 		console.log('m', currentDialogId, items, user)
	// 		let dialogObj = items.filter(item => item._id === currentDialogId)[0];
	// 		console.log(items)

	// 		if (user._id === dialogObj.author._id) {
	// 			this.setState({
	// 				partner: dialogObj.partner
	// 			})
	// 		} else {
	// 			this.setState({
	// 				partner: dialogObj.author
	// 			})
	// 		}
	// }

	setCurrentPartner = (currentDialogId) => {
		const { user } = this.props;

		dialogsAPI.getById(currentDialogId)
			.then(({data}) => {
				if (user._id === data.author._id) {
					this.setState({ partner: data.partner })
				} else {
					this.setState({ partner: data.author })
				}
			})

		// this.props.fetchDialogById(currentDialogId)
		// 	.then(({data}) => {
		// 		if (user._id === data.author._id) {
		// 			this.setState({ partner: data.partner })
		// 		} else {
		// 			this.setState({ partner: data.author })
		// 		}
		// 	})
	}

	componentDidMount() {
		const { currentDialogId } = this.props;
		currentDialogId && this.setCurrentPartner(this.props.match.params.id)
	}

	componentDidUpdate(prevProps) {
		// Подключив reselect мне не пришлось бы делать фильтрацию сдесь
		const { currentDialogId } = this.props;
		
		if (currentDialogId !== prevProps.currentDialogId) {
			this.setCurrentPartner(currentDialogId)
		}
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
	// items: state.dialogs.items,
	user: state.auth.user
});

export default compose(
	// connect(mapStateToProps, dialogsActions),
	connect(mapStateToProps, null),
	withRouter
)(ChatUserStatusContainer);
