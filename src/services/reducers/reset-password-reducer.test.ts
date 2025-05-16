import resetPasswordReducer from './reset-password-reducer';
import {
	ALLOW_RESET_PASSWORD,
	DENY_RESET_PASSWORD,
} from '../actions/reset-password-actions';

describe('resetPasswordReducer', () => {
	const initialState = { canReset: false };

	it('should return the initial state by default', () => {
		const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
		expect(resetPasswordReducer(undefined, unknownAction)).toEqual(
			initialState
		);
	});

	it('should handle ALLOW_RESET_PASSWORD', () => {
		const result = resetPasswordReducer(initialState, {
			type: ALLOW_RESET_PASSWORD,
		});
		expect(result).toEqual({ canReset: true });
	});

	it('should handle DENY_RESET_PASSWORD', () => {
		const state = { canReset: true };
		const result = resetPasswordReducer(state, {
			type: DENY_RESET_PASSWORD,
		});
		expect(result).toEqual({ canReset: false });
	});
});
