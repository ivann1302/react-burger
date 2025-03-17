import React from 'react';
import styles from './register.module.scss';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterPage = () => {
	const value = '';

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Здесь можно добавить логику для обработки данных формы
		console.log('Имя:', name);
		console.log('Email:', email);
		console.log('Пароль:', password);
	};

	return (
		<section className={styles.container}>
			<form action='' className={styles.form}>
				<h2 className='text text_type_main-medium'>Регистрация</h2>
				<EmailInput
					onChange={handleEmailChange}
					value={value}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={value}
					name={'password'}
				/>
				<Button
					onClick={handleSubmit}
					htmlType='submit'
					size='medium'
					extraClass={styles.button}>
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
