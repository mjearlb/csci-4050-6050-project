Testing Plan for Back End Server:

    1. Unit testing using Jest
       - Jest provides an efficient way to easily test Express APIs
       - All of the test.js files inside of the tests directory will be recoginized and tested when using jest
       - Currently have test suites set up for each API endpoints to ensure the basic unit of functionality of the method is correct
       - Each test calls that specific API and checks to make sure it responds with the correct result
       - Unit tests were written during the development process to immediately test the basic back end functionality
       - Multiple unit tests have been set up for each of the following functions:
            * GET /users/getUsers endpoint
            * GET /users/getUser/:id endpoint
            * PUT /users/changeEmail/:username/:newEmail endpoint
            * POST /users/registerUser endpoint
            * DELETE /users/removeUser endpoint
            * GET /comments/getComments endpoint
            * POST /tickets/purchaseTickets endpoint

        Unit Testing Instructions:
        - cd into the server directory
        - run 'npm test'
        -> should now see all of the tests being run and the results printed in the terminal
        (may need to run "npm install --save-dev jest supertest" on the first execution (shouldn't need to though as the packages should already be in the root directory))
        (more information: https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)



    2. Testing with mocked front end using Postman
       - While the front-end was still being developed we also did some more thorough testing after passing all the unit tests
       - Since the front-end wasn't finished we mocked front end api requests using Postman
       - Allowed us to pretend it was the front end making these requests to the back end and enabled us to examine how it responded
       - Since we could customize the HTTP requests it led to more specific and detailed testing of the back end server

       Postman Testing Structure (HTTP requests and responses for each API):
        * GET /users/getUsers -> returns the whole list of currently registered users
        * GET /users/getUser/:id -> returns user with the specified account id
        * PUT /users/changeEmail/:username/:newEmail -> updates the email of the user's account
        * POST /users/registerUser -> creates a new user account with the requests body information and registers it
        * DELETE /users/removeUser -> removes the users account from the database
        * GET /comments/getComments -> returns the whole list of comments that have been made on the site
        * POST /tickets/purchaseTickets -> adds the tickets to the tickets table and links the tickets to the user's account

       Postman Testing Instructions:
       - cd into the server
       - Launch the server to listen for requests (node server.js)
       - Use Postman to formulate HTTP requests to send the requests to the API endpoints
       -> inside Postman you should now see the response body and status codes



    3. Integration or (E2E) Testing


