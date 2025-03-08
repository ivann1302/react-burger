import { BASE_URL_ORDERS } from './../../utils/api';

export const setOrderData = (data) => ({
	type: 'SET_ORDER_DATA',
	payload: data,
});

export const clearOrderData = () => ({
	type: 'CLEAR_ORDER_DATA',
});

export const setOrderLoading = (isLoading) => ({
	type: 'SET_ORDER_LOADING',
	payload: isLoading,
});

export const setOrderError = (error) => ({
	type: 'SET_ORDER_ERROR',
	payload: error,
});

export const createOrder = (ingredients) => async (dispatch) => {
	dispatch(setOrderLoading(true)); // Устанавливаем состояние загрузки
	dispatch(setOrderError(null)); // Сбрасываем ошибку

	try {
		const response = await fetch(BASE_URL_ORDERS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		});

		if (!response.ok) {
			throw new Error('Ошибка при создании заказа');
		}

		const data = await response.json();
		dispatch(setOrderData(data)); // Сохраняем данные заказа
	} catch (error) {
		console.error('Ошибка:', error);
		dispatch(setOrderError(error.message)); // Сохраняем ошибку
	} finally {
		dispatch(setOrderLoading(false)); // Сбрасываем состояние загрузки
	}
};

export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';
export const SET_ORDER_LOADING = 'SET_ORDER_LOADING';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';
