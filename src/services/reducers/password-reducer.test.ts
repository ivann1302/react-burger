import passwordReducer from './password-reducer';
import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
} from '../actions/password-action';

describe('passwordReducer', () => {
	const initialState = {
		forgotPasswordLoading: false,
		forgotPasswordError: null,
		resetPasswordLoading: false,
		resetPasswordError: null,
	};

	it('should return the initial state on unknown action', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
		expect(passwordReducer(undefined, unknownAction)).toEqual(initialState);
	});

	it('should handle FORGOT_PASSWORD_REQUEST', () => {
		const result = passwordReducer(initialState, {
			type: FORGOT_PASSWORD_REQUEST,
		});
		expect(result).toEqual({
			...initialState,
			forgotPasswordLoading: true,
			forgotPasswordError: null,
		});
	});

	it('should handle FORGOT_PASSWORD_SUCCESS', () => {
		const prevState = { ...initialState, forgotPasswordLoading: true };
		const result = passwordReducer(prevState, {
			type: FORGOT_PASSWORD_SUCCESS,
		});
		expect(result).toEqual({
			...initialState,
			forgotPasswordLoading: false,
			forgotPasswordError: null,
		});
	});

	it('should handle FORGOT_PASSWORD_FAILED', () => {
		const error = new Error('Email not found');
		const result = passwordReducer(initialState, {
			type: FORGOT_PASSWORD_FAILED,
			payload: error,
		});
		expect(result).toEqual({
			...initialState,
			forgotPasswordLoading: false,
			forgotPasswordError: error,
		});
	});

	it('should handle RESET_PASSWORD_REQUEST', () => {
		const result = passwordReducer(initialState, {
			type: RESET_PASSWORD_REQUEST,
		});
		expect(result).toEqual({
			...initialState,
			resetPasswordLoading: true,
			resetPasswordError: null,
		});
	});

	it('should handle RESET_PASSWORD_SUCCESS', () => {
		const prevState = { ...initialState, resetPasswordLoading: true };
		const result = passwordReducer(prevState, {
			type: RESET_PASSWORD_SUCCESS,
		});
		expect(result).toEqual({
			...initialState,
			resetPasswordLoading: false,
			resetPasswordError: null,
		});
	});

	it('should handle RESET_PASSWORD_FAILED', () => {
		const error = new Error('Invalid token');
		const result = passwordReducer(initialState, {
			type: RESET_PASSWORD_FAILED,
			payload: error,
		});
		expect(result).toEqual({
			...initialState,
			resetPasswordLoading: false,
			resetPasswordError: error,
		});
	});
});
