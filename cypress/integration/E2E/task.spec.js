/// <reference types="cypress"/>


describe('test all E2E scenarios', () => {


    it("should be able to add update and delete a task", () =>{
        cy.visit('/');
        cy.get('[data-testid="email"]').type('hakuna.matata@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="submit"]').click();
        cy.get('[data-testid="welcome"]').should("be.visible");


        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="new-todo"]').type('Learn Arabic');
        cy.get('[data-testid="submit-newTask"]').click();
        cy.get('[data-testid="todo-text"]').should('contain.text','Learn Arabic')


        cy.get('[data-testid="complete-task"]').first().click();
        cy.get('[data-testid="todo-item"]').should('have.css','background-color','rgb(33, 76, 97)');



        cy.get('[data-testid="delete"]').first().click();
        cy.get('[data-testid="no-todos"]').should('be.visible');

    })

})