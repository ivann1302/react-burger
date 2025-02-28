import React from 'react';
import IngredientItem from './../ingredient-item/ingredient-item';
import IngredientInformation from '../ingredient-information//ingredient-information';
import styles from './ingredients-group.module.scss';

export default function IngredientsGroup({
	type,
	groupName,
	onIngredientClick,
}) {
	return (
		<>
			<h3 className='ext text_type_main-medium mt-10'>{groupName}</h3>
			<ul className={styles.gridContainer}>
				{type.map((ingredient) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
					<li
						key={ingredient._id}
						className={styles.container}
						onClick={() => onIngredientClick(ingredient)}>
						<IngredientItem img={ingredient.image} />
						<IngredientInformation
							name={ingredient.name}
							price={ingredient.price}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
