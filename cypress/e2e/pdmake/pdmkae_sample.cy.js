const samples = ['BASICS','STYLE1','STYLE2','STYLE3','COLUMNS','TABLES','LISTS','MARGIN','IMAGES',]

describe('Test sample On 1280vw',() => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
    cy.viewport(1280, 720);
  })

  samples.map((sample) => {
    it(`Test sample ${sample}`, () => {
      cy.get(`[data-cy=${sample}]`).first().click();
      cy.get('[data-cy="pdfmake"]').wait(2000);
      cy.get('[data-cy="errorbar"]').should('not.exist');
    });
  });
})


describe('Test sample On 1000vw',() => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
    cy.viewport(1000, 660);
  })

  samples.map((sample) => {
    it(`Test sample ${sample}`, () => {
      cy.get("[data-cy='nav-button']").click();
      cy.get(`[data-cy=${sample}]`).last().click();
      cy.get('[data-cy="pdfmake"]').wait(2000);
      cy.get('[data-cy="errorbar"]').should('not.exist');
    });
  });
})