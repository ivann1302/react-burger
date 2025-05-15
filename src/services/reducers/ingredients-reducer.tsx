import {
	FETCH_INGREDIENTS_REQUEST,
	FETCH_INGREDIENTS_SUCCESS,
	FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients-actions';
import { TIngredient } from './../../utils/ingredient-types';

type TFetchIngredientsRequest = {
	type: typeof FETCH_INGREDIENTS_REQUEST;
};

type TFetchIngredientsSuccess = {
	type: typeof FETCH_INGREDIENTS_SUCCESS;
	payload: TIngredient[];
};

type TFetchINgredientsFailure = {
	type: typeof FETCH_INGREDIENTS_FAILURE;
	error: Error;
	payload?: Error;
};

type TIngredientTypes =
	| TFetchIngredientsRequest
	| TFetchIngredientsSuccess
	| TFetchINgredientsFailure;

type TIngredientsState = {
	ingredients: TIngredient[];
	loading: boolean;
	error: null | Error;
};

const initialState: TIngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
};

const ingredientsReducer = (
	state: TIngredientsState = initialState,
	action: TIngredientTypes
) => {
	switch (action.type) {
		case FETCH_INGREDIENTS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.payload,
				loading: false,
			};
		case FETCH_INGREDIENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error || action.payload,
			};
		default:
			return state;
	}
};

export default ingredientsReducer;
