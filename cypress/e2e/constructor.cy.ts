describe("constructor test", () => {
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

  it("should click on ingredient", () => {
    cy.get("article").first().as("ingredient");
    cy.get("@ingredient").click();
  });

  it("should DnD ingredient", () => {
    cy.get("article").first().as("first-ingredient");
    cy.get("article").last().as("last-ingredient");
    cy.get("@first-ingredient").trigger("dragstart");
    cy.get("[id^=top-bun]").trigger("drop");
    cy.get("@last-ingredient").trigger("dragstart");
    cy.get("[id^=main-ingredient]").trigger("drop");
    cy.get('button').last().as('sent-order')
    cy.get('@sent-order').click()   
  });
});
