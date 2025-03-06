const initialState = {
	ingredients: [],
	loading: false,
	error: null,
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_INGREDIENTS_REQUEST':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'FETCH_INGREDIENTS_SUCCESS':
			return {
				...state,
				ingredients: action.payload,
				loading: false,
			};
		case 'FETCH_INGREDIENTS_FAILURE':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default ingredientsReducer;
