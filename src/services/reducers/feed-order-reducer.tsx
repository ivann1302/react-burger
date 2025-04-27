// services/reducers/feed-orders-reducer.ts
import {
	FEED_ORDERS_REQUEST,
	FEED_ORDERS_SUCCESS,
	FEED_ORDERS_FAILURE,
	FEED_ORDERS_UPDATE,
	TFeedOrdersActions,
} from '../actions/feed-orders-actions';
import { TOrder } from './../../utils/ingredient-types';

type TFeedOrdersState = {
	orders: TOrder[];
	loading: boolean;
	error: string | null;
};

const initialState: TFeedOrdersState = {
	orders: [],
	loading: false,
	error: null,
};

const feedOrdersReducer = (
	state = initialState,
	action: TFeedOrdersActions
): TFeedOrdersState => {
	switch (action.type) {
		case FEED_ORDERS_REQUEST:
			return { ...state, loading: true, error: null };

		case FEED_ORDERS_SUCCESS:
			return { ...state, loading: false, orders: action.payload };

		case FEED_ORDERS_FAILURE:
			return { ...state, loading: false, error: action.payload };

		case FEED_ORDERS_UPDATE:
			return {
				...state,
				orders: [action.payload, ...state.orders],
			};

		default:
			return state;
	}
};

export default feedOrdersReducer;
