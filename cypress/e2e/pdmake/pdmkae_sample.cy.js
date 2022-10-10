import * as fs from 'fs';
import { CodeMirror } from '@uiw/react-codemirror';

const samples = ['basics', 'attachments', 'columns', 'images', 'inline-styling', 'lists', 'margins', 'named-styles', 'style-overrides', 'svgs', 'tables'];

describe('Test sample',() => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })
  
  samples.map((sample) => {
    it(`Test sample ${sample}`, () => {
      cy.readFile(`./public/sample/${sample}`, 'utf8').then((data) => {
        cy.get('[data-cy="typeinarea"]').type("dd = {" + data + "}",{parseSpecialCharSequences: false, delay: 0});
        cy.get('[data-cy="texttopdf"]').click();
        cy.get('[data-cy="updatepdfbutton"]').click({force: true});
        cy.get('[data-cy="errorbar"]').should('not.exist')
      });
    });
  });
})