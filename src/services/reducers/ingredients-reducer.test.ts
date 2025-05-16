import ingredientsReducer from './ingredients-reducer';
import {
	FETCH_INGREDIENTS_REQUEST,
	FETCH_INGREDIENTS_SUCCESS,
	FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients-actions';
import { TIngredient } from '../../utils/ingredient-types';

describe('ingredientsReducer', () => {
	const initialState = {
		ingredients: [],
		loading: false,
		error: null,
	};

	const sampleIngredients: TIngredient[] = [
		{
			_id: '123',
			name: 'Test Ingredient',
			type: 'main',
			proteins: 10,
			fat: 20,
			carbohydrates: 30,
			calories: 400,
			price: 50,
			image: 'img.jpg',
			image_large: 'img-large.jpg',
			image_mobile: 'img-mobile.jpg',
			__v: 0,
		},
	];

	it('should return initial state when action is unknown', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown;
		const result = ingredientsReducer(undefined, unknownAction as any);
		expect(result).toEqual(initialState);
	});

	it('should handle FETCH_INGREDIENTS_REQUEST', () => {
		const result = ingredientsReducer(initialState, {
			type: FETCH_INGREDIENTS_REQUEST,
		});
		expect(result).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
		const result = ingredientsReducer(
			{ ...initialState, loading: true },
			{
				type: FETCH_INGREDIENTS_SUCCESS,
				payload: sampleIngredients,
			}
		);
		expect(result).toEqual({
			...initialState,
			ingredients: sampleIngredients,
			loading: false,
		});
	});

	it('should handle FETCH_INGREDIENTS_FAILURE (error in "error")', () => {
		const error = new Error('Fetch failed');
		const result = ingredientsReducer(
			{ ...initialState, loading: true },
			{
				type: FETCH_INGREDIENTS_FAILURE,
				error,
			}
		);
		expect(result).toEqual({
			...initialState,
			loading: false,
			error,
		});
	});

	it('should handle FETCH_INGREDIENTS_FAILURE (error in "payload")', () => {
		const error = new Error('Fetch failed from payload');
		const result = ingredientsReducer(
			{ ...initialState, loading: true },
			{
				type: FETCH_INGREDIENTS_FAILURE,
				error: error,
				payload: error,
			}
		);
		expect(result).toEqual({
			...initialState,
			loading: false,
			error,
		});
	});
});
