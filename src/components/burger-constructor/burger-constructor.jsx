import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';
import {
	addIngredient,
	addBun,
} from '../../services/actions/constructor-actions';
import styles from './burger-constructor.module.scss';

export default function BurgerConstructor() {
	const dispatch = useDispatch();
	const { bun, ingredients = [] } = useSelector((state) => state.constructor);

	const [{ isOver }, drop] = useDrop({
		accept: 'INGREDIENT', // Тип элемента, который можно сбросить
		drop: (item) => {
			if (item.type === 'bun') {
				dispatch(addBun(item)); // Добавляем булку
			} else {
				dispatch(addIngredient(item)); // Добавляем ингредиент
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(), // Находится ли элемент над целью
		}),
	});

	return (
		<section
			ref={drop}
			className={`${styles.container} ${isOver ? styles.hover : ''}`}>
			{bun && <ConstructorItems ingredient={bun} isBunTop={true} />}
			<ConstructorItems ingredients={ingredients} />
			{bun && <ConstructorItems ingredient={bun} isBunTop={false} />}
			<OrderBlock />
		</section>
	);
}
