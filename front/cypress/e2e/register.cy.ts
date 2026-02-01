/// <reference types="cypress" />

describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'yoga@studio.com',
        password: 'test!1234',
        admin: true
      }})  

    cy.get('input[formControlName=firstName]').type("John")
    cy.get('input[formControlName=lastName]').type("Doe")
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/login')
  })
}) 