/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The Welcome Message',() => {

    beforeEach(() => {
        localStorage.setItem('user',
        '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQ1NzE2YjUzYzM3MDc0YzVhZjExMSIsImZpcnN0TmFtZSI6ImFhYSIsImxhc3ROYW1lIjoiYmJiIiwiaWF0IjoxNjUzNDMwMDM4fQ.rxBIk4z4QDv3WBmc-18dB_HsEECtOdfVC-_L4rJQO50","userID":"628d5716b53c37074c5af111","firstName":"aaa"}'
        );

        cy.intercept('GET','**/api/v1/tasks',
        {
            fixture:"TasksStubbing"
        }).as('allTasks')


        //cy.visit('/todo'); // we have to change the time before visiting the website

    })


    it("Should Show Time to Sleep Message",() => {
        
        const now = new Date('February 29, 1996 01:00:00');
        cy.clock(now);
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','Time to sleep');
    })


    it("Should Show Good Morning Message",() => {
        
        const now = new Date('February 29, 1996 09:00:00');
        cy.clock(now);
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','Good morning');
    })


    it("Should Show Good Afternoon Message",() => {
        
        const now = new Date('February 29, 1996 14:00:00');
        cy.clock(now);
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','afternoon');
    })

    it("Should Show Good Evening Message",() => {
        
        const now = new Date('February 29, 1996 18:00:00');
        cy.clock(now);
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','Evening');
    })

    it("Should not show the first name if there is no first name prperty in the local storage",() => {
        
        localStorage.setItem('user',
        '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQ1NzE2YjUzYzM3MDc0YzVhZjExMSIsImZpcnN0TmFtZSI6ImFhYSIsImxhc3ROYW1lIjoiYmJiIiwiaWF0IjoxNjUzNDMwMDM4fQ.rxBIk4z4QDv3WBmc-18dB_HsEECtOdfVC-_L4rJQO50","userID":"628d5716b53c37074c5af111","firstName":""}'
        );
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','user');
    })


    it("Should not show the first name if it's less than 2 characters",() => {
        
        localStorage.setItem('user',
        '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQ1NzE2YjUzYzM3MDc0YzVhZjExMSIsImZpcnN0TmFtZSI6ImFhYSIsImxhc3ROYW1lIjoiYmJiIiwiaWF0IjoxNjUzNDMwMDM4fQ.rxBIk4z4QDv3WBmc-18dB_HsEECtOdfVC-_L4rJQO50","userID":"628d5716b53c37074c5af111","firstName":"m"}'
        );
        
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text','user');
    })
})
