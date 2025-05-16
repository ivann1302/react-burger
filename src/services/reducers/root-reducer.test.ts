import rootReducer, { RootState } from './root-reducer';
describe('rootReducer', () => {
	it('should return the initial state', () => {
		const state = rootReducer(undefined, { type: '@@INIT' } as any);

		expect(state).toHaveProperty('ingredients');
		expect(state).toHaveProperty('ingredientDetails');
		expect(state).toHaveProperty('order');
		expect(state).toHaveProperty('burgerConstructor');
		expect(state).toHaveProperty('auth');
		expect(state).toHaveProperty('password');
		expect(state).toHaveProperty('user');
		expect(state).toHaveProperty('resetPassword');
		expect(state).toHaveProperty('feedOrders');
		expect(state).toHaveProperty('profileOrders');

		// Проверим тип RootState
		const typedState: RootState = state;
		expect(typedState).toBeDefined();
	});

	it('should not modify state on unknown action', () => {
		const prevState = rootReducer(undefined, { type: '@@INIT' } as any);
		const nextState = rootReducer(prevState, { type: 'UNKNOWN_ACTION' } as any);
		expect(nextState).toEqual(prevState);
	});
});
