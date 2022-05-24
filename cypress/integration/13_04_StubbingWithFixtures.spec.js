/// <reference types="cypress"/>

/** 
 * spying and stubbing
 * intercept commands 
 * it takes 2 arguments for spying (method , url)
 * it takes 3 arguments for stubbing (method, url, fake response)
 * may take 1 argument - an object => known as matcher
 * added before visiting the website or in the beforeEach
 * should add an alias for that command
 * 
 */


 describe('Stubbing And Spying Login Scenario',() => {

    beforeEach(() => {
        cy.fixture("ValidUser").as("user");
       // cy.intercept('GET','**/api/v1/tasks').as('allTasks');
    })


    it('Get All Tasks - Stubbing Example',() => {

        cy.intercept('GET','**/api/v1/tasks',{
            fixture: "TasksStubbing.json"
        }).as('allTasks');
        cy.visit('/');
         cy.get('@user').then((user) => {
            cy.get('[data-testid="email"]').type(user.email);
            cy.get('[data-testid="password"]').type(user.password);
        
        })

        cy.get('[data-testid="submit"]').click();  // This line will trigger the intercept command
        cy.wait('@allTasks').then((xhr)=>{
           //we can add out assertions here
            cy.log(xhr.response.body.tasks[0].item)
        })
       
    })
    
})