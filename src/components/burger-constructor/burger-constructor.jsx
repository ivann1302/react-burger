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
	const { bun, ingredients = [] } = useSelector((state) => state.constructor);

	const handleRemoveIngredient = (index) => {
		dispatch(removeIngredient(index));
	};

	const handleMoveIngredient = (fromIndex, toIndex) => {
		if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
		dispatch(moveIngredient(fromIndex, toIndex));
	};

	const [{ isOver }, drop] = useDrop({
		accept: 'INGREDIENT',
		drop: (item, monitor) => {
			const isDroppedInsideConstructor = monitor.didDrop();
			if (isDroppedInsideConstructor) return;

			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else {
				dispatch(addIngredient(item));
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
			{bun && <ConstructorItems ingredient={bun} isBunTop={true} />}
			<ConstructorItems
				ingredients={ingredients}
				onRemove={handleRemoveIngredient}
				moveIngredient={handleMoveIngredient}
			/>
			{bun && <ConstructorItems ingredient={bun} isBunTop={false} />}
			<OrderBlock />
		</section>
	);
}
