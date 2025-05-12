import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typed-hookes';
import { TOrder, TIngredient } from '../../utils/ingredient-types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderComponent from '../../components/feed/feed-component/order/order-component';
import style from './order-page.module.scss';
import { useAppDispatch } from '../../services/store';
import {
	connectProfileOrders,
	disconnectProfileOrders,
} from '../../services/actions/profile-orders-actions';
import {
	WS_API_WITH_TOKEN,
	WS_ORDER_ALL_URL,
	API_ORDERS_URL,
} from '../../utils/api';

import {
	feedOrdersConnect,
	feedOrdersDisconnect,
} from '../../services/actions/feed-orders-actions';

type TOrderPageProps = {
	isProfileOrder?: boolean;
};

const OrderPage = ({ isProfileOrder = false }: TOrderPageProps) => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();

	const [order, setOrder] = useState<TOrder | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [shouldFetchDirectly, setShouldFetchDirectly] = useState(false);

	const {
		orders: feedOrders,
		wsConnected: feedConnected,
		error: feedError,
	} = useAppSelector((state) => state.feedOrders);

	const {
		orders: profileOrders,
		wsConnected: profileConnected,
		error: profileError,
	} = useAppSelector((state) => state.profileOrders);

	const ingredients = useAppSelector((state) => state.ingredients.ingredients);

	const initTimer = useRef<NodeJS.Timeout | null>(null);
	const connectedOnce = useRef(false);

	useEffect(() => {
		if (connectedOnce.current) return;

		initTimer.current = setTimeout(() => {
			if (isProfileOrder) {
				const token = localStorage.getItem('accessToken');
				if (token) {
					const clean = token.replace(/^Bearer\s?/, '').replace(/['"]/g, '');
					dispatch(connectProfileOrders(`${WS_API_WITH_TOKEN}${clean}`));
				}
			} else {
				dispatch(feedOrdersConnect(WS_ORDER_ALL_URL));
			}
			connectedOnce.current = true;
		}, 100); // Подождать 100мс — даём шанс StrictMode отработать оба mount

		return () => {
			if (initTimer.current) {
				clearTimeout(initTimer.current);
			}

			if (connectedOnce.current) {
				if (isProfileOrder) {
					dispatch(disconnectProfileOrders());
				} else {
					dispatch(feedOrdersDisconnect());
				}
				connectedOnce.current = false;
			}
		};
	}, [dispatch, isProfileOrder]);

	const fetchOrderDirectly = useCallback(
		async (orderNumber: string) => {
			try {
				const url = `${API_ORDERS_URL}/${orderNumber}`;
				const response = await fetch(url, {
					headers: isProfileOrder
						? { Authorization: localStorage.getItem('accessToken') || '' }
						: {},
				});
				if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
				const data = await response.json();
				if (data.success && data.orders?.length > 0) {
					setOrder(data.orders[0]);
				} else {
					setError(`Заказ #${orderNumber} не найден`);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Ошибка при запросе заказа'
				);
			} finally {
				setIsLoading(false);
			}
		},
		[isProfileOrder]
	);

	useEffect(() => {
		if (!number) {
			setError('Некорректный номер заказа');
			setIsLoading(false);
			return;
		}

		const orders = isProfileOrder ? profileOrders : feedOrders;
		console.log('[ORDER PAGE] Ищем заказ с номером:', number);
		console.log(
			'[ORDER PAGE] Доступные заказы:',
			orders.map((o) => o.number)
		);

		const found = orders.find((o) => o.number.toString() === number);

		if (found) {
			console.log('[ORDER PAGE] Найден заказ:', found);
			setOrder(found);
			setIsLoading(false);
			setShouldFetchDirectly(false);
		} else if (
			(isProfileOrder ? profileConnected : feedConnected) &&
			!shouldFetchDirectly
		) {
			const timer = setTimeout(() => setShouldFetchDirectly(true), 1000);
			return () => clearTimeout(timer);
		}
	}, [
		number,
		feedOrders,
		profileOrders,
		feedConnected,
		profileConnected,
		isProfileOrder,
		shouldFetchDirectly,
	]);

	useEffect(() => {
		if (shouldFetchDirectly && number) {
			fetchOrderDirectly(number);
		}
	}, [shouldFetchDirectly, number, fetchOrderDirectly]);

	useEffect(() => {
		const currentError = isProfileOrder ? profileError : feedError;
		if (currentError) {
			setError(currentError);
			setIsLoading(false);
		}
	}, [profileError, feedError, isProfileOrder]);

	if (isLoading) {
		return (
			<section className={style.container}>
				<p className='text text_type_main-medium'>Загрузка данных...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={style.container}>
				<p className='text text_type_main-medium text_color_error'>{error}</p>
			</section>
		);
	}

	if (!order) {
		return (
			<section className={style.container}>
				<p className='text text_type_main-medium'>Заказ #{number} не найден</p>
			</section>
		);
	}

	const orderIngredients: TIngredient[] = order.ingredients
		.map((id) => ingredients.find((i) => i._id === id))
		.filter((i): i is TIngredient => Boolean(i));

	const groupedIngredients = orderIngredients.reduce(
		(acc: (TIngredient & { count: number })[], ing) => {
			const existing = acc.find((item) => item._id === ing._id);
			if (existing) {
				existing.count += 1;
			} else {
				acc.push({ ...ing, count: 1 });
			}
			return acc;
		},
		[]
	);

	const totalPrice = orderIngredients.reduce(
		(sum, item) => sum + item.price,
		0
	);

	const orderDate = order.createdAt ? (
		<FormattedDate date={new Date(order.createdAt)} />
	) : (
		'Сегодня'
	);

	return (
		<section className={style.container}>
			<OrderComponent
				number={`#${order.number}`}
				name={order.name}
				status={
					order.status === 'done'
						? 'Выполнен'
						: order.status === 'pending'
						? 'Готовится'
						: 'Создан'
				}
				ingredients={groupedIngredients}
				price={totalPrice}
				date={orderDate}
			/>
		</section>
	);
};

export default OrderPage;
