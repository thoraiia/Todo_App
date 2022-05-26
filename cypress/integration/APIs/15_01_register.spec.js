/// <reference types="cypress"/>

import faker from 'faker'

describe('Test all register API test cases',() => {


    // body:{
    //     "firstName":"thoraiia",
    //     "lastName": "yougharta",
    //     "email": "silicon.valley@gmail.com",
    //     "password": "Test123!"
    // }

    it('should return an error if the first name is not part of the body',() => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/register',
            body:{
                "lastName": "yougharta",
                "email": "silicon.valley@gmail.com",
                "password": "Test123!"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.body.message).to.eql('\"firstName\" is required');

        })

    })


    it('should return an error if the first name is less than 2 characters',() => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/register',
            body:{
                "firstName":"t",
                "lastName": "yougharta",
                "email": "silicon.valley@gmail.com",
                "password": "Test123!"
             },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.body.message).to.eql('\"firstName\" length must be at least 3 characters long');

        })

    })


    it('should register a user correctly',() => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/register',
            body:{
                "firstName":"thoraiia",
                "lastName": "yougharta",
                "email": faker.internet.email(),
                "password": "Test123!"
             },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eql(201);
            expect(response.body.firstName).to.eql('thoraiia');

        })

    })


})