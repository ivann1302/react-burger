export const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

// запрос
export const fetchIngredientsRequest = () => ({
	type: 'FETCH_INGREDIENTS_REQUEST',
});

// успешный запрос
export const fetchIngredientsSuccess = (data) => ({
	type: 'FETCH_INGREDIENTS_SUCCESS',
	payload: data,
});

// ошибка
export const fetchIngredientsFailure = (error) => ({
	type: 'FETCH_INGREDIENTS_FAILURE',
	payload: error,
});

// Асинхронное действие redux-thunk
export const fetchIngredients = () => async (dispatch) => {
	dispatch(fetchIngredientsRequest()); // Запрос начался

	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`);
		}

		const data = await response.json();
		dispatch(fetchIngredientsSuccess(data.data)); // Успешный запрос
	} catch (err) {
		dispatch(fetchIngredientsFailure(err.message)); // Ошибка запроса
	}
};
