import {
	getCookie,
	setCookie,
	deleteCookie,
} from './../../utils/cookies-fucntions';
import { BASE_URL } from './../../utils/api';
import { request } from './../../utils/check-response'; // Добавлено

const REGISTER_URL = `${BASE_URL}/auth/register`;
const LOGIN_URL = `${BASE_URL}/auth/login`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;
const UPDATE_TOKEN_URL = `${BASE_URL}/auth/token`;
const USER_URL = `${BASE_URL}/auth/user`; // Добавлено

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
export const registerSuccess = (user) => ({
	type: REGISTER_SUCCESS,
	payload: user,
});
export const registerFailed = (error) => ({
	type: REGISTER_FAILED,
	payload: error,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailed = (error) => ({ type: LOGIN_FAILED, payload: error });

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailed = (error) => ({
	type: LOGOUT_FAILED,
	payload: error,
});

export const updateTokenRequest = () => ({ type: UPDATE_TOKEN_REQUEST });
export const updateTokenSuccess = (tokens) => ({
	type: UPDATE_TOKEN_SUCCESS,
	payload: tokens,
});
export const updateTokenFailed = (error) => ({
	type: UPDATE_TOKEN_FAILED,
	payload: error,
});

export const getUserRequest = () => ({ type: GET_USER_REQUEST }); // Добавлено
export const getUserSuccess = (user) => ({
	type: GET_USER_SUCCESS,
	payload: user,
}); // Добавлено
export const getUserFailed = (error) => ({
	type: GET_USER_FAILED,
	payload: error,
}); // Добавлено

// Регистрация пользователя
export const register = (email, password, name) => async (dispatch) => {
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
			localStorage.setItem('token', cleanToken);
		} else {
			dispatch(registerFailed(response.message));
		}
	} catch (error) {
		dispatch(registerFailed(error.message));
	}
};

// Авторизация пользователя
export const login = (email, password) => async (dispatch) => {
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
			localStorage.setItem('token', cleanToken);
			return true;
		} else {
			dispatch(loginFailed(response.message));
			return false;
		}
	} catch (error) {
		dispatch(loginFailed(error.message));
		return false;
	}
};

// Выход из системы
export const logout = () => async (dispatch) => {
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
			localStorage.removeItem('token');
		} else {
			dispatch(logoutFailed(response.message));
		}
	} catch (error) {
		dispatch(logoutFailed(error.message));
	}
};

// Обновление токена
export const updateToken = () => async (dispatch) => {
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
			localStorage.setItem('token', cleanToken);
		} else {
			dispatch(updateTokenFailed(response.message));
		}
	} catch (error) {
		dispatch(updateTokenFailed(error.message));
	}
};

// Получение данных пользователя
export const getUser = () => async (dispatch) => {
	dispatch(getUserRequest());
	try {
		let token = localStorage.getItem('token');
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
			token = localStorage.getItem('token'); // Получаем новый токен

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
	} catch (error) {
		dispatch(getUserFailed(error.message));
	}
};

export const checkAuthRequest = () => ({ type: CHECK_AUTH_REQUEST });
export const checkAuthSuccess = (user) => ({
	type: CHECK_AUTH_SUCCESS,
	payload: user,
});
export const checkAuthFailed = (error) => ({
	type: CHECK_AUTH_FAILED,
	payload: error,
});

export const checkAuth = () => async (dispatch) => {
	console.log('Token in checkAuth:', token);
	dispatch(checkAuthRequest());
	try {
		const token = localStorage.getItem('token');
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
	} catch (error) {
		dispatch(checkAuthFailed(error.message));
	}
};
