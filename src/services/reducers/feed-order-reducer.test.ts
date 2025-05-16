import feedOrdersReducer from './feed-order-reducer';
import {
	FEED_ORDERS_WS_CONNECTING,
	FEED_ORDERS_WS_OPEN,
	FEED_ORDERS_WS_CLOSE,
	FEED_ORDERS_WS_ERROR,
	FEED_ORDERS_WS_MESSAGE,
	TFeedOrdersActions,
} from '../actions/feed-orders-actions';
import { TOrder } from '../../utils/ingredient-types';

describe('feedOrdersReducer', () => {
	const initialState = {
		orders: [],
		total: 0,
		totalToday: 0,
		wsConnected: false,
		loading: false,
		error: null,
	};

	const mockOrders: TOrder[] = [
		{
			_id: '1',
			status: 'done',
			name: 'Test Order 1',
			ingredients: ['a', 'b', 'c'],
			createdAt: '2024-01-01T00:00:00Z',
			updatedAt: '2024-01-01T00:00:00Z',
			number: '1001', // ✅
		},
	];

	it('should return the initial state if action is unknown', () => {
		const fakeAction = {
			type: 'UNKNOWN_ACTION',
		} as unknown as TFeedOrdersActions;
		expect(feedOrdersReducer(undefined, fakeAction)).toEqual(initialState);
	});

	it('should handle FEED_ORDERS_WS_CONNECTING', () => {
		const action: TFeedOrdersActions = { type: FEED_ORDERS_WS_CONNECTING };
		const result = feedOrdersReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			loading: true,
			wsConnected: false,
		});
	});

	it('should handle FEED_ORDERS_WS_OPEN', () => {
		const action: TFeedOrdersActions = { type: FEED_ORDERS_WS_OPEN };
		const result = feedOrdersReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			wsConnected: true,
			loading: false,
			error: null,
		});
	});

	it('should handle FEED_ORDERS_WS_CLOSE', () => {
		const modifiedState = {
			...initialState,
			wsConnected: true,
			orders: mockOrders,
			total: 10,
			totalToday: 5,
		};
		const action: TFeedOrdersActions = { type: FEED_ORDERS_WS_CLOSE };
		const result = feedOrdersReducer(modifiedState, action);
		expect(result).toEqual(initialState);
	});

	it('should handle FEED_ORDERS_WS_ERROR', () => {
		const action: TFeedOrdersActions = {
			type: FEED_ORDERS_WS_ERROR,
			payload: 'Connection failed',
		};
		const result = feedOrdersReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			error: 'Connection failed',
			wsConnected: false,
			loading: false,
		});
	});

	it('should handle FEED_ORDERS_WS_MESSAGE', () => {
		const action: TFeedOrdersActions = {
			type: FEED_ORDERS_WS_MESSAGE,
			payload: {
				orders: mockOrders,
				total: 123,
				totalToday: 45,
			},
		};
		const result = feedOrdersReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			orders: mockOrders,
			total: 123,
			totalToday: 45,
		});
	});
});
