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
		const response = await fetch(
			'https://norma.nomoreparties.space/api/auth/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, name }),
			}
		);
		const data = await response.json();
		if (data.success) {
			dispatch(registerSuccess(data.user));
			localStorage.setItem('refreshToken', data.refreshToken);
		} else {
			dispatch(registerFailed(data.message));
		}
	} catch (error) {
		dispatch(registerFailed(error.message));
	}
};

// Авторизация пользователя
// services/actions/auth-actions.js
export const login = (email, password) => async (dispatch) => {
	dispatch(loginRequest());
	try {
		const response = await fetch(
			'https://norma.nomoreparties.space/api/auth/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}
		);
		const data = await response.json();
		if (data.success) {
			dispatch(loginSuccess(data.user));
			localStorage.setItem('refreshToken', data.refreshToken);
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
		const refreshToken = localStorage.getItem('refreshToken');
		const response = await fetch(
			'https://norma.nomoreparties.space/api/auth/logout',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: refreshToken }),
			}
		);
		const data = await response.json();
		if (data.success) {
			dispatch(logoutSuccess());
			localStorage.removeItem('refreshToken');
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
		const refreshToken = localStorage.getItem('refreshToken');
		const response = await fetch(
			'https://norma.nomoreparties.space/api/auth/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: refreshToken }),
			}
		);
		const data = await response.json();
		if (data.success) {
			dispatch(updateTokenSuccess(data));
			localStorage.setItem('refreshToken', data.refreshToken);
		} else {
			dispatch(updateTokenFailed(data.message));
		}
	} catch (error) {
		dispatch(updateTokenFailed(error.message));
	}
};
