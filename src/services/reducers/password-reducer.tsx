import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
} from '../actions/password-action';

type TForgotPasswordRequest = {
	type: typeof FORGOT_PASSWORD_REQUEST;
};

type TForgotPasswordSuccess = {
	type: typeof FORGOT_PASSWORD_SUCCESS;
};

type TForgotPasswordFailed = {
	type: typeof FORGOT_PASSWORD_FAILED;
	payload: Error | null;
};

type TResetPasswordRequest = {
	type: typeof RESET_PASSWORD_REQUEST;
};

type TResetPasswordSuccess = {
	type: typeof RESET_PASSWORD_SUCCESS;
};

type TResetPasswordFailed = {
	type: typeof RESET_PASSWORD_FAILED;
	payload: Error | null;
};

type TPasswordTypes =
	| TForgotPasswordRequest
	| TForgotPasswordSuccess
	| TForgotPasswordFailed
	| TResetPasswordRequest
	| TResetPasswordSuccess
	| TResetPasswordFailed;

type TInitialState = {
	forgotPasswordLoading: boolean;
	forgotPasswordError: null;
	resetPasswordLoading: boolean;
	resetPasswordError: null;
};

const initialState: TInitialState = {
	forgotPasswordLoading: false,
	forgotPasswordError: null,
	resetPasswordLoading: false,
	resetPasswordError: null,
};

const passwordReducer = (
	state: TInitialState = initialState,
	action: TPasswordTypes
) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				forgotPasswordLoading: true,
				forgotPasswordError: null,
			};

		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPasswordLoading: false,
				forgotPasswordError: null,
			};

		case FORGOT_PASSWORD_FAILED:
			return {
				...state,
				forgotPasswordLoading: false,
				forgotPasswordError: action.payload,
			};

		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				resetPasswordLoading: true,
				resetPasswordError: null,
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordLoading: false,
				resetPasswordError: null,
			};

		case RESET_PASSWORD_FAILED:
			return {
				...state,
				resetPasswordLoading: false,
				resetPasswordError: action.payload,
			};

		default:
			return state;
	}
};

export default passwordReducer;
