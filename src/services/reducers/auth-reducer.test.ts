import authReducer, { TAuthState } from './auth-reducer';
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
	CHECK_AUTH_FAILED,
} from '../actions/auth-actions';
import { IUser } from './../../utils/types';

const user: IUser = {
	email: 'test@example.com',
	name: 'Test User',
};

const error = 'Something went wrong';

describe('authReducer', () => {
	const initialState: TAuthState = {
		user: null,
		isAuthenticated: null,
		isLoading: false,
		error: null,
	};

	const loadingState: TAuthState = {
		...initialState,
		isLoading: true,
		error: null,
	};

	const successAuthState: TAuthState = {
		...initialState,
		user,
		isAuthenticated: true,
		isLoading: false,
		error: null,
	};

	const failedState: TAuthState = {
		...initialState,
		isAuthenticated: false,
		isLoading: false,
		error,
	};

	it('should return the initial state', () => {
		expect(authReducer(undefined, {} as any)).toEqual(initialState);
	});

	it.each([
		REGISTER_REQUEST,
		LOGIN_REQUEST,
		LOGOUT_REQUEST,
		UPDATE_TOKEN_REQUEST,
		CHECK_AUTH_REQUEST,
	] as const)('should handle %s', (type) => {
		expect(authReducer(initialState, { type })).toEqual(loadingState);
	});

	it.each([
		[REGISTER_SUCCESS, user],
		[LOGIN_SUCCESS, user],
		[CHECK_AUTH_SUCCESS, user],
	] as const)('should handle %s', (type, payload) => {
		expect(authReducer(initialState, { type, payload })).toEqual(
			successAuthState
		);
	});

	it('should handle LOGOUT_SUCCESS', () => {
		const stateWithUser: TAuthState = {
			...initialState,
			user,
			isAuthenticated: true,
		};
		expect(authReducer(stateWithUser, { type: LOGOUT_SUCCESS })).toEqual({
			...initialState,
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,
		});
	});

	it('should handle UPDATE_TOKEN_SUCCESS', () => {
		expect(authReducer(loadingState, { type: UPDATE_TOKEN_SUCCESS })).toEqual({
			...initialState,
			isLoading: false,
			error: null,
		});
	});

	it.each([
		REGISTER_FAILED,
		LOGIN_FAILED,
		LOGOUT_FAILED,
		UPDATE_TOKEN_FAILED,
		CHECK_AUTH_FAILED,
	] as const)('should handle %s', (type) => {
		expect(authReducer(initialState, { type, payload: error })).toEqual(
			failedState
		);
	});
});
