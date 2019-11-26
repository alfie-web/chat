import React, { Fragment } from 'react';
// import classNames from 'classnames';
// import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import { Input, Empty } from 'antd';


import './Dialogs.sass';
import {DialogItem} from '../';
import Preloader from '../common/Preloader';




// 43:35
const Dialogs = (props) => {
            const {isFetching, items, userId, onSearch, value, onSelectDialog, currentDialogId} = props;
            // console.log(props);
            return (
                        <Fragment>
                                    <div className="chat__sidebar-search">
                                                <Input.Search placeholder="Поиск среди контактов" 
                                                onChange={e => onSearch(e.target.value)} value={value} />
                                    </div>

                                    <div className="chat__sidebar-dialogs">
                                                <div className="dialogs">
                                                            {isFetching ?
                                                                        <Preloader />
                                                            : items.length > 0 
                                                            ? 
                                                                        // orderBy(items, ["createdAt"], ["desc"]).map(item => (
                                                                        // sortBy(items, [function(item) { return item.last_message.createdAt; }]).reverse().map(item => (
                                                                        sortBy(items, [function(item) { 
                                                                                    return item.last_message && item.last_message.createdAt 
                                                                                                ? item.last_message.createdAt
                                                                                                : item.createdAt
                                                                                                // : new Date().toISOString()
                                                                        }]).reverse().map(item => (
                                                                                    <DialogItem key={item._id}
                                                                                                onSelect={onSelectDialog}
                                                                                                // isMe={item.user._id === userId}
                                                                                                isMe={item.author._id === userId}
                                                                                                // isActive={currentDialogId === item.user._id ? true : false}
                                                                                                isActive={currentDialogId === item._id ? true : false}
                                                                                                {...item}
                                                                                    />
                                                                        )) 
                                                            : 
                                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Контакты не найдены" /> 
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