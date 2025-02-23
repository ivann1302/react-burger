import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';

export default function AppHeader() {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<div className={styles.container}>
					<a
						href='./../../index.tsx'
						className={`${styles.ref} ${styles.active} mt-4 mr-4 mb-4 ml-5`}>
						<BurgerIcon type='primary' />
						<p
							className={`${styles.paragraph} ${styles.active} text text_type_main-medium"`}>
							Конструктор
						</p>
					</a>
					<a
						href='./../../index.tsx'
						className={`${styles.ref} mt-4 mr-4 mb-4 ml-5`}>
						<ListIcon type='secondary' />
						<p className={`${styles.paragraph} text text_type_main-medium"`}>
							Лента заказов
						</p>
					</a>
				</div>
				<Logo className={styles.logo} />
				<a
					href='./../../index.tsx'
					className={`${styles.ref} mt-4 mr-4 mb-4 ml-5`}>
					<ProfileIcon type='secondary' />
					<p className={`${styles.paragraph} text text_type_main-medium"`}>
						Личный кабинет
					</p>
				</a>
			</nav>
		</header>
	);
}
