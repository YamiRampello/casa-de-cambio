const URL = 'http://192.168.0.25:8080/';

context('Interfaz para la API casa de cambio', () => {
  before(() => {
    cy.visit(URL);
  });

  describe('Prueba la interfaz', () => {
    const CANTIDAD_BOTONES = 2;

    it('se asegura que haya dos botones', () => {
      cy.get('.container')
        .find('button')
        .should('have.length', CANTIDAD_BOTONES);
    });

    it('se asegura que los inputs esten visibles', () => {
      cy.visit(URL);
      cy.get('.container').find('input').should('not.have.class', 'disabled');
    });

    it('se asegura que las opciones de monedas no esten visibles', () => {
      cy.visit(URL);
      cy.get('#lista-monedas').should('not.be.visible');
    });

    it('se asegura que los tipos de cambio no esten visibles', () => {
      cy.visit(URL);
      cy.get('#lista-moneda-fecha-solicitado').should('not.be.visible');
    });

    it('se asegura que al hacer click al boton muestre monedas', () => {
      cy.visit(URL);
      cy.get('#ver-monedas').click();
      cy.get('#lista-monedas').find('li').should('be.visible');
    });

    it('se asegura que al hacer click al boton muestre los cambios', () => {
      cy.visit(URL);
      cy.get('#buscar-tipos-de-cambio').click();
      cy.get('#lista-moneda-fecha-solicitado').find('li').should('be.visible');
    });
  });
});
