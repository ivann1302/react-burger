const initialState = {
	bun: null,
	ingredients: [],
};

const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_INGREDIENT': {
			const ingredientsCopy = [...(state.ingredients ?? [])]; // Гарантируем, что это массив
			ingredientsCopy.push({
				...action.payload,
				index: ingredientsCopy.length,
			});
			return {
				...state,
				ingredients: ingredientsCopy,
			};
		}

		case 'ADD_BUN':
			return {
				...state,
				bun: action.payload,
			};

		case 'REMOVE_INGREDIENT': {
			const ingredientsCopy = [...(state.ingredients ?? [])];
			ingredientsCopy.splice(action.payload, 1);
			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx,
				})),
			};
		}

		case 'MOVE_INGREDIENT': {
			const ingredientsCopy = [...(state.ingredients ?? [])];
			const { fromIndex, toIndex } = action.payload;

			if (
				fromIndex < 0 ||
				toIndex < 0 ||
				fromIndex >= ingredientsCopy.length ||
				toIndex >= ingredientsCopy.length
			) {
				return state;
			}

			const [movedItem] = ingredientsCopy.splice(fromIndex, 1);
			if (!movedItem) return state; // Проверяем, что элемент не `undefined`

			ingredientsCopy.splice(toIndex, 0, movedItem);

			return {
				...state,
				ingredients: ingredientsCopy.map((item, idx) => ({
					...item,
					index: idx,
				})),
			};
		}

		case 'CLEAR_CONSTRUCTOR':
			return initialState;

		default:
			return state;
	}
};

export default constructorReducer;
