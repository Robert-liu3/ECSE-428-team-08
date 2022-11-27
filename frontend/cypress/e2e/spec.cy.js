/**********************
TESTING NEWS PAGE FRONTEND
**********************/

describe('News Page Frontend', () => {
  it('Loading the News Page', () => {
    cy.visit('http://localhost:3000/news')
  })

  it('Checking if page contains "Latest"', () => {
    cy.contains('Latest')
  })

  //checking if we can click on the first link but cypress doesnt allow changing urls  
  // it('Clicking on news', () => {
  //   cy.get('.post-media')
  //     .get('a[href*="https"]').first()
  //   .click()
  // })
})