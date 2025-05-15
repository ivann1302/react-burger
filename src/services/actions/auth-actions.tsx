import {
	getCookie,
	setCookie,
	deleteCookie,
} from '../../utils/cookies-fucntions';
import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/check-response';
import { AppDispatch } from './../store';
import { IUser, ITokens } from './../../utils/types';

const REGISTER_URL = `${BASE_URL}/auth/register`;
const LOGIN_URL = `${BASE_URL}/auth/login`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;
const UPDATE_TOKEN_URL = `${BASE_URL}/auth/token`;
const USER_URL = `${BASE_URL}/auth/user`;

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILED = 'CHECK_AUTH_FAILED';

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user: IUser) => ({
	type: REGISTER_SUCCESS,
	payload: user,
});
export const registerFailed = (error: string) => ({
	type: REGISTER_FAILED,
	payload: error,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user: IUser) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});
export const loginFailed = (error: string) => ({
	type: LOGIN_FAILED,
	payload: error,
});

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailed = (error: string) => ({
	type: LOGOUT_FAILED,
	payload: error,
});

export const updateTokenRequest = () => ({ type: UPDATE_TOKEN_REQUEST });
export const updateTokenSuccess = (tokens: ITokens) => ({
	type: UPDATE_TOKEN_SUCCESS,
	payload: tokens,
});
export const updateTokenFailed = (error: string) => ({
	type: UPDATE_TOKEN_FAILED,
	payload: error,
});

export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (user: IUser) => ({
	type: GET_USER_SUCCESS,
	payload: user,
});
export const getUserFailed = (error: string) => ({
	type: GET_USER_FAILED,
	payload: error,
});

// Регистрация пользователя
export const register =
	(email: string, password: string, name: string) =>
	async (dispatch: AppDispatch) => {
		dispatch(registerRequest());
		try {
			const response = await request(REGISTER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, name }),
			});
			if (response.success) {
				dispatch(registerSuccess(response.user));
				setCookie('refreshToken', response.refreshToken, { maxAge: 120000 });
				const cleanToken = response.accessToken.replace(/^Bearer\s/, '');
				localStorage.setItem('accessToken', cleanToken);
			} else {
				dispatch(registerFailed(response.message));
			}
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(registerFailed(message));
		}
	};

// Авторизация пользователя
export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		dispatch(loginRequest());
		try {
			const response = await request(LOGIN_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			if (response.success) {
				dispatch(loginSuccess(response.user));
				setCookie('refreshToken', response.refreshToken, { maxAge: 120000 });
				const cleanToken = response.accessToken.replace(/^Bearer\s/, '');
				localStorage.setItem('accessToken', cleanToken);
				return true;
			} else {
				dispatch(loginFailed(response.message));
				return false;
			}
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(loginFailed(message));
			return false;
		}
	};

// Выход из системы
export const logout = () => async (dispatch: AppDispatch) => {
	dispatch(logoutRequest());
	try {
		const refreshToken = getCookie('refreshToken');
		if (!refreshToken) {
			throw new Error('Refresh token not found');
		}

		const response = await request(LOGOUT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		if (response.success) {
			dispatch(logoutSuccess());
			deleteCookie('refreshToken');
			localStorage.removeItem('accessToken');
		} else {
			dispatch(logoutFailed(response.message));
		}
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(logoutFailed(message));
	}
};

// Обновление токена
export const updateToken = () => async (dispatch: AppDispatch) => {
	dispatch(updateTokenRequest());
	try {
		const refreshToken = getCookie('refreshToken');
		if (!refreshToken) {
			throw new Error('Refresh token not found');
		}

		const response = await request(UPDATE_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});
		if (response.success) {
			dispatch(updateTokenSuccess(response));
			setCookie('refreshToken', response.refreshToken, { maxAge: 120000 });
			const cleanToken = response.accessToken.replace(/^Bearer\s/, '');
			localStorage.setItem('accessToken', cleanToken);
		} else {
			dispatch(updateTokenFailed(response.message));
		}
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(updateTokenFailed(message));
	}
};

// Получение данных пользователя
export const getUser = () => async (dispatch: AppDispatch) => {
	dispatch(getUserRequest());
	try {
		let token = localStorage.getItem('accessToken');
		if (!token) {
			throw new Error('Токен отсутствует');
		}
		console.log('Authorization header:', `Bearer ${token}`);

		// Первый запрос данных пользователя
		let response = await request(USER_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		// Если токен истек, обновляем его
		if (!response.success && response.message === 'jwt malformed') {
			await dispatch(updateToken()); // Обновляем токен
			token = localStorage.getItem('accessToken'); // Получаем новый токен

			// Повторяем запрос с новым токеном
			response = await request(USER_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
		}

		if (response.success) {
			dispatch(getUserSuccess(response.user));
		} else {
			dispatch(getUserFailed(response.message));
		}
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(getUserFailed(message));
	}
};

export const checkAuthRequest = () => ({ type: CHECK_AUTH_REQUEST });
export const checkAuthSuccess = (user: IUser) => ({
	type: CHECK_AUTH_SUCCESS,
	payload: user,
});
export const checkAuthFailed = (error: string) => ({
	type: CHECK_AUTH_FAILED,
	payload: error,
});

export const checkAuth = () => async (dispatch: AppDispatch) => {
	dispatch(checkAuthRequest());
	try {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const response = await request(USER_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.success) {
				dispatch(checkAuthSuccess(response.user));
			} else {
				dispatch(checkAuthFailed(response.message));
			}
		} else {
			dispatch(checkAuthFailed('Токен отсутствует'));
		}
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Неизвестная ошибка';
		dispatch(checkAuthFailed(message));
	}
};
