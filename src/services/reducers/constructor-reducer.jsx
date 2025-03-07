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
		case 'REMOVE_INGREDIENT':
			return {
				...state,
				ingredients: (state.ingredients || []).filter(
					(item) => item.id !== action.payload.id
				),
			};
		case 'CLEAR_CONSTRUCTOR':
			return initialState;
		default:
			return state;
	}
};

export default constructorReducer;
