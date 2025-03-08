import React from 'react';
import PropTypes from 'prop-types';
import { IngredientType } from './../../../utils/types';
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
					key={item.uniqueId} // Используем uniqueId вместо _id + index
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
	ingredient: IngredientType,
	ingredients: PropTypes.arrayOf(IngredientType).isRequired,
	isBunTop: PropTypes.bool,
	onRemove: PropTypes.func,
	moveIngredient: PropTypes.func,
};

ConstructorItems.defaultProps = {
	ingredients: [],
};
