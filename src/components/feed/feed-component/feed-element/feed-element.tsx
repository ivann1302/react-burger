import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/reducers//root-reducer';
import styles from './feed-element.module.scss';
import { TIngredient } from '@utils/ingredient-types';

type TFeedElementProps = {
	name: string;
	number: string;
	ingredientIds: string[]; // Теперь принимаем массив ID
	price: number;
	date?: string;
	onClick?: () => void;
};

const FeedElement = ({
	name,
	number,
	ingredientIds,
	price,
	date = 'Сегодня, 16:20',
	onClick,
}: TFeedElementProps) => {
	// Получаем полные данные об ингредиентах из Redux store
	const allIngredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	// Преобразуем ID в полные объекты ингредиентов
	const ingredients = ingredientIds
		.map((id) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean) as TIngredient[];

	// Функция для отображения ингредиентов (остается без изменений)
	const renderIngredients = () => {
		const visibleIngredients = ingredients.slice(0, 6);
		const remainingCount = ingredients.length - 6;

		return (
			<div className={styles.ingredientsContainer}>
				{visibleIngredients.map((ingredient, index) => (
					<div
						key={`${ingredient._id}-${index}`}
						className={styles.ingredientWrapper}
						style={{ zIndex: visibleIngredients.length - index }}>
						<img
							src={ingredient.image}
							alt={ingredient.name}
							className={styles.ingredientImage}
						/>
						{index === 5 && remainingCount > 0 && (
							<div
								className={`${styles.remainingCounter} text text_type_main-default`}>
								+{remainingCount}
							</div>
						)}
					</div>
				))}
			</div>
		);
	};

	// Обработчик нажатия клавиш (без изменений)
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick?.();
		}
	};

	// Вычисляем общую стоимость (без изменений)
	const totalPrice =
		price || ingredients.reduce((sum, ing) => sum + ing.price, 0);

	return (
		<div
			className={`${styles.container} p-6`}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			tabIndex={onClick ? 0 : -1}
			role={onClick ? 'button' : undefined}
			aria-label={onClick ? `Заказ ${number}: ${name}` : undefined}
			style={{ cursor: onClick ? 'pointer' : 'default' }}>
			<div className={styles.header}>
				<span className='text text_type_digits-default'>#{number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					{date}
				</span>
			</div>

			<h3 className={`${styles.title} text text_type_main-medium`}>{name}</h3>

			<div className={styles.footer}>
				<div className={styles.ingredients}>{renderIngredients()}</div>
				<div className={styles.price}>
					<span className='text text_type_digits-default'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedElement;
