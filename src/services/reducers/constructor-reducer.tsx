import {
	ADD_INGREDIENT,
	ADD_BUN,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from '../actions/constructor-actions';
import { TIngredient } from '@utils/ingredient-types';

// Начальное состояние
const initialState = {
	bun: null as TIngredient | null,
	ingredients: [] as TIngredient[],
};

// Тип состояния
type IConstructorState = typeof initialState;

// Типы экшенов
type TAddIngredientAction = {
	type: typeof ADD_INGREDIENT;
	payload: TIngredient;
};

type TAddBunAction = {
	type: typeof ADD_BUN;
	payload: TIngredient;
};

type TRemoveIngredientAction = {
	type: typeof REMOVE_INGREDIENT;
	payload: number;
};

type TMoveIngredientAction = {
	type: typeof MOVE_INGREDIENT;
	payload: {
		fromIndex: number;
		toIndex: number;
	};
};

type TClearConstructorAction = {
	type: typeof CLEAR_CONSTRUCTOR;
};

// Объединённый тип всех экшенов
type TConstructorActions =
	| TAddIngredientAction
	| TAddBunAction
	| TRemoveIngredientAction
	| TMoveIngredientAction
	| TClearConstructorAction;

const constructorReducer = (
	state: IConstructorState = initialState,
	action: TConstructorActions
): IConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload],
			};

		case ADD_BUN:
			return {
				...state,
				bun: action.payload,
			};

		case REMOVE_INGREDIENT: {
			const ingredientsCopy = [...state.ingredients];
			ingredientsCopy.splice(action.payload, 1);
			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx,
				})),
			};
		}

		case MOVE_INGREDIENT: {
			const { fromIndex, toIndex } = action.payload;
			const ingredientsCopy = [...state.ingredients];

			if (
				fromIndex < 0 ||
				toIndex < 0 ||
				fromIndex >= ingredientsCopy.length ||
				toIndex >= ingredientsCopy.length
			) {
				return state;
			}

			const [movedItem] = ingredientsCopy.splice(fromIndex, 1);
			ingredientsCopy.splice(toIndex, 0, movedItem);

			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx,
				})),
			};
		}

		case CLEAR_CONSTRUCTOR:
			return initialState;

		default:
			return state;
	}
};

export default constructorReducer;
