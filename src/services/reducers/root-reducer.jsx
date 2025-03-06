import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients-reducer';
import ingredientDetailsReducer from './ingredient-details-reducer';
import orderReducer from './order-reducer';
import constructorReducer from './constructor-reducer';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
	constructor: constructorReducer,
});

export { rootReducer };
