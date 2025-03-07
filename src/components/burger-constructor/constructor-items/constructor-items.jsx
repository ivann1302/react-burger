import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-items.module.scss';

export default function ConstructorItems({
	ingredient,
	ingredients,
	isBunTop,
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
			{(ingredients || []).map((item, index) => (
				<ConstructorElement
					key={index}
					text={item.name}
					price={item.price}
					thumbnail={item.image}
				/>
			))}
		</div>
	);
}

ConstructorItems.propTypes = {
	ingredient: PropTypes.object,
	ingredients: PropTypes.array,
	isBunTop: PropTypes.bool,
};
