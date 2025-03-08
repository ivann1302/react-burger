import {
	ADD_INGREDIENT,
	ADD_BUN,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from './../actions/constructor-actions';

const initialState = {
	bun: null,
	ingredients: [],
};

const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			return {
				...state,
				ingredients: [
					...(state.ingredients ?? []),
					{
						...action.payload, // Уже содержит uniqueId
						index: (state.ingredients ?? []).length,
					},
				],
			};
		}
		case ADD_BUN: {
			return {
				...state,
				bun: action.payload,
			};
		}
		case REMOVE_INGREDIENT: {
			const ingredientsCopy = [...(state.ingredients ?? [])];
			ingredientsCopy.splice(action.payload, 1);
			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx, // Обновляем индексы
				})),
			};
		}

		case MOVE_INGREDIENT: {
			const { fromIndex, toIndex } = action.payload;
			const ingredientsCopy = [...(state.ingredients ?? [])];

			if (
				fromIndex < 0 ||
				toIndex < 0 ||
				fromIndex >= ingredientsCopy.length ||
				toIndex >= ingredientsCopy.length
			) {
				return state;
			}

			const [movedItem] = ingredientsCopy.splice(fromIndex, 1);
			if (!movedItem) return state;

			ingredientsCopy.splice(toIndex, 0, movedItem);

			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx, // Обновляем индексы
				})),
			};
		}

		case CLEAR_CONSTRUCTOR: {
			return { ...initialState, ingredients: [] }; // Гарантируем, что ингредиенты остаются массивом
		}

		default:
			return { ...state, ingredients: state.ingredients ?? [] }; // Защита от `undefined`
	}
};

export default constructorReducer;
