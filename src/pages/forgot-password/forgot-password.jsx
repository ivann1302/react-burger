import React, { useState } from 'react';
import styles from './forgot-password.module.scss';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				'https://norma.nomoreparties.space/api/password-reset',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: '' }),
				}
			);

			const data = await response.json();

			if (data.success) {
				navigate('/reset-password'); // Перенаправление на страницу сброса пароля
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
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
				/>
				<Button htmlType='submit' size='medium' extraClass={styles.button}>
					Восстановить
				</Button>
			</form>
			<div>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Вспомнили пароль?
					<a
						className={`text text_type_main-
                    default ${styles.href}`}
						href='/login'>
						Войти
					</a>
				</h4>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
