
describe("about page", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("shows the awards", () => {
    cy.get('.company-awards').should('have.length.gte', 1)
  })

  it("should contain testimonies", () => {
    cy.get('tp-testimonial-2-wrapper p').should('have.length.gte', 1)

  })

  it("should showcase our blog", () => {
    cy.get("tp-blog-2-thumb a").first().should('have.attr', 'href').and('match', /\/blog\/.*/)
  })

});