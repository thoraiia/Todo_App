/// <reference types="cypress"/>

describe('login API',() => {

    let token;

    beforeEach(() => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/login',
            body:{
                email:"hakuna.matata@gmail.com",
                password:"Test123!"
            }
        }).then((response)=> {
            token = response.body.access_token;
        })
    })

    it('Get All Tasks', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/tasks',
            auth: {
                bearer: token
            }
        })
    })

})