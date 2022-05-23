/// <reference types="cypress"/>

describe('login API',() => {


    it('API request',() => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/login',
            body:{
                email:"hakuna.matata@gmail.com",
                password:"Test123!"
            }
        }).then((response)=> {
            expect(response.status).to.eql(200);
            expect(response.body.firstName).to.eql('Menna');
        })
    })
})