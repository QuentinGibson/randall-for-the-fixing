describe("Contact Page", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should have business information", () => {
    cy.fixture('business').then((business) => {
    cy.get('.contact-inner .company-phone').should('have.attr', 'href', `tel:${business.phone}`)
      cy.get('.contact-inner .company-email').should('have.attr', 'href', `mailto:${business.email}`)
      cy.get('.contact-inner .company-address').should('contain', business.address) }) })
});