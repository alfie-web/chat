import React from 'react';
// import PropsTypes from 'prop-types';
// import classNames from 'classnames';

import { Icon, Modal, Input, Tooltip } from 'antd';
import { DialogsContainer as Dialogs } from '../../containers';
import { Avatar } from '../../components';

import './Sidebar.sass';



const Sidebar = (
            { modalVisible, 
                        setModalVisible, 
                        // selectValue, 
                        users, 
                        // onChange, 
                        // onSearch, 
                        onSelectUser,
                        isLoading,
                        onModalOk,
                        selectedUserId,
                        newMessageText,
                        onNewMessageText,
                        searchText,
                        onSearchText,
                        onSearch
            }) => {
        //     const options = users.map(user => <Option key={user._id} value={user._id}>{user.fullname}</Option>);
            // console.log(users);
                const selectedU = selectedUserId && users.filter(u => u._id === selectedUserId)[0];

            return (
                        <div className="chat__sidebar">
                                    <div className="chat__sidebar-top">
                                                <div className="chat__sidebar-header">
                                                            <div>
                                                                        <Icon type="team" />
                                                                        <span>Список диалогов</span>
                                                            </div>
                                                            <Tooltip placement="bottom" title="Создать диалог">
                                                                <button onClick={() => setModalVisible(true)} className="chat__button"><Icon type="form" /></button>
                                                        </Tooltip>
                                                </div>
                                    </div>

                                    { modalVisible &&
                                                <Modal
                                                            title="Создать диалог"
                                                            visible={modalVisible}
                                                            onOk={onModalOk}
                                                            onCancel={() => setModalVisible(false)}
                                                            okText="Создать"
                                                            cancelText="Отменить"
                                                            confirmLoading={ isLoading }
                                                        //     okButtonProps={{ disabled: !selectedUserId ? true : false }}
                                                            okButtonProps={{ disabled: !newMessageText ? true : false }}
                                                            >
                                                                     
                                                                    { !selectedUserId ? <div className="users__list">
                                                                                  <div className="user__input-search">
                                                                                        <Input 
                                                                                                value={searchText} 
                                                                                                onChange={(e) => onSearch(e.target.value)}
                                                                                                placeholder="Найти собеседника"
                                                                                        />
                                                                                </div>
                                                                                {
                                                                                        users.map(user => {
                                                                                                // Вынести это в отдельный компонетнт
                                                                                                return <div className="user" key={ user._id } onClick={() => onSelectUser(user._id)}>
                                                                                                        {/* TODO: Индикатор isOnline по идее тоже нужно вынести в отдельный компонент */}
                                                                                                        {user.isOnline && <span className="dialogs__item-online user__online"></span>}
                                                                                                        <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="user__avatar" />
                                                                                                        <p className="user__name">{ user.fullname }</p>
                                                                                                </div>
                                                                                        })
                                                                                }
                                                                    </div>
                                                                : <div className="user__selected-form">
                                                                        <div className="user user__selected">
                                                                                {/* TODO: Индикатор isOnline по идее тоже нужно вынести в отдельный компонент */}
                                                                                {selectedU.isOnline && <span className="dialogs__item-online user__online"></span>}
                                                                                <Avatar url={selectedU.avatar} alt={selectedU.fullname} userId={selectedU._id} className="user__avatar" />
                                                                                <p className="user__name">{ selectedU.fullname }</p>
                                                                        </div>

                                                                        <div className="user__input">
                                                                                <Input 
                                                                                        value={newMessageText} 
                                                                                        onChange={(e) => onNewMessageText(e.target.value)}
                                                                                        placeholder="Ваше сообщение"
                                                                                />
                                                                        </div>
                                                                                
                                                                </div>
                                                                }


                                                            {/* <Select
                                                                        showSearch
                                                                        value={ selectValue }
                                                                        placeholder={"Введите имя пользователя"}
                                                                        style={{ 'width': '100%' }}
                                                                        defaultActiveFirstOption={false}
                                                                        showArrow={false}
                                                                        filterOption={false}
                                                                        onSearch={onSearch}
                                                                        onChange={onChange}
                                                                        onSelect={onSelectUser}
                                                                        notFoundContent={null}
                                                                        >
                                                                        {options}
                                                            </Select> */}
                                                </Modal>
                                    }

                                    <Dialogs />
                        </div>
            );
}

Sidebar.defaultProps = {
            users: []
};

