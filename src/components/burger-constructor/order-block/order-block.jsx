import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from './../../../services/actions/order-actions';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.scss';
// import PropTypes from 'prop-types';

export default function OrderBlock() {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector((state) => state.constructor);

	// Проверяем, что ingredients не равен undefined
	const totalPrice =
		(ingredients || []).reduce((sum, item) => sum + item.price, 0) +
		(bun ? bun.price * 2 : 0);

	const handleOrderClick = () => {
		if (!bun || !ingredients || ingredients.length === 0) {
			alert('Добавьте булочку и ингредиенты для заказа!');
			return;
		}

		const orderIngredients = [bun, ...ingredients, bun].map((item) => item._id); // Формируем список ингредиентов для заказа
		dispatch(createOrder(orderIngredients)); // Создаем заказ
	};

	return (
		<div className={`${styles.orderContainer} mt-10`}>
			<div className={styles.priceContainer}>
				<p className={`text text_type_main-large ml-1 ${styles.price}`}>
					{totalPrice}
				</p>
				<CurrencyIcon className={styles.icon} />
			</div>
			<Button
				onClick={handleOrderClick}
				htmlType='button'
				type='primary'
				size='medium'>
				Сделать заказ
			</Button>
		</div>
	);
}

// OrderBlock.propTypes = {
// 	onOrderClick: PropTypes.func.isRequired,
// };
