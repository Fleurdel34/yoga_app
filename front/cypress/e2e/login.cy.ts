/// <reference types="cypress" />

describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        email:"yoga@studio.com",
        password:"test!1234",
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })


  it('Login unauthorised', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
        body: {
        id: 1,
        email:"yoga@studio.com",
        password:"test!1234",
        admin: false
      },
    })

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"wrongPassword"}{enter}`)
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible').and('contain.text', "An error occurred");

  })

  it('Login failed', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 404,
        body: {
        id: 1,
        password:"test!1234",
        admin: false
      },
    })

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"wrongPassword"}{enter}`)
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible').and('contain.text', "An error occurred");

  })
});

