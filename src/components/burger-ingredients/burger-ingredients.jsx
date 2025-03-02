import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import IngredientsGroup from './ingredients-group/ingredients-group.jsx';
import PropTypes from 'prop-types';
import { IngredientType } from './../../utils/types';

export default function BurgerIngredients({ ingredients, onIngredientClick }) {
	const [current, setCurrent] = useState('Булки');
	const sauces = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'sauce')
		: [];
	const main = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'main')
		: [];
	const buns = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'bun')
		: [];

	return (
		<section className={styles.ingredients}>
			<div className={`${styles.section} mt-5`}>
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
			<div className={` ${styles.blocks} mt-10 mb-10`}>
				<IngredientsGroup
					type={buns}
					groupName='Булки'
					onIngredientClick={onIngredientClick}
				/>
				<IngredientsGroup
					type={sauces}
					groupName='Соусы'
					onIngredientClick={onIngredientClick}
				/>
				<IngredientsGroup
					type={main}
					groupName='Начинки'
					onIngredientClick={onIngredientClick}
				/>
			</div>
		</section>
	);
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(IngredientType),
	onIngredientClick: PropTypes.func.isRequired,
};
