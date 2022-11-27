/**********************
TESTING USER LOGIN PAGE FRONTEND
**********************/

describe('User Login Page Frontend', () => {
  it('Loading the Login Page', () => {
    cy.visit('http://localhost:3000/login')
  })
  
  it('Checking if page contains "Login"', () => {
    cy.contains('Login')
  })
  
})