import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth-actions';
import { getUser, updateUser } from '../../services/actions/user-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/typed-hookes';

import styles from './profile.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TUserUpdateData = {
	name?: string;
	email?: string;
	password?: string;
};

const ProfilePage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isProfilePage = location.pathname === '/profile';

	const { user } = useAppSelector((state) => state.auth);

	const [formData, setFormData] = useState<TUserUpdateData>({
		name: '',
		email: '',
		password: '',
	});
	const [isEditing, setIsEditing] = useState(false);
	const initialData = useRef<TUserUpdateData>({ name: '', email: '' });

	// Получаем данные пользователя
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	// Обновляем форму при получении данных пользователя
	useEffect(() => {
		if (user) {
			initialData.current = {
				name: user.name,
				email: user.email,
			};
			setFormData({
				name: user.name,
				email: user.email,
				password: '',
			});
		}
	}, [user]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setIsEditing(true);
	};

	const handleSave = () => {
		// Убираем пустые поля перед отправкой
		const updateData: TUserUpdateData = {};
		if (formData.name !== initialData.current.name)
			updateData.name = formData.name;
		if (formData.email !== initialData.current.email)
			updateData.email = formData.email;
		if (formData.password) updateData.password = formData.password;

		dispatch(updateUser(updateData)).then(() => {
			initialData.current = {
				name: formData.name || initialData.current.name,
				email: formData.email || initialData.current.email,
			};
			setFormData((prev) => ({ ...prev, password: '' }));
			setIsEditing(false);
		});
	};

	const handleCancel = () => {
		setFormData({
			name: initialData.current.name,
			email: initialData.current.email,
			password: '',
		});
		setIsEditing(false);
	};

	const handleLogout = () => {
		dispatch(logout()).then(() => navigate('/login', { replace: true }));
	};

	return (
		<section className={`${styles.container}`}>
			<nav className={styles.tabs}>
				<Link
					to='/profile'
					className={`${isProfilePage ? styles.active : ''} ${
						styles.link
					} text text_type_main-medium mt-4`}>
					Профиль
				</Link>
				<Link
					to='/profile/orders'
					className={`${
						location.pathname === '/profile/orders' ? styles.active : ''
					} ${styles.link} text text_type_main-medium`}>
					История заказов
				</Link>
				<button
					className={`${styles.exitButton} text text_type_main-medium mb-10`}
					onClick={handleLogout}>
					Выход
				</button>
				<p className={`${styles.description} text text_type_main-small`}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>

			<div className={styles.content}>
				<Outlet /> {/* Здесь будут отображаться вложенные маршруты */}
			</div>

			{isProfilePage && (
				<div className={styles.form}>
					<Input
						type='text'
						placeholder='Имя'
						onChange={handleChange}
						value={formData.name || ''}
						name='name'
						icon='EditIcon'
					/>
					<EmailInput
						onChange={handleChange}
						value={formData.email || ''}
						name='email'
						placeholder='Логин'
						isIcon={true}
					/>
					<PasswordInput
						onChange={handleChange}
						value={formData.password || ''}
						name='password'
						placeholder='Пароль'
						icon='EditIcon'
					/>

					{isEditing && (
						<div className={styles.buttons}>
							<Button type='secondary' htmlType='button' onClick={handleCancel}>
								Отмена
							</Button>
							<Button
								type='primary'
								htmlType='button'
								onClick={handleSave}
								disabled={!formData.name || !formData.email}>
								Сохранить
							</Button>
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default ProfilePage;
