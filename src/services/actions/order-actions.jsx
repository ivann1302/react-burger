export const setOrderData = (data) => ({
	type: 'SET_ORDER_DATA',
	payload: data,
});

export const clearOrderData = () => ({
	type: 'CLEAR_ORDER_DATA',
});

export const createOrder = (ingredients) => async (dispatch) => {
	try {
		const response = await fetch(
			'https://norma.nomoreparties.space/api/orders',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients }),
			}
		);

		if (!response.ok) {
			throw new Error('Ошибка при создании заказа');
		}

		const data = await response.json();
		dispatch(setOrderData(data)); // Сохраняем данные заказа
	} catch (error) {
		console.error('Ошибка:', error);
		dispatch(clearOrderData()); // Очищаем данные заказа в случае ошибки
	}
};
