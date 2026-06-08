describe("Profile Page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.get('a[href="/profile"]').first().click();
    cy.url({ timeout: 15000 }).should("include", "/profile");
  });

  it("should display user profile information", () => {
    cy.get("h1", { timeout: 15000 }).should("be.visible").and("not.be.empty");
    cy.contains(":visible", "customer", { timeout: 10000, matchCase: false }).should("be.visible");
  });

  it("should display email address", () => {
    cy.contains("Alamat Email", { timeout: 10000 }).should("be.visible");
  });

  it("should display phone number", () => {
    cy.contains("Nomor HP", { timeout: 10000 }).should("be.visible");
  });

  it("should display user initial avatar", () => {
    cy.get(".rounded-full.bg-primary-light", { timeout: 10000 }).should("be.visible");
  });

  it("should have 'Pesanan Saya' menu link", () => {
    cy.contains("Pesanan Saya", { timeout: 10000 }).should("be.visible");
    cy.contains("Cek riwayat dan status pesanan").should("be.visible");
  });

  it("should navigate to order history from profile menu", () => {
    cy.contains("Pesanan Saya", { timeout: 10000 }).click();
    cy.url({ timeout: 15000 }).should("include", "/order/history");
    cy.contains("Riwayat Pesanan", { timeout: 10000 }).should("be.visible");
  });

  it("should display logout button", () => {
    cy.contains("Keluar Sesi", { timeout: 10000 }).should("be.visible");
  });

  it("should logout successfully", () => {
    cy.contains("Keluar Sesi", { timeout: 10000 }).click();
    cy.url({ timeout: 30000 }).should("include", "/login");
    cy.wait(2000);
    cy.visit("/profile", { timeout: 30000 });
    cy.url({ timeout: 15000 }).should("include", "/login");
  });

  it("should have customer service contact link", () => {
    cy.contains("Hubungi Customer Service", { timeout: 10000 }).should("be.visible");
  });
});
