describe("Prueba en TypeScript", () => {
    it("Debe visitar la página y verificar el título", () => {
      cy.visit("https://example.cypress.io");
      cy.title().should("include", "Cypress");
    });
  });