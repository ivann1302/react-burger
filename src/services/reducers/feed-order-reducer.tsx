import {
	FEED_ORDERS_WS_CONNECTING,
	FEED_ORDERS_WS_OPEN,
	FEED_ORDERS_WS_CLOSE,
	FEED_ORDERS_WS_ERROR,
	FEED_ORDERS_WS_MESSAGE,
	TFeedOrdersActions,
} from '../actions/feed-orders-actions';
import { TOrder } from '../../utils/ingredient-types';

type TFeedOrdersState = {
	orders: TOrder[];
	total: number;
	totalToday: number;
	wsConnected: boolean;
	loading: boolean;
	error: string | null;
};

export const initialState: TFeedOrdersState = {
	orders: [],
	total: 0,
	totalToday: 0,
	wsConnected: false,
	loading: false,
	error: null,
};

const feedOrdersReducer = (
	state = initialState,
	action: TFeedOrdersActions
): TFeedOrdersState => {
	switch (action.type) {
		case FEED_ORDERS_WS_CONNECTING:
			return {
				...state,
				loading: true,
				wsConnected: false,
			};

		case FEED_ORDERS_WS_OPEN:
			return {
				...state,
				loading: false,
				wsConnected: true,
				error: null,
			};

		case FEED_ORDERS_WS_CLOSE:
			return {
				...initialState,
			};

		case FEED_ORDERS_WS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				wsConnected: false,
			};

		case FEED_ORDERS_WS_MESSAGE:
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};

		default:
			return state;
	}
};

export default feedOrdersReducer;
