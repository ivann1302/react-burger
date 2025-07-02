import feedOrdersReducer, { initialState } from './feed-order-reducer';
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
	const mockOrders: TOrder[] = [
		{
			_id: '1',
			status: 'done',
			name: 'Test Order 1',
			ingredients: ['a', 'b', 'c'],
			createdAt: '2024-01-01T00:00:00Z',
			updatedAt: '2024-01-01T00:00:00Z',
			number: '1001',
		},
	];

	const connectingState = {
		...initialState,
		loading: true,
		wsConnected: false,
	};

	const openState = {
		...initialState,
		wsConnected: true,
		loading: false,
		error: null,
	};

	const errorMessage = 'Connection failed';

	const errorState = {
		...initialState,
		error: errorMessage,
		wsConnected: false,
		loading: false,
	};

	const messageState = {
		...initialState,
		orders: mockOrders,
		total: 123,
		totalToday: 45,
	};

	it('should return the initial state if action is unknown', () => {
		const fakeAction = {
			type: 'UNKNOWN_ACTION',
		} as unknown as TFeedOrdersActions;

		expect(feedOrdersReducer(undefined, fakeAction)).toEqual(initialState);
	});

	it('should handle FEED_ORDERS_WS_CONNECTING', () => {
		expect(
			feedOrdersReducer(initialState, { type: FEED_ORDERS_WS_CONNECTING })
		).toEqual(connectingState);
	});

	it('should handle FEED_ORDERS_WS_OPEN', () => {
		expect(
			feedOrdersReducer(initialState, { type: FEED_ORDERS_WS_OPEN })
		).toEqual(openState);
	});

	it('should handle FEED_ORDERS_WS_CLOSE', () => {
		const modifiedState = {
			...initialState,
			wsConnected: true,
			orders: mockOrders,
			total: 10,
			totalToday: 5,
		};

		expect(
			feedOrdersReducer(modifiedState, { type: FEED_ORDERS_WS_CLOSE })
		).toEqual(initialState);
	});

	it('should handle FEED_ORDERS_WS_ERROR', () => {
		expect(
			feedOrdersReducer(initialState, {
				type: FEED_ORDERS_WS_ERROR,
				payload: errorMessage,
			})
		).toEqual(errorState);
	});

	it('should handle FEED_ORDERS_WS_MESSAGE', () => {
		expect(
			feedOrdersReducer(initialState, {
				type: FEED_ORDERS_WS_MESSAGE,
				payload: {
					orders: mockOrders,
					total: 123,
					totalToday: 45,
				},
			})
		).toEqual(messageState);
	});
});
