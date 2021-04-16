describe("login test", () => {
  it("login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name=email]")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("input[name=password]")
      .type("test123")
      .should("have.value", "test123");
    // cy.contains("Login").click();

    // cy.get("Authentication").should("not.to.exist");
  });
  it("redirect", () => {
    cy.visit("http://localhost:3000/todos")
    cy.url().to.e('http://localhost:3000/login')
  });
});

