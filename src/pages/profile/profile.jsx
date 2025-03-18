import React from 'react';
import styles from './profile.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
	const value = '';
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<section className={styles.container}>
			<div className={styles.tabs}>
				<a
					href='/profile'
					className={`${styles.active} ${styles.link} text text_type_main-medium mt-4`}>
					Профиль
				</a>
				<a
					href='/profile'
					className={`${styles.link} text text_type_main-medium`}>
					История заказов
				</a>
				<button
					className={`${styles.exitButton} text text_type_main-medium mb-10`}>
					Выход
				</button>
				<p className={`${styles.description} text text_type_main-small`}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<div className={styles.form}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleNameChange}
					value={value}
					name={'name'}
					error={false}
					//ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					icon='EditIcon'
				/>
				<EmailInput
					onChange={handleEmailChange}
					value={value}
					name={'email'}
					placeholder='Логин'
					isIcon={true}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={value}
					name={'password'}
					placeholder='Пароль'
					icon='EditIcon'
				/>
			</div>
		</section>
	);
};

export default ProfilePage;
