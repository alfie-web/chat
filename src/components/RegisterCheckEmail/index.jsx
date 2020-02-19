import React, { useEffect, useState } from 'react';
import { Result } from 'antd';
import authAPI from '../../api/authService';
import {withConfirmedAuthRedirect, Block, Button} from '../';

const renderInfoText = (hash, verified) => {
	if (hash) {
		if (verified) {
			return {
				status: 'success',
				title: 'Готово!',
				message: 'Аккаунт успешно подтверждён!'
			};
		} else {
			return {
				status: 'error',
				title: 'Уппс!',
				message: 'Ошибка при подтверждении аккаунта!'
			}
		}
	} else {
		return {
			status: 'info',
			title: 'Регистрация прошла успешно!',
			message: 'Ссылка с подтверждением аккаунта отправлена на ваш E-mail.'
		}
	}
}

// 1:12:00 / 2:18:19

const RegisterCheckEmail = (props) => {
	// console.log(props)
	const [verified, setVerified] = useState(false);
	const hash = props.location.search.split('hash=')[1];
	const info = renderInfoText(hash, verified);

	useEffect(() => {
		// console.log(hash)
		if (hash && !verified) {
			authAPI.verifyHash(hash)
				.then(data => {
					if (data.status === 'success') {
						setVerified(true);
					}
				})
		}
	})

	return (
		<Block>
			<Result
				status={info.status}
				title={info.title}
				subTitle={
					info.message
					// !verified ? <p>Регистрация прошла успешно! <br />Ссылка с подтверждением аккаунта отправлена на ваш E-mail.</p>
					// : <p>Аккаунт успешно подтверждён</p>
				}
				extra={[
					info.status === 'success' && verified && <Button key="voyti" onClick={() => props.history.push('/login')} className="button__large">Войти в аккаунт</Button>
				]}
			/>
		</Block>
	)
}

export default withConfirmedAuthRedirect(RegisterCheckEmail);
