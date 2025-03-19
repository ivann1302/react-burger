import React, { useState } from 'react';
import styles from './reset-password.module.scss';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleTokenChange = (e) => {
		setToken(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				'https://norma.nomoreparties.space/api/password-reset/reset',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ password, token }),
				}
			);

			const data = await response.json();

			if (data.success) {
				navigate('/login'); // Перенаправление на страницу входа
			} else {
				console.error('Ошибка:', data.message);
			}
		} catch (error) {
			console.error('Ошибка:', error);
		}
	};

	return (
		<section className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					placeholder={'Введите новый пароль'}
					name={'password'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={handleTokenChange}
					value={token}
					name={'token'}
					error={false}
					//ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Button htmlType='submit' size='medium' extraClass={styles.button}>
					Сохранить
				</Button>
			</form>

			<div>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Вспомнили пароль?
					<a
						className={`text text_type_main-
                    default ${styles.href}`}
						href='/'>
						Войти
					</a>
				</h4>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
