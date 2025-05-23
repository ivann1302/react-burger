import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, AppDispatch } from './../../services/store';
import { register } from '../../services/actions/auth-actions';
import { useNavigate, Link } from 'react-router-dom';
import styles from './register.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterPage = (): JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const dispatch: AppDispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register(email, password, name));
		navigate('/login');
	};

	return (
		<section className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className='text text_type_main-medium'>Регистрация</h2>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleNameChange}
					value={name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
				/>
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
					Зарегистрироваться
				</Button>
			</form>
			<div>
				<h4 className={`text text_type_main-default ${styles.registrationed}`}>
					Уже зарегистрировались?
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

export default RegisterPage;
