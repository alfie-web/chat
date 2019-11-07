import React, { Fragment } from 'react';
// import classNames from 'classnames';
// import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from 'antd';

import './Dialogs.sass';
// import DialogItem from '../DialogItem';
import {DialogItem} from '../';

// 43:35
const Dialogs = ({items, userId, onSearch, value}) => {
            return (
                        <Fragment>
                                    <div className="chat__sidebar-search">
                                                <Input.Search placeholder="Поиск среди контактов" 
                                                onChange={e => onSearch(e.target.value)} value={value} />
                                    </div>

                                    <div className="chat__sidebar-dialogs">
                                                <div className="dialogs">
                                                            { items.length > 0 
                                                            ? 
                                                                        orderBy(items, ["createdAt"], ["desc"]).map(item => (
                                                                                    <DialogItem key={item._id}
                                                                                                isMe={item.user._id === userId}
                                                                                                {...item}
                                                                                    />
                                                                        )) 
                                                            : 
                                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Контакт не найден" /> 
                                                            }
                                                </div>
                                    </div>
                        </Fragment>
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