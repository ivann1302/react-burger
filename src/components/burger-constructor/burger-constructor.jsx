import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';
import {
	addIngredient,
	addBun,
	removeIngredient,
	moveIngredient,
} from '../../services/actions/constructor-actions';
import styles from './burger-constructor.module.scss';

export default function BurgerConstructor() {
	const dispatch = useDispatch();

	// Получаем ингредиенты из Redux
	const { bun, ingredients = [] } = useSelector((state) => ({
		bun: state.constructor.bun,
		ingredients: state.constructor.ingredients ?? [], // Гарантируем массив
	}));

	const handleRemoveIngredient = (index) => {
		dispatch(removeIngredient(index));
	};

	const handleMoveIngredient = (fromIndex, toIndex) => {
		if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
		dispatch(moveIngredient(fromIndex, toIndex));
	};

	const [{ isOver }, drop] = useDrop({
		accept: 'INGREDIENT',
		drop: (item) => {
			if (!item || !item.type) return; // Защита от undefined

			if (item.type === 'bun') {
				dispatch(addBun(item)); // Заменяем булку
			} else {
				dispatch(addIngredient(item)); // Добавляем обычный ингредиент
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<section
			ref={drop}
			className={`${styles.container} ${isOver ? styles.hover : ''}`}>
			<div className={styles.bunContainer}>
				{bun && <ConstructorItems ingredient={bun} isBunTop={true} />}
			</div>

			<div className={styles.ingredientsContainer}>
				<ConstructorItems
					ingredients={ingredients}
					onRemove={handleRemoveIngredient}
					moveIngredient={handleMoveIngredient}
				/>
			</div>

			<div className={styles.bunContainer}>
				{bun && <ConstructorItems ingredient={bun} isBunTop={false} />}
			</div>

			<OrderBlock />
		</section>
	);
}
