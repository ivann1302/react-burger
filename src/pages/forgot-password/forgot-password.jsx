import React from 'react';
import styles from './forgot-password.module.scss';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPasswordPage = () => {
	const value = '';

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
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
				<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
				<EmailInput
					onChange={handleEmailChange}
					value={value}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
				/>
				<Button
					onClick={handleSubmit}
					htmlType='submit'
					size='medium'
					extraClass={styles.button}>
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
