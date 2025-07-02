import { AppDispatch } from '@services/store';
import { BASE_URL } from '../../utils/api';

const FORGOT_PASSWORD_URL = `${BASE_URL}/password-reset`;
const RESET_PASSWORD_URL = `${BASE_URL}/password-reset/reset`;

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export interface IResetPasswordData {
	password: string;
	token: string;
}

interface IApiResponse {
	success: boolean;
	message?: string;
}

export const forgotPasswordRequest = () => ({
	type: FORGOT_PASSWORD_REQUEST as typeof FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = () => ({
	type: FORGOT_PASSWORD_SUCCESS as typeof FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailed = (error: string) => ({
	type: FORGOT_PASSWORD_FAILED as typeof FORGOT_PASSWORD_FAILED,
	payload: error,
});

export const resetPasswordRequest = () => ({
	type: RESET_PASSWORD_REQUEST as typeof RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = () => ({
	type: RESET_PASSWORD_SUCCESS as typeof RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailed = (error: string) => ({
	type: RESET_PASSWORD_FAILED as typeof RESET_PASSWORD_FAILED,
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

			const responseData: IApiResponse = await response.json();

			if (responseData.success) {
				dispatch(forgotPasswordSuccess());
				return true;
			} else {
				const errorMessage = responseData.message || 'Неизвестная ошибка';
				dispatch(forgotPasswordFailed(errorMessage));
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
	(data: IResetPasswordData) => async (dispatch: AppDispatch) => {
		dispatch(resetPasswordRequest());
		try {
			const response = await fetch(RESET_PASSWORD_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData: IApiResponse = await response.json();

			if (responseData.success) {
				dispatch(resetPasswordSuccess());
				return true;
			} else {
				const errorMessage = responseData.message || 'Неизвестная ошибка';
				dispatch(resetPasswordFailed(errorMessage));
				return false;
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			dispatch(resetPasswordFailed(message));
			return false;
		}
	};
