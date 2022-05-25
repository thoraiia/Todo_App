/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The LogIn Page',() => {

    beforeEach(() => {
        cy.visit('/login');
    })


    it('should send the correct data when the user is logging in',() => {

        cy.intercept('POST',"**/api/v1/users/login",{
            fixture:"Register_Intercept",
            statusCode:200
        }).as('Login');

        cy.get('[data-testid="email"]').type('hakuna.matata@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="submit"]').click();


        cy.wait('@Login').then(xhr => {
            expect(xhr.request.body.email).to.eq('hakuna.matata@gmail.com');
            expect(xhr.request.body.password).to.eq('Test123!');
        })

    })


    it('should send the correct data when the user is logged in',() => {

        cy.intercept('POST',"**/api/v1/users/login",{
            fixture:"Register_DuplicateAccount",
            statusCode:400
        }).as('Login');

        cy.get('[data-testid="email"]').type('hakuna.matata@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="submit"]').click();

        cy.get('[data-testid="error-alert"]').should('be.visible');
    

    })


})
