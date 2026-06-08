describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/contact", { timeout: 30000 });
    cy.contains("h1", "Hubungi Kami", { timeout: 15000 }).should("be.visible");
  });

  it("should display the hero section", () => {
    cy.contains("h1", "Hubungi Kami").should("be.visible");
    cy.contains("Tim kami siap membantu").should("be.visible");
  });

  it("should display contact info cards", () => {
    cy.contains("Telepon & WhatsApp", { timeout: 10000 }).should("be.visible");
    cy.contains("Email Dukungan").should("be.visible");
    cy.contains("Lokasi Apotek").should("be.visible");
  });

  it("should display social media section", () => {
    cy.contains("Sosial Media Kami", { timeout: 10000 }).should("be.visible");
  });

  it("should display the contact form", () => {
    cy.contains("Kirim Pesan Langsung", { timeout: 10000 }).should("be.visible");
    cy.contains("Nama Lengkap").should("be.visible");
    cy.contains("Email Aktif").should("be.visible");
    cy.contains("Subjek").should("be.visible");
    cy.contains("Pesan Anda").should("be.visible");
    cy.contains("Kirim Sekarang").should("be.visible");
  });

  it("should have a subject dropdown with options", () => {
    cy.get("select", { timeout: 10000 }).should("be.visible");
    cy.get("select option").should("have.length.greaterThan", 1);
    cy.get("select").select("Status Pesanan");
    cy.get("select").should("have.value", "Status Pesanan");
  });

  it("should submit the contact form", () => {
    cy.get('form input[type="text"]', { timeout: 10000 }).first().type("Cypress Test User");
    cy.get('form input[type="email"]').type("cypress@test.com");
    cy.get("form select").select("Masalah Teknis");
    cy.get("form textarea").type("This is an automated test message from Cypress E2E.");

    cy.on("window:alert", (text) => {
      expect(text).to.include("Terima kasih");
    });

    cy.contains("Kirim Sekarang").click();
  });
});
