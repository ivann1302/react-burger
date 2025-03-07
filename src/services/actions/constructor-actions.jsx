export const addIngredient = (ingredient) => ({
	type: 'ADD_INGREDIENT',
	payload: ingredient,
});

export const addBun = (bun) => ({
	type: 'ADD_BUN',
	payload: bun,
});

export const removeIngredient = (ingredient) => ({
	type: 'REMOVE_INGREDIENT',
	payload: ingredient,
});

export const clearConstructor = () => ({
	type: 'CLEAR_CONSTRUCTOR',
});
