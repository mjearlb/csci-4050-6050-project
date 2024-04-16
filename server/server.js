const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser, getComments, changeEmail, purchaseTicket, registerUser} = require('./database.js');

app.use(express.json());

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

// Calls the registerUser() DB method
// registers a user account
app.post('/users/registerUser', async (req, res) => {
    try {
        const username = req.body.username;
        const lastname = req.body.lastname;
        const firstname = req.body.firstname;
        const email = req.body.email;
        const password = req.body.password;
        const result = await registerUser(username, lastname, firstname, email, password);
        if (result) {
            res.status(200).send('User successfully registered');
        } else {
            res.status(500).send('User registration failure');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.get('/login', async (req, res) => {
    res.send("login here:")
})

// Calls the getComments() DB method
// returns all of the comments that have been made
app.get('/comments/getComments', async (req, res) => {
    try {
        const comments = await getComments();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the changeEmail() DB method
// updates the email of the user given their username
app.put('/users/changeEmail/:username/:newEmail', async (req, res) => {
    try {
        const username = req.params.username;
        const newEmail = req.params.newEmail;
        const result = await changeEmail(username, newEmail);
        if (result) {
            res.status(200).send('Email successfully updated');
        } else {
            res.status(500).send('Email update failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the removeUser() DB method
// removes/deletes the users account
// -- might need to add some code changes here
app.delete('/users/removeUser/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const result = await removeUser(username);
        if (result) {
            res.status(200).send('User successfuly deleted');
        } else {
            res.status(500).send('User deletion failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the purchaseTicket() DB method
// adds the tickets given the user, ticket type, and dates
app.post('/tickets/purchaseTickets', async (req, res) => {
    try {
        const userId = req.body.userId;
        const ticketType = req.body.ticketType;
        const dateValid = req.body.dateValid;
        const result = await purchaseTicket(userId, ticketType, dateValid);
        if (result) {
            res.status(200).send('Tickets successfully purchased');
        } else {
            res.status(500).send('Ticket purchase failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/date`)
})
module.exports = app;
