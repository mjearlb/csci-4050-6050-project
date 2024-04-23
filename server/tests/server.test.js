const request = require('supertest');
const app = require('../server');

// Initialize the expected test data

const expectedUserList = async function() {
    const res = await request(app).get('/users/getUsers');
    return res.body;
}

const expectedUser1 = async function() {
    const res = await request(app).get('/users/getUser/1001');
    return res.body;

}

const expectedUser2 = async function() {
    const res = await request(app).get('/users/getUser/1003');
    return res.body;
}

const expectedUser3 = async function() {
    const res = await request(app).get('/admin/getUser/username/testUser');
    return res.body;
}

const expectedMerchandiseList = async function() {
    const res = await request(app).get('/admin/merchandise/getItems');
    return res.body;
}

const expectedMerchandiseItem = async function() {
    const res = await request(app).get('/admin/merchandise/getItem/1');
    return res.body;
}

const expectedCommentsList = async function() {
    const res = await request(app).get('/comments/getComments');
    return res.body;
}

const expectedCart = async function() {
    const res = await request(app).get('/admin/cart/getItems/testUser');
    return res.body;
}

const exampleEmailChange = [{
    "id": 1003,
    "username": "testUser",
    "last_name": "Last",
    "first_name": "First",
    "email": "test_user@gmail.com",
    "password": "Pass!",
    "date_registered": "2024-04-22T22:02:41.000Z"
}];


// Unit test suite for GET /users/getUsers endpoint
describe("GET /users/getUsers", () =>{

    // Gets the full list of current registered users
    test('responds to /users/getUsers', async () => {
        const res = await request(app).get('/users/getUsers');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedUserList());
    });

});


// Unit test suite for GET /users/getUser/:id endpoint
describe("GET /users/getUser", () => {

    // Success: if valid id is provided
    test('responds to /users/getUser/:id', async () => {
        const res = await request(app).get('/users/getUser/1001');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedUser1());
    });

    // Failure: if invalid id is provided
    test('responds to /users/getUser/:id', async () => {
        const res = await request(app).get('/users/getUser/2000');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([]);
    });

});


// Unit test suite for PUT /users/changeEmail/:username/:newEmail endpoint
describe("PUT /users/changeEmail", () => {

    // Change the email to the new Email
    test('responds to /users/changeEmail/:username/:newEmail', async () => {
        const res = await request(app).put('/users/changeEmail/testUser/test_user@gmail.com');
        const new_res = await request(app).get('/users/getUser/1003');
        expect(res.statusCode).toBe(200);
        expect(new_res.body).toStrictEqual(exampleEmailChange);
    });

    // Change the email back again
    test('respomds to /users/changeEmail/:username/:newEmail', async () => {
        const res = await request(app).put('/users/changeEmail/testUser/ex@ex.com');
        const new_res = await request(app).get('/users/getUser/1003');
        expect(res.statusCode).toBe(200);
        expect(new_res.body).toStrictEqual(await expectedUser2());
    });

});


// Unit test suite for POST /users/registerUser endpoint
describe("POST /users/registerUser", () => {

    // Register the new user
    test('responds to /users/registerUser', async () => {
        const res = await request(app)
            .post('/users/registerUser')
            .send({
                username: 'jd_username15',
                last_name: 'Doe',
                first_name: 'John',
                email: 'john.doe@test.com',
                password: 'p@ss123',
            });
        expect(res.statusCode).toBe(200);
    });

})


// Unit test suite for DELETE /users/removeUser endpoint
describe("DELETE /users/removeUser/:username", () => {

    // Success: Remove valid user
    test('responds to /users/removeUser/:username', async () => {
        const res = await request(app).delete('/users/removeUser/jd_username15');
        const new_res = await request(app).get('/users/getUsers');
        expect(res.statusCode).toBe(200);
        expect(new_res.body).toStrictEqual(await expectedUserList());
    });

    // Failure: Remove invalid user
    test('responds to /users/removeUser/:username', async () => {
        const res = await request(app).delete('/users/removeUser/EXAMPLE_USER_1');
        const new_res = await request(app).get('/users/getUsers');
        expect(res.statusCode).toBe(500);
        expect(new_res.body).toStrictEqual(await expectedUserList());
    });

});


// Unit test suite for GET /comments/getComments endpoint
describe("GET /comments/getComments", () => {

    // Gets the full list of comments that have been made on the site
    test('responds to /comments/getComments', async () => {
        const res = await request(app).get('/comments/getComments');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedCommentsList());
    });

});


