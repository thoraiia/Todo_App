/// <reference types="cypress"/>

/**
* this piece of code does not reflect best practices
because the test cases depend on each other

*/

describe('Test all tasks API test cases',() => {


    // body:{
    //     "firstName":"thoraiia",
    //     "lastName": "yougharta",
    //     "email": "silicon.valley@gmail.com",
    //     "password": "Test123!"
    // }

    let token;
    let taskId;

   before(() => {

    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/users/login',
        body:{
            "email": "hakuna.matata@gmail.com",
            "password": "Test123!"
         },
        failOnStatusCode: false
    }).then((response) => {
        
        token = response.body.access_token;
    });


   });

    
   it('should be able to add a new task',()=>{
       cy.request({
           method: 'POST',
           url: 'http://localhost:8080/api/v1/tasks',
           body:{
               "item":"Read Quran",
               "isCompleted":true
           },
           headers: {
               Authorization: `Bearer ${token}`
           }
       }).then((response => {
           expect(response.status).to.eql(201);
           expect(response.body.addedTask.item).to.eql('Read Quran')
           taskId = response.body.addedTask._id;
       }))
   });

   it('should return all the tasks',()=>{

       cy.request({
           method: 'GET',
           url: 'http://localhost:8080/api/v1/tasks',
        
           headers: {
               Authorization: `Bearer ${token}`
           }
       }).then((response => {
           expect(response.status).to.eql(200);
       }))


   })

   it('should be able to Update the task',()=>{

       cy.request({
           method: 'PUT',
           url: 'http://localhost:8080/api/v1/tasks'+'/'+taskId,
        
           headers: {
               Authorization: `Bearer ${token}`
           },
           body:{
                "item":"Read Quran for an hour",
                "isCompleted":false
           }
       }).then((response => {
           expect(response.status).to.eql(200);
       }))


   })

   it('should be able to Delete the task',()=>{

    cy.request({
        method: 'DELETE',
        url: 'http://localhost:8080/api/v1/tasks'+'/'+taskId,
     
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response => {
        expect(response.status).to.eql(200);
    }))


})

})