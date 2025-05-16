import profileOrdersReducer, { initialState } from './profile-orders-reducer';
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

	const connectingState = {
		...initialState,
		wsConnected: false,
		error: undefined,
	};

	const connectedState = {
		...initialState,
		wsConnected: true,
		error: undefined,
	};

	const errorState = {
		...initialState,
		wsConnected: false,
		error: 'Connection error',
	};

	const closedState = {
		...initialState,
		wsConnected: false,
		error: undefined,
	};

	const messageReceivedState = {
		...initialState,
		orders: mockOrders,
		error: undefined,
	};

	it('should return initial state on unknown action', () => {
		const unknownAction = { type: 'UNKNOWN' } as any;
		expect(profileOrdersReducer(undefined, unknownAction)).toEqual(
			initialState
		);
	});

	it('should return same state for PROFILE_ORDERS_CONNECT and DISCONNECT', () => {
		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_CONNECT,
				payload: 'ws://example.com',
			})
		).toEqual(initialState);

		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_DISCONNECT,
			})
		).toEqual(initialState);
	});

	it('should handle PROFILE_ORDERS_WS_CONNECTING', () => {
		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_WS_CONNECTING,
			})
		).toEqual(connectingState);
	});

	it('should handle PROFILE_ORDERS_WS_OPEN', () => {
		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_WS_OPEN,
			})
		).toEqual(connectedState);
	});

	it('should handle PROFILE_ORDERS_WS_ERROR', () => {
		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_WS_ERROR,
				payload: 'Connection error',
			})
		).toEqual(errorState);
	});

	it('should handle PROFILE_ORDERS_WS_CLOSE', () => {
		const modifiedState = {
			...initialState,
			wsConnected: true,
			error: 'Something went wrong',
		};

		expect(
			profileOrdersReducer(modifiedState, {
				type: PROFILE_ORDERS_WS_CLOSE,
			})
		).toEqual(closedState);
	});

	it('should handle PROFILE_ORDERS_WS_MESSAGE', () => {
		expect(
			profileOrdersReducer(initialState, {
				type: PROFILE_ORDERS_WS_MESSAGE,
				payload: {
					orders: mockOrders,
					total: 5,
					totalToday: 2,
				},
			})
		).toEqual(messageReceivedState);
	});
});
