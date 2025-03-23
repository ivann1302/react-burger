import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../../services/actions/auth-actions';
import { getUser, updateUser } from './../../services/actions/user-actions';
import styles from './profile.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [password, setPassword] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	// Получаем данные пользователя при загрузке страницы
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	// Обновляем состояния пользователя при изменении данных
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const handleNameChange = (e) => {
		setName(e.target.value);
		setIsEditing(true);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setIsEditing(true);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setIsEditing(true);
	};

	const handleSave = () => {
		dispatch(updateUser({ name, email, password })).then(() => {
			setIsEditing(false);
		});
	};

	const handleCancel = () => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setPassword('');
			setIsEditing(false);
		}
	};

	const handleLogout = () => {
		dispatch(logout());
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
					href='/profile/orders'
					className={`${styles.link} text text_type_main-medium`}>
					История заказов
				</a>
				<button
					className={`${styles.exitButton} text text_type_main-medium mb-10`}
					onClick={handleLogout}>
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
					value={name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					icon='EditIcon'
				/>
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name={'email'}
					placeholder='Логин'
					isIcon={true}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name={'password'}
					placeholder='Пароль'
					icon='EditIcon'
				/>
				{isEditing && (
					<div className={styles.buttons}>
						<Button type='secondary' htmlType='submit' onClick={handleCancel}>
							Отмена
						</Button>
						<Button type='primary' htmlType='submit' onClick={handleSave}>
							Сохранить
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProfilePage;
