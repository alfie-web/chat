import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';

import { Time, ReadedIcon, Avatar } from '../';

import './DialogItem.sass';

const renderLastMessageText = lastMessage => {
	// {lastMessage && lastMessage.text ? lastMessage.text : 'Диалог пуст'}
	if (lastMessage) {	
		if (lastMessage.text) {
			return lastMessage.text;
		} else if (lastMessage.attachments[0].ext === 'webm') {
			return <Fragment><Icon type="audio" /> Аудиосообщение</Fragment>;
		} else if (lastMessage.attachments.length > 0 && !lastMessage.text) {
			return <Fragment><Icon type="camera" /> Прикреплённые файлы</Fragment>;
		} 
	}

	return 'Диалог пуст';
}

// 1:41:25
// А вообще last_message нужно сделать в reducer-e
const DialogItem = (props) => {
	const { _id, user, readed, lastMessage, onSelect, isActive, authUserId } = props;
	// console.log(props);
	return (
		// <Link to={`/im/dialog/${_id}`}>
		<Link to={`/dialog/${_id}`}>
			<div onClick={onSelect.bind(this, _id)} className={classNames('dialogs__item', { 'active': isActive })}>
				{user.isOnline && <span className="dialogs__item-online"></span>}

				{user && <Avatar url={user.avatar} alt={user.fullname} userId={user._id} className="dialogs__item-avatar" />}

				<div className="dialogs__item-info">
					<div className="dialogs__item-info-top">
						<p className="dialogs__item-name">{user.fullname}</p>
						{lastMessage && lastMessage.createdAt && <Time date={lastMessage.createdAt} type="dialog" className="dialogs__item-date" />}
						{/* <Time date={lastMessage.createdAt} type="dialog" className="dialogs__item-date" /> */}
					</div>
					<div className="dialogs__item-info-bottom">
						<p className="dialogs__item-message">
							{/* {lastMessage && lastMessage.text ? lastMessage.text : 'Диалог пуст'} */}
							{ renderLastMessageText(lastMessage) }
						</p>

						{/* {isMe && */}
						{lastMessage && lastMessage.user._id === authUserId &&
							<ReadedIcon isReaded={lastMessage && lastMessage.readed ? lastMessage.readed : false} />
						}

						{readed > 0 &&
							<span className="dialogs__item-count" title={readed}>
								{readed > 999 ? '999+' : readed}
							</span>
						}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default DialogItem;