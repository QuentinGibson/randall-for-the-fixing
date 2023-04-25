describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("shows the business information", () => {
    cy.fixture('business.json').then(companyData => {
    cy.get('.company-phone').should('have.attr', 'href', `tel:${companyData.phone}`)
    cy.get('.company-email').should('contain', companyData.email)
    cy.get('.company-address').should('contain', companyData.address)
    })

  })

  it("should contain all nav links", () => {
    cy.get('#service-list').contains('li a')
  })

  it("should have other links", () => {
    cy.get('tp-btn custom-cta').should('have.attr', 'href', '/contact')
    cy.get('#services-homes-button').should('have.attr', 'href', '/services')
    cy.get('tp-service-2-btn a').first().should('have.attr', 'href').and('match', /\/services\/.*/)

  })

  it("should showcase our work", () => {
    cy.get("tp-porfolio-thumb a").should('have.attr', 'href').and('match', /\/projects\/.*/)
  })

  it("should showcase our testimonies", () => {
    cy.get("tp-testimonial-2-wrapper p").first().should('not.have.text', '')
  })

  it("should showcase our blog", () => {
    cy.get("tp-blog-2-thumb a").first().should('have.attr', 'href').and('match', /\/blog\/.*/)
  })
  it("should link to our social media", () => {
    cy.get("#facebook-link").should('have.attr', 'href').and('match', /https:\/\/www.facebook.com\/.*/)
    cy.get("#twitter-link").should('have.attr', 'href').and('match', /https:\/\/twitter.com\/.*/)
    cy.get("#instagram-link").should('have.attr', 'href').and('match', /https:\/\/www.instagram.com\/.*/)
  })
});