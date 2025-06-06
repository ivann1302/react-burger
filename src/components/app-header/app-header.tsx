import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.scss';

type TAppHeaderProps = unknown;

const AppHeader: React.FC<TAppHeaderProps> = () => {
	const location = useLocation();

	// "Конструктор" активен на главной и при модалках ингредиента/заказа
	const isConstructor =
		location.pathname === '/' ||
		location.pathname.startsWith('/ingredients/') ||
		location.pathname.startsWith('/order');

	const isFeed: boolean = location.pathname.startsWith('/feed');
	const isProfile: boolean = location.pathname.startsWith('/profile');

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<div className={styles.container}>
					<NavLink
						to='/'
						className={() =>
							`${styles.ref} mt-4 mr-4 mb-4 ${
								isConstructor ? styles.active : ''
							}`
						}>
						<BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
						<p className={`${styles.paragraph} text text_type_main-medium`}>
							Конструктор
						</p>
					</NavLink>

					<NavLink
						to='/feed'
						className={() =>
							`${styles.ref} mt-4 mr-4 mb-4 ml-5 ${isFeed ? styles.active : ''}`
						}>
						<ListIcon type={isFeed ? 'primary' : 'secondary'} />
						<p className={`${styles.paragraph} text text_type_main-medium`}>
							Лента заказов
						</p>
					</NavLink>
				</div>
				<NavLink to='/'>
					<Logo className={styles.logo} />
				</NavLink>

				<NavLink
					to='/profile'
					className={() =>
						`${styles.ref} mt-4 mb-4 ml-5 ${isProfile ? styles.active : ''}`
					}>
					<ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
					<p className={`${styles.paragraph} text text_type_main-medium`}>
						Личный кабинет
					</p>
				</NavLink>
			</nav>
		</header>
	);
};

export default AppHeader;
