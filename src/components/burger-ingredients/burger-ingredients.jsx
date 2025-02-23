import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import IngredientsGroup from './ingredients-group/ingredients-group.module.scss';

export default function BurgerIngredients() {
	return (
		<section className={styles.ingredients}>
			<h2>Соберите бургер</h2>
			<div className={styles.tabs}>
				<Tab title='Булки' />
				<Tab title='Соусы' />
				<Tab title='Начинки' />
			</div>
			<div className={styles.groups}>
				<IngredientsGroup />
			</div>
		</section>
	);
}
