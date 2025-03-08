import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const NO_ACTION = 'NO_ACTION';

export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: {
		...ingredient,
		uniqueId: uuidv4(),
	},
});

export const addBun = (bun) => ({
	type: ADD_BUN,
	payload: bun,
});

export const removeIngredient = (index) => ({
	type: REMOVE_INGREDIENT,
	payload: index,
});

export const moveIngredient = (fromIndex, toIndex) => {
	if (typeof fromIndex !== 'number' || typeof toIndex !== 'number') {
		return { type: NO_ACTION }; // Безопасный пустой экшен
	}
	return {
		type: MOVE_INGREDIENT,
		payload: { fromIndex, toIndex },
	};
};

export const clearConstructor = () => ({
	type: CLEAR_CONSTRUCTOR,
});
