const initialState = {
	bun: null, // Булочка
	ingredients: [], // Остальные ингредиенты
};

const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_INGREDIENT':
			if (action.payload.type === 'bun') {
				return {
					...state,
					bun: action.payload, // Обновляем булочку
				};
			} else {
				return {
					...state,
					ingredients: [...state.ingredients, action.payload], // Добавляем ингредиент
				};
			}
		case 'REMOVE_INGREDIENT':
			return {
				...state,
				ingredients: state.ingredients.filter(
					(item) => item.id !== action.payload.id
				), // Удаляем ингредиент
			};
		case 'CLEAR_CONSTRUCTOR':
			return initialState; // Очищаем конструктор
		default:
			return state;
	}
};

export default constructorReducer;
