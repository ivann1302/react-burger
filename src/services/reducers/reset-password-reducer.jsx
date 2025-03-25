import {
	ALLOW_RESET_PASSWORD,
	DENY_RESET_PASSWORD,
} from '../actions/reset-password-actions';

const initialState = {
	canReset: false,
};

const resetPasswordReducer = (state = initialState, action) => {
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
