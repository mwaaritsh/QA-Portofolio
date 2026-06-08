Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 30000 }).should("not.include", "/login");
});
