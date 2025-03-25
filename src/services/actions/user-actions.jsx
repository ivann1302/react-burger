import { BASE_URL } from './../../utils/api';
import { request } from './../../utils/check-response';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (user) => ({
	type: GET_USER_SUCCESS,
	payload: user,
});
export const getUserFailed = (error) => ({
	type: GET_USER_FAILED,
	payload: error,
});

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (user) => ({
	type: UPDATE_USER_SUCCESS,
	payload: user,
});
export const updateUserFailed = (error) => ({
	type: UPDATE_USER_FAILED,
	payload: error,
});

// Получение данных пользователя
export const getUser = () => async (dispatch) => {
	dispatch(getUserRequest());
	try {
		const token = localStorage.getItem('token');
		const response = await request(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(getUserSuccess(response.user));
	} catch (error) {
		dispatch(getUserFailed(error.message));
	}
};

// Обновление данных пользователя
export const updateUser = (data) => async (dispatch) => {
	dispatch(updateUserRequest());
	try {
		const token = localStorage.getItem('token');
		const response = await request(`${BASE_URL}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		dispatch(updateUserSuccess(response.user));
	} catch (error) {
		dispatch(updateUserFailed(error.message));
	}
};
