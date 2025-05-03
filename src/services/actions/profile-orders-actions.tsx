import { TOrder } from '@utils/ingredient-types';
import { AppDispatch } from '@services/store';
import { WS_ORDER_ALL_URL } from '@utils/api';

export const PROFILE_ORDERS_CONNECT = 'PROFILE_ORDERS_CONNECT';
export const PROFILE_ORDERS_DISCONNECT = 'PROFILE_ORDERS_DISCONNECT';
export const PROFILE_ORDERS_WS_CONNECTING = 'PROFILE_ORDERS_WS_CONNECTING';
export const PROFILE_ORDERS_WS_OPEN = 'PROFILE_ORDERS_WS_OPEN';
export const PROFILE_ORDERS_WS_CLOSE = 'PROFILE_ORDERS_WS_CLOSE';
export const PROFILE_ORDERS_WS_ERROR = 'PROFILE_ORDERS_WS_ERROR';
export const PROFILE_ORDERS_WS_MESSAGE = 'PROFILE_ORDERS_WS_MESSAGE';
export const PROFILE_ORDERS_REQUEST = 'PROFILE_ORDERS_REQUEST';
export const PROFILE_ORDERS_SUCCESS = 'PROFILE_ORDERS_SUCCESS';
export const PROFILE_ORDERS_FAILURE = 'PROFILE_ORDERS_FAILURE';

export const connectProfileOrders = (url: string) => ({
	type: PROFILE_ORDERS_CONNECT,
	payload: url,
});

export const disconnectProfileOrders = () => ({
	type: PROFILE_ORDERS_DISCONNECT,
});

// Типы для экшенов WebSocket
type TProfileOrdersWsConnectingAction = {
	type: typeof PROFILE_ORDERS_WS_CONNECTING;
};

type TProfileOrdersWsOpenAction = {
	type: typeof PROFILE_ORDERS_WS_OPEN;
};

type TProfileOrdersWsCloseAction = {
	type: typeof PROFILE_ORDERS_WS_CLOSE;
};

type TProfileOrdersWsErrorAction = {
	type: typeof PROFILE_ORDERS_WS_ERROR;
	payload: string;
};

type TProfileOrdersWsMessageAction = {
	type: typeof PROFILE_ORDERS_WS_MESSAGE;
	payload: {
		orders: TOrder[];
		total: number;
		totalToday: number;
	};
};

type TProfileOrdersRequestAction = {
	type: typeof PROFILE_ORDERS_REQUEST;
};

type TProfileOrdersSuccessAction = {
	type: typeof PROFILE_ORDERS_SUCCESS;
	payload: TOrder[];
};

type TProfileOrdersFailureAction = {
	type: typeof PROFILE_ORDERS_FAILURE;
	payload: string;
};

export type TProfileOrdersActions =
	| TProfileOrdersWsConnectingAction
	| TProfileOrdersWsOpenAction
	| TProfileOrdersWsCloseAction
	| TProfileOrdersWsErrorAction
	| TProfileOrdersWsMessageAction
	| TProfileOrdersRequestAction
	| TProfileOrdersSuccessAction
	| TProfileOrdersFailureAction;

export const profileOrdersRequest = (): TProfileOrdersRequestAction => ({
	type: PROFILE_ORDERS_REQUEST,
});

export const profileOrdersSuccess = (
	orders: TOrder[]
): TProfileOrdersSuccessAction => ({
	type: PROFILE_ORDERS_SUCCESS,
	payload: orders,
});

export const profileOrdersFailure = (
	error: string
): TProfileOrdersFailureAction => ({
	type: PROFILE_ORDERS_FAILURE,
	payload: error,
});

export const fetchProfileOrders = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(profileOrdersRequest());
		try {
			const response = await fetch(WS_ORDER_ALL_URL, {
				headers: {
					Authorization: localStorage.getItem('accessToken') || '',
				},
			});

			const data = await response.json();

			if (data.success) {
				dispatch(profileOrdersSuccess(data.orders));
			} else {
				dispatch(
					profileOrdersFailure(data.message || 'Failed to load profile orders')
				);
			}
		} catch (error) {
			dispatch(
				profileOrdersFailure(
					error instanceof Error ? error.message : 'Unknown error occurred'
				)
			);
		}
	};
};
