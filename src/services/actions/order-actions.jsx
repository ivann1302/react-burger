import { BASE_URL } from './../../utils/api';
import { request } from './../../utils/check-response';
import { clearConstructor } from './constructor-actions';

const BASE_URL_ORDERS = `${BASE_URL}/orders`;
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';
export const SET_ORDER_LOADING = 'SET_ORDER_LOADING';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export const setOrderData = (data) => ({
	type: SET_ORDER_DATA,
	payload: data,
});

export const clearOrderData = () => ({
	type: CLEAR_ORDER_DATA,
});

export const setOrderLoading = (isLoading) => ({
	type: SET_ORDER_LOADING,
	payload: isLoading,
});

export const setOrderError = (error) => ({
	type: SET_ORDER_ERROR,
	payload: error,
});

export const createOrder = (ingredients) => async (dispatch) => {
	dispatch(setOrderLoading(true)); // Устанавливаем состояние загрузки
	dispatch(setOrderError(null)); // Сбрасываем ошибку

	try {
		console.log('Отправка запроса на создание заказа:', { ingredients });
		const data = await request(BASE_URL_ORDERS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		});
		console.log('Ответ сервера:', data);
		dispatch(setOrderData(data)); // Сохраняем данные заказа
		dispatch(clearConstructor()); // Сбрасываем конструктор
	} catch (error) {
		console.error('Ошибка при создании заказа:', error);
		dispatch(setOrderError(error.message)); // Сохраняем ошибку
	} finally {
		dispatch(setOrderLoading(false)); // Сбрасываем состояние загрузки
	}
};
