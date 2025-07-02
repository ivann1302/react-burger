import resetPasswordReducer, { initialState } from './reset-password-reducer';
import {
	ALLOW_RESET_PASSWORD,
	DENY_RESET_PASSWORD,
} from '../actions/reset-password-actions';

describe('resetPasswordReducer', () => {
	const allowedState = { canReset: true };
	const deniedState = { canReset: false };

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
		expect(result).toEqual(allowedState);
	});

	it('should handle DENY_RESET_PASSWORD', () => {
		const result = resetPasswordReducer(allowedState, {
			type: DENY_RESET_PASSWORD,
		});
		expect(result).toEqual(deniedState);
	});
});
