import ingredientsReducer, { initialState } from './ingredients-reducer';
import {
	FETCH_INGREDIENTS_REQUEST,
	FETCH_INGREDIENTS_SUCCESS,
	FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients-actions';
import { TIngredient } from '../../utils/ingredient-types';

describe('ingredientsReducer', () => {
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

	const loadingState = {
		...initialState,
		loading: true,
		error: null,
	};

	const successState = {
		...initialState,
		ingredients: sampleIngredients,
		loading: false,
	};

	const error = new Error('Fetch failed');

	const errorState = {
		...initialState,
		loading: false,
		error,
	};

	it('should return initial state when action is unknown', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
		expect(ingredientsReducer(undefined, unknownAction)).toEqual(initialState);
	});

	it('should handle FETCH_INGREDIENTS_REQUEST', () => {
		expect(
			ingredientsReducer(initialState, {
				type: FETCH_INGREDIENTS_REQUEST,
			})
		).toEqual(loadingState);
	});

	it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
		const prevState = loadingState;
		expect(
			ingredientsReducer(prevState, {
				type: FETCH_INGREDIENTS_SUCCESS,
				payload: sampleIngredients,
			})
		).toEqual(successState);
	});

	it('should handle FETCH_INGREDIENTS_FAILURE (error in "error")', () => {
		const prevState = loadingState;
		expect(
			ingredientsReducer(prevState, {
				type: FETCH_INGREDIENTS_FAILURE,
				error,
			})
		).toEqual(errorState);
	});

	it('should handle FETCH_INGREDIENTS_FAILURE (error in "payload")', () => {
		const prevState = loadingState;
		expect(
			ingredientsReducer(prevState, {
				type: FETCH_INGREDIENTS_FAILURE,
				error,
				payload: error,
			})
		).toEqual(errorState);
	});
});
