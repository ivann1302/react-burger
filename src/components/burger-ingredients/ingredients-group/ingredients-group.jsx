import React, { forwardRef } from 'react';
import IngredientItem from './../ingredient-item/ingredient-item';
import IngredientInformation from '../ingredient-information//ingredient-information';
import styles from './ingredients-group.module.scss';

// eslint-disable-next-line react/display-name
const IngredientsGroup = forwardRef(
	({ type, groupName, onIngredientClick }, ref) => {
		return (
			<>
				<h3 ref={ref} className={`${styles.title} text text_type_main-medium`}>
					{groupName}
				</h3>
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
);

export default IngredientsGroup;
