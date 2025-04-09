import React from 'react';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-items.module.scss';
import { TIngredient } from '@utils/ingredient-types';

type TIngredientItemProps = {
	ingredient: TIngredient;
	count: number;
	onClick: () => void;
};

const IngredientItem: React.FC<TIngredientItemProps> = ({
	ingredient,
	count,
	onClick,
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'INGREDIENT',
		item: { ...ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			ref={drag}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className={styles.container}
			onClick={onClick}
			onKeyPress={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick();
				}
			}}
			role='button'
			tabIndex={0}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={styles.image}
			/>
		</div>
	);
};

export default IngredientItem;
