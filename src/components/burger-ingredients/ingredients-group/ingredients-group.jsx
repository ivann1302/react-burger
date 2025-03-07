import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import IngredientItem from './../ingredient-item/ingredient-item';
import IngredientInformation from '../ingredient-information/ingredient-information';
import styles from './ingredients-group.module.scss';

// eslint-disable-next-line react/display-name
const IngredientsGroup = forwardRef(
	({ type, groupName, onIngredientClick }, ref) => {
		// Получаем данные из конструктора
		const { bun, ingredients = [] } = useSelector((state) => state.constructor); // Используем пустой массив по умолчанию

		// Функция для подсчета количества ингредиентов
		const countIngredients = (id) => {
			const bunCount = bun?._id === id ? 2 : 0; // Булки учитываются дважды
			const ingredientsCount = ingredients.filter(
				(item) => item._id === id
			).length;

			return bunCount + ingredientsCount;
		};

		return (
			<>
				<h3 ref={ref} className={`${styles.title} text text_type_main-medium`}>
					{groupName}
				</h3>
				<ul className={styles.gridContainer}>
					{type.map((ingredient) => (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
						<li
							key={ingredient._id}
							className={styles.container}
							onClick={() => onIngredientClick(ingredient)}
							onKeyPress={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									onIngredientClick(ingredient);
								}
							}}>
							<IngredientItem
								ingredient={ingredient}
								count={countIngredients(ingredient._id)}
								onClick={() => onIngredientClick(ingredient)}
							/>
							<IngredientInformation
								name={ingredient.name}
								price={ingredient.price}
							/>
						</li>
					))}
				</ul>
			</>
		);
	}
);

export default IngredientsGroup;
