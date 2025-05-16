import userReducer, { initialState } from './user-reducer';
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
	const sampleUser: IUser = {
		email: 'test@example.com',
		name: 'Test User',
	};

	const sampleError = new Error('Something went wrong');

	const loadingState = {
		...initialState,
		isLoading: true,
		error: null,
	};

	const successState = {
		...initialState,
		user: sampleUser,
		isLoading: false,
		error: null,
	};

	const failedState = {
		...initialState,
		isLoading: false,
		error: sampleError,
	};

	it('should return initial state by default', () => {
		const unknownAction = { type: 'UNKNOWN' } as any;
		expect(userReducer(undefined, unknownAction)).toEqual(initialState);
	});

	it('should handle GET_USER_REQUEST', () => {
		const action = { type: GET_USER_REQUEST } as const;
		expect(userReducer(initialState, action)).toEqual(loadingState);
	});

	it('should handle UPDATE_USER_REQUEST', () => {
		const action = { type: UPDATE_USER_REQUEST } as const;
		expect(userReducer(initialState, action)).toEqual(loadingState);
	});

	it('should handle GET_USER_SUCCESS', () => {
		const action = { type: GET_USER_SUCCESS, payload: sampleUser } as const;
		expect(userReducer(initialState, action)).toEqual(successState);
	});

	it('should handle UPDATE_USER_SUCCESS', () => {
		const action = { type: UPDATE_USER_SUCCESS, payload: sampleUser } as const;
		expect(userReducer(initialState, action)).toEqual(successState);
	});

	it('should handle GET_USER_FAILED', () => {
		const action = { type: GET_USER_FAILED, payload: sampleError } as const;
		expect(userReducer(initialState, action)).toEqual(failedState);
	});

	it('should handle UPDATE_USER_FAILED', () => {
		const action = { type: UPDATE_USER_FAILED, payload: sampleError } as const;
		expect(userReducer(initialState, action)).toEqual(failedState);
	});
});
