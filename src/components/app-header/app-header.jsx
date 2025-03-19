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
						className={`${styles.ref} mt-4 mr-4 mb-4`}
						activeClassName={styles.active}
						exact // Точное совпадение пути
					>
						<BurgerIcon type={isActive('/') ? 'primary' : 'secondary'} />
						<p className={`${styles.paragraph} text text_type_main-medium`}>
							Конструктор
						</p>
					</NavLink>

					{/* Ссылка на ленту заказов */}
					<NavLink
						to='/feed'
						className={`${styles.ref} mt-4 mr-4 mb-4 ml-5`}
						activeClassName={styles.active}>
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
					className={`${styles.ref} mt-4 mb-4 ml-5`}
					activeClassName={styles.active}>
					<ProfileIcon type={isActive('/profile') ? 'primary' : 'secondary'} />
					<p className={`${styles.paragraph} text text_type_main-medium`}>
						Личный кабинет
					</p>
				</NavLink>
			</nav>
		</header>
	);
}
