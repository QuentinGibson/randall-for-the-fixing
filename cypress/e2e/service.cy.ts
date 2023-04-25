describe("All Services Page", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("shows services", () => {
    cy.get(".tp-service-2-item").should('have.length.gte', 1)
  })

  it("should contain testimonies", () => {
    cy.get(".tp-testimonial-2-wrapper h3").should('have.length.gte', 1)
  })

});

describe("One Service", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should be able to search for more services", () => {
    cy.get("input[name='search']").type("cooking")
    cy.get("#search-results").should('have.length.gte', 1)
  })

  it("should have a image", () => {
    cy.get(".tp-service-details-thumb img").should('have.attr', 'src')
  })
  it("should have all its content", () => {
    cy.get(".tp-service-details-text-title").first().should('have.length.gte', 1)
  })
  it("should have other services", () => {
    cy.get(".#service-sidebar .service-sidebar__widget-content ul").should('have.length.gte', 1)
  })
  it("should have a gallery", () => {
    cy.get("tp-service-details-thumb-2 img").should('have.length.gte', 1)
  })
})