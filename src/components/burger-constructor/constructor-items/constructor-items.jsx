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
			<div className={styles.container}>
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
		<div className={styles.container}>
			{ingredients
				.filter((item) => item) // Убираем `undefined` элементы
				.map((item, index) => (
					<Ingredient
						key={item._id + '-' + index} // Уникальный `key`, предотвращает дубликаты
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
