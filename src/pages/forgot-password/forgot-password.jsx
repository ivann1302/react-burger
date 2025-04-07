import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/password-action';
import { useNavigate, Link } from 'react-router-dom';
import styles from './forgot-password.module.scss';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPasswordPage = () => {
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(''); // сброс ошибки перед запросом

		const success = await dispatch(forgotPassword(email));
		if (success) {
			sessionStorage.setItem('canResetPassword', 'true'); // 💾 флаг для /reset-password
			navigate('/reset-password');
		} else {
			setError('Пользователь не найден или неверный email');
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
				{error && (
					<p className='text text_type_main-default text_color_error mt-2'>
						{error}
					</p>
				)}
				<Button htmlType='submit' size='medium' extraClass={styles.button}>
					Восстановить
				</Button>
			</form>
			<div>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Вспомнили пароль?
					<Link
						className={`text text_type_main-default ${styles.href}`}
						to='/login'>
						Войти
					</Link>
				</h4>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
