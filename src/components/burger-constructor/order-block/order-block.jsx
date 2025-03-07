import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from './../../../services/actions/order-actions';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.scss';

export default function OrderBlock() {
	const dispatch = useDispatch();
	const { bun, ingredients = [] } = useSelector((state) => state.constructor); // Добавляем значение по умолчанию для ingredients

	// Рассчитываем итоговую стоимость
	const totalPrice =
		(bun ? bun.price * 2 : 0) +
		ingredients.reduce((sum, item) => sum + item.price, 0);

	// Обработчик клика для оформления заказа
	const handleOrderClick = () => {
		if (!bun) {
			alert('Добавьте булочку для заказа!');
			return;
		}
		if (ingredients.length === 0) {
			alert('Добавьте ингредиенты для заказа!');
			return;
		}

		// Формируем список ингредиентов для заказа
		const orderIngredients = [bun, ...ingredients, bun].map((item) => item._id);

		// Отправляем заказ
		dispatch(createOrder(orderIngredients));
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
