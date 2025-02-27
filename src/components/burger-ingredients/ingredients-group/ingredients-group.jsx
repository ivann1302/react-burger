import React from 'react';
import IngredientItem from './../ingredient-item/ingredient-item';
import IngredientDetails from './../ingredient-details/ingredient-details';
import styles from './ingredients-group.module.scss';

export default function IngredientsGroup({ type, groupName }) {
	return (
		<>
			<h3 className='ext text_type_main-medium mt-0'>{groupName}</h3>
			<ul className={styles.gridContainer}>
				{type.map((ingredient) => (
					<li key={ingredient._id} className={styles.container}>
						<IngredientItem img={ingredient.image} />
						<IngredientDetails
							name={ingredient.name}
							price={ingredient.price}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
