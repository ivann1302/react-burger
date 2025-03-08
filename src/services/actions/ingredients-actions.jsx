import { BASE_URL } from './../../utils/api';
import { request } from './../../utils/check-response';

const BASE_URL_INGREDIENTS = `${BASE_URL}/ingredients`;
// запрос
export const fetchIngredientsRequest = () => ({
	type: 'FETCH_INGREDIENTS_REQUEST',
});

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';

// успешный запрос
export const fetchIngredientsSuccess = (data) => ({
	type: 'FETCH_INGREDIENTS_SUCCESS',
	payload: data,
});

export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';

// ошибка
export const fetchIngredientsFailure = (error) => ({
	type: 'FETCH_INGREDIENTS_FAILURE',
	payload: error,
});

export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

// Асинхронное действие redux-thunk
export const fetchIngredients = () => async (dispatch) => {
	dispatch(fetchIngredientsRequest()); // Запрос начался

	try {
		const data = await request(BASE_URL_INGREDIENTS);
		dispatch(fetchIngredientsSuccess(data.data)); // Успешный запрос
	} catch (err) {
		dispatch(fetchIngredientsFailure(err.message)); // Ошибка запроса
	}
};
