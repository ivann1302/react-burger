import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/password-action';
import { useNavigate, Link } from 'react-router-dom';
import styles from './reset-password.module.scss';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPasswordPage = (): JSX.Element => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// @ts-expect-error 'redux'
		dispatch(resetPassword(password, token)).then((success) => {
			if (success) {
				sessionStorage.removeItem('canResetPassword');
				navigate('/login');
			}
		});
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

export default ResetPasswordPage;
