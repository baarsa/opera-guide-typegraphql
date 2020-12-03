/// <reference types="Cypress" />

beforeEach(() => {
    // сбросить данные к начальным
    cy.request('POST', 'http://localhost:4000/', {"operationName":"Reset","variables":{},"query":"mutation Reset { resetOperas }"});
});

describe('the app', () => {
    it('should load successfully', () => {
        cy.visit('/');
    });
    it('should redirect from / to /operas', () => {
        cy.visit('/');
        cy.url().should('include', '/operas');
    });
    it('should display list of operas', () => {
        cy.visit('/');
        cy.findByText('Tristan und Isolde');
        cy.findByText('Aida');
        cy.findByText('Parsifal');
    });
    it('should go to opera page when clicked on opera', () => {
        cy.visit('/');
        cy.findByText('Tristan und Isolde').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/operas/1');
    });
    it('should go to opera creation page when clicked on "Add Opera"', () => {
        cy.visit('/');
        cy.findByText('Add Opera').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/operas/create');
    });
});

describe('opera page', () => {
    it('should load successfully', () => {
        cy.visit('/operas/1');
    });
    it('should show/hide characters after click on Show Characters', () => {
        cy.visit('/operas/1');
        cy.findByRole('button', { name: /show characters/i }).click();
        cy.findByText(/tristan.+tenor/i);
        cy.findByText(/isolde.+soprano/i);
        cy.findByText(/marke.+bass/i);
        cy.findByRole('button', { name: /hide characters/i }).click();
        cy.findByText(/tristan.+tenor/i).should('not.exist');
        cy.findByText(/isolde.+soprano/i).should('not.exist');
        cy.findByText(/marke.+bass/i).should('not.exist');
    });
});

describe('opera creation form', () => {
    it('successfully loads', () => {
        cy.visit('/operas/create');
    });
    it('can successfully create opera, should show notification, redirect to operas list and display new opera in list', () => {
        cy.visit('/operas/create');
        cy.findByLabelText('Name').type('Lohengrin');
        cy.findByLabelText('Year of creation').clear().type('1850');
        cy.findByLabelText('Author').select('Richard Wagner');
        cy.findByLabelText('Role name').type('Lohengrin');
        cy.findByLabelText('Role voice').select('Tenor');
        cy.findByRole('button', { name: 'Add role' }).click();
        cy.findByLabelText('Role name').type('Elsa');
        cy.findByLabelText('Role voice').select('Soprano');
        cy.findByRole('button', { name: 'Add role' }).click();
        cy.findByLabelText('Role name').type('Friedrich');
        cy.findByLabelText('Role voice').select('Baritone');
        cy.findByRole('button', { name: 'Add role' }).click();
        cy.findByRole('button', { name: 'Submit' }).click();

        cy.findByText(/opera successfully created/i);
        cy.url().should('eq', Cypress.config().baseUrl + '/operas');
        cy.findByText((content, element) => {
            return element.textContent.match(/^aida \(giuseppe verdi\)$/i) !== null;
        });
    });
});
