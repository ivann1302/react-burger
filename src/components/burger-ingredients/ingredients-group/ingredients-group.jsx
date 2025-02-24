import React from 'react';
import IngredientItem from './../ingredient-item/ingredient-item';
import IngredientDetails from './../ingredient-details/ingredient-details';
import data from '../../../utils/data';
import styles from './ingredients-group.module.scss';

export default function IngredientsGroup() {
	return (
		<ul className={styles.gridContainer}>
			{data.map((ingredient) => (
				<li key={ingredient.id} className={styles.container}>
					<IngredientItem img={ingredient.image} />
					<IngredientDetails name={ingredient.name} price={ingredient.price} />
				</li>
			))}
		</ul>
	);
}
