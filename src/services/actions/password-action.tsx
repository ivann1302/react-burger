import { AppDispatch } from '@services/store';
import { BASE_URL } from '../../utils/api';
import { ITokens } from '@utils/types';

const FORGOT_PASSWORD_URL = `${BASE_URL}/password-reset`;
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

export const forgotPasswordFailed = (error: unknown) => ({
	type: FORGOT_PASSWORD_FAILED,
	payload: error,
});

export const resetPasswordRequest = () => ({
	type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = () => ({
	type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailed = (error: unknown) => ({
	type: RESET_PASSWORD_FAILED,
	payload: error,
});

// Экшен для запроса восстановления пароля
export const forgotPassword =
	(email: string) => async (dispatch: AppDispatch) => {
		dispatch(forgotPasswordRequest());
		try {
			const response = await fetch(FORGOT_PASSWORD_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			const data = await response.json();
			if (data.success) {
				dispatch(forgotPasswordSuccess());
				return true;
			} else {
				dispatch(forgotPasswordFailed(data.message));
				return false;
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(forgotPasswordFailed(message));
			return false;
		}
	};

// Экшен для сброса пароля
export const resetPassword =
	(password: string, token: ITokens) => async (dispatch: AppDispatch) => {
		dispatch(resetPasswordRequest());
		try {
			const response = await fetch(RESET_PASSWORD_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password, token }),
			});
			const data = await response.json();
			if (data.success) {
				dispatch(resetPasswordSuccess());
				return true;
			} else {
				dispatch(resetPasswordFailed(data.message));
				return false;
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(resetPasswordFailed(message));
			return false;
		}
	};
