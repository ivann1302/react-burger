import ingredientDetailsReducer, {
	TIngredientDetailsActions,
	initialState,
} from './ingredient-details-reducer';
import {
	SET_SELECTED_INGREDIENT,
	CLEAR_SELECTED_INGREDIENT,
} from '../actions/ingredient-details-action';
import { TIngredient } from '../../utils/ingredient-types';

describe('ingredientDetailsReducer', () => {
	const sampleIngredient: TIngredient = {
		_id: 'abc123',
		name: 'Test Sauce',
		type: 'sauce',
		proteins: 0,
		fat: 0,
		carbohydrates: 0,
		calories: 50,
		price: 25,
		image: 'image.jpg',
		image_mobile: 'image_mobile.jpg',
		image_large: 'image_large.jpg',
		__v: 0,
	};

	it('should return the initial state when action is unknown', () => {
		const unknownAction = {
			type: 'UNKNOWN_ACTION',
		} as unknown as TIngredientDetailsActions;
		const result = ingredientDetailsReducer(undefined, unknownAction);
		expect(result).toEqual(initialState);
	});

	it('should handle SET_SELECTED_INGREDIENT', () => {
		const action: TIngredientDetailsActions = {
			type: SET_SELECTED_INGREDIENT,
			payload: sampleIngredient,
		};
		const result = ingredientDetailsReducer(initialState, action);
		expect(result).toEqual({
			selectedIngredient: sampleIngredient,
		});
	});

	it('should handle CLEAR_SELECTED_INGREDIENT', () => {
		const state = {
			selectedIngredient: sampleIngredient,
		};
		const action: TIngredientDetailsActions = {
			type: CLEAR_SELECTED_INGREDIENT,
		};
		const result = ingredientDetailsReducer(state, action);
		expect(result).toEqual({
			selectedIngredient: null,
		});
	});
});
