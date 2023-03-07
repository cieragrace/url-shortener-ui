export {}

describe('Home Page spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: '../fixtures/example.json'})
    cy.visit('http://localhost:3000/')
  })
  it('should show a user the page title', () => {
    cy.get('.header').children().should("have.length", 2)
    cy.get('.header').contains('URL Shortener')
  })

  it('should show the existing shortened URLs', () => {
    cy.get('.urls-container').children().should('have.length', 3)
  })

  it('should show the form with two inputs and a button', () => {
    cy.get('.form-container').children().should('have.length', 3)
  })

  it('renders the form with proper inputs', () => {
    cy.get('.titleInput').should('be.visible')
    cy.get('.urlInput').should('be.visible')
    cy.get('button').should('be.visible').contains('Shorten Please!')
  })

  it('reflects user input in the input fields', () => {
    const title = 'My Test Title'
    cy.get('.titleInput').type(title)
    cy.get('.titleInput').should('have.value', title)
    
    const url = 'http://www.example.com'
    cy.get('.urlInput').type(url)
    cy.get('.urlInput').should('have.value', url)
  })

  it('renders a new shortened URL after the user submits the form', () => {
    cy.get('.titleInput').type('Awesome photo'); 
    cy.get('.urlInput').type("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"); 
    cy.get('button').click(); 
    cy.get('.short-url').contains('http://localhost:3001/useshorturl/1'); 
  });
})