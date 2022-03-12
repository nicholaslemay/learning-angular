describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('h1').contains("Hello World. I'm learning angular");
    cy.title().should('contain','Hello World!');
  });
});
