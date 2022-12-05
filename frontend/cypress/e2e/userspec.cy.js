describe('Login Page Frontend', () => {
    it('Loading the Login Page', () => {
      cy.visit('http://localhost:3000/login')
    })
  
    it('Checking if page contains "Login"', () => {
      cy.get('h3').contains('Login')
    })
  
    //checking if we can click on the first link but cypress doesnt allow changing urls  
    // it('Clicking on news', () => {
    //   cy.get('.post-media')
    //     .get('a[href*="https"]').first()
    //   .click()
    // })
  
  
  })