/// <reference types="cypress" />

describe('Session spec', () => {
    it('create session, user admin', () => {
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

        cy.get('button').contains('Create').click()

        cy.intercept('POST', '/api/session', {
            body: {
                name: "Meditation",
                description: "relaxation",
                date: "2025-03-02T00:00:00Z",
                teacher_id: 1
            },
        }).as('createSession')

        cy.intercept('GET', '/api/teacher',
        {body: [{
                id: 1,
                lastName: "Doe",
                firstName: "John",
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            },{
                id: 2,
                lastName: "Triolet",
                firstName: "Elsa",
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            }],   
        },).as('teacher')

        cy.wait('@teacher')

        cy.get('input[formControlName=name]').type("Mediation")
        cy.get('input[formControlName=date]').type("2025-03-02")
        cy.get('mat-select').eq(0).click()
        cy.get('mat-option').contains('John Doe').click()
        cy.get('textarea[formControlName=description]').type("relaxation")
        cy.get('button').contains('Save').click()

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
            {
                id:3,
                name: "Meditation",
                description: "energizing yoga session",
                date: "2025-03-02T00:00:00Z",
                teacher_id: 1,
                users: [],
                createdAt: "2025-03-02T00:00:00Z",
                updatedAt: "2025-03-02T00:00:00Z",
            },
        ]).as('sessionAfterCreateSession')

        cy.wait('@createSession');
        cy.wait('@sessionAfterCreateSession')

        cy.url().should('include', '/session')

    });


    it('create session failed, user admin', () => {
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

        cy.get('button').contains('Create').click()

        cy.intercept('GET', '/api/teacher',
        {body: [{
                id: 1,
                lastName: "Doe",
                firstName: "John",
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            },{
                id: 2,
                lastName: "Triolet",
                firstName: "Elsa",
                createdAt: "2025-01-02T00:00:00Z",
                updatedAt: "2025-02-15T00:00:00Z",
            }],   
        },).as('teacher')

        cy.wait('@teacher')

        cy.get('input[formControlName=name]').clear()
        cy.get('input[formControlName=date]').type("2025-03-02")
        cy.get('mat-select').eq(0).click()
        cy.get('mat-option').contains('John Doe').click()
        cy.get('textarea[formControlName=description]').type("relaxation")
        cy.get('button[type=submit]').should('be.disabled')

    });

})  