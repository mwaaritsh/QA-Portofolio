describe("Order Confirmation Page", () => {
  it("should complete checkout and display all order confirmation details", () => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.window().then((win) => {
      win.localStorage.removeItem("pharmatrack-cart");
    });

    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).first()
      .find('button:contains("Beli")')
      .click({ timeout: 10000 });
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 10000 }).should("be.visible");

    cy.visit("/checkout", { timeout: 30000 });
    cy.contains("Checkout Pesanan", { timeout: 15000 }).should("be.visible");
    cy.get('input[name="customerName"]', { timeout: 10000 }).clear().type("Cypress Order Test");
    cy.get('input[name="customerPhone"]').clear().type("081234567890");
    cy.contains("Bayar di Apotek").click();
    cy.contains("Buat Pesanan").click();

    cy.url({ timeout: 30000 }).should("include", "/order/confirmation");
    cy.contains("Pesanan Berhasil Dibuat!", { timeout: 15000 }).should("be.visible");

    cy.contains("Nomor Pesanan", { timeout: 10000 }).should("be.visible");
    cy.contains("Detail Pengambilan").should("be.visible");
    cy.contains("Nama").should("be.visible");
    cy.contains("No. WhatsApp").should("be.visible");
    cy.contains("Metode Pembayaran").should("be.visible");
    cy.contains("Daftar Produk").should("be.visible");
    cy.contains("Rp").should("be.visible");
    cy.contains("Total Harga").should("be.visible");

    cy.contains("Lihat Riwayat").should("be.visible").click();
    cy.url({ timeout: 15000 }).should("include", "/order/history");
  });
});

describe("Order History Page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.visit("/order/history", { timeout: 30000 });
    cy.contains("Riwayat Pesanan", { timeout: 15000 }).should("be.visible");
  });

  it("should display the order history page header", () => {
    cy.contains("Riwayat Pesanan").should("be.visible");
  });

  it("should display status filter tabs", () => {
    cy.contains(":visible", "Semua Pesanan", { timeout: 10000 }).should("be.visible");
    cy.contains(":visible", "Pending").should("be.visible");
    cy.contains(":visible", "Diproses").should("be.visible");
    cy.contains(":visible", "Siap Ambil").should("be.visible");
    cy.contains(":visible", "Selesai").should("be.visible");
  });

  it("should filter orders by clicking status tab", () => {
    cy.contains(":visible", "Pending", { timeout: 10000 }).click();
    cy.url({ timeout: 15000 }).should("include", "status=pending");
    cy.wait(2000);
    cy.contains("Riwayat Pesanan").should("be.visible");
  });

  it("should show all orders when 'Semua Pesanan' tab is clicked", () => {
    cy.contains(":visible", "Pending", { timeout: 10000 }).click();
    cy.url({ timeout: 15000 }).should("include", "status=pending");
    cy.wait(2000);

    cy.contains(":visible", "Semua Pesanan").click();
    cy.url({ timeout: 15000 }).should("include", "/order/history");
    cy.url().should("not.include", "status=");
  });
});
