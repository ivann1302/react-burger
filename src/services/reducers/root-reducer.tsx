import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients-reducer';
import ingredientDetailsReducer from './ingredient-details-reducer';
import orderReducer from './order-reducer';
import constructorReducer from './constructor-reducer';
import authReducer from './auth-reducer';
import passwordReducer from './password-reducer';
import userReducer from './user-reducer';
import resetPasswordReducer from './reset-password-reducer';

// Создаем интерфейс для всего состояния приложения
export interface RootState {
	ingredients: ReturnType<typeof ingredientsReducer>;
	ingredientDetails: ReturnType<typeof ingredientDetailsReducer>;
	order: ReturnType<typeof orderReducer>;
	burgerConstructor: ReturnType<typeof constructorReducer>;
	auth: ReturnType<typeof authReducer>;
	password: ReturnType<typeof passwordReducer>;
	user: ReturnType<typeof userReducer>;
	resetPassword: ReturnType<typeof resetPasswordReducer>;
}

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
	burgerConstructor: constructorReducer,
	auth: authReducer,
	password: passwordReducer,
	user: userReducer,
	resetPassword: resetPasswordReducer,
});

// Альтернативный способ получения RootState
export type AppState = ReturnType<typeof rootReducer>;

export { rootReducer };
