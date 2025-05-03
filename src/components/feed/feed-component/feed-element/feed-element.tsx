import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '@services/reducers/root-reducer';
import styles from './feed-element.module.scss';
import { TOrder } from '@utils/ingredient-types';

type TFeedElementProps = TOrder & {
	onClick?: () => void;
};

const FeedElement = ({
	_id,
	name,
	number,
	ingredients,
	status,
	createdAt,
	onClick,
}: TFeedElementProps) => {
	const allIngredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	// Получаем полные данные об ингредиентах
	const orderIngredients = ingredients
		.map((id: string) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean);

	console.log('Все ингредиенты в хранилище:', allIngredients);
	console.log('ID ингредиентов в заказе:', ingredients);

	// Вычисляем общую стоимость
	const totalPrice = orderIngredients.reduce(
		(sum: number, ing) => sum + (ing?.price || 0),
		0
	);

	// Отображаем первые 6 ингредиентов
	const visibleIngredients = orderIngredients.slice(0, 6);
	const remainingCount = orderIngredients.length - 6;

	return (
		<div
			className={`${styles.container} p-6 mb-4`}
			onClick={onClick}
			onKeyDown={(e) => {
				if ((e.key === 'Enter' || e.key === ' ') && onClick) {
					onClick();
				}
			}}
			role='button'
			tabIndex={0}>
			<div className={styles.header}>
				<span className='text text_type_digits-default'>#{number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					{createdAt && FormattedDate({ date: new Date(createdAt) })}
				</span>
			</div>

			<h3 className={`${styles.title} text text_type_main-medium mt-6`}>
				{name}
			</h3>

			{status && (
				<p
					className={`text text_type_main-default mt-2 ${
						status === 'done' ? styles.statusDone : ''
					}`}>
					{status === 'done' ? 'Выполнен' : 'Готовится'}
				</p>
			)}

			<div className={`${styles.content} mt-6`}>
				<div className={styles.ingredients}>
					{visibleIngredients.map((ing, index: number) => (
						<div
							key={`${_id}-${index}`}
							className={styles.ingredient}
							style={{ zIndex: visibleIngredients.length - index }}>
							<img src={ing?.image} alt={ing?.name} className={styles.image} />
							{index === 5 && remainingCount > 0 && (
								<div className={styles.remaining}>+{remainingCount}</div>
							)}
						</div>
					))}
				</div>
				<div className={styles.price}>
					<span className='text text_type_digits-default mr-2'>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedElement;
