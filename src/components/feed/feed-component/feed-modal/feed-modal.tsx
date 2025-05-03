import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/reducers/root-reducer';
import style from './feed-modal.module.scss';
import { TIngredient, TOrder } from '../../../../utils/ingredient-types';

type TFeedModalProps = {
	order: TOrder;
};

// Определяем временный тип с дополнительным свойством count
type TIngredientWithCount = TIngredient & { count: number };

const FeedModal = ({ order }: TFeedModalProps) => {
	// Получаем все ингредиенты из Redux store
	const allIngredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	if (!order) {
		return null;
	}

	// Преобразуем ID ингредиентов в полные объекты
	const ingredients = order.ingredients
		.map((id: string) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean) as TIngredient[];

	// Группируем ингредиенты по количеству с использованием временного типа
	const groupedIngredients = ingredients.reduce(
		(acc: TIngredientWithCount[], ingredient: TIngredient) => {
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
	const totalPrice =
		order.price || ingredients.reduce((sum, ing) => sum + ing.price, 0);

	return (
		<div className={`${style.modal} p-10`}>
			<h3 className='text text_type_main-medium mb-2'>{order.name}</h3>
			<p className={`${style.status} text text_type_main-small`}>
				{order.status === 'Выполнен'
					? 'Выполнен'
					: order.status === 'Готовится'
					? 'Готовится'
					: 'Создан'}
			</p>

			<p className='text text_type_main-default mb-2'>Состав:</p>
			<ul className={style.list}>
				{groupedIngredients.map(
					(ingredient: TIngredientWithCount, index: number) => (
						<li key={index} className={`${style.listItem} mb-4`}>
							<div className={style.ingredient_block}>
								<div className={style.imageContainer}>
									<img
										src={ingredient.image}
										alt={ingredient.name}
										className={style.ingredient_image}
									/>
								</div>
								<div className={style.ingredientNameContainer}>
									<p className='text text_type_main-small'>{ingredient.name}</p>
								</div>
							</div>
							<div className={style.price_block}>
								<p className='text text_type_digits-small mr-2'>
									{ingredient.count} x {ingredient.price}
								</p>
								<CurrencyIcon type='primary' />
							</div>
						</li>
					)
				)}
			</ul>

			<div className={style.bottom_container}>
				<p className={`${style.date} text text_type_main-small`}>
					{order.createdAt ? (
						<FormattedDate date={new Date(order.createdAt)} />
					) : (
						'Сегодня'
					)}
				</p>
				<div className={style.totalPrice}>
					<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedModal;
