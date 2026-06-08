describe("Cart Management", () => {
  beforeEach(() => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.window().then((win) => {
      win.localStorage.removeItem("pharmatrack-cart");
    });
  });

  it("should display empty cart page initially", () => {
    cy.visit("/cart", { timeout: 30000 });
    cy.contains("Keranjang Belanja Kosong", { timeout: 15000 }).should("be.visible");
    cy.contains("Mulai Belanja").should("be.visible");
  });

  it("should add a product to cart from products catalog page", () => {
    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
    cy.get('[role="article"]').first().find('button:contains("Beli")').click();
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 20000 }).should("be.visible");
    
    cy.visit("/cart", { timeout: 30000 });
    cy.contains("Keranjang Belanja", { timeout: 15000 }).should("be.visible");
    cy.get('[aria-live="polite"]').should("contain", "1");
  });

  it("should adjust product quantity in cart", () => {
    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
    cy.get('[role="article"]').first().find('button:contains("Beli")').click();
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 20000 }).should("be.visible");

    cy.visit("/cart", { timeout: 30000 });
    cy.contains("Keranjang Belanja", { timeout: 15000 }).should("be.visible");

    cy.get('[aria-label="Increase quantity"]').click();
    cy.get('[aria-live="polite"]').should("contain", "2");

    cy.get('[aria-label="Decrease quantity"]').click();
    cy.get('[aria-live="polite"]').should("contain", "1");
  });

  it("should remove product from cart", () => {
    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
    cy.get('[role="article"]').first().find('button:contains("Beli")').click();
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 20000 }).should("be.visible");

    cy.visit("/cart", { timeout: 30000 });
    cy.get('button[aria-label*="Remove"]').click();
    
    cy.contains("Keranjang Belanja Kosong", { timeout: 15000 }).should("be.visible");
  });

  it("should navigate to checkout from cart summary", () => {
    cy.visit("/products", { timeout: 30000 });
    cy.get('[role="article"]', { timeout: 15000 }).should("have.length.greaterThan", 0);
    cy.get('[role="article"]').first().find('button:contains("Beli")').click();
    cy.contains("Paramex 250mg ditambahkan ke keranjang", { timeout: 20000 }).should("be.visible");

    cy.visit("/cart", { timeout: 30000 });
    cy.contains("Lanjut ke Pembayaran", { timeout: 15000 }).click();
    cy.url({ timeout: 15000 }).should("include", "/checkout");
  });
});
