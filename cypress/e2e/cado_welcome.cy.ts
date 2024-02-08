describe('Cado App', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });
    cy.contains('Paw to begin');
  });
});