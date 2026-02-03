/// <reference types="cypress" />

describe('Session spec', () => {
    it('all session information, user not admin', () => {
        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'userName',
                firstName: 'firstName',
                lastName: 'lastName',
                admin: false
            },
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

        cy.intercept(
        {
            method: 'GET',
            url: '/api/session',
        },
        [
            {
                id: 1,
                name: "Meditation Session",
                description: "relaxing meditation session",
                date: "2025-01-01T00:00:00Z",
                teacher_id: 1,
                users: [1, 2, 3],
                createdAt: "2025-01-01T00:00:00Z",
                updatedAt: "2025-01-22T00:00:00Z",
            },
            {
                id: 2,
                name: "Yoga Session",
                description: "energizing yoga session",
                date: "2025-01-02T00:00:00Z",
                teacher_id: 2,
                users: [4, 5],
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            },
        ]).as('session')

        cy.wait('@session')

        
        cy.contains('mat-card-title', 'Meditation Session')
        cy.contains('mat-card-title', 'Yoga Session')
        cy.contains('mat-card-subtitle', 'Session on January 1, 2025')
        cy.contains('mat-card-subtitle', 'Session on January 2, 2025')
        cy.contains('mat-card-content', 'relaxing meditation session')
        cy.contains('mat-card-content', 'energizing yoga session')
        cy.get('.ml1').eq(1).contains('Detail')

        cy.url().should('include', '/sessions')

    })

    it('all session information, user admin', () => {
        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'userName',
                firstName: 'firstName',
                lastName: 'lastName',
                admin: true
            },
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

        cy.intercept(
        {
            method: 'GET',
            url: '/api/session',
        },
        [
            {
                id: 1,
                name: "Meditation Session",
                description: "relaxing meditation session",
                date: "2025-01-01T00:00:00Z",
                teacher_id: 1,
                users: [1, 2, 3],
                createdAt: "2025-01-01T00:00:00Z",
                updatedAt: "2025-01-22T00:00:00Z",
            },
            {
                id: 2,
                name: "Yoga Session",
                description: "energizing yoga session",
                date: "2025-01-02T00:00:00Z",
                teacher_id: 2,
                users: [4, 5],
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            },
        ]).as('session')

        cy.wait('@session')

        
        cy.contains('mat-card-title', 'Meditation Session')
        cy.contains('mat-card-title', 'Yoga Session')
        cy.contains('mat-card-subtitle', 'Session on January 1, 2025')
        cy.contains('mat-card-subtitle', 'Session on January 2, 2025')
        cy.contains('mat-card-content', 'relaxing meditation session')
        cy.contains('mat-card-content', 'energizing yoga session')
        cy.get('.ml1').eq(0).contains('Create')
        cy.get('.ml1').eq(1).contains('Detail')
        cy.get('.ml1').eq(2).contains('Edit')

        cy.url().should('include', '/sessions')

    })
});  
