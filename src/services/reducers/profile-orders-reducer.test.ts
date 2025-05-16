import profileOrdersReducer from './profile-orders-reducer';
import {
	PROFILE_ORDERS_CONNECT,
	PROFILE_ORDERS_DISCONNECT,
	PROFILE_ORDERS_WS_CONNECTING,
	PROFILE_ORDERS_WS_OPEN,
	PROFILE_ORDERS_WS_CLOSE,
	PROFILE_ORDERS_WS_ERROR,
	PROFILE_ORDERS_WS_MESSAGE,
} from '../actions/profile-orders-actions';
import { TOrder } from '../../utils/ingredient-types';

describe('profileOrdersReducer', () => {
	const initialState = {
		wsConnected: false,
		orders: [],
		error: undefined,
		connectionStatus: 'idle' as const,
	};

	const mockOrders: TOrder[] = [
		{
			_id: '1',
			status: 'done',
			name: 'Order 1',
			ingredients: ['123', '456'],
			createdAt: '2024-01-01T00:00:00Z',
			updatedAt: '2024-01-01T00:00:00Z',
			number: '1',
		},
	];

	it('should return initial state on unknown action', () => {
		const unknownAction = { type: 'UNKNOWN' } as any;
		expect(profileOrdersReducer(undefined, unknownAction)).toEqual(
			initialState
		);
	});

	it('should return same state for PROFILE_ORDERS_CONNECT and DISCONNECT', () => {
		const result1 = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_CONNECT,
			payload: 'ws://example.com',
		});
		const result2 = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_DISCONNECT,
		});

		expect(result1).toEqual(initialState);
		expect(result2).toEqual(initialState);
	});

	it('should handle PROFILE_ORDERS_WS_CONNECTING', () => {
		const result = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_WS_CONNECTING,
		});
		expect(result).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it('should handle PROFILE_ORDERS_WS_OPEN', () => {
		const result = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_WS_OPEN,
		});
		expect(result).toEqual({
			...initialState,
			wsConnected: true,
			error: undefined,
		});
	});

	it('should handle PROFILE_ORDERS_WS_ERROR', () => {
		const result = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_WS_ERROR,
			payload: 'Connection error',
		});
		expect(result).toEqual({
			...initialState,
			wsConnected: false,
			error: 'Connection error',
		});
	});

	it('should handle PROFILE_ORDERS_WS_CLOSE', () => {
		const modifiedState = {
			...initialState,
			wsConnected: true,
			error: 'Something went wrong',
		};

		const result = profileOrdersReducer(modifiedState, {
			type: PROFILE_ORDERS_WS_CLOSE,
		});

		expect(result).toEqual({
			...modifiedState,
			wsConnected: false,
			error: undefined,
		});
	});

	it('should handle PROFILE_ORDERS_WS_MESSAGE', () => {
		const result = profileOrdersReducer(initialState, {
			type: PROFILE_ORDERS_WS_MESSAGE,
			payload: {
				orders: mockOrders,
				total: 5,
				totalToday: 2,
			},
		});

		expect(result).toEqual({
			...initialState,
			orders: mockOrders,
			error: undefined,
		});
	});
});
