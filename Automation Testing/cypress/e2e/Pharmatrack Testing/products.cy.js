describe("Product Catalog & Search", () => {
  beforeEach(() => {
    cy.visit("/products", { timeout: 30000 });
  });

  it("should display the product catalog header and count", () => {
    cy.contains("Katalog Produk", { timeout: 15000 }).should("be.visible");
    cy.contains("Produk").should("be.visible");
  });

  it("should display sidebar category links", () => {
    cy.contains("Kategori", { timeout: 15000 }).should("be.visible");
    cy.contains("Semua Kategori").should("be.visible");
  });

  it("should display product articles/cards in the catalog", () => {
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
  });

  it("should filter products by clicking a category", () => {
    cy.get('aside a').contains(/^(?!Semua Kategori$).+/).first().then(($link) => {
      const categoryName = $link.text().trim();
      cy.wrap($link).click();
      cy.url({ timeout: 15000 }).should("include", "category=");
      cy.get('aside a.bg-primary-light').should("contain", categoryName);
    });
  });

  it("should search for a product using search bar in navbar", () => {
    cy.get('nav form[role="search"] input').type("paracetamol{enter}");
    cy.url({ timeout: 15000 }).should("include", "q=paracetamol");
  });

  it("should navigate to product detail page on click", () => {
    cy.get('[role="article"]', { timeout: 15000 }).first().then(($card) => {
      const productName = $card.find('h3').text().trim();
      cy.wrap($card).click();
      cy.url({ timeout: 15000 }).should("include", "/products/");
      cy.get('h1', { timeout: 15000 }).should("contain", productName);
      cy.contains("Detail Pengambilan", { timeout: 5000 }).should("not.exist");
      cy.contains("Tambah ke Keranjang").should("be.visible");
    });
  });
});
