describe("Criação de um novo usuário", () => {
  it("Should create a new user", () => {
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
    cy.get(".btn-link").click();
    cy.get("#firstName").type("Francisco");
    cy.get("#Text1").type("Silva");
    cy.get("#username").type("Francisco");
    cy.get("#password").type("123456");
    cy.get(".btn-primary").click();
    cy.get(".ng-binding").should("contain.text", "Registration successful");
  });

  it("Teste de criação de usuário com falha", () => {
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
    cy.get(".btn-link").click();
    cy.get("#firstName").type("Francisco");
    cy.get("#Text1").type("Silva");
    cy.get("#username").type("Francisco");
    cy.get(".btn-primary").should("be.disabled");
  });

  it("Teste de login com sucesso", () => {
    const infos = createUser();
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
    cy.get("#username").type(infos.id);
    cy.get("#password").type(infos.password);
    cy.get(".btn-primary").click();
    cy.get("h1.ng-binding").should("contain.text", infos.id);
  });

  it("Should delete user after login and not let the same user login", () => {
    const infos = createUser();
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
    cy.get("#username").type(infos.id);
    cy.get("#password").type(infos.password);
    cy.get(".btn-primary").click();
    cy.get("h1.ng-binding").should("contain.text", infos.id);
    cy.get(".ng-binding > a").click();
    cy.get(".btn").click();
    
    cy.get("#username").type(infos.id);
    cy.get("#password").type(infos.password);
    cy.get(".btn-primary").click();
    cy.get(".ng-binding").should("contain.text", "Username or password is incorrect");
  })
});

const createUser = () => {
  const now = new Date();
  const hour = now.getHours().toString();
  const minute = now.getMinutes().toString();
  const second = now.getSeconds().toString();
  const id = hour + minute + second + "ID";
  const password = hour + minute + second + "PW";
  const infos = {
    id,
    password,
  };
  cy.visit(
    "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  );
  cy.get(".btn-link").click();
  cy.get("#firstName").type(id);
  cy.get("#Text1").type(id);
  cy.get("#username").type(id);
  cy.get("#password").type(password);
  cy.get(".btn-primary").click();
  cy.get(".ng-binding").should("contain.text", "Registration successful");

  return infos;
};
