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

// Типы для экшенов
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

type TProfileOrdersConnectAction = {
	type: typeof PROFILE_ORDERS_CONNECT;
	payload: string;
};

type TProfileOrdersDisconnectAction = {
	type: typeof PROFILE_ORDERS_DISCONNECT;
};

// Объединенный тип всех экшенов
export type TProfileOrdersActions =
	| TProfileOrdersWsConnectingAction
	| TProfileOrdersWsOpenAction
	| TProfileOrdersWsCloseAction
	| TProfileOrdersWsErrorAction
	| TProfileOrdersWsMessageAction
	| TProfileOrdersConnectAction
	| TProfileOrdersDisconnectAction;

// Тип состояния
type TProfileOrdersState = {
	wsConnected: boolean;
	orders: TOrder[];
	error?: string;
};

const initialState: TProfileOrdersState = {
	wsConnected: false,
	orders: [],
	error: undefined,
};

const profileOrdersReducer = (
	state = initialState,
	action: TProfileOrdersActions
): TProfileOrdersState => {
	switch (action.type) {
		case PROFILE_ORDERS_CONNECT:
		case PROFILE_ORDERS_DISCONNECT:
			return state;

		case PROFILE_ORDERS_WS_CONNECTING:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};

		case PROFILE_ORDERS_WS_OPEN:
			return {
				...state,
				wsConnected: true,
				error: undefined,
			};

		case PROFILE_ORDERS_WS_ERROR:
			return {
				...state,
				wsConnected: false,
				error: action.payload,
			};

		case PROFILE_ORDERS_WS_CLOSE:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};

		case PROFILE_ORDERS_WS_MESSAGE:
			return {
				...state,
				orders: action.payload.orders,
				error: undefined,
			};

		default:
			return state;
	}
};

export default profileOrdersReducer;
