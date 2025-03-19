import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.scss';

export default function AppHeader() {
	const location = useLocation();

	// Определяем, активна ли ссылка
	const isActive = (path) => location.pathname === path;

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<div className={styles.container}>
					{/* Ссылка на главную страницу */}
					<NavLink
						to='/'
						className={({ isActive }) =>
							`${styles.ref} mt-4 mr-4 mb-4 ${isActive ? styles.active : ''}`
						}>
						<BurgerIcon type={isActive('/') ? 'primary' : 'secondary'} />
						<p className={`${styles.paragraph} text text_type_main-medium`}>
							Конструктор
						</p>
					</NavLink>

					{/* Ссылка на ленту заказов */}
					<NavLink
						to='/feed' // Исправлено на /feed
						className={({ isActive }) =>
							`${styles.ref} mt-4 mr-4 mb-4 ml-5 ${
								isActive ? styles.active : ''
							}`
						}>
						<ListIcon type={isActive('/feed') ? 'primary' : 'secondary'} />
						<p className={`${styles.paragraph} text text_type_main-medium`}>
							Лента заказов
						</p>
					</NavLink>
				</div>

				{/* Логотип */}
				<Logo className={styles.logo} />

				{/* Ссылка на личный кабинет */}
				<NavLink
					to='/profile'
					className={({ isActive }) =>
						`${styles.ref} mt-4 mb-4 ml-5 ${isActive ? styles.active : ''}`
					}>
					<ProfileIcon type={isActive('/profile') ? 'primary' : 'secondary'} />
					<p className={`${styles.paragraph} text text_type_main-medium`}>
						Личный кабинет
					</p>
				</NavLink>
			</nav>
		</header>
	);
}
