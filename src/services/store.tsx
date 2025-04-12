import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	AnyAction,
} from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './reducers/root-reducer';

// Добавляем поддержку Redux DevTools для TypeScript
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

// Правильно типизируем состояние хранилища
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Настройка Redux DevTools
const composeEnhancers =
	(typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// Создаем усилитель (enhancer) с middleware
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Создаем хранилище
// @ts-expect-error 'Доделать в конце'
export const store = createStore(rootReducer, enhancer);

export default store;
