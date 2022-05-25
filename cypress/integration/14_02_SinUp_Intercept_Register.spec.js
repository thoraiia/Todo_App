/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The SignUp Page',() => {

    beforeEach(() => {
        cy.visit('/signup');
    })


    it('Should not Show an error message if the Password is correct',() => {

        cy.intercept('POST','**/api/v1/users/register',{
            fixture:'Register_Intercept',
            statusCode: 201
        }).as('register')

        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('correct.email@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="confirm-password"]').type('Test123!')
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root').should('not.exist');
        cy.url().should('contain','/todo');

    })

}) 