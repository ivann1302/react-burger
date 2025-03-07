import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './../ingredient/ingredient';
import styles from './constructor-items.module.scss';

export default function ConstructorItems({
	ingredient,
	ingredients,
	isBunTop,
	onRemove,
	moveIngredient,
}) {
	if (ingredient) {
		return (
			<div className={styles.bun}>
				<ConstructorElement
					type={isBunTop ? 'top' : 'bottom'}
					isLocked={true}
					text={`${ingredient.name} (${isBunTop ? 'верх' : 'низ'})`}
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			</div>
		);
	}

	return (
		<div className={styles.ingredientsWrapper}>
			{ingredients.map((item, index) => (
				<Ingredient
					key={item._id + '-' + index}
					ingredient={item}
					index={index}
					onRemove={onRemove}
					moveIngredient={moveIngredient}
				/>
			))}
		</div>
	);
}

ConstructorItems.propTypes = {
	ingredient: PropTypes.object,
	ingredients: PropTypes.array.isRequired,
	isBunTop: PropTypes.bool,
	onRemove: PropTypes.func.isRequired,
	moveIngredient: PropTypes.func.isRequired,
};
