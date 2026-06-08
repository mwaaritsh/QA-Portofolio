describe("Checkout Flow", () => {
  beforeEach(() => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.window().then((win) => {
      win.localStorage.removeItem("pharmatrack-cart");
    });

    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
    cy.get('[role="article"]')
      .first()
      .find('button:contains("Beli")')
      .click({ timeout: 10000 });
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 10000 }).should("be.visible");

    cy.visit("/checkout", { timeout: 30000 });
    cy.contains("Checkout Pesanan", { timeout: 15000 }).should("be.visible");
  });

  it("should display the checkout form sections", () => {
    cy.contains("1. Data Pemesan").should("be.visible");
    cy.contains("Nama Lengkap").should("be.visible");
    cy.contains("Nomor WhatsApp").should("be.visible");

    cy.contains("2. Metode Pembayaran").should("be.visible");
    cy.contains("Transfer / QRIS").should("be.visible");
    cy.contains("Bayar di Apotek").should("be.visible");

    cy.contains("3. Catatan (Opsional)").should("be.visible");
  });

  it("should display the order summary sidebar", () => {
    cy.contains("Pesanan Anda", { timeout: 10000 }).should("be.visible");
    cy.contains("Subtotal").should("be.visible");
    cy.contains("Total Bayar").should("be.visible");
    cy.contains("Buat Pesanan").should("be.visible");
  });

  it("should show validation errors when submitting empty form", () => {
    cy.get('input[name="customerName"]', { timeout: 10000 }).clear();
    cy.get('input[name="customerPhone"]').clear();

    cy.contains("Buat Pesanan").click();
    cy.wait(1000);

    cy.contains("Nama Anda harus lebih dari 2 karakter", { timeout: 5000 }).should("be.visible");
  });

  it("should select cash payment method", () => {
    cy.contains("Bayar di Apotek", { timeout: 10000 }).click();
    cy.get('input[value="cash"]').should("be.checked");
  });

  it("should select QRIS payment method", () => {
    cy.contains("Bayar di Apotek", { timeout: 10000 }).click();
    cy.get('input[value="cash"]').should("be.checked");

    cy.contains("Transfer / QRIS").click();
    cy.get('input[value="qris"]').should("be.checked");
  });

  it("should fill out the checkout form and submit successfully", () => {
    cy.get('input[name="customerName"]', { timeout: 10000 }).clear().type("Cypress Test User");
    cy.get('input[name="customerPhone"]').clear().type("081234567890");

    cy.contains("Bayar di Apotek").click();
    cy.get('textarea[name="notes"]').type("Catatan dari Cypress E2E test");

    cy.contains("Buat Pesanan").click();

    cy.url({ timeout: 30000 }).should("include", "/order/confirmation");
    cy.contains("Pesanan Berhasil Dibuat!", { timeout: 15000 }).should("be.visible");
  });

  it("should navigate back to cart from checkout header", () => {
    cy.get('a[href="/cart"]', { timeout: 10000 }).first().click();
    cy.url({ timeout: 15000 }).should("include", "/cart");
  });
});
