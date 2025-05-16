import userReducer from './user-reducer';
import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
} from '../actions/user-actions';
import { IUser } from '../../utils/types';

describe('userReducer', () => {
	const initialState = {
		user: null,
		isLoading: false,
		error: null,
	};

	const sampleUser: IUser = {
		email: 'test@example.com',
		name: 'Test User',
	};

	const sampleError = new Error('Something went wrong');

	it('should return initial state by default', () => {
		const unknownAction = { type: 'UNKNOWN' } as any;
		expect(userReducer(undefined, unknownAction)).toEqual(initialState);
	});

	it('should handle GET_USER_REQUEST', () => {
		const action = { type: GET_USER_REQUEST } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		});
	});

	it('should handle UPDATE_USER_REQUEST', () => {
		const action = { type: UPDATE_USER_REQUEST } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		});
	});

	it('should handle GET_USER_SUCCESS', () => {
		const action = { type: GET_USER_SUCCESS, payload: sampleUser } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			user: sampleUser,
			isLoading: false,
			error: null,
		});
	});

	it('should handle UPDATE_USER_SUCCESS', () => {
		const action = { type: UPDATE_USER_SUCCESS, payload: sampleUser } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			user: sampleUser,
			isLoading: false,
			error: null,
		});
	});

	it('should handle GET_USER_FAILED', () => {
		const action = { type: GET_USER_FAILED, payload: sampleError } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			isLoading: false,
			error: sampleError,
		});
	});

	it('should handle UPDATE_USER_FAILED', () => {
		const action = { type: UPDATE_USER_FAILED, payload: sampleError } as const;
		const result = userReducer(initialState, action);
		expect(result).toEqual({
			...initialState,
			isLoading: false,
			error: sampleError,
		});
	});
});
