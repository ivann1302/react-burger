import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	Reducer,
	AnyAction,
} from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import feedOrdersWsMiddleware from './middlewares/feed-orders-ws-middlewares';
import profileOrdersWsMiddleware from './middlewares/profile-orders-ws-middleware';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, feedOrdersWsMiddleware, profileOrdersWsMiddleware()];

export const store = createStore(
	rootReducer as Reducer<Partial<RootState>>,
	composeEnhancers(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export default store;
