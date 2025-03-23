import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { login } from '../../services/actions/auth-actions';
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
	const location = useLocation();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	// Если пользователь уже авторизован, перенаправляем его на главную страницу
	if (isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await dispatch(login(email, password));
		if (success) {
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		}
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
					<Link
						className={`text text_type_main-default ${styles.href}`}
						to='/register'>
						Зарегистрироваться
					</Link>
				</h4>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Забыли пароль?
					<Link
						className={`text text_type_main-default ${styles.href}`}
						to='/reset-password'>
						Восстановить пароль
					</Link>
				</h4>
			</div>
		</section>
	);
};

export default LoginPage;
