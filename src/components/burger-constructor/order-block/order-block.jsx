import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../../services/actions/order-actions';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from './../../../utils/types';
import styles from './order-block.module.scss';

export default function OrderBlock() {
	const dispatch = useDispatch();
	const { bun, ingredients = [] } = useSelector(
		(state) => state.burgerConstructor
	);
	const { loading = false, error = null } = useSelector(
		(state) => state.order ?? {}
	); // Теперь `loading` и `error` всегда определены

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
				size='medium'
				disabled={loading} // Блокируем кнопку во время загрузки
			>
				Оформить заказ
			</Button>
			{error && <p className='text text_type_main-default mt-4'>{error}</p>}{' '}
			{/* Отображаем ошибку */}
		</div>
	);
}

OrderBlock.propTypes = {
	bun: IngredientType,
	ingredients: PropTypes.arrayOf(IngredientType).isRequired,
	loading: PropTypes.bool,
	error: PropTypes.string,
};

OrderBlock.defaultProps = {
	ingredients: [],
	bun: null,
	loading: false,
	error: null,
};
