import { combineReducers, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ingredientsReducer from './ingredients-reducer';
import ingredientDetailsReducer from './ingredient-details-reducer';
import orderReducer from './order-reducer';
import constructorReducer from './constructor-reducer';
import authReducer from './auth-reducer';
import passwordReducer from './password-reducer';
import userReducer from './user-reducer';
import resetPasswordReducer from './reset-password-reducer';
import feedOrdersReducer from './feed-order-reducer';
import profileOrdersReducer from './profile-orders-reducer';

// Тип для dispatch с поддержкой thunk
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
	burgerConstructor: constructorReducer,
	auth: authReducer,
	password: passwordReducer,
	user: userReducer,
	resetPassword: resetPasswordReducer,
	feedOrders: feedOrdersReducer,
	profileOrders: profileOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
