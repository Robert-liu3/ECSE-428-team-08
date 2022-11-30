import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const url = 'http://localhost:3000/news'

Given('a user is on the news page', () => {
    cy.visit(url);
})

When('a user types a news titled {string}', (news_title) => {
    cy.get("#search_bar_input").type(news_title)
    cy.get("#search_button").click()
})

Then('news related to the title will show up', () => {
    cy.wait(2000)
    cy.get("#news_list").children().should('not.have.length', 0)
})

Then('no news will show up', () => {
    cy.wait(2000)
    cy.get("#news_list").children().should('have.length', 0)
})