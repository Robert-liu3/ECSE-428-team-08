import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const url = 'https://localhost3000/'


Given('Opening login page', () => {
  cy.visit(url)
})

When('user presses on login page', () => {
    cy.get()
})

Then('user ')