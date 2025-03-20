import { BASE_URL } from './../../utils/api';

const FORGOT_PASSWORD_URL = `${BASE_URL}/password-reset/reset`;
const RESET_PASSWORD_URL = `${BASE_URL}/password-reset/reset`;

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const forgotPasswordRequest = () => ({
	type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = () => ({
	type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailed = (error) => ({
	type: FORGOT_PASSWORD_FAILED,
	payload: error,
});

export const resetPasswordRequest = () => ({
	type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = () => ({
	type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailed = (error) => ({
	type: RESET_PASSWORD_FAILED,
	payload: error,
});

// Экшен для запроса на восстановление пароля
export const forgotPassword = (email) => async (dispatch) => {
	dispatch(forgotPasswordRequest());
	try {
		const response = await fetch(RESET_PASSWORD_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		const data = await response.json();
		if (data.success) {
			dispatch(forgotPasswordSuccess());
		} else {
			dispatch(forgotPasswordFailed(data.message));
		}
	} catch (error) {
		dispatch(forgotPasswordFailed(error.message));
	}
};

// Экшен для сброса пароля
export const resetPassword = (password, token) => async (dispatch) => {
	dispatch(resetPasswordRequest());
	try {
		const response = await fetch(FORGOT_PASSWORD_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, token }),
		});
		const data = await response.json();
		if (data.success) {
			dispatch(resetPasswordSuccess());
		} else {
			dispatch(resetPasswordFailed(data.message));
		}
	} catch (error) {
		dispatch(resetPasswordFailed(error.message));
	}
};
