import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/check-response';
import { clearConstructor } from './constructor-actions';
import { TIngredient } from './../../utils/ingredient-types';
import { AppDispatch } from './../store';

const BASE_URL_ORDERS = `${BASE_URL}/orders`;
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';
export const SET_ORDER_LOADING = 'SET_ORDER_LOADING';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export const setOrderData = (data: TIngredient[]) => ({
	type: SET_ORDER_DATA,
	payload: data,
});

export const clearOrderData = () => ({
	type: CLEAR_ORDER_DATA,
});

export const setOrderLoading = (isLoading: boolean) => ({
	type: SET_ORDER_LOADING,
	payload: isLoading,
});

export const setOrderError = (error: unknown) => ({
	type: SET_ORDER_ERROR,
	payload: error,
});

export const createOrder =
	(ingredients: TIngredient[]) => async (dispatch: AppDispatch) => {
		dispatch(setOrderLoading(true)); // Устанавливаем состояние загрузки
		dispatch(setOrderError(null)); // Сбрасываем ошибку

		try {
			console.log('Отправка запроса на создание заказа:', { ingredients });
			await new Promise((resolve) => setTimeout(resolve, 15000));

			const data = await request(BASE_URL_ORDERS, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients }),
			});
			console.log('Ответ сервера:', data);
			dispatch(setOrderData(data)); // Сохраняем данные заказа
			console.log(data);
			dispatch(clearConstructor()); // Сбрасываем конструктор
		} catch (error) {
			console.error('Ошибка при создании заказа:', error);
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(setOrderError(message)); // Сохраняем ошибку
		} finally {
			dispatch(setOrderLoading(false)); // Сбрасываем состояние загрузки
		}
	};
