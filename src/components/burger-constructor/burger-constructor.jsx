import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';
import { createOrder } from './../../services/actions/order-actions';
import { clearConstructor } from './../../services/actions/constructor-actions';

import PropTypes from 'prop-types';
import { IngredientType } from './../../utils/types';

export default function BurgerConstructor() {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector((state) => state.constructor);

	const handleOrderClick = () => {
		const orderIngredients = [bun, ...ingredients, bun].map((item) => item._id); // Формируем список ингредиентов для заказа
		dispatch(createOrder(orderIngredients)); // Создаем заказ
		dispatch(clearConstructor()); // Очищаем конструктор после заказа
	};

	return (
		<section>
			<ConstructorItems ingredients={ingredients} bun={bun} />
			<OrderBlock onOrderClick={handleOrderClick} />
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(IngredientType),
	onOrderClick: PropTypes.func.isRequired,
};
