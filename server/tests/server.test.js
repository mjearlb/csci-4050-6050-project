const request = require('supertest');
const app = require('../server');

const exampleUserList = [{"date_registered": "2024-03-19T16:18:50.000Z", "email": "mjearlb@example.com", "first_name": "Milo", "id": 1000, "last_name": "Bauman", "password": "password", "username": "mjearlb"},
                  {"date_registered": "2024-03-19T16:41:21.000Z", "email": "trey@phish.com", "first_name": "Trey", "id": 1001, "last_name": "Anastasio", "password": "phishRox!", "username": "treyanastasio"}, 
                  {"date_registered": "2024-03-19T19:34:13.000Z", "email": "nathancastro@example.com", "first_name": "Nathan", "id": 1002, "last_name": "Castro", "password": "planes", "username": "nate600"}, 
                  {"date_registered": "2024-04-15T21:26:58.000Z", "email": "ex@ex.com", "first_name": "First", "id": 1003, "last_name": "Last", "password": "Pass!", "username": "testUser"}];

const exampleUser = [{
    "id": 1003,
    "username": "testUser",
    "last_name": "Last",
    "first_name": "First",
    "email": "ex@ex.com",
    "password": "Pass!",
    "date_registered": "2024-04-15T21:26:58.000Z"
}];

const exampleEmailChange = [{
    "id": 1003,
    "username": "testUser",
    "last_name": "Last",
    "first_name": "First",
    "email": "test_user@gmail.com",
    "password": "Pass!",
    "date_registered": "2024-04-15T21:26:58.000Z"
}];

// Unit test suite for GET /users/getUsers endpoint
describe("GET /users/getUsers", () =>{
    test('responds to /users/getUsers', async () => {
        const res = await request(app).get('/users/getUsers');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(exampleUserList);
    });
});


// Unit test suite for GET /users/getUser/:id endpoint
describe("GET /users/getUser", () => {

    // Success: if valid id is provided
    test('responds to /users/getUser/:id', async () => {
        const res = await request(app).get('/users/getUser/1003');
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(exampleUser);
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
        expect(new_res.body).toStrictEqual(exampleUser);
    });

});


