import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from './../../../utils/types';
import styles from './ingredient.module.scss';

const Ingredient = ({ ingredient, index, onRemove, moveIngredient }) => {
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: 'INGREDIENT',
		hover(item) {
			if (
				!ref.current ||
				typeof item.index !== 'number' ||
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
				handleClose={() => onRemove(index)}
			/>
		</div>
	);
};

Ingredient.propTypes = {
	ingredient: IngredientType.isRequired,
	index: PropTypes.number.isRequired,
	onRemove: PropTypes.func.isRequired,
	moveIngredient: PropTypes.func.isRequired,
};

Ingredient.defaultProps = {
	ingredient: null,
};

export default Ingredient;
