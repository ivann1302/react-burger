import { TOrder } from '@utils/ingredient-types';

export const PROFILE_ORDERS_CONNECT = 'PROFILE_ORDERS_CONNECT';
export const PROFILE_ORDERS_DISCONNECT = 'PROFILE_ORDERS_DISCONNECT';
export const PROFILE_ORDERS_WS_CONNECTING = 'PROFILE_ORDERS_WS_CONNECTING';
export const PROFILE_ORDERS_WS_OPEN = 'PROFILE_ORDERS_WS_OPEN';
export const PROFILE_ORDERS_WS_CLOSE = 'PROFILE_ORDERS_WS_CLOSE';
export const PROFILE_ORDERS_WS_ERROR = 'PROFILE_ORDERS_WS_ERROR';
export const PROFILE_ORDERS_WS_MESSAGE = 'PROFILE_ORDERS_WS_MESSAGE';

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

export type TProfileOrdersActions =
	| TProfileOrdersWsConnectingAction
	| TProfileOrdersWsOpenAction
	| TProfileOrdersWsCloseAction
	| TProfileOrdersWsErrorAction
	| TProfileOrdersWsMessageAction;
