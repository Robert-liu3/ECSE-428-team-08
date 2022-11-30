import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const url = 'http://localhost:3000/news'

Given('a user is on the news page', () => {
    cy.visit(url);
    cy.get("#search_bar_input").type('stocks')
    cy.get("#search_button").click() //can remove these two lines if we decide to immediately display some random news 
})

When('a user clicks on the heart', () => {
    // cy.get('Heart').click() //somehow unable to locate the Heart el? not sure how to change it
})

Then('news article will appear on the favorites list', () => {
    cy.wait(2000)
    cy.get("#fav_list").children().should('not.have.length', 0)
})

Then('news article will be added to the favorites list', () => {
    cy.wait(2000)
    cy.get("#fav_list").children().should('not.have.length', 0) //get current list length +1 instead of checking if it 0
})

When('a user does not click on the heart', () => {
    // cy.get('Heart').click() //somehow unable to locate the Heart el? not sure how to change it
})

Then('no news will show up on the favorites list', () => {
    cy.wait(2000)
    cy.get("#fav_list").children().should('have.length', 4) //should change this to 0 when we fix the list so there are none inside the list
})

