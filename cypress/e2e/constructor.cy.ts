import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('отображает список доступных ингредиентов', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"], [data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.get('[data-ingredient="bun"]').first().find('button').click();

    cy.get('.constructor-element__text').should('have.length.at.least', 2);

    cy.get('[data-ingredient="main"]').first().find('button').click();

    cy.get('.constructor-element__text').should('have.length.at.least', 3);
  });

  describe('Модальные окна описаний ингредиентов', () => {
    it('открывает модальное окно при клике на ингредиент', () => {
      const fillingName = 'Краторная булка N-200i';
      cy.contains('[data-ingredient="bun"]', fillingName).click();
      cy.get('#modals').contains('Детали ингредиента').should('exist');
      cy.get('#modals').should('contain.text', fillingName);
    });

    it('сохраняет модальное окно при перезагрузке страницы', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.reload(true);
      cy.get('#modals').contains('Детали ингредиента').should('exist');
    });

    it('закрывает модальное окно по кнопке "крестик"', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('#modals').should('exist');
      cy.get('#modals button:first-of-type').click();
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    });

    it('закрывает модальное окно при клике на оверлей', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('#modals > div:nth-of-type(2)').click({ force: true });
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    });

    it('закрывает модальное окно при нажатии клавиши Escape', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('body').type('{esc}');
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('собирает бургер и оформляет заказ после авторизации', () => {
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.contains('button.button_type_primary', 'Оформить заказ')
        .should('be.enabled')
        .click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number.toString()
      );
      cy.get('[data-test="constructor-ingredient"]').should('not.exist');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
