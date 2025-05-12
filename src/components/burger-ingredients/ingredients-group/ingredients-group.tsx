import React, { forwardRef } from 'react';
import { useAppSelector } from '../../../hooks/typed-hookes';
import IngredientItem from '../ingredient-item/ingredient-item';
import IngredientInformation from '../ingredient-information/ingredient-information';
import styles from './ingredients-group.module.scss';
import { TIngredient } from '@utils/ingredient-types';

type IngredientsGroupProps = {
	type: TIngredient[];
	groupName: string;
	onIngredientClick: (ingredient: TIngredient) => void;
};

// eslint-disable-next-line react/display-name
const IngredientsGroup = forwardRef<HTMLHeadingElement, IngredientsGroupProps>(
	({ type, groupName, onIngredientClick }, ref) => {
		// Получаем данные из конструктора
		const { bun, ingredients = [] } = useAppSelector(
			(state) => state.burgerConstructor
		);

		// Функция для подсчета количества ингредиентов
		const countIngredients = (id: string) => {
			const bunCount = bun?._id === id ? 2 : 0; // Булки учитываются дважды
			const ingredientsCount = ingredients.filter(
				(item: TIngredient) => item._id === id
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
