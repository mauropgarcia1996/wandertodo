describe("login test", () => {
  it("login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#form-email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("#form-password").type("test123").should("have.value", "test123");
    cy.contains("Login").click();

    cy.get("Authentication").should("not.to.exist");
  });
});
