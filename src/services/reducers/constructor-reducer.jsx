const initialState = {
	bun: null,
	ingredients: [], // Инициализируем как пустой массив
};

const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_INGREDIENT':
			return {
				...state,
				ingredients: [...(state.ingredients || []), action.payload], // Гарантируем, что это массив
			};
		case 'ADD_BUN':
			return {
				...state,
				bun: action.payload, // Обновляем булку
			};
		case 'REMOVE_INGREDIENT': {
			const ingredientsCopy = [...state.ingredients];
			const indexToRemove = ingredientsCopy.findIndex(
				(item) => item._id === action.payload._id
			);

			if (indexToRemove !== -1) {
				ingredientsCopy.splice(indexToRemove, 1); // Удаляем один элемент по индексу
			}

			return {
				...state,
				ingredients: ingredientsCopy,
			};
		}
		case 'CLEAR_CONSTRUCTOR':
			return initialState;
		default:
			return state;
	}
};

export default constructorReducer;
