import {
	SET_SELECTED_INGREDIENT,
	CLEAR_SELECTED_INGREDIENT,
} from '../actions/ingredient-details-action';
import { TIngredient } from './../../utils/ingredient-types';

interface IIngredientDetailsState {
	selectedIngredient: TIngredient | null;
}

// Начальное состояние
const initialState: IIngredientDetailsState = {
	selectedIngredient: null,
};

// Типы экшенов
type TSetSelectedIngredientAction = {
	type: typeof SET_SELECTED_INGREDIENT;
	payload: TIngredient;
};

type TClearSelectedIngredientAction = {
	type: typeof CLEAR_SELECTED_INGREDIENT;
};

// Объединённый тип всех экшенов
type TIngredientDetailsActions =
	| TSetSelectedIngredientAction
	| TClearSelectedIngredientAction;

const ingredientDetailsReducer = (
	state: IIngredientDetailsState = initialState,
	action: TIngredientDetailsActions
) => {
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
