import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@services/reducers/root-reducer';
import OrderComponent from '../../components/feed/feed-component/order/order-component';
import style from './order-page.module.scss';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder, TIngredient } from '../../utils/ingredient-types';
import { useAppDispatch } from '../../services/store';
import {
	connectProfileOrders,
	disconnectProfileOrders,
} from '../../services/actions/profile-orders-actions';
import {
	feedOrdersConnect,
	feedOrdersDisconnect,
} from '../../services/actions/feed-orders-actions';
import { WS_ORDER_ALL_URL } from '@utils/api';

type TOrderPageProps = {
	isProfileOrder?: boolean;
};

const OrderPage = ({ isProfileOrder = false }: TOrderPageProps) => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Получаем данные из store
	const {
		orders: feedOrders,
		wsConnected: feedConnected,
		error: feedError,
	} = useSelector((state: RootState) => state.feedOrders);

	const {
		orders: profileOrders,
		wsConnected: profileConnected,
		error: profileError,
	} = useSelector((state: RootState) => state.profileOrders);

	const ingredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	// Устанавливаем WebSocket соединение
	useEffect(() => {
		if (isProfileOrder) {
			dispatch(connectProfileOrders(WS_ORDER_ALL_URL));
		} else {
			dispatch(feedOrdersConnect(WS_ORDER_ALL_URL));
		}

		return () => {
			if (isProfileOrder) {
				dispatch(disconnectProfileOrders());
			} else {
				dispatch(feedOrdersDisconnect());
			}
		};
	}, [dispatch, isProfileOrder]);

	// Проверяем статус подключения и загрузки данных
	useEffect(() => {
		if (isProfileOrder ? profileConnected : feedConnected) {
			setIsLoading(false);
		}
	}, [feedConnected, profileConnected, isProfileOrder]);

	// Обрабатываем ошибки
	useEffect(() => {
		const currentError = isProfileOrder ? profileError : feedError;
		setError(currentError ?? null); // Преобразует undefined в null
		if (currentError) {
			setIsLoading(false);
		}
	}, [profileError, feedError, isProfileOrder]);

	// Находим нужный заказ по номеру
	const order = (isProfileOrder ? profileOrders : feedOrders).find(
		(order: TOrder) => order.number.toString() === number
	);

	// Состояния загрузки и ошибки
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

	// Получаем полные данные об ингредиентах
	const orderIngredients: TIngredient[] = order.ingredients
		.map((orderIngredient: string) =>
			ingredients.find((ing) => ing._id === orderIngredient)
		)
		.filter((ing): ing is TIngredient => ing !== undefined);

	// Группируем ингредиенты по количеству
	const groupedIngredients = orderIngredients.reduce(
		(acc: (TIngredient & { count: number })[], ingredient: TIngredient) => {
			const existing = acc.find((item) => item._id === ingredient._id);
			if (existing) {
				existing.count += 1;
			} else {
				acc.push({ ...ingredient, count: 1 });
			}
			return acc;
		},
		[]
	);

	// Подсчет общей стоимости
	const totalPrice = orderIngredients.reduce(
		(sum: number, ingredient: TIngredient) => sum + ingredient.price,
		0
	);

	// Форматирование даты
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
