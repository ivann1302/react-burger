import React from 'react';
import styles from './reset-password.module.scss';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPasswordPage = () => {
	const value = '';
	const handleNameChange = (e) => {
		setName(e.target.value);
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
				<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
				<PasswordInput
					onChange={handlePasswordChange}
					value={value}
					placeholder={'Введите новый пароль'}
					name={'password'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={handleNameChange}
					value={value}
					name={'name'}
					error={false}
					//ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Button
					onClick={handleSubmit}
					htmlType='submit'
					size='medium'
					extraClass={styles.button}>
					Сохранить
				</Button>
			</form>

			<div>
				<h4 className={`text text_type_main-default ${styles.text}`}>
					Вспомнили пароль?
					<a
						className={`text text_type_main-
                    default ${styles.href}`}
						href='/'>
						Войти
					</a>
				</h4>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
