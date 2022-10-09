import * as fs from 'fs';
import { CodeMirror } from '@uiw/react-codemirror';

const samples = ['basics']//, 'styles1', 'styles2', 'styles3', 'columns', 'tables', 'lists', 'margin', 'images', 'svgs', 'attachments'];

describe('Test sample',() => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })
  
  samples.forEach((sample) => {
    it(`Test sample ${sample}`, () => {
      let samplefile = cy.readFile(`./public/sample/${sample}`, 'utf8');
      cy.window().then((win) => {
        win.CodeMirror.setValue(samplefile);
      });
      // cy.get('[data-cy="codemirror"]').clear();
      cy.get('[data-cy="updatepdfbutton"]').click({force: true})
      cy.get('[data-cy="errorbar"]').should('not.exist')
    });
  });
})