import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const url = 'http://localhost:3000/'

Given('a user is on the homepage', () => {
    cy.visit(url);
})

When('a user clicks on the News tab', () => {
    cy.get("#news_button").click()
})

Then('the user will be redirected to the News page', () => {
    cy.url().should('eq', `http://localhost:3000/news`)
})

When('a user is on the news page', () => {
    cy.visit('http://localhost:3000/news')
})

Then('the user will see the latest news', () => {
    cy.contains('Latest')
})

Then('the user will see the favorited news', () => {
    cy.contains('Favorites')
})

