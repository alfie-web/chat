import React, { Fragment, useState } from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import { Empty, Modal } from 'antd';

// import { Message, Preloader } from '../../components';
import { Preloader } from '../../components';
import { MessageContainer } from '../../containers';

import './Messages.sass';

const isAudio = message => {
        return message.attachments.length && message.attachments[0].ext === 'webm' ? true : false;
}

const Messages = (
        {
                isFetching, 
                isTyping,
                items, 
                user, 
                className, 
                refEl, 
                onDeleteMessage, 
                currentDialogId
        }) => {
        const [previewImage, setPreviewImage] = useState(null)

        // console.log(items)
            return (
                 <div ref={refEl} className={classNames("messages", className)}>
                                    {
                                    isFetching ? <Preloader size="large" />         // Если идёт загрузка
                                    : items && currentDialogId ? (             // Если items не null
                                                items.length > 0        // Если массив items не пуст
                                                            ? <Fragment>
                                                                        {items.map(item => (
                                                                                    <MessageContainer 
                                                                                                {...item} 
                                                                                                readed={item.readed}
                                                                                                // isTyping={isTyping}
                                                                                                messageAuthor={item.user} 
                                                                                                isAudio={ isAudio(item) }
                                                                                                duration={ isAudio(item) ? item.attachments[0].duration : false }
                                                                                                isMe={user._id === item.user._id} 
                                                                                                key={item._id} 
                                                                                                onDeleteMessage={onDeleteMessage} 
                                                                                                setPreviewImage={setPreviewImage}
                                                                                        />
                                                                        ))}
                                                            </Fragment>
                                                            : <div className="messages__empty"><Empty description="Диалог пуст" /></div>        // Если пуст
                                                ) 
                                    : <div className="messages__empty"><Empty description="Откройте диалог" /></div>    // Если items = null (это по умолчанию)
                                    }

                                    { isTyping && 
                                        <MessageContainer 
                                                isTyping={isTyping}
                                        />
                                    }

                                <Modal
                                        visible={!!previewImage}
                                        onCancel={() => setPreviewImage(null)}
                                        footer={null}
                                >
                                        <img src={previewImage} alt="Preview" />
                                </Modal>
                        </div>
        );
}

Messages.propTypes = {
            items: PropsTypes.array,
            className: PropsTypes.string
};

export default Messages;