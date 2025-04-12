import { TIngredient } from '@utils/ingredient-types';
import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/check-response';
import { AppDispatch } from './../store';

const BASE_URL_INGREDIENTS = `${BASE_URL}/ingredients`;
export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

// запрос
export const fetchIngredientsRequest = () => ({
	type: FETCH_INGREDIENTS_REQUEST,
});

// успешный запрос
export const fetchIngredientsSuccess = (data: TIngredient[]) => ({
	type: FETCH_INGREDIENTS_SUCCESS,
	payload: data,
});

// ошибка
export const fetchIngredientsFailure = (error: string) => ({
	type: FETCH_INGREDIENTS_FAILURE,
	payload: error,
});

// Асинхронное действие redux-thunk
export const fetchIngredients = () => async (dispatch: AppDispatch) => {
	dispatch(fetchIngredientsRequest()); // Запрос начался

	try {
		const data = await request(BASE_URL_INGREDIENTS);
		dispatch(fetchIngredientsSuccess(data.data)); // Успешный запрос
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(fetchIngredientsFailure(message)); // Ошибка запроса
	}
};
