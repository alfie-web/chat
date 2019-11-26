// import React, {useState, useEffect} from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import {dialogsActions} from './../redux/actions';
import { Dialogs } from '../components';

// 1:01:32

// Версия с классовым компонентом
class DialogsContainer extends React.Component {
            state = {
                        searchValue: '',
                        filtered: Array.from(this.props.items)
            }

            onChangeInput = value => {
                        this.setState({
                                    filtered:  this.props.items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0),
                                    searchValue: value
                        });
            }

            onSelectDialog = id => {
                        this.props.setCurrentDialogId(id);
                        this.state.searchValue.length && this.onChangeInput('');
            }


            componentDidMount() {
                        const { userId, match } = this.props;
                        if (match.params.id) this.props.setCurrentDialogId(match.params.id);
                        this.props.fetchDialogs(userId);
            }

            componentDidUpdate(prevProps) {
                        if (this.props.items !== prevProps.items) {
                                    this.setState({
                                                filtered: this.props.items
                                    });
                        }

                        if (this.props.match.params.id !== prevProps.match.params.id) {
                                    if (this.props.match.params.id) this.props.setCurrentDialogId(this.props.match.params.id);
                        }
            }

            render() {
                        // const { userId, setCurrentDialogId, isFetching, currentDialogId } = this.props;
                        const { userId, isFetching, currentDialogId } = this.props;
                        // console.log(userId);
                        return (
                                    <Dialogs 
                                                items={this.state.filtered} 
                                                onSearch={this.onChangeInput} 
                                                value={this.state.searchValue} 
                                                userId={userId}
                                                // onSelectDialog={setCurrentDialogId}
                                                onSelectDialog={this.onSelectDialog}
                                                isFetching={isFetching}
                                                currentDialogId={currentDialogId}
                                    />
                        )
            }
}

const mapStateToProps = (state) => ({
            items: state.dialogs.items,
            currentDialogId: state.dialogs.currentDialogId,
            userId: state.auth.user._id,
            isFetching: state.dialogs.isFetching
});

export default compose(
            withRouter,
            connect(mapStateToProps, dialogsActions)
)(DialogsContainer);
// export default connect(({dialogs}) => dialogs, dialogsActions)(DialogsContainer);



















// // Версия через хуки
// // const DialogsContainer = ({fetchDialogs, items, userId}) => {
// const DialogsContainer = (props) => {
//             const {fetchDialogs, items, userId} = props;
//             const [searchValue, setValue] = useState('');
//             const [filtered, setFilteredItems] = useState(Array.from(items));

//             const onChangeInput = value => {
//                         setFilteredItems(
//                                     items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
//                         );

//                         setValue(value);
//             }

//             useEffect(() => {
//                         if (!items.length) {
//                                     fetchDialogs();
//                         } else {
//                                     setFilteredItems(items);
//                         }
//             }, [items, fetchDialogs]);

//             return (
//                         <Dialogs items={filtered} onSearch={onChangeInput} value={searchValue} userId={userId} />
//             )
// }

// const mapStateToProps = (state) => ({
//             items: state.dialogs.items           
// });

// export default connect(mapStateToProps, dialogsActions)(DialogsContainer);
// // export default connect(({dialogs}) => dialogs, dialogsActions)(DialogsContainer);