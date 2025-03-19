import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/actions/auth-actions';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		navigate('/');
	};

	return (
		<section className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className='text text_type_main-medium'>Вход</h2>
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name={'password'}
					placeholder='Пароль'
				/>
				<Button htmlType='submit' size='medium' extraClass={styles.button}>
					Войти
				</Button>
			</form>
			<div className={styles.bottom}>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Вы - новый пользователь?
					<a
						className={`text text_type_main-default ${styles.href}`}
						href='/register'>
						Зарегистрироваться
					</a>
				</h4>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Забыли пароль?
					<a
						className={`text text_type_main-default ${styles.href}`}
						href='/reset-password'>
						Восстановить пароль
					</a>
				</h4>
			</div>
		</section>
	);
};

export default LoginPage;
