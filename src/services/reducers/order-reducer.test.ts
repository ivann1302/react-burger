import orderReducer from './order-reducer';
import {
	SET_ORDER_DATA,
	CLEAR_ORDER_DATA,
	SET_ORDER_LOADING,
	SET_ORDER_ERROR,
} from '../actions/order-actions';
import type { TOrderTypes } from './order-reducer';

describe('orderReducer', () => {
	const initialState = {
		orderData: null,
		loading: false,
		error: null,
	};

	const sampleOrder = {
		order: {
			number: 12345,
		},
	};

	it('should return initial state on unknown action', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as TOrderTypes;
		const result = orderReducer(undefined, unknownAction);
		expect(result).toEqual(initialState);
	});

	it('should handle SET_ORDER_DATA', () => {
		const action: TOrderTypes = {
			type: SET_ORDER_DATA,
			payload: sampleOrder,
		};
		const result = orderReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			orderData: sampleOrder,
		});
	});

	it('should handle CLEAR_ORDER_DATA', () => {
		const state = {
			...initialState,
			orderData: sampleOrder,
		};
		const action: TOrderTypes = { type: CLEAR_ORDER_DATA };
		const result = orderReducer(state, action);
		expect(result).toEqual({
			...initialState,
			orderData: null,
		});
	});

	it('should handle SET_ORDER_LOADING', () => {
		const action: TOrderTypes = { type: SET_ORDER_LOADING, payload: true };
		const result = orderReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle SET_ORDER_ERROR', () => {
		const action: TOrderTypes = {
			type: SET_ORDER_ERROR,
			payload: 'Something went wrong',
		};
		const result = orderReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			error: 'Something went wrong',
		});
	});
});
