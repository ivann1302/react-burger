// services/reducers/orderReducer.js
const initialState = {
	orderData: null, // Начальное состояние
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ORDER_DATA':
			return {
				...state,
				orderData: action.payload, // Обновляем состояние
			};
		case 'CLEAR_ORDER_DATA':
			return {
				...state,
				orderData: null, // Сбрасываем состояние
			};
		default:
			return state;
	}
};

export default orderReducer;
