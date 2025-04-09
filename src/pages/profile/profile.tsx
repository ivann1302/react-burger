import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../services/actions/auth-actions';
import { getUser, updateUser } from '../../services/actions/user-actions';
import styles from './profile.module.scss';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// @ts-expect-error 'resux'
	const { user } = useSelector((state) => state.auth);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	// refs для начальных значений
	const initialName = useRef('');
	const initialEmail = useRef('');

	// Получаем данные пользователя при загрузке страницы
	useEffect(() => {
		// @ts-expect-error 'redux'
		dispatch(getUser());
	}, [dispatch]);

	// Сохраняем начальные значения и обновляем поля
	useEffect(() => {
		if (user) {
			initialName.current = user.name;
			initialEmail.current = user.email;
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		setIsEditing(true);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setIsEditing(true);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setIsEditing(true);
	};

	const handleSave = () => {
		// @ts-expect-error 'redux'
		dispatch(updateUser({ name, email, password })).then(() => {
			initialName.current = name;
			initialEmail.current = email;
			setPassword('');
			setIsEditing(false);
		});
	};

	const handleCancel = (): void => {
		setName(initialName.current);
		setEmail(initialEmail.current);
		setPassword('');
		setIsEditing(false);
	};

	const handleLogout = async () => {
		// @ts-expect-error 'redux'
		await dispatch(logout());
		navigate('/login', { replace: true });
	};

	return (
		<section className={styles.container}>
			<div className={styles.tabs}>
				<Link
					to='/profile'
					className={`${styles.active} ${styles.link} text text_type_main-medium mt-4`}>
					Профиль
				</Link>
				<Link
					to='/profile/orders'
					className={`${styles.link} text text_type_main-medium`}>
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
			</div>

			<div className={styles.form}>
				<Input
					type='text'
					placeholder='Имя'
					onChange={handleNameChange}
					value={name}
					name='name'
					icon='EditIcon'
				/>
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name='email'
					placeholder='Логин'
					isIcon={true}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name='password'
					placeholder='Пароль'
					icon='EditIcon'
				/>

				{isEditing && (
					<div className={styles.buttons}>
						<Button type='secondary' htmlType='button' onClick={handleCancel}>
							Отмена
						</Button>
						<Button type='primary' htmlType='button' onClick={handleSave}>
							Сохранить
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProfilePage;
