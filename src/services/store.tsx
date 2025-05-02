import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	Store,
	AnyAction,
	Middleware,
	Dispatch,
} from 'redux';
import { useDispatch } from 'react-redux';
import {
	thunk,
	ThunkAction,
	ThunkDispatch,
	ThunkMiddleware,
} from 'redux-thunk';
import rootReducer, { RootState } from './reducers/root-reducer';
import { TProfileOrdersActions } from './actions/profile-orders-actions';
import feedOrdersWsMiddleware from './middlewares/feed-orders-ws-middlewares';
import profileOrdersWsMiddleware from './middlewares/profile-orders-ws-middleware';

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
	thunk as ThunkMiddleware<RootState, TProfileOrdersActions | AnyAction>,
	feedOrdersWsMiddleware as Middleware<
		object,
		RootState,
		Dispatch<TProfileOrdersActions | AnyAction>
	>,
	profileOrdersWsMiddleware,
];

// Явно используем перегрузку createStore с тремя параметрами
export const store = createStore(
	rootReducer,
	undefined, // Явно передаем undefined как preloadedState
	composeEnhancers(applyMiddleware(...middleware))
) as Store<RootState, TProfileOrdersActions | AnyAction> & {
	dispatch: ThunkDispatch<
		RootState,
		unknown,
		TProfileOrdersActions | AnyAction
	>;
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export default store;
