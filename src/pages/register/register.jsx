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
				<h2 className='text text_type_main-medium'>Вход</h2>
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
					Войти
				</Button>
			</form>

			<div className={styles.bottom}>
				<h4 className={`text text_type_main-default ${styles.registrationed}`}>
					Вы - новый пользователь?
					<a
						className={`text text_type_main-
                    default ${styles.href}`}
						href='/'>
						Зарегистрироваться
					</a>
				</h4>
				<h4 className={`text text_type_main-default ${styles.registrationed}`}>
					Забыли пароль?
					<a
						className={`text text_type_main-
                    default ${styles.href}`}
						href='/'>
						Восстановить пароль
					</a>
				</h4>
			</div>
		</section>
	);
};

export default RegisterPage;
