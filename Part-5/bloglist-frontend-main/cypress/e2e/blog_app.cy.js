describe("Blog app", () => {
  beforeEach(function () {
    cy.resetBackend();
    cy.request("POST", `${Cypress.env("BACKEND")}/user/signup`, {
      username: "test",
      name: "test",
      password: "testuser",
    });
    cy.visit("");
  });

  it("Login form is shown", () => {
    cy.contains("Username");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      const button = cy.get("button[type=submit]");
      button.click();
      cy.contains("test logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser2");
      cy.get("button").click();
      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    it("A blog can be created", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();

      cy.get("#title").type("test article");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("form > button").click();
      cy.contains("test article");
    });

    it("User can like the article", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();

      cy.get("#title").type("test article");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("form > button").click();
      cy.get(".blog > div > :nth-child(2) > button").click();
      cy.get(":nth-child(2) > div > :nth-child(2) > button").click();
      cy.get(".blog > :nth-child(2) > div > :nth-child(1)").contains(
        "Likes: 1"
      );
    });

    it("User can delete the article", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();

      cy.get("#title").type("test article");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("form > button").click();
      cy.get(".blog > div > :nth-child(2) > button").click();
      cy.get(".blog > :nth-child(2) > :nth-child(3)").click();
      cy.get(".blog").should("not.exist");
    });

    it("Only the creator can see the delete button of a blog", function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/user/signup`, {
        username: "test2",
        name: "test2",
        password: "testuser2",
      });
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();

      cy.get("#title").type("test article");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("form > button").click();
      cy.get("#root > :nth-child(1) > :nth-child(2) > button").click();
      cy.get("#username").type("test2");
      cy.get("#password").type("testuser2");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();
      cy.get(".blog > div > :nth-child(2) > button").click();
      cy.get(".blog > :nth-child(2) > :nth-child(3)").should("not.exist");
    });

    it("Blogs are ordered according to likes", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("testuser");
      cy.get("button").click();
      cy.get(":nth-child(1) > button").click();
      cy.get("#title").type("test article");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("form > button").click();

      cy.get(":nth-child(1) > button").click();
      cy.get("#title").type("test article 2");
      cy.get("#author").type("test author 2");
      cy.get("#url").type("test url 2");
      cy.get("form > button").click();

      cy.get(".blogs > :nth-child(1) > div > :nth-child(2) > button").click();
      cy.get(".blogs > :nth-child(2) > div > :nth-child(2) > button").click();

      cy.get(
        ":nth-child(2) > :nth-child(2) > div > :nth-child(2) > button"
      ).click();

      cy.get(".blogs > .blog").eq(0).should("contain", "test article 2");
      cy.get(".blogs > .blog").eq(1).should("contain", "test article");
    });
  });
});
