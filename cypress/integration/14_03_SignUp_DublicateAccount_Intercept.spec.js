/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The SignUp Page',() => {

    beforeEach(() => {
        cy.visit('/signup');
    })


    it('Should not Show an error message if the Password is correct',() => {

        cy.intercept('POST','**/api/v1/users/register',{
            fixture:'Register_DuplicateAccount',
            statusCode: 400
        }).as('registerError')

        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('correct.email@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="confirm-password"]').type('Test123!')
        cy.get('[data-testid="submit"]').click();
        cy.get('[data-testid="error"]').should('be.visible');
       

    })

}) 