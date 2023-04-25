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
    cy.get("tp-blog-details-thumb img").should('have.attr', 'src')
  })

  it("should have content", () => {
    cy.get("tp-blog-details-content").should('have.length.gte', 1)
  })
  it("should have recent posts", () => {
    cy.get("tp-blog-sidebar__post").should('have.length.gte', 1)
  })
  it("should have a next/previous button", () => {
    cy.get("postbox__more-left postbox-more-icon a").should('have.attr', 'href').and('include', 'blog')
    cy.get("postbox__more-right postbox-more-icon a").should('have.attr', 'href').and('include', 'blog')
  })
})