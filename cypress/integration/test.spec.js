/// <reference types="Cypress" />

describe("hiredscore site test", () => {
  it("Visit hiredscore site", () => {
    cy.visit("https://www.hiredscore.com");
  });

  it("Careers checkup", () => {
    // show hidden element with invoke
    cy.get("#w-dropdown-list-3").invoke("show");

    //click hidden element
    cy.contains("Careers").click();

    //check URL
    cy.url().should("eq", "https://www.hiredscore.com/careers");

    //locate and sample the first carrer option of the second location
    cy.get(".careers-grid")
      .children()
      .first()
      .next()
      .children()
      .first()
      .next()
      .children()
      .first()
      .then(($position) => {
        const txt = Cypress._.map($position, "innerText")[0]; // $position text is saved for later comparison
        cy.get(".careers-grid")
          .children()
          .first()
          .next()
          .children()
          .first()
          .next()
          .click();
        cy.get(".career-hero-section").contains(txt);
      });

    //go back to careers page
    cy.get(".container > .button").click();
  });
  it("Resources checkup", () => {
    // show hidden element with invoke
    cy.get("#w-dropdown-list-2").invoke("show");

    //click hidden element
    cy.contains("Press & Awards").click();

    //check URL
    cy.url().should("eq", "https://www.hiredscore.com/press");
  });
  it("Sum headlines", () => {
    //write a CSV file the top headline posts
    cy.get(".featured-posts__grid")
      .children()
      .then(($headlines) => {
        const descriptions = [...$headlines].map((headline) => {
          const elname = headline.innerText;
          return `${elname}`;
        });
        cy.writeFile("headlines.csv", descriptions.join("\t"));
      });
  });
});
