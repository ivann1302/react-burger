// feed-element.module.tsx
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '@services/reducers/root-reducer';
import styles from './feed-element.module.scss';
import { TOrder } from '@utils/ingredient-types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface FeedElementProps {
	order: TOrder;
	onClick?: () => void;
	showStatus?: boolean;
}

const FeedElement = ({
	order,
	onClick,
	showStatus = false,
}: FeedElementProps) => {
	const allIngredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	const orderIngredients = order.ingredients
		.map((id: string) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean);

	const totalPrice = orderIngredients.reduce(
		(sum: number, ing) => sum + (ing?.price || 0),
		0
	);

	const visibleIngredients = orderIngredients.slice(0, 6);
	const remainingCount = orderIngredients.length - 6;

	const statusText = {
		done: 'Выполнен',
		pending: 'Готовится',
		created: 'Создан',
	}[order.status || 'created'];

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
				<span className='text text_type_digits-default'>#{order.number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					{order.createdAt &&
						FormattedDate({ date: new Date(order.createdAt) })}
				</span>
			</div>

			<h3 className={`${styles.title} text text_type_main-medium mt-6`}>
				{order.name}
			</h3>

			{showStatus && (
				<p
					className={`text text_type_main-default mt-2 ${
						order.status === 'done' ? styles.statusDone : ''
					}`}>
					{statusText}
				</p>
			)}

			<div className={`${styles.content} mt-6`}>
				<div className={styles.ingredients}>
					{visibleIngredients.map((ing, index: number) => (
						<div
							key={`${order._id}-${index}`}
							className={styles.ingredient}
							style={{ zIndex: visibleIngredients.length - index }}>
							{ing && (
								<>
									<img
										src={ing.image}
										alt={ing.name}
										className={styles.image}
									/>
									{index === 5 && remainingCount > 0 && (
										<div className={styles.remaining}>+{remainingCount}</div>
									)}
								</>
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
