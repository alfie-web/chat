// import React, {useState, useEffect} from 'react';
import React, { createRef } from 'react';
import {connect} from 'react-redux';

import {messagesActions} from './../redux/actions';
import { Messages } from '../components';


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

  
            componentDidUpdate(prevProps) {
                        const { fetchMessages, currentDialogId } = this.props;
                        if (currentDialogId !== prevProps.currentDialogId) {
                                    // fetchMessages(currentDialogId);
                                    fetchMessages(currentDialogId).then(() => {
                                                this.state.messagesElem.current.scrollTo(0, this.state.messagesElem.current.scrollHeight);      // мгновенный скрол, работает при получении сообщений
                                                return;
                                    });
                        }
                        this.scrollToBottom(this.state.messagesElem);   // Скролюсь в конец диалога (Messages) с анимацией (работает всегда)
            }

            render() {
                        const { items, isFetching, user } = this.props;
                        return (
                                    <Messages 
                                                className="chat__dialog-messages"
                                                items={items} 
                                                user={user}
                                                isFetching={isFetching}
                                                refEl={this.state.messagesElem}
                                    />
                        )
            }
}

const mapStateToProps = (state) => ({
            items: state.messages.items,
            currentDialogId: state.dialogs.currentDialogId,
            user: state.auth.user,
            isFetching: state.messages.isFetching
});

export default connect(mapStateToProps, messagesActions)(MessagesContainer);
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