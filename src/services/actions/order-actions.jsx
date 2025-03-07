const API_URL = 'https://norma.nomoreparties.space/api/orders';

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
		const response = await fetch(API_URL, {
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
