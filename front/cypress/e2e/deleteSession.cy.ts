/// <reference types="cypress" />

describe('Session spec', () => {
    it('delete details session, user admin', () => {
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

        cy.get('button').contains('Detail').click()

        cy.intercept('GET','/api/session/1',
        {
            body:
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
        },).as('detail')    

        cy.intercept('GET', '/api/teacher/1',
        {body: {
                id: 1,
                lastName: "Doe",
                firstName: "John",
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            },   
        },).as('teacher')

        cy.intercept('DELETE', '/api/session/1',
        {statusCode: 200},).as('delete')

        cy.intercept(
        {
            method: 'GET',
            url: '/api/session',
        },
        [
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
        ]).as('sessionAfterDelete')

        cy.get('.ml1').eq(0).contains('Delete').click();

        cy.wait('@delete');
        cy.wait('@sessionAfterDelete')

        cy.get('simple-snack-bar').should('be.visible').and('contain.text', 'Session deleted !')

        cy.url().should('include', '/session')

    });
})  