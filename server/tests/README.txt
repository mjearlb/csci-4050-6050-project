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
            * POST /admin/verifyLogin endpoint
            * GET /admin/getUser/username/:username endpoint
            * GET /admin/cart/getItems/:username endpoint
            * POST /admin/cart/addItem endpoint
            * DELETE /admin/cart/removeItem/:cartId endpoint
            * GET /admin/merchandise/getItems endpoint
            * GET /admin/merchandise/getItem/:id endpoint

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
        * POST /admin/verifyLogin -> verifys the username and password upon login
        * GET /admin/getUser/username/:username -> returns the user with the specified username
        * GET /admin/cart/getItems/:username -> returns all of the items currently inside the specified user's cart
        * POST /admin/cart/addItem -> adds the specific item (and quantity) to the specified user's cart
        * DELETE /admin/cart/removeItem/:cartId -> removes the item with the specified id number from the cart
        * GET /admin/merchandise/getItems ->  returns the entire list of merchandise items currently in stock          
        * GET /admin/merchandise/getItem/:id -> returns the specific merchandise item based on it's id

       Postman Testing Instructions:
       - cd into the server
       - Launch the server to listen for requests (node server.js)
       - Use Postman to formulate HTTP requests to send the requests to the API endpoints
       -> inside Postman you should now see the response body and status codes



    3. End-to-End Testing
        - Once the front end is completed we will perform end-to-end testing of the entire application
        - This will include running our current front-end, back-end, and databse all together at the same time
        - Since we have already performed thorough testing of the back-end this stage of testing should be fairly brief 
        - Main goal is just to ensure that after combining all of the components, the API's are still functional and meet
          the project requirements

        Back-End items that will be tested during the end-to-end testing stage:
        * GET /users/getUsers -> returns the whole list of currently registered users
        * GET /users/getUser/:id -> returns user with the specified account id
        * PUT /users/changeEmail/:username/:newEmail -> updates the email of the user's account
        * POST /users/registerUser -> creates a new user account with the requests body information and registers it
        * DELETE /users/removeUser -> removes the users account from the database
        * GET /comments/getComments -> returns the whole list of comments that have been made on the site
        * POST /tickets/purchaseTickets -> adds the tickets to the tickets table and links the tickets to the user's account
        * POST /admin/verifyLogin -> verifys the username and password upon login
        * GET /admin/getUser/username/:username -> returns the user with the specified username
        * GET /admin/cart/getItems/:username -> returns all of the items currently inside the specified user's cart
        * POST /admin/cart/addItem -> adds the specific item (and quantity) to the specified user's cart
        * DELETE /admin/cart/removeItem/:cartId -> removes the item with the specified id number from the cart
        * GET /admin/merchandise/getItems ->  returns the entire list of merchandise items currently in stock          
        * GET /admin/merchandise/getItem/:id -> returns the specific merchandise item based on it's id

        End-to-End Testing Instructions:
        - Make sure that all front-end, back-end, and database versions are up to date (running on main)
        - Create one terminal and begin hosting the back-end server
        - Create a second terminal and begin running the front-end client
        - Lastly, perform test cases for each of the items above


