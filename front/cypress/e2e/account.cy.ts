/// <reference types="cypress" />

describe('Account spec', () => {
    it('information me not admin', () => {

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                email:"yoga@studio.com",
                password:"test!1234",
                admin: false
            },
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
        
        cy.url().should('include', '/sessions')

        cy.get('span').contains('Account').click()

        cy.intercept('GET','/api/user/1',
        {
            statusCode: 200,
            body:{
                id: 1,
                firstName: 'Joel',
                lastName: 'Dicker',
                username: 'userName',
                admin: false,
                email: 'yoga@studio.com',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2025-01-01T00:00:00Z',
            }
        }).as('me')

        cy.wait('@me')
        cy.contains('h1', 'User information')
        cy.contains('p', 'Joel DICKER')
        cy.contains('p', "yoga@studio.com")
        cy.contains('p', "Delete my account:")
        cy.contains('mat-icon', "delete")
        cy.contains('span', "Detail")
        cy.contains('p', "January 1, 2024")
        cy.contains('p', "January 1, 2025")

        cy.url().should('include', '/me')
    })

    it('information me is Admin', () => {

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                email:"yoga@studio.com",
                password:"test!1234",
                admin: true
            },
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
        
        cy.url().should('include', '/sessions')

        cy.get('span').contains('Account').click()

        cy.intercept('GET','/api/user/1',
        {
            statusCode: 200,
            body:{
                id: 1,
                firstName: 'Jana',
                lastName: 'Dicker',
                username: 'userName',
                admin: true,
                email: 'yoga@studio.com',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2025-01-01T00:00:00Z',
            }
        }).as('me')

        cy.wait('@me')
        cy.contains('h1', 'User information')
        cy.contains('p', 'Jana DICKER')
        cy.contains('p', "yoga@studio.com")
        cy.contains('p', "You are admin")
        cy.contains('p', "January 1, 2024")
        cy.contains('p', "January 1, 2025")

        cy.url().should('include', '/me')
    })
});  
