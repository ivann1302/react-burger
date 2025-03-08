export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';
export const CLEAR_SELECTED_INGREDIENT = 'CLEAR_SELECTED_INGREDIENT';

export const setSelectedIngredient = (ingredient) => ({
	type: SET_SELECTED_INGREDIENT,
	payload: ingredient,
});

export const clearSelectedIngredient = () => ({
	type: CLEAR_SELECTED_INGREDIENT,
});
