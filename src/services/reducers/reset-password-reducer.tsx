import {
	ALLOW_RESET_PASSWORD,
	DENY_RESET_PASSWORD,
} from '../actions/reset-password-actions';

type TAllowResetPassword = {
	type: typeof ALLOW_RESET_PASSWORD;
};

type TDenyResetPassword = {
	type: typeof DENY_RESET_PASSWORD;
};

type TResetPasswordTypes = TAllowResetPassword | TDenyResetPassword;

type TInitialState = {
	canReset: boolean;
};

export const initialState: TInitialState = {
	canReset: false,
};

const resetPasswordReducer = (
	state: TInitialState = initialState,
	action: TResetPasswordTypes
) => {
	switch (action.type) {
		case ALLOW_RESET_PASSWORD:
			return { canReset: true };
		case DENY_RESET_PASSWORD:
			return { canReset: false };
		default:
			return state;
	}
};

export default resetPasswordReducer;
