describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit("/login", { timeout: 30000 });
  });

  it("should display the login page form", () => {
    cy.contains("Masuk ke PharmaTrack", { timeout: 15000 }).should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Masuk");
  });

  it("should display error message with invalid credentials", () => {
    cy.get('input[name="email"]').type("wrong-email@example.com");
    cy.get('input[name="password"]').type("incorrectpassword");
    cy.get('button[type="submit"]').click();
    
    cy.get('.bg-red-50', { timeout: 15000 }).should("be.visible");
  });

  it("should navigate to register page and display form", () => {
    cy.contains("Daftar sekarang").click();
    cy.url({ timeout: 15000 }).should("include", "/register");
    cy.contains("Daftar Akun Baru", { timeout: 15000 }).should("be.visible");
    
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="phone"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Buat Akun");
  });

  it("should login successfully with valid credentials", () => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.url({ timeout: 30000 }).should("eq", Cypress.config("baseUrl") + "/");
  });

  it("should redirect unauthenticated users to login for protected pages", () => {
    cy.visit("/profile", { timeout: 30000 });
    cy.url({ timeout: 15000 }).should("include", "/login");
  });
});
