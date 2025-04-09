import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.scss';
import { TIngredient } from './../../../utils/ingredient-types';

type TIngredientProps = {
	ingredient: TIngredient & { uniqueId: string };
	index?: number;
	onRemove: (id: string) => void;
	moveIngredient: (fromIndex: number, toIndex: number) => void;
};

type TDragItem = {
	index: number | undefined;
};

const Ingredient: React.FC<TIngredientProps> = ({
	ingredient,
	index,
	onRemove,
	moveIngredient,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop<TDragItem>({
		accept: 'INGREDIENT',
		hover(item) {
			if (
				!ref.current ||
				typeof item.index !== 'number' ||
				typeof index !== 'number' ||
				item.index === index
			)
				return;

			if (ingredient.type === 'bun') return; // Если ингредиент - булка, не перемещаем

			moveIngredient(item.index, index);
			item.index = index; // Обновляем индекс у элемента
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'INGREDIENT',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div
			ref={ref}
			className={styles.ingredient}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => onRemove(ingredient.uniqueId)}
			/>
		</div>
	);
};

export default Ingredient;
