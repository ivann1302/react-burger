import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import IngredientsGroup from './ingredients-group/ingredients-group.jsx';
import data from '../../utils/data';
export default function BurgerIngredients() {
	const [current, setCurrent] = useState('Булки');
	const sauces = data.filter((item) => item.type === 'sauce');
	const main = data.filter((item) => item.type === 'main');
	const buns = data.filter((item) => item.type === 'bun');

	return (
		<section className={styles.ingredients}>
			<div
				style={{ display: 'flex', marginTop: '0' }}
				className={`${styles.section} mt-5`}>
				<Tab
					value='Булки'
					active={current === 'Булки'}
					onClick={setCurrent}
					className={styles.tabs}>
					Булки
				</Tab>
				<Tab
					value='Соусы'
					active={current === 'Соусы'}
					onClick={setCurrent}
					className={styles.tabs}>
					Соусы
				</Tab>
				<Tab
					value='Начинки'
					active={current === 'Начинки'}
					onClick={setCurrent}
					className={styles.tabs}>
					Начинки
				</Tab>
			</div>
			<div style={{ height: '600px', overflowY: 'auto' }}>
				<IngredientsGroup type={sauces} groupName='Соусы' />
				<IngredientsGroup type={main} groupName='Начинки' />
				<IngredientsGroup type={buns} groupName='Булки' />
			</div>
		</section>
	);
}
