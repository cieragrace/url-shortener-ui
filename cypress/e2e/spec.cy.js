export {}

describe('Home Page spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'example.json'})
    cy.visit('http://localhost:3000/')
  })
  it('should show a user the page title', () => {
    cy.get('.header').children().should("have.length", 2)
    cy.get('.header').contains('URL Shortener')
  })

  it('should show the existing shortened URLs', () => {
    cy.get('.urls-container').children().should('have.length', 1)
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
})