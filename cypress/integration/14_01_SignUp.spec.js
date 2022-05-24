/// <reference types="cypress"/>

describe('Should Check All The Functionalities Of The SignUp Page',() => {

    beforeEach(() => {
        cy.visit('/signup');
    })


    it('Should Show an error message if the First Name is Empty',() => {
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "First Name is required, and it should be more than 3 characters");
    })

    it('Should Show an error message if the First Name is Less than 3 characters',() => {
        cy.get('[data-testid="first-name"]').type('aa');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "First Name is required, and it should be more than 3 characters");
    })

    it('Should not Show an error message if the First Name is >= 3 characters',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Last Name is required, and it should be more than 3 characters");
    })

    // Last name test cases
    it('Should Show an error message if the Last Name is Empty',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Last Name is required, and it should be more than 3 characters");
    })

    it('Should Show an error message if the Last Name is Less than 3 characters',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bb');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Last Name is required, and it should be more than 3 characters");
    })

    it('Should not Show an error message if the Last Name is >= 3 characters',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Please Insert a correct Email format");
    })


    // Email test cases
    it('Should Show an error message if the email is Empty',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Please Insert a correct Email format");
    })

    it('Should Show an error message if the Email is wrong',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('ayhaga=)')
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Please Insert a correct Email format");
    })

    it('Should not Show an error message if the email is correct',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('correct.email@gmail.com')
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Password must be Minimum eight characters");
    })



    
    // Password test cases
    it('Should Show an error message if the Password is Empty',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('correct.email@gmail.com')
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Password must be Minimum eight characters");
    });

    ['test','justlowwercaseletters','lowerand124343','UpperLowerAnd12343'].forEach(password =>{
        it('Should Show an error message if the Password is wrong',() => {
            cy.get('[data-testid="first-name"]').type('aaa');
            cy.get('[data-testid="last-name"]').type('bbb');
            cy.get('[data-testid="email"]').type('correct.email@gmail.com')
            cy.get('[data-testid="password"]').type(password);
            cy.get('[data-testid="submit"]').click();
            cy.get('.MuiFormHelperText-root')
            .should('be.visible')
            .and('contain' , "Password must be Minimum eight characters");
        })
    })
   

    it('Should not Show an error message if the Password is correct',() => {
        cy.get('[data-testid="first-name"]').type('aaa');
        cy.get('[data-testid="last-name"]').type('bbb');
        cy.get('[data-testid="email"]').type('correct.email@gmail.com');
        cy.get('[data-testid="password"]').type('Test123!');
        cy.get('[data-testid="submit"]').click();
        cy.get('.MuiFormHelperText-root')
        .should('be.visible')
        .and('contain' , "Second password does not match the first Password");
    })

    //same password 
    it.only('Should not Show an error message if the Password is correct',() => {
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