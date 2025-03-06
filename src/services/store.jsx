import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Middleware для асинхронных действий
import { rootReducer } from './reducers/root-reducer'; // Импортируем корневой редьюсер

// Настройка Redux DevTools
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // Включение Redux DevTools
		: compose;

// Создание enhancer (усилителя) для хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Создание хранилища
const store = createStore(rootReducer, enhancer);

export default store;
