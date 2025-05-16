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
		// 1. Зайти на главную и дождаться данных
		cy.visit('/');
		cy.wait('@getIngredients');

		// 2. Модалка ингредиента
		cy.get('[data-testid="ingredient-sauce"]').first().click();
		cy.get('[role="dialog"]').should('exist');
		cy.get('button[aria-label="Закрыть модальное окно"]').click();
		cy.get('[role="dialog"]').should('not.exist');

		// 3. Собрать бургер
		cy.get('[data-testid="ingredient-bun"]')
			.first()
			.drag('[class^="burger-constructor"]');
		cy.get('[data-testid="ingredient-main"]')
			.first()
			.drag('[class^="burger-constructor"]');
		cy.get('[data-testid="ingredient-sauce"]')
			.first()
			.drag('[class^="burger-constructor"]');

		// 4. Перейти на логин
		cy.get('button').contains('Оформить заказ').click();

		// 5. Авторизация
		cy.get('input[type="email"]').type('testname@mail.ru');
		cy.get('input[type="password"]').type('testname');
		cy.get('button').contains('Войти').click();
		cy.wait('@login');

		// 6. Повторная отправка заказа
		cy.get('button').contains('Оформить заказ', { timeout: 20000 }).click();

		// 7. Проверка ответа
		cy.wait('@postOrder', { timeout: 20000 }); // ждёт до 20 секунд
		cy.contains('Ваш заказ начали готовить', { timeout: 10000 }).should(
			'be.visible'
		);
		cy.get('.text_type_digits-large').should('contain.text', '123456');
	});
});
