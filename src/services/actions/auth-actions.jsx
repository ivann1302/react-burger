import {
	getCookie,
	setCookie,
	deleteCookie,
} from './../../utils/cookies-fucntions';
import { BASE_URL } from './../../utils/api';

const REGISTER_URL = `${BASE_URL}/auth/register`;
const LOGIN_URL = `${BASE_URL}/auth/register`;
const LOGOUT_URL = `${BASE_URL}/auth/register`;
const UPDATE_TOKEN_URL = `${BASE_URL}/auth/register`;

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

export const registerRequest = () => ({
	type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
	type: REGISTER_SUCCESS,
	payload: user,
});

export const registerFailed = (error) => ({
	type: REGISTER_FAILED,
	payload: error,
});

export const loginRequest = () => ({
	type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});

export const loginFailed = (error) => ({
	type: LOGIN_FAILED,
	payload: error,
});

export const logoutRequest = () => ({
	type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS,
});

export const logoutFailed = (error) => ({
	type: LOGOUT_FAILED,
	payload: error,
});

export const updateTokenRequest = () => ({
	type: UPDATE_TOKEN_REQUEST,
});

export const updateTokenSuccess = (tokens) => ({
	type: UPDATE_TOKEN_SUCCESS,
	payload: tokens,
});

export const updateTokenFailed = (error) => ({
	type: UPDATE_TOKEN_FAILED,
	payload: error,
});

// Регистрация пользователя
export const register = (email, password, name) => async (dispatch) => {
	dispatch(registerRequest());
	try {
		const response = await fetch(REGISTER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, name }),
		});
		const data = await response.json();
		if (data.success) {
			dispatch(registerSuccess(data.user));
			// Сохраняем refreshToken в cookie
			setCookie('refreshToken', data.refreshToken, { maxAge: 120000 });
			// Сохраняем token в localStorage
			localStorage.setItem('token', data.accessToken);
		} else {
			dispatch(registerFailed(data.message));
		}
	} catch (error) {
		dispatch(registerFailed(error.message));
	}
};

// Авторизация пользователя
export const login = (email, password) => async (dispatch) => {
	dispatch(loginRequest());
	try {
		const response = await fetch(LOGIN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if (data.success) {
			dispatch(loginSuccess(data.user));
			// Сохраняем refreshToken в cookie
			setCookie('refreshToken', data.refreshToken, { maxAge: 120000 });
			// Сохраняем token в localStorage
			localStorage.setItem('token', data.accessToken);
		} else {
			dispatch(loginFailed(data.message));
		}
	} catch (error) {
		dispatch(loginFailed(error.message));
	}
};

// Выход из системы
export const logout = () => async (dispatch) => {
	dispatch(logoutRequest());
	try {
		// Получаем refreshToken из cookies
		const refreshToken = getCookie('refreshToken');
		if (!refreshToken) {
			throw new Error('Refresh token not found');
		}

		const response = await fetch(LOGOUT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		if (data.success) {
			dispatch(logoutSuccess());
			// Удаляем refreshToken из cookies
			deleteCookie('refreshToken');
			// Удаляем token из localStorage
			localStorage.removeItem('token');
		} else {
			dispatch(logoutFailed(data.message));
		}
	} catch (error) {
		dispatch(logoutFailed(error.message));
	}
};

// Обновление токена
export const updateToken = () => async (dispatch) => {
	dispatch(updateTokenRequest());
	try {
		// Получаем refreshToken из cookies
		const refreshToken = getCookie('refreshToken');
		if (!refreshToken) {
			throw new Error('Refresh token not found');
		}

		const response = await fetch(UPDATE_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});
		const data = await response.json();
		if (data.success) {
			dispatch(updateTokenSuccess(data));
			// Обновляем refreshToken в cookies
			setCookie('refreshToken', data.refreshToken, { maxAge: 120000 });
			// Обновляем token в localStorage
			localStorage.setItem('token', data.accessToken);
		} else {
			dispatch(updateTokenFailed(data.message));
		}
	} catch (error) {
		dispatch(updateTokenFailed(error.message));
	}
};
