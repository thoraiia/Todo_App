/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The Todos Page',() => {

    beforeEach(() => {
        localStorage.setItem('user',
        '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQ1NzE2YjUzYzM3MDc0YzVhZjExMSIsImZpcnN0TmFtZSI6ImFhYSIsImxhc3ROYW1lIjoiYmJiIiwiaWF0IjoxNjUzNDMwMDM4fQ.rxBIk4z4QDv3WBmc-18dB_HsEECtOdfVC-_L4rJQO50","userID":"628d5716b53c37074c5af111","firstName":"aaa"}'
        );

        cy.intercept('GET','**/api/v1/tasks',
        {
            fixture:"TasksStubbing"
        }).as('allTasks')

        cy.visit('/todo');

    })


    it('should show the not completed task correctly',()=>{
        cy.get('[data-testid="todo-item"]').first().should('have.css','background-color','rgb(63, 81, 181)');
        cy.get('[data-testid="complete-task"]').first().should('not.have.attr','checked')
    })

    it('should show the completed task correctly',()=>{
        cy.get('[data-testid="todo-item"]').last().should('have.css','background-color','rgb(33, 76, 97)');
        cy.get('[data-testid="complete-task"]').last().should('have.attr','checked');
        cy.get('[data-testid="todo-text"]').last().should('have.css',"text-decoration" ,"line-through solid rgb(145, 158, 171)");
    })

    it('should show the pagination if the # of tasks is more than 5', ()=>{
        cy.get('[data-test-id="pagination-link"]').should('be.visible').and('have.length',2);
    })
   
})
