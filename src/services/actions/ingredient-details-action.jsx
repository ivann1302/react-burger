export const setSelectedIngredient = (ingredient) => ({
	type: 'SET_SELECTED_INGREDIENT',
	payload: ingredient,
});

export const clearSelectedIngredient = () => ({
	type: 'CLEAR_SELECTED_INGREDIENT',
});
