import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	UPDATE_TOKEN_REQUEST,
	UPDATE_TOKEN_SUCCESS,
	UPDATE_TOKEN_FAILED,
} from './../actions/auth-actions';

const initialState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case LOGOUT_REQUEST:
		case UPDATE_TOKEN_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			};

		case LOGOUT_SUCCESS:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: null,
			};

		case UPDATE_TOKEN_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
			};

		case REGISTER_FAILED:
		case LOGIN_FAILED:
		case LOGOUT_FAILED:
		case UPDATE_TOKEN_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
