/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The Todos Page',() => {

    beforeEach(() => {
        localStorage.setItem('user',
        '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQ1NzE2YjUzYzM3MDc0YzVhZjExMSIsImZpcnN0TmFtZSI6ImFhYSIsImxhc3ROYW1lIjoiYmJiIiwiaWF0IjoxNjUzNDMwMDM4fQ.rxBIk4z4QDv3WBmc-18dB_HsEECtOdfVC-_L4rJQO50","userID":"628d5716b53c37074c5af111","firstName":"aaa"}'
        );


        cy.visit('/todo');
        cy.get('[data-testid="add"]').click();

    })

    it('Should Navigate To New Todo Page',()=>{
        cy.url().should('contain','/todo/new');
    })

    it('should show an error message if the task name is less than 3 characters',()=>{
        cy.get('[data-testid="new-todo"]').type('aa');
        cy.get('[data-testid="submit-newTask"]').click();
        cy.get('.MuiFormHelperText-root').should('be.visible').and('contain',"it should be more than 3 characters")
    })


    it('should send a post request with the correct data if the task name is more than 2 characters',()=>{

        cy.intercept('POST','**/api/v1/tasks','{}').as('addedTask');

        cy.get('[data-testid="new-todo"]').type('aaaa');
        cy.get('[data-testid="submit-newTask"]').click();
      

        cy.wait('@addedTask').then(xhr =>{
            expect(xhr.request.body.item).to.eq('aaaa');
            
        })
    })
   
})
