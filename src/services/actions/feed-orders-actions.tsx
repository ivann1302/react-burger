import { AppDispatch } from '../store';
import { TOrder } from '../../utils/ingredient-types';
import { BASE_URL } from '../../utils/api';

// Типы для действий
export const FEED_ORDERS_REQUEST = 'FEED_ORDERS_REQUEST';
export const FEED_ORDERS_SUCCESS = 'FEED_ORDERS_SUCCESS';
export const FEED_ORDERS_FAILURE = 'FEED_ORDERS_FAILURE';
export const FEED_ORDERS_UPDATE = 'FEED_ORDERS_UPDATE';

export const FEED_ORDERS_CONNECT = 'FEED_ORDERS_CONNECT';
export const FEED_ORDERS_DISCONNECT = 'FEED_ORDERS_DISCONNECT';
export const FEED_ORDERS_WS_CONNECTING = 'FEED_ORDERS_WS_CONNECTING';
export const FEED_ORDERS_WS_OPEN = 'FEED_ORDERS_WS_OPEN';
export const FEED_ORDERS_WS_CLOSE = 'FEED_ORDERS_WS_CLOSE';
export const FEED_ORDERS_WS_ERROR = 'FEED_ORDERS_WS_ERROR';
export const FEED_ORDERS_WS_MESSAGE = 'FEED_ORDERS_WS_MESSAGE';

const feedOrderApi = `${BASE_URL}/orders/all`;

// Типы действий
type TFeedOrdersRequestAction = {
	type: typeof FEED_ORDERS_REQUEST;
};

type TFeedOrdersSuccessAction = {
	type: typeof FEED_ORDERS_SUCCESS;
	payload: TOrder[];
};

type TFeedOrdersFailureAction = {
	type: typeof FEED_ORDERS_FAILURE;
	payload: string;
};

type TFeedOrdersUpdateAction = {
	type: typeof FEED_ORDERS_UPDATE;
	payload: TOrder;
};

type TFeedOrdersConnectAction = {
	type: typeof FEED_ORDERS_CONNECT;
	payload: string;
};

type TFeedOrdersDisconnectAction = {
	type: typeof FEED_ORDERS_DISCONNECT;
};

type TFeedOrdersWsConnectingAction = {
	type: typeof FEED_ORDERS_WS_CONNECTING;
};

type TFeedOrdersWsOpenAction = {
	type: typeof FEED_ORDERS_WS_OPEN;
};

type TFeedOrdersWsCloseAction = {
	type: typeof FEED_ORDERS_WS_CLOSE;
};

type TFeedOrdersWsErrorAction = {
	type: typeof FEED_ORDERS_WS_ERROR;
	payload: string;
};

type TFeedOrdersWsMessageAction = {
	type: typeof FEED_ORDERS_WS_MESSAGE;
	payload: {
		orders: TOrder[];
		total: number;
		totalToday: number;
	};
};

// Объединенный тип действий
export type TFeedOrdersActions =
	| TFeedOrdersRequestAction
	| TFeedOrdersSuccessAction
	| TFeedOrdersFailureAction
	| TFeedOrdersUpdateAction
	| TFeedOrdersConnectAction
	| TFeedOrdersDisconnectAction
	| TFeedOrdersWsConnectingAction
	| TFeedOrdersWsOpenAction
	| TFeedOrdersWsCloseAction
	| TFeedOrdersWsErrorAction
	| TFeedOrdersWsMessageAction;

// Действия
export const feedOrdersRequest = (): TFeedOrdersRequestAction => ({
	type: FEED_ORDERS_REQUEST,
});

export const feedOrdersSuccess = (
	orders: TOrder[]
): TFeedOrdersSuccessAction => ({
	type: FEED_ORDERS_SUCCESS,
	payload: orders,
});

export const feedOrdersFailure = (error: string): TFeedOrdersFailureAction => ({
	type: FEED_ORDERS_FAILURE,
	payload: error,
});

export const feedOrdersUpdate = (order: TOrder): TFeedOrdersUpdateAction => ({
	type: FEED_ORDERS_UPDATE,
	payload: order,
});

export const feedOrdersConnect = (url: string): TFeedOrdersConnectAction => ({
	type: FEED_ORDERS_CONNECT,
	payload: url,
});

export const feedOrdersDisconnect = (): TFeedOrdersDisconnectAction => ({
	type: FEED_ORDERS_DISCONNECT,
});

// Thunk для загрузки заказов
export const fetchFeedOrders = () => async (dispatch: AppDispatch) => {
	dispatch(feedOrdersRequest());
	try {
		const response = await fetch(feedOrderApi);
		const data = await response.json();

		if (data.success) {
			dispatch(feedOrdersSuccess(data.orders));
		} else {
			dispatch(feedOrdersFailure('Не удалось загрузить заказы'));
		}
	} catch (error) {
		dispatch(
			feedOrdersFailure(error instanceof Error ? error.message : 'Ошибка сети')
		);
	}
};