// Unit test suite for POST /tickets/purchaseTickets endpoint
describe("POST /tickets/purchaseTickets", () => {

    // Success: if valid user id 
    // Adds the park tickets to the users account
    test('responds to /tickets/purchaseTickets', async () => {
        /**
        const res = await request(app)
            .post('/tickets/purchaseTickets')
            .send({
                user_id: '1003',
                ticket_type: '',
                date_valid: '',
            });
        expect(res.statusCode).toBe(200);
        //expect().toStrictEqual();
        */
    });

    // Failure: if invalid user id 
    test('responds to /tickets/purchaseTickets', async () => {
        /**
        const res = await request(app)
            .post('/tickets/purchaseTickets')
            .send({
                user_id: '5000',
                ticket_type: '',
                date_valid: '',
            });
        expect(res.statusCode).toBe(200);
        //expect().toStrictEqual();
        */
    });

});


// Unit test suite for POST /admin/verifyLogin endpoint
describe("POST /admin/verifyLogin", () => {

    // Verifys that the username and password are correct
    test('responds to /admin/verifyLogin', async() => {
        // Add test implementation here
    });

});


// Unit test suite for GET /admin/getUser/username endpoint
describe("POST /admin/getUser/username", () => {

    // Success: if valid username is provided
    // Retrieves the user account based on the username
    test('responds to /admin/getUser/username', async() => {
        const res = await request(app).get('/admin/getUser/username/testUser');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedUser3());
    });

    // Failure: if invalid username is provided
    test('responds to /admin/getUser/username', async() => {
        const res = await request(app).get('/admin/getUser/username/invalid_username_ex');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([]);
    });

});


// Unit test suite for GET /admin/cart/getItems endpoint
describe("GET /admin/cart/getItems/:username", () => {

    // Success: if valid username is provided
    // Gets all of the items in the cart given a username
    test('responds to /admin/cart/getItems', async() => {
        /**
        const res = await request(app).get('/admin/cart/getItems/testUser');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedCart());
        */
    });

    // Failure: if invalid username is provided
    test('responds to /admin/cart/getItems', async() => {
        /**
        const res = await request(app).get('/admin/cart/getItems/invalid_username_ex');
        expect(res.statusCode).toBe(500);
        expect(res.body).toStrictEqual({});
        */
    });

});


// Unit test suite for POST /admin/cart/addItem
describe("POST /admin/cart/addItem", () => {

    // Adds the item to the user's cart
    test('responds to /admin/cart/addItem', async() => {
        /**
        const res = await request(app)
            .post('/admin/cart/addItem')
            .send({
                username: 'testUser',
                item_id: '1',
                quantity: '1',
            });
        const new_res = await request(app).get('/admin/cart/getItems/testUser');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({});
        expect(new_res.body).toStrictEqual(await expectedCart());
        */
    });

});


// Unit test suite for DELETE /admin/cart/removeItem/:cartId
describe("DELETE /admin/cart/removeItem", () => {

    // Success: if valid cart id
    // Removes the item from the cart
    test('responds to /admin/cart/removeItem/:cartId', async() => {
        /**
        const res = await request(app).delete('/admin/cart/removeItem/13');
        expect(res.statusCode).toBe(200);
        */
    });

    // Failure: if invalid cart id
    test('responds to /admin/cart/removeItem/:cartId', async() => {
        /**
        const res = await request(app).delete('/admin/cart/removeItem/5000');
        expect(res.statusCode).toBe(500);
        */
    });

});


// Unit test suit for GET /admin/merchandies/getItems
describe("GET /admin/merchandise/getItems", () => {

    // Retrieves all of the merchandise items
    test('responds to /admin/merchandise/getItems', async() => {
        const res = await request(app).get('/admin/merchandise/getItems');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedMerchandiseList());
    });

});


// Unit test suite for GET /admin/merchandise/getItem/:id
describe("GET /admin/merchandise/getItem/:id", () => {

    // Success: if valid id is entered
    // Retrieves the information about a specific item
    test('responds to /admin/merchandise/getItem/:id', async() => {
        const res = await request(app).get('/admin/merchandise/getItem/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(await expectedMerchandiseItem());
    });

    // Failure: if invalid id is entered
    test('responds to /admin/merchandise/getItem/:id', async() => {
        const res = await request(app).get('/admin/merchandise/getItem/5000');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([]);
    });

});