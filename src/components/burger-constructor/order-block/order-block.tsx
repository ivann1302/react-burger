import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../../../services/actions/order-actions';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../utils/ingredient-types';
import styles from './order-block.module.scss';

export default function OrderBlock(): JSX.Element {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated: boolean = useSelector(
		// @ts-expect-error типизация auth
		(state) => state.auth.isAuthenticated
	);

	const {
		bun,
		ingredients = [],
	}: {
		bun: TIngredient | null;
		ingredients: TIngredient[];
	} = useSelector(
		// @ts-expect-error 'redux'
		(state) => state.burgerConstructor
	);
	const {
		loading = false,
		error = null,
	}: {
		loading: boolean;
		error: string | null;
	} = useSelector(
		// @ts-expect-error 'redux'
		(state) => state.order ?? {}
	);

	// Рассчитываем итоговую стоимость
	const totalPrice: number =
		(bun ? bun.price * 2 : 0) +
		ingredients.reduce((sum: number, item) => sum + item.price, 0);

	// Обработчик клика для оформления заказа
	const handleOrderClick = () => {
		if (!bun) {
			alert('Добавьте булочку для заказа!');
			return;
		}

		if (!isAuthenticated) {
			// Сохраняем текущее состояние конструктора перед редиректом
			sessionStorage.setItem(
				'constructorIngredients',
				JSON.stringify({ bun, ingredients })
			);
			navigate('/login', { state: { from: location } });
			return;
		}

		const orderIngredients = [bun, ...ingredients, bun].map((item) => item._id);
		// @ts-expect-error 'redux'
		dispatch(createOrder(orderIngredients));
		navigate('/login', { state: { from: location } });
	};

	return (
		<div className={`${styles.orderContainer} mt-10`}>
			<div className={styles.priceContainer}>
				<p className={`text text_type_main-large ml-1 ${styles.price}`}>
					{totalPrice}
				</p>
				<CurrencyIcon className={styles.icon} type='primary' />
			</div>
			<Button
				onClick={handleOrderClick}
				htmlType='button'
				type='primary'
				size='medium'
				disabled={loading}>
				Оформить заказ
			</Button>
			{error && <p className='text text_type_main-default mt-4'>{error}</p>}
		</div>
	);
}
