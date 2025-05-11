import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/check-response';
import { AppDispatch } from './../store';
import { IUser } from './../../utils/types';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (user: IUser) => ({
	type: GET_USER_SUCCESS,
	payload: user,
});
export const getUserFailed = (error: unknown) => ({
	type: GET_USER_FAILED,
	payload: error,
});

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (user: IUser) => ({
	type: UPDATE_USER_SUCCESS,
	payload: user,
});
export const updateUserFailed = (error: unknown) => ({
	type: UPDATE_USER_FAILED,
	payload: error,
});

// Получение данных пользователя
export const getUser = () => async (dispatch: AppDispatch) => {
	dispatch(getUserRequest());
	try {
		const token = localStorage.getItem('accessToken');
		const response = await request(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(getUserSuccess(response.user));
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(getUserFailed(message));
	}
};

// Обновление данных пользователя
export const updateUser = (data: IUser) => async (dispatch: AppDispatch) => {
	dispatch(updateUserRequest());
	try {
		const token = localStorage.getItem('accessToken');
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
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(updateUserFailed(message));
	}
};
