import socket from './../../api/socket';

import dialogsAPI from './../../api/dialogsService';
// import usersAPI from './../../api/usersService';

const actions = {
            setDialogs: items => ({
                        type: 'DIALOGS:SET_ITEMS',
                        payload: items
            }),

            // setCurrentDialogId: id => ({
            //             type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
            //             payload: id
            // }),

            setCurrentDialogId: id => dispatch => {
                socket.emit("DIALOGS:JOIN", id);
                dispatch({
                    type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
                    payload: id
                })
            },

            updateReadedStatus: ({ userId, dialogId }) => ({
                type: 'DIALOGS:LAST_MESSAGE_READED_STATUS',
                payload: {
                    userId,
                    dialogId,
                },
            }),

            setNewDialog: dialog => ({
                        type: 'DIALOGS:SET_NEW',
                        payload: dialog
            }),

            setIsFetching: isFetching => ({
                        type: 'DIALOGS:SET_IS_FETCHING',
                        payload: isFetching
            }),


            fetchDialogs: () => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        dialogsAPI.getAll()
                                    .then(({data}) => {
                                                dispatch(actions.setDialogs(data));
                                                // dispatch(actions.setIsFetching(false))
                                    })
                                    .catch(() => {
                                                dispatch(actions.setIsFetching(false))
                                    });
            },

        //     fetchDialogById: id => dispatch => {
        //         // dialogsAPI.getById(id).then(({data}) => {
        //         //         return data;
        //         // })

        //         return dialogsAPI.getById(id)
        //     },




            createNewDialog: (partnerId, newMessageText) => dispatch => {
                        dispatch(actions.setIsFetching(true));

                        return dialogsAPI.createNewDialog({ partner: partnerId, text: newMessageText })
                            .then(({data}) => {
                                
                                        // dispatch(actions.setNewDialog(data))
                                        dispatch(actions.setCurrentDialogId(data._id))
                                        dispatch(actions.setIsFetching(false))

                                        console.log(data)

                                        return data;
                            })
                            .catch(() => {
                                        dispatch(actions.setIsFetching(false))
                            });


                        // Убрать все return если не надо возвращать созданный диалог
                        // return usersAPI.getFromId(partnerId)
                        //             .then(({ data }) => {
                        //                         // console.log(data);
                        //                         // let dialog = {
                        //                         //             id: '' + Date.now(),    // Для фейка
                        //                         //             _id: '' + Date.now(),
                        //                         //             isOnline: false,
                        //                         //             createdAt: new Date().toISOString(),
                        //                         //             author,
                        //                         //             user: data[0],
                        //                         //             last_message: null
                        //                         // };

                        //                         return dialogsAPI.createNewDialog(dialog)
                        //                                     .then(({data}) => {
                        //                                                 // console.log(data);
                        //                                                 dispatch(actions.setNewDialog(data))
                        //                                                 dispatch(actions.setCurrentDialogId(data._id))
                        //                                                 dispatch(actions.setIsFetching(false))

                        //                                                 return data;
                        //                                     })
                        //                                     .catch(() => {
                        //                                                 dispatch(actions.setIsFetching(false))
                        //                                     });
                        //             })
            },


};

export default actions;