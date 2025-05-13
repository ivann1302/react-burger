import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	Store,
	AnyAction,
} from 'redux';
import { useDispatch } from 'react-redux';
import {
	thunk,
	ThunkMiddleware,
	ThunkDispatch,
	ThunkAction,
} from 'redux-thunk';

import rootReducer, { RootState } from './reducers/root-reducer';
import { socketMiddleware } from './middlewares/socket-middleware';
import { TFeedOrdersActions } from './actions/feed-orders-actions';
import { TProfileOrdersActions } from './actions/profile-orders-actions';

export const profileOrdersWsActions = {
	WS_CONNECT: 'PROFILE_ORDERS_CONNECT',
	WS_DISCONNECT: 'PROFILE_ORDERS_DISCONNECT',
	WS_CONNECTING: 'PROFILE_ORDERS_WS_CONNECTING',
	WS_OPEN: 'PROFILE_ORDERS_WS_OPEN',
	WS_CLOSE: 'PROFILE_ORDERS_WS_CLOSE',
	WS_ERROR: 'PROFILE_ORDERS_WS_ERROR',
	WS_MESSAGE: 'PROFILE_ORDERS_WS_MESSAGE',
} as const;

export const feedOrdersWsActions = {
	WS_CONNECT: 'FEED_ORDERS_CONNECT',
	WS_DISCONNECT: 'FEED_ORDERS_DISCONNECT',
	WS_CONNECTING: 'FEED_ORDERS_WS_CONNECTING',
	WS_OPEN: 'FEED_ORDERS_WS_OPEN',
	WS_CLOSE: 'FEED_ORDERS_WS_CLOSE',
	WS_ERROR: 'FEED_ORDERS_WS_ERROR',
	WS_MESSAGE: 'FEED_ORDERS_WS_MESSAGE',
	WS_SEND_MESSAGE: 'FEED_ORDERS_WS_SEND',
} as const;

// Объединённый тип всех action'ов
export type TApplicationActions =
	| TFeedOrdersActions
	| TProfileOrdersActions
	| AnyAction;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const middleware = [
	thunk as ThunkMiddleware<RootState, TApplicationActions>,
	socketMiddleware(profileOrdersWsActions),
	socketMiddleware(feedOrdersWsActions),
];

export const store = createStore(
	rootReducer,
	undefined,
	composeEnhancers(applyMiddleware(...middleware))
) as Store<RootState, TApplicationActions> & {
	dispatch: ThunkDispatch<RootState, unknown, TApplicationActions>;
};

// Типы для хуков и Thunk'ов
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	TApplicationActions
>;

export default store;
