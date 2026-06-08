describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/", { timeout: 30000 });
  });

  it("should display the hero section and title", () => {
    cy.contains("Pesan Obat Online", { timeout: 15000 }).should("be.visible");
    cy.contains("Ambil di Apotek.").should("be.visible");
    cy.contains("Solusi Apotek Digital Terpercaya").should("be.visible");
  });

  it("should display the trust badges", () => {
    cy.contains("Stok Real-time").should("be.visible");
    cy.contains("Pickup Hari Ini").should("be.visible");
    cy.contains("Produk Asli 100%").should("be.visible");
  });

  it("should display featured products section", () => {
    cy.contains("Produk Unggulan").should("be.visible");
  });

  it("should navigate to products page on CTA click", () => {
    cy.contains("Cari Obat Sekarang").click();
    cy.url({ timeout: 15000 }).should("include", "/products");
  });
});
