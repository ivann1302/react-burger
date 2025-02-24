import React from 'react';
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.scss';

export default function App() {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</>
	);
}
