import {
	SET_SELECTED_INGREDIENT,
	CLEAR_SELECTED_INGREDIENT,
} from './../actions/ingredient-details-action';

const initialState = {
	selectedIngredient: null, // Начальное состояние
};

const ingredientDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_INGREDIENT:
			return {
				...state,
				selectedIngredient: action.payload, // Обновляем состояние
			};
		case CLEAR_SELECTED_INGREDIENT:
			return {
				...state,
				selectedIngredient: null, // Сбрасываем состояние
			};
		default:
			return state;
	}
};

export default ingredientDetailsReducer;
