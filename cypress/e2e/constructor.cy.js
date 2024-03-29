describe("constructor test", () => {
  const eighteenSeconds = 18000

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should make click on link bun", () => {
    cy.contains("Булки").click();
  });

  it("should make click on link sauce", () => {
    cy.contains("Соусы").click();
  });

  it("should make click on link main", () => {
    cy.contains("Начинки").click();
  });

  it("should click on ingredient and close modal", () => {
    cy.get("article").first().as("ingredient");
    cy.get("@ingredient").get('img').as("image");
    cy.get("@ingredient").click();
    cy.get("[data-cy='src-image']").should("have.attr", "src", "https://code.s3.yandex.net/react/code/bun-02-large.png")
    cy.get("[data-cy='name-ingredient']").contains("Краторная булка N-200i");
    cy.get("[data-cy='calories']").contains("420")
    cy.get("[data-cy='proteins']").contains("80")
    cy.get("[data-cy='fat']").contains("24")
    cy.get("[data-cy='carbohydrates']").contains("53")
    cy.get("button[name=close-modal]").click();
  });

  it("should DnD ingredient and make order", () => {
    cy.get("article").first().as("first-ingredient");
    cy.get("article").last().as("last-ingredient");
    cy.get("@first-ingredient").trigger("dragstart");
    cy.get("[id^=top-bun]").trigger("drop");
    cy.get("@last-ingredient").trigger("dragstart");
    cy.get("[id^=main-ingredient]").trigger("drop");
    cy.get('button').last().as('sent-order')
    cy.get('@sent-order').click()
    cy.get('button').contains('Войти').as('confirm')
    cy.get('input[name=email]').type('greddyturbo@mail.ru').should('have.value', 'greddyturbo@mail.ru')
    cy.get('input[name=password]').type('11111111').should('have.value', '11111111')
    cy.get('@confirm').click()
    cy.get('@sent-order').click()
    cy.wait(eighteenSeconds)
    cy.get('button[name=close-modal]').click()
  });

  it("should open orders page", () => {
    cy.get("a").contains("Лента заказов").click();
  });

  it("should open profile page", () => {
    cy.get("a").contains("Личный кабинет").click();
    cy.get("button").contains("Войти").as("confirm");
    cy.get("input[name=email]")
      .type("greddyturbo@mail.ru")
      .should("have.value", "greddyturbo@mail.ru");
    cy.get("input[name=password]")
      .type("11111111")
      .should("have.value", "11111111");
    cy.get("@confirm").click();
  });

  it("should open main page", () => {
    cy.get("a").contains("Конструктор").click();
  });
});