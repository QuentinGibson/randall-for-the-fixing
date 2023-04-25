describe("All blog posts page", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should show all projects", () => {
    cy.get("tp-project-thumb").should('have.length.gte', 1)
  })

  it("should be able to fetch more", () => {
    cy.get("#view-more").click();
  })
});

describe("One Post", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should have a image", () => {
    cy.get("tp-service-details-thumb img").should('have.attr', 'src')
  })

  it("should have content", () => {
    cy.get("tp-service-details-text-title").first().should('have.length.gte', 1)
  })
  it("should have recent posts", () => {
    cy.get("tp-service-details-thumb-2 img").should('have.length.gte', 1)
  })
})