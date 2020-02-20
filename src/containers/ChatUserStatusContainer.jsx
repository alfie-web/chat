import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';

import { dialogsActions } from './../redux/actions';
import { ChatUserStatus } from '../components';


class ChatUserStatusContainer extends React.Component {
            state = {
                        partner: null
            }

            componentDidUpdate(prevProps) {
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
                        return (
                                    <ChatUserStatus partner={this.state.partner} />
                        )
            }
}

const mapStateToProps = (state) => ({
        //     items: state.dialogs.items,
            currentDialogId: state.dialogs.currentDialogId,
});

export default compose(
            connect(mapStateToProps, dialogsActions)
)(ChatUserStatusContainer);
