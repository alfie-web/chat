
// Первый вариант, получаем всех users 1 раз, затем работаем с ними
// import React from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// // import { withRouter } from 'react-router-dom';

// import { usersActions } from './../redux/actions';
// import { Sidebar } from '../components';


// class SidebarContainer extends React.Component {
//             state = {
//                         modalVisible: false,
//                         selectValue: '',
//                         filtered: this.props.items
//             }

//             setModalVisible = modalVisible => {
//                         this.setState({ modalVisible });
//             }

//             onChange = selectValue => {
//                         this.setState({ selectValue });
//             }

//             onSearch = value => {
//                         this.setState({ filtered: this.props.items.filter(item => item.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0) });
//             }

//             onSelectUser = userId => {
//                         console.log(userId);      // Вернёт то, что в value у option
//             }


//             componentDidUpdate(prevProps) {
//                         if (this.props.items !== prevProps.items) {
//                                     this.setState({ filtered: this.props.items });
//                         }
//             }


//             componentDidMount() {
//                         this.props.fetchAllUsers();
//             }


//             render() {
//                         const { modalVisible, selectValue, filtered } = this.state;

//                         return (
//                                     <Sidebar
//                                                 modalVisible={ modalVisible }
//                                                 setModalVisible={ this.setModalVisible }
//                                                 selectValue={ selectValue }
//                                                 users={ filtered }
//                                                 onChange={ this.onChange }
//                                                 onSearch={ this.onSearch }
//                                                 onSelectUser={this.onSelectUser}
//                                     />
//                         )
//             }
// }

// const mapStateToProps = (state) => ({
//             items: state.users.items.filter(item => item._id !== state.auth.user._id)
// });


// // export default SidebarContainer;
// export default compose(
//             connect(mapStateToProps, usersActions)
// )(SidebarContainer);


























// Второй вариант, получаем users при каждом вводе символа в поле (делается поисковый запрос)
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import usersAPI from '../api/usersService';
import { usersActions, dialogsActions } from './../redux/actions';
import { Sidebar } from '../components';
import usersAPI from '../api/usersService';


class SidebarContainer extends React.Component {
        state = {
                modalVisible: false,
                // selectValue: undefined,
                filtered: [],
                isLoading: false,
                selectedUserId: null,
                newMessageText: '',
                searchText: ''
        }

        onNewMessageText = val => {
                this.setState({newMessageText: val})
        }

        setModalVisible = modalVisible => {
                this.setState({ modalVisible, selectedUserId: null, searchText: '', filtered: [] });
        }


        // setSearchText = val => {
        //         this.setState({searchText: val})
        // }

        onSearch = val => {
                this.setState({searchText: val})
                usersAPI.getAllFromSearch(val)
                        .then(({data}) => {
                                this.setState({filtered: data})
                        })
        }



        //     onChange = selectValue => {
        //                 this.setState({ selectValue });
        //     }

        //     onSearch = value => {
        //                 // this.setState({isLoading: true});
        //                 usersAPI.getAllFromName(value)
        //                             .then(({data}) => this.setState({ filtered: data }))
        //                             // .then(({data}) => this.setState({ filtered: data, isLoading: false }))
        //                             // .catch(() => this.setState({ isLoading: false }))
        //     }



        onSelectUser = selectedUserId => {
                this.setState({ selectedUserId });      // Вернёт то, что в value у option
        }


        onAddDialog = () => {
                const { selectedUserId, newMessageText } = this.state;
                const { createNewDialog, history } = this.props;

                if (selectedUserId && newMessageText) {
                        createNewDialog(selectedUserId, newMessageText)
                                .then((data) => {
                                        console.log(data);
                                        this.setModalVisible(false);
                                        history.push(`/dialog/${data._id}`);
                                })
                }
        }




        // componentDidUpdate(prevProps, prevState) {
        //         if (this.state.modalVisible !== prevState.modalVisible && this.state.modalVisible) {
        //                 usersAPI.getAllWithoutMe()
        //                         .then(({data}) => {
        //                                 // Надо както фильтровать
        //                                 this.setState({ filtered: data })
        //                         })
        //         }
        // }



        render() {
                const { modalVisible, filtered, isLoading, selectedUserId, newMessageText, searchText } = this.state;
                // console.log(this.props);
                return (
                        <Sidebar
                                modalVisible={modalVisible}
                                setModalVisible={this.setModalVisible}
                                // selectValue={ selectValue }
                                // users={ items }
                                users={filtered}
                                // onChange={ this.onChange }
                                // onSearch={ this.onSearch }
                                onSelectUser={this.onSelectUser}
                                isLoading={isLoading}
                                onModalOk={this.onAddDialog}
                                selectedUserId={selectedUserId}
                                newMessageText={newMessageText}
                                onNewMessageText={this.onNewMessageText}
                                searchText={searchText}
                                onSearch={this.onSearch}
                                // onSearchText={this.setSearchText}
                        />
                )
        }
}

const mapStateToProps = state => ({
        // me: state.auth.user,
        dialogItems: state.dialogs.items
})

export default compose(
        // connect(mapStateToProps, [usersActions, dialogsActions])
        withRouter,
        connect(mapStateToProps, { ...usersActions, ...dialogsActions })
)(SidebarContainer);
