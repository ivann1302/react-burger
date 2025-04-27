import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import OrderComponent from '../../components/feed/feed-component/order/order-component';
import style from './order-page.module.scss';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder, TIngredient } from '../../utils/ingredient-types';

type TOrderPageProps = {
	isProfileOrder?: boolean;
};

const OrderPage = ({ isProfileOrder = false }: TOrderPageProps) => {
	const { id } = useParams<{ id: string }>();

	// Получаем заказы из соответствующего раздела store
	const orders = useSelector((state: RootState) =>
		isProfileOrder ? state.profileOrders.orders : state.feedOrders.orders
	);
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	// Находим нужный заказ по номеру
	const order = orders.find((order: TOrder) => order.number.toString() === id);

	if (!order) {
		return (
			<section className={style.container}>
				<p className='text text_type_main-medium'>Заказ не найден</p>
			</section>
		);
	}

	// Получаем полные данные об ингредиентах
	const orderIngredients: TIngredient[] = order.ingredientIds
		.map((orderIngredientId: string) =>
			ingredients.find((ing: TIngredient) => ing._id === orderIngredientId)
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
					order.status === 'Выполнен'
						? 'Выполнен'
						: order.status === 'Готовится'
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
