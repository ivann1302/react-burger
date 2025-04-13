import {
	SET_ORDER_DATA,
	CLEAR_ORDER_DATA,
	SET_ORDER_LOADING,
	SET_ORDER_ERROR,
} from '../actions/order-actions';

type TOrder = {
	number: number;
};

type TOrderData = {
	order?: TOrder;
};

type TSetOrderData = {
	type: typeof SET_ORDER_DATA;
	payload: TOrderData | null;
};

type TClearOrderData = {
	type: typeof CLEAR_ORDER_DATA;
};

type TSetOrderLoading = {
	type: typeof SET_ORDER_LOADING;
	payload: boolean;
};

type TSetOrderError = {
	type: typeof SET_ORDER_ERROR;
	payload: string | null;
};

type TOrderTypes =
	| TSetOrderData
	| TClearOrderData
	| TSetOrderLoading
	| TSetOrderError;

type TInitialState = {
	orderData: null;
	loading: boolean;
	error: null;
};

const initialState: TInitialState = {
	orderData: null, // Данные заказа
	loading: false, // Состояние загрузки
	error: null, // Ошибка
};

const orderReducer = (
	state: TInitialState = initialState,
	action: TOrderTypes
) => {
	switch (action.type) {
		case SET_ORDER_DATA:
			return {
				...state,
				orderData: action.payload, // Обновляем данные заказа
			};
		case CLEAR_ORDER_DATA:
			return {
				...state,
				orderData: null, // Сбрасываем данные заказа
			};
		case SET_ORDER_LOADING:
			return {
				...state,
				loading: action.payload, // Обновляем состояние загрузки
			};
		case SET_ORDER_ERROR:
			return {
				...state,
				error: action.payload, // Сохраняем ошибку
			};
		default:
			return state;
	}
};

export default orderReducer;
