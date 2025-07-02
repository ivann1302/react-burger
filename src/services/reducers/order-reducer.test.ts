import orderReducer, { initialState } from './order-reducer';
import {
	SET_ORDER_DATA,
	CLEAR_ORDER_DATA,
	SET_ORDER_LOADING,
	SET_ORDER_ERROR,
} from '../actions/order-actions';
import type { TOrderTypes } from './order-reducer';

describe('orderReducer', () => {
	const sampleOrder = {
		order: {
			number: 12345,
		},
	};

	const stateWithOrder = {
		...initialState,
		orderData: sampleOrder,
	};

	const loadingState = {
		...initialState,
		loading: true,
	};

	const errorMessage = 'Something went wrong';

	const errorState = {
		...initialState,
		error: errorMessage,
	};

	it('should return initial state on unknown action', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as TOrderTypes;
		expect(orderReducer(undefined, unknownAction)).toEqual(initialState);
	});

	it('should handle SET_ORDER_DATA', () => {
		const action: TOrderTypes = {
			type: SET_ORDER_DATA,
			payload: sampleOrder,
		};
		expect(orderReducer(initialState, action)).toEqual(stateWithOrder);
	});

	it('should handle CLEAR_ORDER_DATA', () => {
		const action: TOrderTypes = { type: CLEAR_ORDER_DATA };
		expect(orderReducer(stateWithOrder, action)).toEqual({
			...initialState,
			orderData: null,
		});
	});

	it('should handle SET_ORDER_LOADING', () => {
		const action: TOrderTypes = { type: SET_ORDER_LOADING, payload: true };
		expect(orderReducer(initialState, action)).toEqual(loadingState);
	});

	it('should handle SET_ORDER_ERROR', () => {
		const action: TOrderTypes = {
			type: SET_ORDER_ERROR,
			payload: errorMessage,
		};
		expect(orderReducer(initialState, action)).toEqual(errorState);
	});
});
