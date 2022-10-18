const samples = ['BASICS','STYLE1','STYLE2','STYLE3','COLUMNS','TABLES','LISTS','MARGIN','IMAGES',]

describe('Test sample',() => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  samples.map((sample) => {
    it(`Test sample ${sample}`, () => {
      cy.get(`[data-cy=${sample}]`).first().click();
      cy.get('[data-cy="pdfmake"]').wait(2000);
      cy.get('[data-cy="errorbar"]').should('not.exist');
    });
  });
})