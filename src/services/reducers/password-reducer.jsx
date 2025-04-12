import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
} from '../actions/password-action.tsx';

const initialState = {
	forgotPasswordLoading: false,
	forgotPasswordError: null,
	resetPasswordLoading: false,
	resetPasswordError: null,
};

const passwordReducer = (state = initialState, action) => {
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
