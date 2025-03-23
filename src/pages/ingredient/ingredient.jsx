import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetailsModal from '../../components/burger-ingredients/ingredient-details/ingredient-details';

export default function IngredientPage() {
	const { id } = useParams();
	const { ingredients } = useSelector((state) => state.ingredients);

	const ingredient = ingredients.find((item) => item._id === id);

	if (!ingredient) return <p>Ингредиент не найден</p>;

	return (
		<section style={{ paddingTop: '40px' }}>
			<IngredientDetailsModal ingredient={ingredient} />
		</section>
	);
}
