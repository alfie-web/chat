// import React, {useState, useEffect} from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import {dialogsActions} from './../redux/actions';
import socket from '../api/socket';

import { Dialogs } from '../components';



// 1:01:32

// Версия с классовым компонентом
class DialogsContainer extends React.Component {
            state = {
                        searchValue: '',
                        // filtered: Array.from(this.props.items)
                        filtered: this.props.items
            }

            onChangeInput = value => {
                        this.setState({
                                // TODO: Нужно поправить так, чтобы искало в зависимости от того автор я диалога или нет (нужно брать авторизованного из стора)
                                    filtered:  this.props.items.filter(dialog => dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                                    dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0),
                                    searchValue: value
                        });
            }

        //     Вызывается по клику на DialogItem
            onSelectDialog = id => {
                    // Уже не нужно, так как мы делаем это в didUpdate при смене match.params.id
                //     А почему так? Потому что при переходе на пред страницу менялся url, но не подгружались сообщения
                        // this.props.setCurrentDialogId(id);           
                        this.state.searchValue.length && this.onChangeInput('');
            }

// 1:22:07 / 1:47:12

            componentDidMount() {
                        const { match } = this.props;
                        if (match.params.id) this.props.setCurrentDialogId(match.params.id);
                        // this.props.fetchDialogs(userId);
                        this.props.fetchDialogs();

                        socket.on('SERVER:DIALOG_CREATED', (data) => {
                                
                                console.log(data);
                                this.props.fetchDialogs()
                        });

                        // Насчёт этой штуки сомневаюсь мальца (может не стоит обновлять все диалоги, когда нужно только итем)
                        // А что если получение последнего сообщения сделать отдельной апишкой на сервере (гемор походу)
                        socket.on('SERVER:NEW_MESSAGE', (data) => {
                                console.log(data);
                                // TODO: Либо здесь не фетчить все диалоги, а обновлять store (profit)
                                // Так как получаем data, модно апдейтить конкретный итем в сторе
                                this.props.fetchDialogs()
                        })
            }

            componentDidUpdate(prevProps, prevState) {
                        if (this.props.items !== prevProps.items) {
                        // if (this.props.items !== prevProps.items && this.props.items !== prevState.filtered) {
                                    this.setState({
                                                filtered: this.props.items
                                    });
                        }

                        // Если эту штуку оставляю, то тогда нужно убрать изменение currentDialogId при клике на DialogItem
                        if (this.props.match.params !== prevProps.match.params) {
                                this.props.setCurrentDialogId(this.props.match.params.id);
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