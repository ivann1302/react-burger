import constructorReducer from './constructor-reducer';
import {
	ADD_INGREDIENT,
	ADD_BUN,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from '../actions/constructor-actions';
import { TIngredient } from '@utils/ingredient-types';

jest.mock('uuid', () => ({
	v4: () => 'test-uuid',
}));

const sampleIngredient: TIngredient = {
	_id: '1',
	name: 'Test Ingredient',
	type: 'main',
	proteins: 10,
	fat: 5,
	carbohydrates: 15,
	calories: 100,
	price: 50,
	image: 'test.jpg',
	image_large: 'test-large.jpg',
	image_mobile: 'test-mobile.jpg',
	__v: 0,
};

const initialState = {
	bun: null,
	ingredients: [],
};

describe('constructorReducer', () => {
	const ingredientWithUuid = {
		...sampleIngredient,
		uniqueId: 'test-uuid',
		index: 0,
	};

	it('should return the initial state', () => {
		expect(constructorReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle ADD_BUN', () => {
		const result = constructorReducer(initialState, {
			type: ADD_BUN,
			payload: sampleIngredient,
		});
		expect(result).toEqual({
			...initialState,
			bun: sampleIngredient,
		});
	});

	it('should handle ADD_INGREDIENT', () => {
		const result = constructorReducer(initialState, {
			type: ADD_INGREDIENT,
			payload: {
				...sampleIngredient,
				uniqueId: 'test-uuid',
			},
		});
		expect(result.ingredients).toEqual([ingredientWithUuid]);
	});

	it('should handle REMOVE_INGREDIENT', () => {
		const state = {
			...initialState,
			ingredients: [
				{ ...sampleIngredient, uniqueId: 'to-remove', index: 0 },
				{ ...sampleIngredient, uniqueId: 'keep', index: 1 },
			],
		};
		const result = constructorReducer(state, {
			type: REMOVE_INGREDIENT,
			payload: 'to-remove',
		});
		expect(result.ingredients).toEqual([
			{ ...sampleIngredient, uniqueId: 'keep', index: 1 },
		]);
	});

	it('should handle MOVE_INGREDIENT', () => {
		const state = {
			...initialState,
			ingredients: [
				{ ...sampleIngredient, uniqueId: '1', index: 0 },
				{ ...sampleIngredient, uniqueId: '2', index: 1 },
				{ ...sampleIngredient, uniqueId: '3', index: 2 },
			],
		};
		const expectedOrder = ['2', '3', '1'];
		const expectedIndexes = [0, 1, 2];

		const result = constructorReducer(state, {
			type: MOVE_INGREDIENT,
			payload: { fromIndex: 0, toIndex: 2 },
		});

		expect(result.ingredients.map((i) => i.uniqueId)).toEqual(expectedOrder);
		expect(result.ingredients.map((i) => i.index)).toEqual(expectedIndexes);
	});

	it('should handle MOVE_INGREDIENT with invalid indexes (no-op)', () => {
		const state = {
			...initialState,
			ingredients: [
				{ ...sampleIngredient, uniqueId: '1', index: 0 },
				{ ...sampleIngredient, uniqueId: '2', index: 1 },
			],
		};
		const result = constructorReducer(state, {
			type: MOVE_INGREDIENT,
			payload: { fromIndex: -1, toIndex: 5 },
		});
		expect(result).toEqual(state);
	});

	it('should handle CLEAR_CONSTRUCTOR', () => {
		const state = {
			bun: sampleIngredient,
			ingredients: [{ ...sampleIngredient, uniqueId: '1', index: 0 }],
		};
		const result = constructorReducer(state, {
			type: CLEAR_CONSTRUCTOR,
		});
		expect(result).toEqual(initialState);
	});
});
