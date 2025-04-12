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
	CHECK_AUTH_REQUEST,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILED, // ← добавь эти
} from '../actions/auth-actions';
import { IUser } from './../../utils/types';

const initialState = {
	user: null,
	isAuthenticated: null, // ← стартовое состояние: null (ещё не знаем)
	isLoading: false,
	error: null,
};

type TAuthActionTypes =
	| { type: typeof REGISTER_REQUEST }
	| { type: typeof REGISTER_SUCCESS; payload: IUser }
	| { type: typeof REGISTER_FAILED; payload: string }
	| { type: typeof LOGIN_REQUEST }
	| { type: typeof LOGIN_SUCCESS; payload: IUser }
	| { type: typeof LOGIN_FAILED; payload: string }
	| { type: typeof LOGOUT_REQUEST }
	| { type: typeof LOGOUT_SUCCESS }
	| { type: typeof LOGOUT_FAILED; payload: string }
	| { type: typeof UPDATE_TOKEN_REQUEST }
	| { type: typeof UPDATE_TOKEN_SUCCESS }
	| { type: typeof UPDATE_TOKEN_FAILED; payload: string }
	| { type: typeof CHECK_AUTH_REQUEST }
	| { type: typeof CHECK_AUTH_SUCCESS; payload: IUser }
	| { type: typeof CHECK_AUTH_FAILED; payload: string };

const authReducer = (state = initialState, action: TAuthActionTypes) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case LOGOUT_REQUEST:
		case UPDATE_TOKEN_REQUEST:
		case CHECK_AUTH_REQUEST: // ← добавь
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
		case CHECK_AUTH_SUCCESS: // ← добавь
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
		case CHECK_AUTH_FAILED: // ← добавь
			return {
				...state,
				isAuthenticated: false, // ← важно!
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default authReducer;
