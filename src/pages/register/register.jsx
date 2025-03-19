import React, { useState } from 'react';
import styles from './register.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				'https://norma.nomoreparties.space/api/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password, name }),
				}
			);

			const data = await response.json();

			if (data.success) {
				console.log('Пользователь успешно зарегистрирован:', data);
				navigate('/login'); // Перенаправление на страницу входа
			} else {
				console.error('Ошибка регистрации:', data.message);
			}
		} catch (error) {
			console.error('Ошибка:', error);
		}
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

export default RegisterPage;
