import React from 'react';
// import classNames from 'classnames';
// import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';

import './Dialogs.sass';
import DialogItem from '../DialogItem';


// 43:35
const Dialogs = ({items, userId}) => {
            return (
                        <div className="dialogs">
                                    {
                                                orderBy(items, ["createdAt"], ["desc"]).map(item => (
                                                            <DialogItem key={item._id}
                                                                        isMe={item.user._id === userId}
                                                                        {...item}
                                                            />
                                                            // <DialogItem key={item._id}
                                                            //             user={item.user} 
                                                            //             message={item}
                                                            //             unreaded={0}
                                                            //             isMe={item.user._id === userId}
                                                            // />
                                                ))
                                    }
                        </div>
            );
}







// Моя версия
// Извращение лютое, но сортирует по дате (нужно чтобы те кто писал сообщение последним отображался вверху)
// Ещё изменится, когда будет готова окончательная структура items
// const sortDialogsItems = items => {
//             return sortBy(items, [function(item) { return new Date(item.message.createdAt); }]).reverse();  // За инфой смотреть документацию
// }

// const Dialogs = ({items}) => {
//             const sortedItems = sortDialogsItems(items);

//             return (
//                         <div className="dialogs">
//                                     {
//                                                 sortedItems.map(item => (
//                                                             <DialogItem 
//                                                                         user={item.user} 
//                                                                         message={item.message}
//                                                                         unreaded={0}
//                                                                         key={item._id}
//                                                             />
//                                                 ))
//                                     }
//                         </div>
//             );
// }

export default Dialogs;