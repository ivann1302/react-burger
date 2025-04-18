import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients-reducer';
import ingredientDetailsReducer from './ingredient-details-reducer';
import orderReducer from './order-reducer';
import constructorReducer from './constructor-reducer';
import authReducer from './auth-reducer';
import passwordReducer from './password-reducer';
import userReducer from './user-reducer';
import resetPasswordReducer from './reset-password-reducer';

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

export { rootReducer };
