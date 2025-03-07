const initialState = {
	orderData: null, // Данные заказа
	loading: false, // Состояние загрузки
	error: null, // Ошибка
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ORDER_DATA':
			return {
				...state,
				orderData: action.payload, // Обновляем данные заказа
			};
		case 'CLEAR_ORDER_DATA':
			return {
				...state,
				orderData: null, // Сбрасываем данные заказа
			};
		case 'SET_ORDER_LOADING':
			return {
				...state,
				loading: action.payload, // Обновляем состояние загрузки
			};
		case 'SET_ORDER_ERROR':
			return {
				...state,
				error: action.payload, // Сохраняем ошибку
			};
		default:
			return state;
	}
};

export default orderReducer;
