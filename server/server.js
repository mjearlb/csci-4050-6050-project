const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser} = require('./database.js');

app.use(express.json());

app.get('/date', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
})

// Calls the getUsers() DB method
// returns all of the users
app.get('/users/getUsers', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the getUser() DB method
// returns the user with the specified ID
app.get('/users/getUser/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the createUser() DB method
// adds a new user to the DB
app.post('/users/createUser', async (req, res) => {
    try {
        const username = req.body.username;
        const lastname = req.body.lastname;
        const firstname = req.body.firstname;
        const email = req.body.email;
        const password = req.body.password;
        await createUser(username, lastname, firstname, email, password);
        res.status(200).send('User successfully created');
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/date`)
})
