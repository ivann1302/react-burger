import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients-reducer';
import ingredientDetailsReducer from './ingredient-details-reducer';
import orderReducer from './order-reducer';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
});

export { rootReducer };
