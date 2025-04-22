import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-element.module.scss';

type TFeedElement = {
	name: string;
	number: string;
	ingredients: any[];
	price: number;
	date?: string;
};

const FeedElement = ({
	name,
	number,
	ingredients,
	price,
	date = 'Сегодня, 16:20',
}: TFeedElement) => {
	// Функция для отображения ингредиентов
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

	// Вычисляем общую стоимость
	const totalPrice =
		price || ingredients.reduce((sum, ing) => sum + ing.price, 0);

	return (
		<div className={`${styles.container} p-6`}>
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
