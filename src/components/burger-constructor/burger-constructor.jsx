import React from 'react';
// import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';
import PropTypes from 'prop-types';
import { IngredientType } from './../../utils/types';

export default function BurgerConstructor({ ingredients, onOrderClick }) {
	const bunId = '60666c42cc7b410027a1a9b1643d69a5c3f7b9001cfa093c';
	return (
		<section>
			<ConstructorItems ingredients={ingredients} bunId={bunId} />
			<OrderBlock onOrderClick={onOrderClick} />
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(IngredientType),
	onOrderClick: PropTypes.func.isRequired,
};
