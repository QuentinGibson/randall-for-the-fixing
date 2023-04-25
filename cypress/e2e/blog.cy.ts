import { faker } from "@faker-js/faker";
describe("All blog posts page", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should show all posts", () => {
    cy.get("tp-blog-right-box").should('have.length.gte', 1)
  })

  it("should show post tags", () => {
    cy.get("service-sidebar__widget-content ul").should('have.length.gte', 1)
  })

  it("should paginate", () => {
    cy.get(".pagination").should('have.length.gte', 1)
  })
});

describe("One Post", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should have a image", () => {

  })

  it("should have content", () => {

  })
  it("should have recent posts", () => {

  })
  it("should have a next/previous button", () => {

  })
})