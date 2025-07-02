import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
} from '../actions/user-actions';
import { IUser } from './../../utils/types';

type TGetUserRequest = {
	type: typeof GET_USER_REQUEST;
};

type TGetUserSuccess = {
	type: typeof GET_USER_SUCCESS;
	payload: IUser;
};

type TGetUserFailed = {
	type: typeof GET_USER_FAILED;
	payload: Error;
};

type TUpdateUserRequest = {
	type: typeof UPDATE_USER_REQUEST;
};

type TUpdateUserSucces = {
	type: typeof UPDATE_USER_SUCCESS;
	payload: IUser;
};

type TUpdateUserFailed = {
	type: typeof UPDATE_USER_FAILED;
	payload: Error;
};

type TUserTypes =
	| TGetUserRequest
	| TGetUserSuccess
	| TGetUserFailed
	| TUpdateUserRequest
	| TUpdateUserSucces
	| TUpdateUserFailed;

type TInitialState = {
	user: IUser | null;
	isLoading: boolean;
	error: Error | null;
};

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

const userReducer = (
	state: TInitialState = initialState,
	action: TUserTypes
) => {
	switch (action.type) {
		case GET_USER_REQUEST:
		case UPDATE_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case GET_USER_SUCCESS:
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				error: null,
			};
		case GET_USER_FAILED:
		case UPDATE_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
