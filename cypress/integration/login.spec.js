/// <reference types="cypress"/>

describe('login test cases',() => {

    beforeEach(() => {
        cy.fixture("ValidUser").as("user");
    })

    it('should be able to login with valid email and password',() => {
        cy.visit('/');

        cy.get('@user').then((user) => {
            cy.get('[data-testid="email"]').type(user.email);
            cy.get('[data-testid="password"]').type(user.password);
        
        })

        cy.get('[data-testid="submit"]').click();
        cy.url().should("contain","/todo"); 
    })

})