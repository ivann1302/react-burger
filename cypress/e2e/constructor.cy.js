const CONSTRUCTOR_SELECTOR = '[class^="burger-constructor"]';

Cypress.Commands.add('loginAsTestUser', () => {
	cy.get('input[type="email"]').type('testname@mail.ru');
	cy.get('input[type="password"]').type('testname');
	cy.get('button').contains('Войти').click();
	cy.wait('@login');
});

describe('Constructor full flow test', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/ingredients').as('getIngredients');
		cy.intercept('POST', '**/auth/login', {
			statusCode: 200,
			body: {
				success: true,
				accessToken: 'Bearer fake-token',
				refreshToken: 'fake-refresh-token',
				user: {
					email: 'testname@mail.ru',
					name: 'Test User',
				},
			},
		}).as('login');

		cy.intercept('POST', '**/orders', {
			statusCode: 200,
			body: {
				success: true,
				name: 'Флюоресцентный бургер',
				order: { number: 123456 },
			},
		}).as('postOrder');
	});

	it('full flow: modal + build + login + order', () => {
		// 1. Зайти на главную и дождаться ингредиентов
		cy.visit('/');
		cy.wait('@getIngredients');

		// 2. Открыть и закрыть модалку ингредиента
		cy.get('[data-testid="ingredient-sauce"]').first().as('sauce');
		cy.get('@sauce').click();
		cy.get('[role="dialog"]').as('modal').should('exist');
		cy.get('button[aria-label="Закрыть модальное окно"]').click();
		cy.get('@modal').should('not.exist');

		// 3. Собрать бургер
		cy.get(CONSTRUCTOR_SELECTOR).as('constructor');
		cy.get('[data-testid="ingredient-bun"]').first().as('bun');
		cy.get('[data-testid="ingredient-main"]').first().as('main');
		cy.get('[data-testid="ingredient-sauce"]').first().as('sauceAgain');

		cy.get('@bun').drag('@constructor');
		cy.get('@main').drag('@constructor');
		cy.get('@sauceAgain').drag('@constructor');

		// 4. Переход на логин и авторизация
		cy.get('button').contains('Оформить заказ').as('submitOrder').click();
		cy.loginAsTestUser();

		// 5. Повторная отправка заказа
		cy.get('@submitOrder', { timeout: 20000 }).click();

		// 6. Проверка результата
		cy.wait('@postOrder', { timeout: 20000 });
		cy.contains('Ваш заказ начали готовить', { timeout: 10000 }).should(
			'be.visible'
		);
		cy.get('.text_type_digits-large').should('contain.text', '123456');
	});
});
