import React from 'react';
// import PropsTypes from 'prop-types';
// import classNames from 'classnames';

import { Icon, Modal, Select } from 'antd';
import { DialogsContainer as Dialogs } from '../../containers';

import './Sidebar.sass';
const { Option } = Select;



const Sidebar = (
            { modalVisible, 
                        setModalVisible, 
                        selectValue, 
                        users, 
                        onChange, 
                        onSearch, 
                        onSelectUser,
                        isLoading,
                        onModalOk,
                        selectedUserId
            }) => {
            const options = users.map(user => <Option key={user._id} value={user._id}>{user.fullname}</Option>);
            // console.log(users);
            return (
                        <div className="chat__sidebar">
                                    <div className="chat__sidebar-top">
                                                <div className="chat__sidebar-header">
                                                            <div>
                                                                        <Icon type="team" />
                                                                        <span>Список диалогов</span>
                                                            </div>
                                                            <button onClick={() => setModalVisible(true)} className="chat__button"><Icon type="form" /></button>
                                                </div>
                                    </div>

                                    { modalVisible &&
                                                <Modal
                                                            title="Создать диалог"
                                                            visible={modalVisible}
                                                            onOk={onModalOk}
                                                            onCancel={() => setModalVisible(false)}
                                                            okText="Создать"
                                                            cancelText="Закрыть"
                                                            confirmLoading={ isLoading }
                                                            okButtonProps={{ disabled: !selectedUserId ? true : false }}
                                                            >
                                                            <Select
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
                                                            </Select>
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