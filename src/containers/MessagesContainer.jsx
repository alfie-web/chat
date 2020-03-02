// import React, {useState, useEffect} from 'react';
import React, { createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messagesActions, dialogsActions } from './../redux/actions';
import socket from '../api/socket';

// import { Icon } from 'antd';
import { Messages } from '../components';
// import { ChatUserStatusContainer } from '../containers';


// Версия с классовым компонентом
class MessagesContainer extends React.Component {
        state = {
                messagesElem: createRef()
        }

        scrollToBottom(el) {
                // el.current.scrollTo(0, this.state.messagesElem.current.scrollHeight);
                el.current.scrollTo({
                        top: this.state.messagesElem.current.scrollHeight,
                        behavior: 'smooth',
                });
        }

        onDeleteMessage = id => {
                // this.props.deleteMessage(id, this.props.user._id);
                this.props.deleteMessage(id);
        }

        onNewMessage = data => {
                // const currentDialogId = this.props.match.params.id;

                // Это то о чём я говорил, что нужна проверка что сообщение пришло от партнёра а не от меня
                        console.log(data);  
                        // this.props.fetchMessages(currentDialogId)
                        this.props.addNewMessageInDialog(data) 
        }

        componentDidMount() {
                // const { fetchMessages, currentDialogId } = this.props;
                // const { fetchMessages } = this.props;
                // const { addNewTextMessage } = this.props;

                // const { addNewMessageInDialog } = this.props;
                // const currentDialogId = this.props.match.params.id;

                // Правда нужна будет какая-нибудь проверка, что сообщение пришло от партнёра (иначе будет лишний запрос, когда мы будем писать сообщение)
                // socket.on('SERVER:NEW_MESSAGE', (data) => {
                //         console.log(data, currentDialogId);     // хз почему но currentDialogId из стора не находит
                //         // fetchMessages(currentDialogId)
                //         // addNewTextMessage(data) 
                //         addNewMessageInDialog(data) 
                // });

                socket.on('SERVER:NEW_MESSAGE', this.onNewMessage);
        }

        // Не думаю что нужен, так как возможно на этом socket будет завязана логика показывания колличества новых сообщений
        // componentWillUnmount() {
        //         socket.removeListener('SERVER:NEW_MESSAGE', this.onNewMessage);
        // }

        componentDidUpdate(prevProps) {
                const {
                        fetchMessages,
                        currentDialogId,
                        // lastMessage, 
                        // setLastMessage 
                } = this.props;

                if (currentDialogId && currentDialogId !== prevProps.currentDialogId) {
                        fetchMessages(currentDialogId).then(() => {
                                this.state.messagesElem.current && this.state.messagesElem.current.scrollTo(0, this.state.messagesElem.current.scrollHeight);      // мгновенный скрол, работает при получении сообщений
                                return;
                        });
                }

                // if (lastMessage !== prevProps.lastMessage) {
                //             setLastMessage(this.props.currentDialogId, this.props.lastMessage);
                // }

                currentDialogId && this.scrollToBottom(this.state.messagesElem);   // Скролюсь в конец диалога (Messages) с анимацией (работает всегда)
        }

        render() {
                const { items, isFetching, user } = this.props;
                return (

                        <React.Fragment>
                                {/* <div className="chat__dialog-header-wrap">
                                        <div className="chat__dialog-header">
                                                        <div className="chat__dialog-header-left"></div>

                                                        <ChatUserStatusContainer
                                                                user={this.props.user}
                                                                items={this.props.items}
                                                                currentDialogId={this.props.currentDialogId}
                                                        />
                                                        
                                                        <div className="chat__dialog-header-right">
                                                                <button className="chat__button"><Icon type="ellipsis" style={{fontSize: '22px'}} /></button>
                                                        </div>
                                        </div>
                                </div> */}

                                <Messages
                                        className="chat__dialog-messages"
                                        items={items}
                                        user={user}
                                        isFetching={isFetching}
                                        refEl={this.state.messagesElem}
                                        onDeleteMessage={this.onDeleteMessage}
                                        currentDialogId={this.props.currentDialogId}
                                />
                        </React.Fragment>
                )
        }
}

const mapStateToProps = (state) => ({
        items: state.messages.items,
        currentDialogId: state.dialogs.currentDialogId,
        user: state.auth.user,
        isFetching: state.messages.isFetching,
        lastMessage: state.messages.lastMessage
});

export default compose(
        connect(mapStateToProps, { ...messagesActions, ...dialogsActions }),
        withRouter
)(MessagesContainer)
// export default connect(mapStateToProps, { ...messagesActions, ...dialogsActions })(MessagesContainer);



















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