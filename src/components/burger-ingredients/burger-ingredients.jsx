import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import IngredientsGroup from './ingredients-group/ingredients-group.jsx';

export default function BurgerIngredients() {
	const [current, setCurrent] = useState(['Булки']);

	return (
		<section className={styles.ingredients}>
			<div style={{ display: 'flex' }} className={`${styles.container} mt-5`}>
				<Tab
					value='Булки'
					active={current === 'one'}
					onClick={setCurrent}
					className={styles.tabs}>
					Булки
				</Tab>
				<Tab
					value='Соусы'
					active={current === 'two'}
					onClick={setCurrent}
					className={styles.tabs}>
					Соусы
				</Tab>
				<Tab
					value='Начинки'
					active={current === 'three'}
					onClick={setCurrent}
					className={styles.tabs}>
					Начинки
				</Tab>
			</div>
			<div className={styles.groups}>
				<IngredientsGroup />
			</div>
		</section>
	);
}
