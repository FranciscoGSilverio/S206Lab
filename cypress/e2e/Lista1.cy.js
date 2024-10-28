describe("User Account Tests on Automation Exercise", () => {
  let user;

  it("Should register a new user successfully", () => {
    user = createTestUser();

    cy.visit("https://automationexercise.com/");
    cy.get("a[href='/login']").click();
    cy.contains("New User Signup!").should("be.visible");

    cy.get("input[name='name']").type(user.firstName);
    cy.get("input[data-qa='signup-email']").type(user.email);
    cy.get("button[data-qa='signup-button']").click();

    cy.get("input[name='password']").type(user.password);
    cy.get("input[name='first_name']").type(user.firstName);
    cy.get("input[name='last_name']").type(user.lastName);
    cy.get("input[name='address1']").type("123 Cypress Road");
    cy.get("input[name='city']").type("Automation City");
    cy.get("input[name='state']").type("Test State");
    cy.get("input[name='zipcode']").type("12345");
    cy.get("input[name='mobile_number']").type("1234567890");
    cy.get("button[data-qa='create-account']").click();

    cy.contains("Account Created!").should("be.visible");
  });

  it("Should fail to log in with incorrect credentials", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href='/login']").click();
    cy.get("input[data-qa='login-email']").type("wrong_email@example.com");
    cy.get("input[data-qa='login-password']").type("wrong_password");
    cy.get("button[data-qa='login-button']").click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("Should log in successfully with valid credentials", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href='/login']").click();
    cy.get("input[data-qa='login-email']").type(user.email);
    cy.get("input[data-qa='login-password']").type(user.password);
    cy.get("button[data-qa='login-button']").click();

    cy.contains("Logout").should("be.visible");
  });

  it("Should delete the account and verify deletion", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href='/login']").click();
    cy.get("input[data-qa='login-email']").type(user.email);
    cy.get("input[data-qa='login-password']").type(user.password);
    cy.get("button[data-qa='login-button']").click();

    cy.contains("Delete Account").should("be.visible");
    cy.get(".shop-menu > .nav > :nth-child(5) > a").click();

    cy.contains("Your account has been permanently deleted!").should(
      "be.visible"
    );

    cy.get('[data-qa="continue-button"]').click();

    cy.get("a[href='/login']").click();
    cy.get("input[data-qa='login-email']").type(user.email);
    cy.get("input[data-qa='login-password']").type(user.password);
    cy.get("button[data-qa='login-button']").click();
    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("Should add an item to the cart", () => {
    cy.visit("https://automationexercise.com/");
    cy.get(".features_items .col-sm-4")
      .first()
      .find("a")
      .contains("Add to cart")
      .click();
    cy.contains("Your product has been added to cart.").should("be.visible");
    cy.get('.modal-footer > .btn').click()
    cy.contains("Your product has been added to cart.").should("not.be.visible");

  });

  it("Should navigate to the Contact Us page and submit the form", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href='/contact_us']").click();

    cy.contains("Get In Touch").should("be.visible");
    cy.get("input[name='name']").type("John Doe");
    cy.get("input[name='email']").type("johndoe@example.com");
    cy.get("input[name='subject']").type("Inquiry");
    cy.get("textarea[name='message']").type("This is a test message.");
    cy.get("input[data-qa='submit-button']").click();

    cy.contains(
      "Success! Your details have been submitted successfully."
    ).should("be.visible");
  });
});

const createTestUser = () => {
  const timestamp = Date.now();
  return {
    firstName: "TestUser" + timestamp,
    lastName: "Automation",
    email: "testuser" + timestamp + "@example.com",
    password: "password123",
  };
};