// Sidebar.propTypes = {
//             isOnline: PropsTypes.bool,
//             fullname: PropsTypes.string,
// };

export default Sidebar;


































// import React from 'react';
// // import PropsTypes from 'prop-types';
// // import classNames from 'classnames';

// import { Icon, Modal, Input } from 'antd';
// import { DialogsContainer as Dialogs } from '../../containers';
// import { Avatar } from '../../components';

// import './Sidebar.sass';



// const Sidebar = (
//             { modalVisible, 
//                         setModalVisible, 
//                         // selectValue, 
//                         users, 
//                         // onChange, 
//                         // onSearch, 
//                         onSelectUser,
//                         isLoading,
//                         onModalOk,
//                         selectedUserId,
//                         newMessageText,
//                         onNewMessageText
//             }) => {
//         //     const options = users.map(user => <Option key={user._id} value={user._id}>{user.fullname}</Option>);
//             // console.log(users);
//                 const selectedU = selectedUserId && users.filter(u => u._id === selectedUserId)[0];

//             return (
//                         <div className="chat__sidebar">
//                                     <div className="chat__sidebar-top">
//                                                 <div className="chat__sidebar-header">
//                                                             <div>
//                                                                         <Icon type="team" />
//                                                                         <span>Список диалогов</span>
//                                                             </div>
//                                                             <button onClick={() => setModalVisible(true)} className="chat__button"><Icon type="form" /></button>
//                                                 </div>
//                                     </div>

//                                     { modalVisible &&
//                                                 <Modal
//                                                             title="Создать диалог"
//                                                             visible={modalVisible}
//                                                             onOk={onModalOk}
//                                                             onCancel={() => setModalVisible(false)}
//                                                             okText="Создать"
//                                                             cancelText="Отменить"
//                                                             confirmLoading={ isLoading }
//                                                         //     okButtonProps={{ disabled: !selectedUserId ? true : false }}
//                                                             okButtonProps={{ disabled: !newMessageText ? true : false }}
//                                                             >
//                                                                     { !selectedUserId ? <div className="users__list">
//                                                                                 {
//                                                                                         users.map(user => {
//                                                                                                 // Вынести это в отдельный компонетнт
//                                                                                                 return <div className="user" key={ user._id } onClick={() => onSelectUser(user._id)}>
//                                                                                                         {/* TODO: Индикатор isOnline по идее тоже нужно вынести в отдельный компонент */}
//                                                                                                         {user.isOnline && <span className="dialogs__item-online user__online"></span>}
//                                                                                                         <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="user__avatar" />
//                                                                                                         <p className="user__name">{ user.fullname }</p>
//                                                                                                 </div>
//                                                                                         })
//                                                                                 }
//                                                                     </div>
//                                                                 : <div className="user__selected-form">
//                                                                         <div className="user user__selected">
//                                                                                 {/* TODO: Индикатор isOnline по идее тоже нужно вынести в отдельный компонент */}
//                                                                                 {selectedU.isOnline && <span className="dialogs__item-online user__online"></span>}
//                                                                                 <Avatar url={selectedU.avatar} alt={selectedU.fullname} userId={selectedU._id} className="user__avatar" />
//                                                                                 <p className="user__name">{ selectedU.fullname }</p>
//                                                                         </div>

//                                                                         <div className="user__input">
//                                                                                 <Input 
//                                                                                         value={newMessageText} 
//                                                                                         onChange={(e) => onNewMessageText(e.target.value)}
//                                                                                         placeholder="Ваше сообщение"
//                                                                                 />
//                                                                         </div>
                                                                                
//                                                                 </div>
//                                                                 }


//                                                             {/* <Select
//                                                                         showSearch
//                                                                         value={ selectValue }
//                                                                         placeholder={"Введите имя пользователя"}
//                                                                         style={{ 'width': '100%' }}
//                                                                         defaultActiveFirstOption={false}
//                                                                         showArrow={false}
//                                                                         filterOption={false}
//                                                                         onSearch={onSearch}
//                                                                         onChange={onChange}
//                                                                         onSelect={onSelectUser}
//                                                                         notFoundContent={null}
//                                                                         >
//                                                                         {options}
//                                                             </Select> */}
//                                                 </Modal>
//                                     }

//                                     <Dialogs />
//                         </div>
//             );
// }

// Sidebar.defaultProps = {
//             users: []
// };

// // Sidebar.propTypes = {
// //             isOnline: PropsTypes.bool,
// //             fullname: PropsTypes.string,
// // };

// export default Sidebar;