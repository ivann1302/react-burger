import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typed-hookes';

import IngredientDetailsModal from '../../components/burger-ingredients/ingredient-details/ingredient-details';

export default function IngredientPage(): JSX.Element {
	const { id } = useParams();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const ingredient = ingredients.find((item) => item._id === id);

	if (!ingredient) return <p>Ингредиент не найден</p>;

	return (
		<section style={{ paddingTop: '40px' }}>
			<IngredientDetailsModal ingredient={ingredient} />
		</section>
	);
}
